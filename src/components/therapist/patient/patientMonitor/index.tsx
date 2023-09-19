import { useLazyQuery, useMutation } from "@apollo/client";
import moment from "moment";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../../../contexts/AuthContext";
import {
  DELETE_SHARED_MONITOR,
  GET_THERAPIST_PATIENT_MONITOR_LIST,
  THERAPIST_ADD_MONITOR,
  THERAPIST_ADMIN_MONITOR_LIST,
  THERAPIST_SUBMIT_MONITOR,
  THERAPIST_VIEW_MONITOR,
} from "../../../../graphql/Monitor/graphql";
import {
  TherapistMonitorListData,
  TherapistViewMonitorData,
} from "../../../../graphql/Monitor/types";
import { formatDate } from "../../../../utility/helper";
import ConfirmWrapper, { ConfirmElement } from "../../../common/ConfirmWrapper";
import { ConfirmInfoElement } from "../../../common/CustomModal/InfoModal";
import Loader from "../../../common/Loader";
import MonitorsComponent from "../../../patient/monitors";
import MonitorCompleteView from "../../../patient/monitors/completeView/MonitorCompleteView";
import MonitorViewResponse from "../../../patient/monitors/viewResponse/MonitorViewResponse";
import MonitorListWrapper from "./monitors/MonitorListWrapper";
import ConfirmationModal from "../../../common/ConfirmationModal";

const TherapyPatientMonitorList: any = () => {
  const initialDate = "2022-03-02";
  const modalRefAddMonitor = useRef<ConfirmInfoElement>(null);
  /* istanbul ignore next */
  const { user = {} } = useAppContext();
  console.log(user, "user");
  /* istanbul ignore next */
  const { therapist_data: { org_id: orgId = undefined } = {}, user_type } =
    user;
  const router = useRouter();
  /* istanbul ignore next */
  const { query: { id: patientId, view, monitorId, startDate, endDate } = {} } =
    router;
  const confirmRef = useRef<ConfirmElement>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const [submitMonitorResponse] = useMutation(THERAPIST_SUBMIT_MONITOR);
  const [submitAddMonitorApi] = useMutation(THERAPIST_ADD_MONITOR);
  const [deleteSharedMonitor] = useMutation(DELETE_SHARED_MONITOR);
  const { enqueueSnackbar } = useSnackbar();
  const [isConfirm, setIsConfirm] = useState(false);
  const [selectedMonitor, setSelectedMonitor] = useState();

  const [getTherapistAdminMonitorList] = useLazyQuery(
    THERAPIST_ADMIN_MONITOR_LIST,
    {
      fetchPolicy: "cache-and-network",
      onCompleted: (data) => {
        /* istanbul ignore next */
        setLoader(false);
        const { getAdminMonitorList = [] } = data;
        /* istanbul ignore next */
        modalRefAddMonitor?.current?.openConfirm({
          data: getAdminMonitorList,
        });
        setLoader(false);
      },
      onError: () => {
        /* istanbul ignore next */
        enqueueSnackbar("Server error.", {
          variant: "error",
        });
      },
    }
  );

  const [
    getTherapistPatientMonitorList,
    {
      data: { therapistMonitorList = [] } = {},
      loading: monitorsListLoading,
      refetch: therapistPatientMonitorListRefetch,
    },
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
            /* istanbul ignore next */
            enqueueSnackbar("Response successfully submitted.", {
              variant: "success",
            });
            /* istanbul ignore next */
            backPress();
            /* istanbul ignore next */
            doneCallback();
          }
          /* istanbul ignore next */
          setLoader(false);
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
      /* istanbul ignore next */
      setLoader(false);
    }
  };

  const submitAddMonitorForm = async (formFields, doneCallback) => {
    try {
      await submitAddMonitorApi({
        variables: { ...formFields, ...{ patientId } },
        onCompleted: (data) => {
          const {
            therapistAddMonitor: { status, message },
          } = data;
          if (status) {
            /* istanbul ignore next */
            enqueueSnackbar("Monitor successfully added.", {
              variant: "success",
            });
            /* istanbul ignore next */
            therapistPatientMonitorListRefetch();
            backPress();
            /* istanbul ignore next */
            doneCallback();
          } else {
            /* istanbul ignore next */
            enqueueSnackbar(message, { variant: "error" });
          }
          /* istanbul ignore next */
          setLoader(false);
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
      /* istanbul ignore next */
      setLoader(false);
    }
  };
  /* istanbul ignore next */
  const deleteMonitor = async () => {
    try {
      /* istanbul ignore next */
      await deleteSharedMonitor({
        variables: {
          patient_id: patientId,
          ptmon_id: selectedMonitor,
        },
        onCompleted: (data) => {
          /* istanbul ignore next */
          const {
            /* istanbul ignore next */
            deleteSharedMonitor: { status, message },
          } = data;
          if (status) {
            setIsConfirm(false);
            /* istanbul ignore next */
            enqueueSnackbar("Monitor deleted successfully!", {
              variant: "success",
            });
            /* istanbul ignore next */
            therapistPatientMonitorListRefetch();
            /* istanbul ignore next */
          } else {
            /* istanbul ignore next */
            enqueueSnackbar(message, { variant: "error" });
          }
          /* istanbul ignore next */
          setLoader(false);
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
      /* istanbul ignore next */
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
      `${patientId}/?mainTab=therapy&tab=monitor&subTab1=patient-monitor&view=complete&monitorId=${_id}`
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
          `${patientId}/?mainTab=therapy&tab=monitor&subTab1=patient-monitor&view=complete&monitorId=${nextMonitor._id}`
        );
      }
    }
  };

  const backPress = () => {
    router.push(
      `${patientId}/?mainTab=therapy&tab=monitor&subTab1=patient-monitor`
    );
  };

  const handleRangeGoButton = (v) => {
    const { fromDate, toDate } = v;
    const nEndDate = formatDate(toDate);
    const nStartDate = formatDate(fromDate);
    router.push(
      `${patientId}/?mainTab=therapy&tab=monitor&subTab1=patient-monitor&view=viewResponse&monitorId=${monitorId}&startDate=${nStartDate}&endDate=${nEndDate}`
    );
  };

  const viewResponseButtonClick = (v) => {
    const { _id } = v;
    const nEndDate = moment().format("YYYY-MM-DD");
    const nStartDate = initialDate;
    router.push(
      `${patientId}/?mainTab=therapy&tab=monitor&subTab1=patient-monitor&view=viewResponse&monitorId=${_id}&startDate=${nStartDate}&endDate=${nEndDate}`
    );
  };

  const onClickMonitor = () => {
    setLoader(true);
    getTherapistAdminMonitorList({
      variables: { orgId, patientId },
    });
  };

  const handlePressAddMonitor = (formFields, { setSubmitting }) => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => submitAddMonitorForm(formFields, callback),
      description: "Are you sure you want to add the monitor?",
      setSubmitting,
    });
  };
  /* istanbul ignore next */
  const onClickDelete = (_id) => {
    /* istanbul ignore next */
    setSelectedMonitor(_id);
    /* istanbul ignore next */
    setIsConfirm(true);
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
            /* istanbul ignore next */
            initialDate={(startDate || initialDate) as string}
            handleRangeGoButton={handleRangeGoButton}
            onBackButtonPress={backPress}
            endDate={endDate as string}
          />
        );
      default:
        return (
          <>
            <ConfirmWrapper ref={confirmRef}>
              <MonitorListWrapper
                modalRefAddMonitor={modalRefAddMonitor}
                onPressAddMonitor={handlePressAddMonitor}
                onClickMonitor={onClickMonitor}
              >
                <MonitorsComponent
                  monitoringList={therapistMonitorList}
                  viewResponseButtonClick={viewResponseButtonClick}
                  completeButtonClick={completeButtonClick}
                  /* istanbul ignore next */
                  onClickDelete={onClickDelete}
                  /* istanbul ignore next */
                  userType={user_type}
                />
              </MonitorListWrapper>
            </ConfirmWrapper>
            {isConfirm && (
              <ConfirmationModal
                label="Are you sure you want to delete the monitor?"
                /* istanbul ignore next */
                onCancel={() => setIsConfirm(false)}
                /* istanbul ignore next */
                onConfirm={deleteMonitor}
              />
            )}
          </>
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
