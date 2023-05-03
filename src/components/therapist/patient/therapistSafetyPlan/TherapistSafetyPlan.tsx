import AddIcon from "@mui/icons-material/Add";
import React from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import { useStyles } from "./viewResponse/viewResponseStyles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
} from "@mui/material";

import ViewResponse from "./viewResponse/ViewResponse";

const TherapistSafetyPlanList = (safetyPlanList) => {
  const styles = useStyles();
  const { accordionOpen, handleAddIconButton } = safetyPlanList || {};
  const isEditable = (v) => {
    const { plan_owner, plan_type } = v;
    if (plan_type !== "fixed" || plan_owner === "therapist") return true;
    else return false;
  };
  // const handleAddIconButton = async (index, id) => {
  //   if (index !== accordionOpen) {
  //     await safetyPlanList.fetchPlanData(id);
  //     setAccordionOpen(index);
  //   } else {
  //     /* istanbul ignore next */
  //     setAccordionOpen(undefined);
  //   }
  // };
  return (
    <>
      <Box
        style={{ paddingBottom: "20px" }}
        className={styles.safetyPlanListWrapper}
      >
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
                    expanded={accordionOpen === k}
                    data-testid="SessionPanelItem"
                  >
                    <AccordionSummary
                      expandIcon={
                        <Box>
                          <AddIcon
                            data-testid={`button-add-icon_${k}`}
                            onClick={() => handleAddIconButton(k, v._id)}
                            className="text-white"
                          />
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
                          sx={{ width: "90%", flexShrink: 1 }}
                        >
                          {v.name}
                        </Typography>
                      </>
                      <>
                        <Box
                          sx={{
                            justifyContent: "flex-end",
                            flexShrink: 1,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "0px",
                          }}
                          className="icon-container"
                        >
                          {checkIsEditable && (
                            <IconButton
                              size="small"
                              data-testid={`button-edit-icon_${k}`}
                              style={{
                                backgroundColor: "#fff",
                                width: "unset",
                                marginRight: "10px",
                              }}
                              onClick={(e) =>
                                safetyPlanList.onPressEditPlan(e, v)
                              }
                            >
                              <CreateIcon style={{ fontSize: "15px" }} />
                            </IconButton>
                          )}

                          <IconButton
                            size="small"
                            data-testid={`button-delete-icon_${k}`}
                            style={{
                              backgroundColor: "#fff",
                              width: "unset",
                              marginRight: "10px",
                            }}
                            onClick={() => safetyPlanList.onPressDeletePlan(v)}
                          >
                            <DeleteIcon style={{ fontSize: "15px" }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            className={`${v.share_status ? "active" : ""}`}
                            data-testid={`button-share-icon_${k}`}
                            style={{
                              backgroundColor: "#fff",
                              width: "unset",
                              marginRight: "10px",
                            }}
                            onClick={() => safetyPlanList.onPressSharePlan(v)}
                          >
                            <ShareIcon style={{ fontSize: "15px" }} />
                          </IconButton>
                        </Box>
                      </>
                    </AccordionSummary>
                    {accordionOpen === k && (
                      <AccordionDetails>
                        <ViewResponse
                          isEditable={checkIsEditable}
                          submitQustionForm={safetyPlanList.submitQustionForm}
                          safetyPlan={{
                            ...v,
                            ...{ questions: safetyPlanList.planData },
                          }}
                          handleDeleteQuestion={
                            safetyPlanList.handleDeleteQuestion
                          }
                          onPressCancel={() => handleAddIconButton(k, v._id)}
                        />
                      </AccordionDetails>
                    )}
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
