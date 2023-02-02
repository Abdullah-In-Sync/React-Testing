import React from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import NextLink from "next/link";

const TherapistSafetyPlanList = (safetyPlanList) => {
  const isEditable = (v) => {
    const { plan_owner, plan_type } = v;
    if (plan_type !== "fixed" || plan_owner === "therapist") return true;
    else return false;
  };
  return (
    <>
      <Box>
        {safetyPlanList &&
          safetyPlanList?.safetyPlanList?.getSafetyPlanListByPatientId &&
          safetyPlanList?.safetyPlanList?.getSafetyPlanListByPatientId.map(
            (v, k) => {
              const checkIsEditable = isEditable(v);
              const p = k + 1;
              const panelName = "panel" + p;
              return (
                <>
                  <Accordion
                    key={`safetyPlanListItem_${k}`}
                    sx={{ marginTop: "4px", borderRadius: "4px" }}
                    style={{ borderRadius: "14px" }}
                    // expanded={sessionPanelExpanded === panelName}
                    // onChange={handleSessionPanelChange(panelName)}
                    // onClick={() => setSessionNo(p)}
                    // key={v._id}
                    expanded={false}
                    data-testid="SessionPanelItem"
                  >
                    <AccordionSummary
                      expandIcon={
                        <Box>
                          <AddIcon className="text-white" />
                        </Box>
                      }
                      aria-controls={panelName + "bh-content"}
                      id={panelName + "bh-header"}
                      data-testid={panelName + "bh-header"}
                      sx={{
                        backgroundColor: "#6ba08e",
                        borderRadius: "12px",
                        border: "none",
                        marginTop: "10px",
                      }}
                    >
                      <>
                        <Typography
                          className="text-white"
                          sx={{ width: "90%", flexShrink: 0 }}
                        >
                          {v.name}
                        </Typography>
                      </>
                      <>
                        <Box
                          // style={{
                          //   display: "flex",
                          //   paddingLeft: "630px",
                          // }}

                          sx={{
                            justifyContent: "flex-end",
                            flexShrink: 1,
                          }}
                        >
                          {checkIsEditable && (
                            <IconButton
                              size="small"
                              data-testid={`button-edit-icon_${k}`}
                              style={{
                                backgroundColor: "#fff",
                                width: "unset",
                              }}
                              onClick={(e) =>
                                safetyPlanList.onPressEditPlan(e, v)
                              }
                            >
                              <CreateIcon />
                            </IconButton>
                          )}

                          <IconButton
                            size="small"
                            data-testid="edit-icon-button"
                            style={{
                              backgroundColor: "#fff",
                              width: "unset",
                            }}
                          >
                            <NextLink href={""} passHref>
                              <DeleteIcon />
                            </NextLink>
                          </IconButton>
                          <IconButton
                            size="small"
                            data-testid={`button-share-icon_${k}`}
                            style={{
                              backgroundColor: "#fff",
                              width: "unset",
                            }}
                            onClick={() => safetyPlanList.onPressSharePlan(v)}
                          >
                            <ShareIcon />
                          </IconButton>
                        </Box>
                      </>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography mt={3} mb={5}>
                        <Stack spacing={2} direction="row">
                          <Button
                            // className={`text-white ${
                            //   feedbackType == "session" ? "bg-themegreen" : ""
                            // }`}
                            // onClick={() => {
                            //   setLoader(true);
                            //   setFeedbackType("session");
                            //   setSessionNo(p);
                            // }}
                            variant="contained"
                            sx={{ textTransform: "none" }}
                            data-testid={
                              panelName + "bh-content-session-button"
                            }
                          >
                            Session Feedback
                          </Button>
                          <Button
                            // className={`text-white ${
                            //   feedbackType == "quality" ? "bg-themegreen" : ""
                            // }`}
                            // onClick={() => {
                            //   setLoader(true);
                            //   setFeedbackType("quality");
                            //   setSessionNo(p);
                            // }}
                            variant="contained"
                            sx={{ textTransform: "none" }}
                            data-testid={
                              panelName + "bh-content-quality-button"
                            }
                          >
                            Quality Feedback
                          </Button>
                        </Stack>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </>
              );
            }
          )}
      </Box>
    </>
  );
};
export default TherapistSafetyPlanList;
