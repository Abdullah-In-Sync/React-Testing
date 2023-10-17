import {
  DELETE_THERAPIST_MY_MONITOR,
  SHARE_THERAPIST_MY_MONITOR,
} from "../../../../../../../graphql/mutation/therapist";
import { useSnackbar } from "notistack";
import ConfirmationModal from "../../../../../../../components/common/ConfirmationModal";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_THRAPIST_MY_MONITOR_LIST } from "../../../../../../../graphql/query/patient";
import Loader from "../../../../../../../components/common/Loader";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Accordion } from "../../../../../../../components/common/Accordion";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import {
  CommonModal,
  ModalElement,
} from "../../../../../../../components/common/CustomModal/CommonModal";
import { GET_THERAPIST_MONITOR_SHARE_PATIENT_LIST } from "../../../../../../../graphql/SafetyPlan/graphql";
import SharePlanForm from "../../../../../../../components/therapist/patient/monitor/share/SharePlanForm";
import ViewMyMonitor from "../../../../../../../components/therapist/patient/monitor/viewMyMonitor";

const TherapyMyMonitorList: any = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const modalRefAddPlan = useRef<ModalElement>(null);

  /* istanbul ignore next */
  const handleOpenAddPlanModal = useCallback(
    () => modalRefAddPlan.current?.open(),
    []
  );
  const handleCloseAddPlanModal = useCallback(() => {
    /* istanbul ignore next */
    modalRefAddPlan.current?.close();
  }, []);

  /* istanbul ignore next */
  const id = router?.query.id as string;
  const [loader, setLoader] = useState<boolean>(true);
  const [isConfirmDeleteTask, setIsConfirmDeleteTask] = useState(false);
  const [deleteMonitorId, setDeleteMonitorId] = useState("");
  const [shareMonitorId, setShareMonitorId] = useState("");
  const [isConfirmShareTask, setIsConfirmShareTask] = useState(false);
  const [isSetSharedPatientIds, setIsSetSharedPatientIds] = useState("");

  const [deleteMyMonitor] = useMutation(DELETE_THERAPIST_MY_MONITOR);
  const [shareMyMonitor] = useMutation(SHARE_THERAPIST_MY_MONITOR);

  const [getTherapistMonitorList, { data: monitorListData, refetch }] =
    useLazyQuery(GET_THRAPIST_MY_MONITOR_LIST, {
      fetchPolicy: "network-only",
      onCompleted: () => {
        setLoader(false);
      },
    });

  const [
    getTherapistMonitorSharePatientList,
    { data: monitorSharePatientListData },
  ] = useLazyQuery(GET_THERAPIST_MONITOR_SHARE_PATIENT_LIST, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  useEffect(() => {
    getTherapistMonitorList();
    getTherapistMonitorSharePatientList({
      variables: { monitor_id: shareMonitorId },
    });
  }, [shareMonitorId]);

  /* istanbul ignore next */
  const onPressCreateMonitorButton = () => {
    router.push(`/therapist/patient/view/[${[id]}/monitors/create`);
  };

  /* istanbul ignore next */
  const clearIsConfirmCancel = () => {
    setIsConfirmDeleteTask(false);
    setIsConfirmShareTask(false);
  };

  const handleDeleteMyMonitor = async () => {
    try {
      await deleteMyMonitor({
        variables: {
          monitor_id: deleteMonitorId,
        },
        onCompleted: () => {
          setIsConfirmDeleteTask(false);
          enqueueSnackbar("Monitor deleted successfully", {
            variant: "success",
          });
          refetch();
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  const receivePatientIds = (value) => {
    setIsSetSharedPatientIds(value);
  };

  const handlerSharePlan = async () => {
    try {
      await shareMyMonitor({
        variables: {
          monitor_id: shareMonitorId,
          patient_id: isSetSharedPatientIds,
        },
        onCompleted: () => {
          /* istanbul ignore next */
          setIsConfirmShareTask(false);
          enqueueSnackbar("Monitor shared successfully", {
            variant: "success",
          });
          getTherapistMonitorSharePatientList({
            variables: { monitor_id: shareMonitorId },
          });
        },
      });
      /* istanbul ignore next */
      handleCloseAddPlanModal();
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("There is something wrong.", { variant: "error" });
    }
  };
  return (
    <>
      <Loader visible={loader} />
      <Box
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <Button
          data-testid="addResourceSubmitButton"
          variant="contained"
          onClick={onPressCreateMonitorButton}
          style={{
            backgroundColor: "#6EC9DB",
            color: "white",
            textTransform: "none",
          }}
        >
          Create Monitor
        </Button>
      </Box>

      <Box marginBottom={"20px"}>
        {
          /* istanbul ignore next */
          !loader &&
          monitorListData?.therapistMyMonitorList &&
          monitorListData?.therapistMyMonitorList.length > 0
            ? monitorListData?.therapistMyMonitorList.map((v) => {
                return (
                  <Accordion
                    key={`according-${v.name}`}
                    title={`${v.name}`}
                    marginBottom={"20px !important"}
                    detail={() => {
                      return <ViewMyMonitor monitorId={v._id} />;
                    }}
                    actionButtons={
                      <>
                        <IconButton
                          size="small"
                          data-testid={`button-edit-icon`}
                          style={{
                            backgroundColor: "#fff",
                            width: "unset",
                            marginRight: "10px",
                            marginBottom: "10px",
                          }}
                          onClick={() => {
                            setDeleteMonitorId(v._id);
                            setIsConfirmDeleteTask(true);
                          }}
                        >
                          <DeleteIcon
                            style={{ fontSize: "15px", color: "black" }}
                          />
                        </IconButton>
                        <IconButton
                          size="small"
                          data-testid={`share-button-icon`}
                          style={{
                            backgroundColor: "#fff",
                            width: "unset",
                            marginRight: "10px",
                            marginBottom: "10px",
                          }}
                          onClick={() => {
                            setShareMonitorId(v._id);
                            handleOpenAddPlanModal();
                          }}
                        >
                          <ShareIcon
                            style={{ fontSize: "15px", color: "black" }}
                          />
                        </IconButton>
                      </>
                    }
                  />
                );
              })
            : monitorListData?.therapistMyMonitorList?.length == 0 && (
                <Box display={"flex"} justifyContent="center">
                  <Typography>No data found!</Typography>
                </Box>
              )
        }
      </Box>

      <Box>
        {isConfirmDeleteTask && (
          <ConfirmationModal
            label="Are you sure you want to delete the monitor?"
            onCancel={clearIsConfirmCancel}
            onConfirm={handleDeleteMyMonitor}
          />
        )}
      </Box>

      <CommonModal
        ref={modalRefAddPlan}
        headerTitleText="Share Monitor"
        maxWidth="sm"
      >
        <SharePlanForm
          onPressSubmit={() => setIsConfirmShareTask(true)}
          therapistSafetyPlanList={monitorSharePatientListData}
          receivePlanId={receivePatientIds}
          snackBar={enqueueSnackbar}
        />
      </CommonModal>

      {isConfirmShareTask && (
        <ConfirmationModal
          label="Are you sure you want to share the monitor?"
          onCancel={clearIsConfirmCancel}
          onConfirm={handlerSharePlan}
        />
      )}
    </>
  );
};

export default TherapyMyMonitorList;
