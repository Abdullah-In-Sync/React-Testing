import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import Loader from "../../../common/Loader";

import moment from "moment";
import {
  GET_PATIENT_MONITOR_LIST,
  PATIENT_SUBMIT_MONITOR,
  PATIENT_VIEW_MONITOR,
} from "../../../../graphql/Monitor/graphql";
import {
  PatientMonitorListData,
  PatientViewMonitorData,
} from "../../../../graphql/Monitor/types";
import { formatDate } from "../../../../utility/helper";
import ConfirmWrapper, { ConfirmElement } from "../../../common/ConfirmWrapper";
import ContentHeader from "../../../common/ContentHeader";
import MonitorsComponent from "../../monitors";
import MonitorCompleteView from "../../monitors/completeView/MonitorCompleteView";
import MonitorViewResponse from "../../monitors/viewResponse/MonitorViewResponse";

const PatientMonitorsListPage: NextPage = () => {
  const initialDate = "2022-03-02";
  const [loader, setLoader] = useState<boolean>(true);
  const confirmRef = useRef<ConfirmElement>(null);
  const router = useRouter();
  const [submitMonitorResponse] = useMutation(PATIENT_SUBMIT_MONITOR);
  const { enqueueSnackbar } = useSnackbar();
  const { query: { view, monitorId, startDate, endDate } = {} } = router;

  useEffect(() => {
    setLoader(true);
    getPatientMonitorList();
  }, []);

  useEffect(() => {
    if (monitorId) {
      setLoader(true);
      getMonitorData({
        variables: { monitorId, startDate, endDate },
      });
    }
  }, [monitorId, startDate, endDate]);

  const [
    getPatientMonitorList,
    { data: { patientMonitorList = [] } = {}, loading: monitorsListLoading },
  ] = useLazyQuery<PatientMonitorListData>(GET_PATIENT_MONITOR_LIST, {
    onCompleted: () => {
      setLoader(false);
    },
    fetchPolicy: "cache-and-network",
  });

  const [
    getMonitorData,
    {
      data: { patientViewMonitor: monitorViewData = undefined } = {},
      loading: viewMonitorLoading,
    },
  ] = useLazyQuery<PatientViewMonitorData>(PATIENT_VIEW_MONITOR, {
    onCompleted: () => {
      setLoader(false);
    },
    fetchPolicy: "cache-and-network",
  });

  const submitForm = async (formFields, doneCallback) => {
    const { questions } = formFields;

    const modifyQuestions = questions.map((item) => {
      const { questionId, answer } = item;
      return {
        question_id: questionId,
        answer,
      };
    });

    try {
      await submitMonitorResponse({
        variables: {
          monitorId,
          questions: JSON.stringify(modifyQuestions),
        },
        onCompleted: (data) => {
          const {
            patientSubmitMonitor: { _id },
          } = data;
          if (_id) {
            enqueueSnackbar("Response successfully submitted.", {
              variant: "success",
            });
            router.push(`therapy/?tab=monitors`);
            doneCallback();
          }
          setLoader(false);
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
      setLoader(false);
    }
  };

  const handleSubmit = (formFields, { setSubmitting }) => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => submitForm(formFields, callback),
      description: "Are you sure you want to save the response?",
      setSubmitting,
    });
  };

  const nextPress = () => {
    const currentMonitorIndex = patientMonitorList.findIndex(
      (item) => item._id === monitorId
    );
    if (currentMonitorIndex > -1) {
      const nextMonitor = patientMonitorList[currentMonitorIndex + 1];
      router.push(
        `therapy/?tab=monitors&view=complete&monitorId=${nextMonitor._id}`
      );
    }
  };

  const backPress = () => {
    router.push(`therapy/?tab=monitors`);
  };

  const completeButtonClick = (v) => {
    const { _id } = v;
    router.push(`therapy/?tab=monitors&view=complete&monitorId=${_id}`);
  };

  const viewResponseButtonClick = (v) => {
    const { _id } = v;
    const nEndDate = moment().format("YYYY-MM-DD");
    const nStartDate = initialDate;
    router.push(
      `therapy/?tab=monitors&view=viewResponse&monitorId=${_id}&startDate=${nStartDate}&endDate=${nEndDate}`
    );
  };

  const handleRangeGoButton = (v) => {
    const { fromDate, toDate } = v;
    const nEndDate = formatDate(toDate);
    const nStartDate = formatDate(fromDate);
    router.push(
      `therapy/?tab=monitors&view=viewResponse&monitorId=${monitorId}&startDate=${nStartDate}&endDate=${nEndDate}`
    );
  };

  // const handleBackBttonPress = () => {
  //   router.back();
  // }

  const currentView = () => {
    switch (view) {
      case "complete":
        return (
          <ConfirmWrapper ref={confirmRef}>
            <MonitorCompleteView
              monitorData={monitorViewData}
              nextPress={nextPress}
              backPress={backPress}
              onSubmit={handleSubmit}
              loading={viewMonitorLoading}
            />
          </ConfirmWrapper>
        );
      case "viewResponse":
        return (
          <MonitorViewResponse
            monitorData={monitorViewData}
            initialDate={(startDate || initialDate) as string}
            handleRangeGoButton={handleRangeGoButton}
            onBackButtonPress={backPress}
            endDate={endDate as string}
          />
        );
      default:
        return (
          <MonitorsComponent
            monitoringList={patientMonitorList}
            viewResponseButtonClick={viewResponseButtonClick}
            completeButtonClick={completeButtonClick}
          />
        );
    }
  };

  return (
    <>
      <ContentHeader title="Monitor" color={"primary.main"} />
      {!monitorsListLoading && currentView()}
      <Loader visible={loader} />
    </>
  );
};

export default PatientMonitorsListPage;
