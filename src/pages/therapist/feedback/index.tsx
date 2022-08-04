import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Layout from "../../../components/layout";
import Loader from "../../../components/common/Loader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import { useLazyQuery } from "@apollo/client";
import { GET_PATIENTTHERAPY_DATA } from "../../../graphql/query/common";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { GET_PATIENTSESSION_DATA } from "../../../graphql/query/patient";
import { GET_THERAPISTFEEDBACKLIST_DATA } from "../../../graphql/query";
import QuestionTypeRadiobox from "./QuestionTypeRadiobox";
import QuestionTypeText from "./QuestionTypeText";

const Feedback: NextPage = () => {
  const [therapy, setTherapy] = useState<string>("");
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

  const [
    getPatientTherapyData,
    { loading: therapyLoading, data: patientTherapryData },
  ] = useLazyQuery(GET_PATIENTTHERAPY_DATA, {
    onCompleted: (data) => {
      /* istanbul ignore else */
      if (data!.getPatientTherapy) {
        const pttherapyId = data!.getPatientTherapy[0]._id;
        /* istanbul ignore else */
        if (pttherapyId) {
          setTherapy(pttherapyId);
        }
      }
    },
  });

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

  const [
    getTherapistFeedbackListData,
    { loading: feedbackLoading, data: therapistFeedbackData },
  ] = useLazyQuery(GET_THERAPISTFEEDBACKLIST_DATA);

  const setDefaultStateExcludingLoader = () => {
    setFeedbackType(null);
    setSessionNo(null);
    setPatientData({
      patient_id: localStorage.getItem("patient_id"),
      patient_name: localStorage.getItem("patient_name"),
    });
    setSessionPanelExpanded(false);
  };

  useEffect(() => {
    setLoader(true);
    setDefaultStateExcludingLoader();
  }, []);

  useEffect(() => {
    if (patientData.patient_id.length > 0) {
      setLoader(true);
      getPatientTherapyData({
        variables: { patientId: patientData.patient_id },
      });
    }
  }, [patientData]);

  useEffect(() => {
    setLoader(true);
    getPatientSessionData({
      variables: { pttherapyId: therapy, patientId: patientData.patient_id },
    });
  }, [therapy]);

  useEffect(() => {
    if (patientData.patient_id.length > 0) {
      setLoader(true);
      getTherapistFeedbackListData({
        variables: {
          patientId: patientData.patient_id,
          sessionNo: sessionNo,
          feedbackType: feedbackType,
        },
      });
    }
  }, [sessionNo, feedbackType]);

  useEffect(() => {
    /* istanbul ignore else */
    if (
      !therapyLoading &&
      !feedbackLoading &&
      !sessionLoading &&
      patientData &&
      therapy &&
      sessionNo &&
      feedbackType &&
      patientTherapryData &&
      patientSessionData &&
      therapistFeedbackData
    ) {
      setLoader(false);
    }
  }, [
    patientData,
    therapy,
    sessionNo,
    feedbackType,
    patientTherapryData,
    patientSessionData,
    therapistFeedbackData,
  ]);

  const onTherapyChange = (event: SelectChangeEvent) => {
    setLoader(true);
    setDefaultStateExcludingLoader();
    setTherapy(event.target.value);
  };

  const handleSessionPanelChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setSessionPanelExpanded(
        /* istanbul ignore else */ isExpanded ? panel : false
      );
    };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <Box
          sx={{ flexGrow: 1 }}
          p={5}
          borderRadius="7px"
          className="bg-themegreen"
        >
          <Grid container spacing={2}>
            <Grid item xs={2} sx={{ textAlign: "center" }}>
              <Image
                alt="Therapist"
                src="/v2/images/user.png"
                width="100"
                height="100"
                style={{ borderRadius: "50%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4" className="text-white tit">
                {patientData.patient_name}
              </Typography>
              {/* <Box className='text-white'>Risk of Suicide</Box> */}
            </Grid>
            <Grid item xs={4}>
              <FormControl sx={{ mt: 3, minWidth: 120 }} size="small">
                <InputLabel id="lblSelectTherapy" style={{ color: "#fff" }}>
                  Select Therapy
                </InputLabel>
                <Select
                  labelId="lblSelectTherapy"
                  id="selectTherapy"
                  inputProps={{ "data-testid": "selectTherapy" }}
                  value={therapy}
                  autoWidth
                  label="Select Therapy"
                  onChange={onTherapyChange}
                  sx={{
                    ".MuiSelect-icon": {
                      color: "white",
                    },
                    ".MuiSelect-outlined": {
                      color: "white",
                    },
                  }}
                >
                  {patientTherapryData &&
                    patientTherapryData.getPatientTherapy &&
                    patientTherapryData.getPatientTherapy.map((v: any) => {
                      return (
                        <MenuItem key={"therapy" + v._id} value={v._id}>
                          {v.therapy_detail.therapy_name}/
                          {v.disorder_detail.disorder_name}/
                          {v.model_detail.model_name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
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
          {patientSessionData &&
            patientSessionData.getPatientSessionList &&
            patientSessionData.getPatientSessionList.map((v, k) => {
              const p = k + 1;
              const panelName = "panel" + p;
              return (
                <Accordion
                  sx={{ marginTop: "4px", borderRadius: "4px" }}
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
                          data-testid={panelName + "bh-content-session-button"}
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
                          data-testid={panelName + "bh-content-quality-button"}
                        >
                          Quality Feedback
                        </Button>
                      </Stack>
                    </Typography>
                    {therapistFeedbackData &&
                      therapistFeedbackData.getTherapistFeedbackList &&
                      therapistFeedbackData.getTherapistFeedbackList.map(
                        (fv, fk) => {
                          return (
                            <>
                              {fv.answer_type == "list" && (
                                <QuestionTypeRadiobox
                                  disable={true}
                                  fv={fv}
                                  fk={fk}
                                />
                              )}
                              {fv.answer_type == "text" && (
                                <QuestionTypeText
                                  disable={true}
                                  fv={fv}
                                  fk={fk}
                                />
                              )}
                            </>
                          );
                        }
                      )}
                    {therapistFeedbackData &&
                      therapistFeedbackData.getTherapistFeedbackList &&
                      therapistFeedbackData.getTherapistFeedbackList.length ==
                        0 && (
                        <Typography
                          gutterBottom
                          component="div"
                          data-testid="no-data-found-therapist-feedback-list"
                        >
                          No Data Found
                        </Typography>
                      )}
                  </AccordionDetails>
                </Accordion>
              );
            })}
        </Box>
      </Layout>
    </>
  );
};

export default Feedback;
