import { useLazyQuery, useMutation } from "@apollo/client";
import moment from "moment";
import type { NextPage } from "next";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import Loader from "../../../components/common/Loader";
import { SuccessModal } from "../../../components/common/SuccessModal";
import Layout from "../../../components/layout";
import MonitoringComponent from "../../../components/patient/monitoring";
import { SUBMIT_PATIENT_MONITOR_BY_ID } from "../../../graphql/mutation/patient";
import {
  GET_PATIENT_MONITORING_LIST,
  GET_PATIENT_MONITOR_ANS_BY_ID,
  GET_PATIENT_MONITOR_BY_ID,
} from "../../../graphql/query/patient";

import { useRouter } from "next/router";

import dummyData from "../../../components/patient/monitoring/data";

const Monitoring: NextPage = () => {
  const router = useRouter();
  const initialDate = "2022-03-02";
  const [loader, setLoader] = useState<boolean>(false);
  const [completeData, setCompleteData] = useState<object[]>([]);
  const [currentMonitoring, setCurrentMonitoring] = useState();
  const [submitMonitorkById] = useMutation(SUBMIT_PATIENT_MONITOR_BY_ID);
  const [getPatientMonitorById] = useLazyQuery(GET_PATIENT_MONITOR_BY_ID);
  const [viewResponseData, setViewResponseData] = useState<any>();
  const [view, setView] = useState("");
  const [getPatientMonitorAnsById] = useLazyQuery(
    GET_PATIENT_MONITOR_ANS_BY_ID
  );

  const { enqueueSnackbar } = useSnackbar();

  const [isConfirm, setIsConfirm] = useState<any>({
    status: false,
    storedFunction: null,
    setSubmitting: null,
  });
  const [successModal, setSuccessModal] = useState<boolean>(false);

  useEffect(() => {
    setLoader(true);
    getPatientMonitorList();
  }, []);

  useEffect(() => {
    router.events.on("routeChangeComplete", handlePageRerfresh);
    return () => {
      router.events.off("routeChangeComplete", handlePageRerfresh);
    };
  }, [router.events]);
  /* istanbul ignore next */
  const resetState = () => {
    setCompleteData([]);
    setCurrentMonitoring(undefined);
    setViewResponseData(undefined);
    setView("");
  };

  const handlePageRerfresh = () => {
    /* istanbul ignore next */
    resetState();
    /* istanbul ignore next */
    setLoader(true);
    /* istanbul ignore next */
    getPatientMonitorList();
  };

  const setViewResponseWithEmojis = (viewResponse) => {
    setViewResponseData({
      emojis: dummyData.emojis,
      ansResponseData: viewResponse,
    });
    setView("viewResponse");
  };

  const fetchPatientMonitorAnsById = async (item, { endDate, startDate }) => {
    setLoader(true);

    const { _id: monitorId } = item;
    try {
      await getPatientMonitorAnsById({
        variables: {
          monitorId,
          endDate,
          startDate,
          dateSort: "asc",
        },
        fetchPolicy: "network-only",
        onCompleted: (data) => {
          /* istanbul ignore next */
          const { getPatientMonitorAnsById: viewResponse = [] } = data;
          setCurrentMonitoring(item);
          setViewResponseWithEmojis(viewResponse);
        },
      });
    } catch (e) {
      //
    } finally {
      setLoader(false);
    }
  };

  //grphql apis
  const confirmedSubmit = async (formFields, monitoring, doneCallback) => {
    setLoader(true);
    const { data } = formFields;
    const { _id } = monitoring;
    try {
      await submitMonitorkById({
        variables: {
          monitorId: _id,
          data: JSON.stringify(data),
        },
        onCompleted: () => {
          /* istanbul ignore else */
          setSuccessModal(true);
          setLoader(false);
          doneCallback();
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      doneCallback();
      /* istanbul ignore next */
      enqueueSnackbar("Server error please try later.", { variant: "error" });
    }
  };

  const [
    getPatientMonitorList,
    { data: { getPatientMonitorList: monitoringList = [] } = {} },
  ] = useLazyQuery(GET_PATIENT_MONITORING_LIST, {
    onCompleted: () => {
      setLoader(false);
    },
  });

  const fetchPatientMonitorById = async (item) => {
    setLoader(true);
    const { _id: monitorId } = item;
    try {
      await getPatientMonitorById({
        variables: {
          monitorId,
        },
        fetchPolicy: "network-only",
        onCompleted: (data) => {
          if (data!.getPatientMonitorById) {
            setCompleteData(data!.getPatientMonitorById);
            setCurrentMonitoring(item);
            setView("complete");
          }
        },
      });
    } catch (e) {
      //
    } finally {
      setLoader(false);
    }
  };

  const completeButtonClick = (item) => {
    fetchPatientMonitorById(item);
  };

  const viewResponseButtonClick = async (item) => {
    const endDate = moment().format("YYYY-MM-DD");
    const startDate = initialDate;
    fetchPatientMonitorAnsById(item, { endDate, startDate });
  };

  const handleBackPress = () => {
    setCompleteData([]);
    setCurrentMonitoring(undefined);
    setView("");
  };

  const handleNextPress = () => {
    const { index }: any = currentMonitoring;
    const indexIncrement1 = index + 1;
    /* istanbul ignore next */
    if (monitoringList.length > indexIncrement1) {
      fetchPatientMonitorById({
        ...monitoringList[index + 1],
        ...{ index: indexIncrement1 },
      });
    } else {
      fetchPatientMonitorById({ ...monitoringList[0], ...{ index: 0 } });
    }
  };

  const handleSavePress = (formFields, { setSubmitting }) => {
    setIsConfirm({
      status: true,
      storedFunction: () =>
        confirmedSubmit(formFields, currentMonitoring, () =>
          setSubmitting(false)
        ),
      setSubmitting: setSubmitting,
    });
  };

  const onConfirmSubmit = () => {
    isConfirm.storedFunction();
    setIsConfirm({ status: false, storedFunction: null, setSubmitting: null });
  };

  const clearIsConfirm = () => {
    /* istanbul ignore next */
    isConfirm.setSubmitting(false);
    /* istanbul ignore next */
    setIsConfirm({ status: false, storedFunction: null, setSubmitting: null });
  };

  const handleOk = () => {
    setSuccessModal(false);
  };

  const formatDate = (isoDate) => {
    /* istanbul ignore next */
    return moment(isoDate.toISOString()).format("YYYY-MM-DD");
  };

  const handleRangeGoButton = (v) => {
    /* istanbul ignore next */
    const { fromDate, toDate } = v;
    /* istanbul ignore next */
    const endDate = formatDate(toDate);
    /* istanbul ignore next */
    const startDate = formatDate(fromDate);
    /* istanbul ignore next */
    fetchPatientMonitorAnsById(currentMonitoring, { endDate, startDate });
  };

  return (
    <>
      <Layout boxStyle={{ height: "100vh" }}>
        <Loader visible={loader} />
        <MonitoringComponent
          completeData={completeData}
          monitoringList={monitoringList}
          completeButtonClick={completeButtonClick}
          onSubmit={handleSavePress}
          backPress={handleBackPress}
          nextPress={handleNextPress}
          viewResponseData={viewResponseData}
          viewResponseButtonClick={viewResponseButtonClick}
          onGoButton={handleRangeGoButton}
          initialDate={initialDate}
          currentMonitoring={currentMonitoring}
          view={view}
        />
        {isConfirm.status && (
          <ConfirmationModal
            label="Are you sure you want to save the answer?"
            onCancel={clearIsConfirm}
            onConfirm={onConfirmSubmit}
          />
        )}
        {successModal && (
          <SuccessModal
            isOpen={successModal}
            title="PATIENTS"
            description={"Response Submitted Successfully."}
            onOk={handleOk}
          />
        )}
      </Layout>
    </>
  );
};

export default Monitoring;
