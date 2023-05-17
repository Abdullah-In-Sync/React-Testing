import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useLazyQuery } from "@apollo/client";
import { GET_THRAPIST_MY_MONITOR_LIST } from "../../../../../../../graphql/query/patient";
import Loader from "../../../../../../../components/common/Loader";
import { Accordion } from "../../../../../../../components/common/Accordion";
import { Button, IconButton, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";

const TherapyMyMonitorList: any = () => {
  const router = useRouter();
  /* istanbul ignore next */
  const id = router?.query.id as string;
  const [loader, setLoader] = useState<boolean>(true);
  const [getTherapistMonitorList, { data: monitorListData }] = useLazyQuery(
    GET_THRAPIST_MY_MONITOR_LIST,
    {
      fetchPolicy: "network-only",
      onCompleted: () => {
        setLoader(false);
      },
    }
  );

  useEffect(() => {
    getTherapistMonitorList();
  }, []);

  /* istanbul ignore next */
  const onPressCreateMonitorButton = () => {
    router.push(`/therapist/patient/view/[${[id]}/monitors/create`);
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
                          data-testid={`button-edit-icon_$`}
                          style={{
                            backgroundColor: "#fff",
                            width: "unset",
                            marginRight: "10px",
                            marginBottom: "10px",
                          }}
                          // onClick={(e) => safetyPlanList.onPressEditPlan(e, v)}
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
    </>
  );
};

export default TherapyMyMonitorList;
