import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import NextLink from "next/link";

import ViewResponse from "./viewResponse/ViewResponse";

const TherapistSafetyPlanList = (safetyPlanList) => {
  const [accordionOpen, setAccordionOpen] = useState();
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
                    expanded={accordionOpen === k}
                    data-testid="SessionPanelItem"
                  >
                    <AccordionSummary
                      expandIcon={
                        <Box>
                          <AddIcon
                            data-testid={`button-add-icon_${k}`}
                            onClick={async () => {
                              if (k !== accordionOpen) {
                                await safetyPlanList.fetchPlanData(v._id);
                                setAccordionOpen(k);
                              } else {
                                setAccordionOpen(undefined);
                              }
                            }}
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
                          onPressCancel={() => setAccordionOpen(undefined)}
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
