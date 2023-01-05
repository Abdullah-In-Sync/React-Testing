import { useLazyQuery, useMutation } from "@apollo/client";
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
  GET_PATIENT_MONITOR_BY_ID,
} from "../../../graphql/query/patient";

const Monitoring: NextPage = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [monitoringList, setMonitoringList] = useState<object[]>([]);
  const [completeData, setCompleteData] = useState<object[]>([]);
  const [currentMonitoring, setCurrentMonitoring] = useState();
  const [submitMonitorkById] = useMutation(SUBMIT_PATIENT_MONITOR_BY_ID);
  const [getPatientMonitorById] = useLazyQuery(GET_PATIENT_MONITOR_BY_ID);

  const { enqueueSnackbar } = useSnackbar();

  const [isConfirm, setIsConfirm] = useState<any>({
    status: false,
    storedFunction: null,
    setSubmitting: null,
  });
  const [successModal, setSuccessModal] = useState<boolean>(false);

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
      setLoader(false);
      doneCallback();
      enqueueSnackbar("Server error please try later.", { variant: "error" });
    }
  };

  const [getPatientMonitorList] = useLazyQuery(GET_PATIENT_MONITORING_LIST, {
    onCompleted: (data) => {
      if (data!.getPatientMonitorList) {
        setMonitoringList(data!.getPatientMonitorList);
      }
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
        onCompleted: (data) => {
          if (data!.getPatientMonitorById) {
            setCompleteData(data!.getPatientMonitorById);
            setCurrentMonitoring(item);
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

  useEffect(() => {
    setLoader(true);
    getPatientMonitorList();
  }, []);

  const handleBackPress = () => {
    setCompleteData([]);
    setCurrentMonitoring(undefined);
  };

  const handleNextPress = () => {
    const { index }: any = currentMonitoring;
    const indexIncrement1 = index + 1;

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
    isConfirm.setSubmitting(false);
    setIsConfirm({ status: false, storedFunction: null, setSubmitting: null });
  };

  const handleOk = () => {
    setSuccessModal(false);
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
        />
        {isConfirm.status && (
          <ConfirmationModal
            label="Are you sure want to save the answer"
            onCancel={clearIsConfirm}
            onConfirm={onConfirmSubmit}
          />
        )}
        {successModal && (
          <SuccessModal
            isOpen={successModal}
            title="PATIENTS"
            description={"Response Submitted Successfully"}
            onOk={handleOk}
          />
        )}
      </Layout>
    </>
  );
};

export default Monitoring;
