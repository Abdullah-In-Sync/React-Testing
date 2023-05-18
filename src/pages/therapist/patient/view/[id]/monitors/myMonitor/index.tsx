import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_THRAPIST_MY_MONITOR_LIST } from "../../../../../../../graphql/query/patient";
import Loader from "../../../../../../../components/common/Loader";
import { Accordion } from "../../../../../../../components/common/Accordion";
import { Button, IconButton, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";

import { DELETE_THERAPIST_MY_MONITOR } from "../../../../../../../graphql/mutation/therapist";
import { useSnackbar } from "notistack";
import ConfirmationModal from "../../../../../../../components/common/ConfirmationModal";

const TherapyMyMonitorList: any = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  /* istanbul ignore next */
  const id = router?.query.id as string;
  const [loader, setLoader] = useState<boolean>(true);
  const [isConfirmDeleteTask, setIsConfirmDeleteTask] = useState(false);
  const [deleteMonitorId, setDeleteMonitorId] = useState("");

  const [deleteMyMonitor] = useMutation(DELETE_THERAPIST_MY_MONITOR);

  const [getTherapistMonitorList, { data: monitorListData, refetch }] =
    useLazyQuery(GET_THRAPIST_MY_MONITOR_LIST, {
      fetchPolicy: "network-only",
      onCompleted: () => {
        setLoader(false);
      },
    });

  useEffect(() => {
    getTherapistMonitorList();
  }, []);

  /* istanbul ignore next */
  const onPressCreateMonitorButton = () => {
    router.push(`/therapist/patient/view/[${[id]}/monitors/create`);
  };

  /* istanbul ignore next */
  const clearIsConfirmCancel = () => {
    setIsConfirmDeleteTask(false);
  };

  const handleDeleteMyMonitor = async () => {
    try {
      await deleteMyMonitor({
        variables: {
          monitor_id: deleteMonitorId,
          // pthomework_id: deleteTaskId,
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
                    // detail={(toggleAccordion) => {}}
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
                          data-testid={`button-edit-icon_$`}
                          style={{
                            backgroundColor: "#fff",
                            width: "unset",
                            marginRight: "10px",
                            marginBottom: "10px",
                          }}
                          // onClick={(e) => safetyPlanList.onPressEditPlan(e, v)}
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
      <>
        {isConfirmDeleteTask && (
          <ConfirmationModal
            label="Are you sure you want to delete the monitor?"
            onCancel={clearIsConfirmCancel}
            onConfirm={handleDeleteMyMonitor}
          />
        )}
      </>
    </>
  );
};

export default TherapyMyMonitorList;
