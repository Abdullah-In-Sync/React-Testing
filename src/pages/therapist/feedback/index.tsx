import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLazyQuery } from "@apollo/client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { GET_PATIENTSESSION_DATA } from "../../../graphql/query/patient";
import { GET_THERAPISTFEEDBACKLIST_DATA } from "../../../graphql/query";
import QuestionTypeRadiobox from "../../../components/therapist/feedback/questionTypeRadiobox";
import QuestionTypeText from "../../../components/therapist/feedback/questionTypeText";
import Loader from "../../../components/common/Loader";

const TherapyPatientFeedback: any = (props) => {
  const [loader, setLoader] = useState<boolean>(false);
  const [sessionPanelExpanded, setSessionPanelExpanded] = useState<
    string | false
  >(false);
  const [feedbackType, setFeedbackType] = useState<string>("");
  const [sessionNo, setSessionNo] = useState(0);
  const [patientData, setPatientData] = useState<{
    patient_id: string;
    patient_name: string;
  }>({ patient_id: "", patient_name: "" });

  // Session Queries
  const [
    getPatientSessionData,
    { loading: sessionLoading, data: patientSessionData },
  ] = useLazyQuery(GET_PATIENTSESSION_DATA, {
    onCompleted: (data) => {
      /* istanbul ignore else */
      if (data!.getPatientSessionList) {
        setFeedbackType("session");
        setSessionNo(1);
      }
    },
  });

  // FeedbackList Queries
  const [
    getTherapistFeedbackListData,
    { loading: feedbackLoading, data: therapistFeedbackData },
  ] = useLazyQuery(GET_THERAPISTFEEDBACKLIST_DATA);

  const setDefaultStateExcludingLoader = () => {
    setFeedbackType("session");
    setSessionNo(1);
    setPatientData({
      patient_id: sessionStorage.getItem("patient_id"),
      patient_name: sessionStorage.getItem("patient_name"),
    });
    setSessionPanelExpanded(false);
  };

  useEffect(() => {
    setLoader(true);
    setDefaultStateExcludingLoader();
  }, []);

  // PatientSessionData
  useEffect(() => {
    /* istanbul ignore next */
    if (patientData.patient_id?.length > 0) {
      setLoader(true);
      getPatientSessionData({
        variables: {
          pttherapyId: props.setTherapy,
          patientId: patientData.patient_id,
        },
      });
    }
  }, [props.setTherapy, patientData.patient_id]);

  // TherapistFeedbackListData
  useEffect(() => {
    /* istanbul ignore next */
    if (patientData.patient_id.length > 0) {
      setLoader(true);
      getTherapistFeedbackListData({
        variables: {
          patientId: patientData.patient_id,
          sessionNo: sessionNo,
          feedbackType: feedbackType,
          pttherapyId: props.setTherapy,
        },
      });
    }
  }, [sessionNo, feedbackType]);

  useEffect(() => {
    /* istanbul ignore next */
    if (
      !feedbackLoading &&
      !sessionLoading &&
      patientData &&
      sessionNo &&
      feedbackType &&
      patientSessionData &&
      therapistFeedbackData
    ) {
      /* istanbul ignore next */
      setLoader(false);
    }
  }, [
    patientData,
    sessionNo,
    feedbackType,
    patientSessionData,
    therapistFeedbackData,
  ]);

  const handleSessionPanelChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setSessionPanelExpanded(
        /* istanbul ignore else */ isExpanded ? panel : false
      );
    };

  return (
    <>
      <Loader visible={loader} />
      <Box>
        <Typography
          variant="h4"
          mt={4}
          mb={2}
          sx={{ fontWeight: "bold" }}
          className="text-blue"
        >
          Feedback
        </Typography>
        {patientSessionData?.getPatientSessionList.length > 0 ? (
          <Box>
            {patientSessionData &&
              patientSessionData.getPatientSessionList &&
              patientSessionData.getPatientSessionList.map((v, k) => {
                const p = k + 1;
                const panelName = "panel" + p;
                return (
                  <Accordion
                    sx={{ marginTop: "4px", borderRadius: "4px" }}
                    style={{ borderRadius: "14px" }}
                    expanded={sessionPanelExpanded === panelName}
                    onChange={handleSessionPanelChange(panelName)}
                    onClick={() => setSessionNo(p)}
                    key={v._id}
                    data-testid="SessionPanelItem"
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon className="text-white" />}
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
                        Session {p}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography mt={3} mb={5}>
                        <Stack spacing={2} direction="row">
                          <Button
                            className={`text-white ${
                              feedbackType == "session" ? "bg-themegreen" : ""
                            }`}
                            onClick={() => {
                              setLoader(true);
                              setFeedbackType("session");
                              setSessionNo(p);
                            }}
                            variant="contained"
                            sx={{ textTransform: "none" }}
                            data-testid={
                              panelName + "bh-content-session-button"
                            }
                          >
                            Session Feedback
                          </Button>
                          <Button
                            className={`text-white ${
                              feedbackType == "quality" ? "bg-themegreen" : ""
                            }`}
                            onClick={() => {
                              setLoader(true);
                              setFeedbackType("quality");
                              setSessionNo(p);
                            }}
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
                      {therapistFeedbackData &&
                        therapistFeedbackData.getTherapistFeedbackList &&
                        therapistFeedbackData.getTherapistFeedbackList.map(
                          (fv, fk) => {
                            /* istanbul ignore next */
                            return (
                              <>
                                {fv?.answer_type != "undefined" &&
                                  fv?.answer_type == "list" && (
                                    <QuestionTypeRadiobox
                                      disable={true}
                                      fv={fv}
                                      fk={fk}
                                    />
                                  )}
                                {fv?.answer_type != "undefined" &&
                                  fv?.answer_type == "text" && (
                                    <QuestionTypeText disable={true} fv={fv} />
                                  )}
                              </>
                            );
                          }
                        )}
                    </AccordionDetails>
                  </Accordion>
                );
              })}
          </Box>
        ) : (
          <Box>
            <Typography variant="h6" textAlign={"center"}>
              No data found.
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default TherapyPatientFeedback;
