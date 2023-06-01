import { useLazyQuery, useMutation } from "@apollo/client";
import moment from "moment";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import {
  GET_THERAPIST_PATIENT_MONITOR_LIST,
  THERAPIST_SUBMIT_MONITOR,
  THERAPIST_VIEW_MONITOR,
} from "../../../../graphql/Monitor/graphql";
import {
  TherapistMonitorListData,
  TherapistViewMonitorData,
} from "../../../../graphql/Monitor/types";
import { formatDate } from "../../../../utility/helper";
import ConfirmWrapper, { ConfirmElement } from "../../../common/ConfirmWrapper";
import Loader from "../../../common/Loader";
import MonitorsComponent from "../../../patient/monitors";
import MonitorCompleteView from "../../../patient/monitors/completeView/MonitorCompleteView";
import MonitorViewResponse from "../../../patient/monitors/viewResponse/MonitorViewResponse";
import MonitorListWrapper from "./monitors/MonitorListWrapper";

const TherapyPatientMonitorList: any = () => {
  const initialDate = "2022-03-02";
  const router = useRouter();
  const { query: { id: patientId, view, monitorId, startDate, endDate } = {} } =
    router;
  const confirmRef = useRef<ConfirmElement>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const [submitMonitorResponse] = useMutation(THERAPIST_SUBMIT_MONITOR);
  const { enqueueSnackbar } = useSnackbar();

  const [
    getTherapistPatientMonitorList,
    { data: { therapistMonitorList = [] } = {}, loading: monitorsListLoading },
  ] = useLazyQuery<TherapistMonitorListData>(
    GET_THERAPIST_PATIENT_MONITOR_LIST,
    {
      fetchPolicy: "cache-and-network",
      onCompleted: () => {
        setLoader(false);
      },
    }
  );

  const [
    getMonitorData,
    {
      data: { therapistViewMonitor: monitorViewData = undefined } = {},
      loading: viewMonitorLoading,
    },
  ] = useLazyQuery<TherapistViewMonitorData>(THERAPIST_VIEW_MONITOR, {
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
          patientId,
          questions: JSON.stringify(modifyQuestions),
        },
        onCompleted: (data) => {
          const {
            therapistSubmitMonitor: { _id },
          } = data;
          if (_id) {
            enqueueSnackbar("Response successfully submitted.", {
              variant: "success",
            });
            backPress();
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

  useEffect(() => {
    if (monitorId) {
      setLoader(true);
      getMonitorData({
        variables: { patientId, monitorId, startDate, endDate },
      });
    }
  }, [monitorId, startDate, endDate]);

  useEffect(() => {
    getTherapistPatientMonitorList({
      variables: { patient_id: patientId },
    });
  }, []);

  const completeButtonClick = (v) => {
    const { _id } = v;
    router.push(
      `${patientId}/?tab=monitor&&subTab1=patient-monitor&view=complete&monitorId=${_id}`
    );
  };

  const handleSubmit = (formFields, { setSubmitting }) => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => submitForm(formFields, callback),
      description: "Are you sure you want to save the response?",
      setSubmitting,
    });
  };

  const nextPress = () => {
    const currentMonitorIndex = therapistMonitorList.findIndex(
      (item) => item._id === monitorId
    );
    if (currentMonitorIndex > -1) {
      const nextMonitorIndex = currentMonitorIndex + 1;
      if (therapistMonitorList.length > nextMonitorIndex) {
        const nextMonitor = therapistMonitorList[nextMonitorIndex];
        router.push(
          `${patientId}/?tab=monitor&subTab1=patient-monitor&view=complete&monitorId=${nextMonitor._id}`
        );
      }
    }
  };

  const backPress = () => {
    router.push(`${patientId}/?tab=monitor&subTab1=patient-monitor`);
  };

  const handleRangeGoButton = (v) => {
    const { fromDate, toDate } = v;
    const nEndDate = formatDate(toDate);
    const nStartDate = formatDate(fromDate);
    router.push(
      `${patientId}/?tab=monitor&subTab1=patient-monitor&view=viewResponse&monitorId=${monitorId}&startDate=${nStartDate}&endDate=${nEndDate}`
    );
  };

  const viewResponseButtonClick = (v) => {
    const { _id } = v;
    const nEndDate = moment().format("YYYY-MM-DD");
    const nStartDate = initialDate;
    router.push(
      `${patientId}/?tab=monitor&subTab1=patient-monitor&view=viewResponse&monitorId=${_id}&startDate=${nStartDate}&endDate=${nEndDate}`
    );
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
          <MonitorListWrapper>
            <MonitorsComponent
              monitoringList={therapistMonitorList}
              viewResponseButtonClick={viewResponseButtonClick}
              completeButtonClick={completeButtonClick}
            />
          </MonitorListWrapper>
        );
    }
  };

  return (
    <>
      <Loader visible={loader} />

      {!monitorsListLoading && currentView()}
    </>
  );
};

export default TherapyPatientMonitorList;
