import React from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";

const TherapistSafetyPlanList = (safetyPlanList) => {
  return (
    <>
      <Box>
        {safetyPlanList &&
          safetyPlanList?.safetyPlanList?.getSafetyPlanListByPatientId &&
          safetyPlanList?.safetyPlanList?.getSafetyPlanListByPatientId.map(
            (v, k) => {
              console.log("Koca: value ", v);
              const p = k + 1;
              const panelName = "panel" + p;
              return (
                <Accordion
                  sx={{ marginTop: "4px", borderRadius: "4px" }}
                  style={{ borderRadius: "14px" }}
                  // expanded={sessionPanelExpanded === panelName}
                  // onChange={handleSessionPanelChange(panelName)}
                  // onClick={() => setSessionNo(p)}
                  // key={v._id}
                  data-testid="SessionPanelItem"
                >
                  <AccordionSummary
                    expandIcon={
                      <Box>
                        <AddIcon className="text-white" />
                        {/* <IconButton size="small">
                          <DeleteIcon data-testid="deleteIcon" />
                        </IconButton> */}
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
                    <Typography
                      className="text-white"
                      sx={{ width: "33%", flexShrink: 0 }}
                    >
                      {v.name}
                    </Typography>
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
                          data-testid={panelName + "bh-content-session-button"}
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
                          data-testid={panelName + "bh-content-quality-button"}
                        >
                          Quality Feedback
                        </Button>
                      </Stack>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            }
          )}
      </Box>
    </>
  );
};
export default TherapistSafetyPlanList;
