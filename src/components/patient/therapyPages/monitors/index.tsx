import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import Loader from "../../../common/Loader";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import {
  GET_PATIENT_MONITOR_LIST,
  PATIENT_VIEW_MONITOR,
  PATIENT_SUBMIT_MONITOR,
} from "../../../../graphql/Monitor/graphql";
import MonitorsComponent from "../../monitors";
import { PatientMonitorListData } from "../../../../graphql/Monitor/types";
import MonitorCompleteView from "../../monitors/completeView/MonitorCompleteView";
import ConfirmWrapper, { ConfirmElement } from "../../../common/ConfirmWrapper";
import ContentHeader from "../../../common/ContentHeader";

const PatientMonitorsListPage: NextPage = () => {
  const [loader, setLoader] = useState<boolean>(true);
  const confirmRef = useRef<ConfirmElement>(null);
  const router = useRouter();
  const [submitMonitorResponse] = useMutation(PATIENT_SUBMIT_MONITOR);
  const { enqueueSnackbar } = useSnackbar();
  const { query: { view, monitorId } = {} } = router;

  useEffect(() => {
    setLoader(true);
    getPatientMonitorList();
  }, []);

  useEffect(() => {
    setLoader(true);
    getMonitorData({
      variables: { monitorId },
    });
  }, [monitorId]);

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
      data: { patientViewMonitor: monitorViewData = null } = {},
      loading: viewMonitorLoading,
    },
  ] = useLazyQuery<any>(PATIENT_VIEW_MONITOR, {
    onCompleted: () => {
      setLoader(false);
    },
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
            // router.back();
            router.push(`therapy/?tab=monitors`);
            doneCallback();
          }
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  const completeButtonClick = (v) => {
    const { _id } = v;
    router.push(`therapy/?tab=monitors&view=complete&monitorId=${_id}`);
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
    const currentMonitorIndex = patientMonitorList.findIndex(
      (item) => item._id === monitorId
    );
    if (currentMonitorIndex > 0) {
      const prevMonitor = patientMonitorList[currentMonitorIndex - 1];
      router.push(
        `therapy/?tab=monitors&view=complete&monitorId=${prevMonitor._id}`
      );
    }
  };

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
      default:
        return (
          <MonitorsComponent
            monitoringList={patientMonitorList}
            viewResponseButtonClick={null}
            completeButtonClick={completeButtonClick}
          />
        );
    }
  };

  return (
    <>
      <Loader visible={loader} />
      <ContentHeader title="Monitor" color={"primary.main"} />
      {!monitorsListLoading && currentView()}
    </>
  );
};

export default PatientMonitorsListPage;
