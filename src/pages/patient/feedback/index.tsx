import { useState, useEffect, forwardRef } from "react";
import type { NextPage } from "next";
// GRAPHQL
import { useMutation, useLazyQuery } from "@apollo/client";
import {
  GET_PATIENTTHERAPY_DATA,
  GET_PATIENTFEEDBACKLIST_DATA,
} from "../../../graphql/query/common";
import { GET_PATIENTSESSION_DATA } from "../../../graphql/query/patient";
import { POST_PATIENT_FEEDBACK } from "../../../graphql/mutation";

// MUI COMPONENTS
import Box from "@mui/material/Box";
import Layout from "../../../components/layout";
import Loader from "../../../components/common/Loader";
import ContentHeader from "../../../components/common/ContentHeader";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  InputLabel,
  Radio,
  FormControlLabel,
  RadioGroup,
  TextareaAutosize,
  Snackbar,
} from "@mui/material";
import { buildPatientTokenValidationQuery } from "../../../lib/helpers/auth";

const Feedback: NextPage = () => {
  const [therapy, setTherapy] = useState<string>("");
  const [feedbackType, setFeedbackType] = useState<string>("session");
  const [formValues, setFormValues] = useState([]);
  const [sessionNo, setSessionNo] = useState(1);
  const [loader, setLoader] = useState<boolean>(false);
  const [sessionPanelExpanded, setSessionPanelExpanded] = useState<
    string | false
  >(false);
  const [open, setOpen] = useState<boolean>(false);
  const [erroropen, setErrorOpen] = useState<boolean>(false);
  const [btndiabled, setBtndiabled] = useState<boolean>(false);
  const [therapistId, settherapistId] = useState<string>("");

  const [gettokenData, tokenLoading] = buildPatientTokenValidationQuery(
    (therapistId) => {
      settherapistId(therapistId);
    }
  );

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
    getPatientFeedbackListData,
    { loading: feedbackLoading, data: patientFeedbackData },
  ] = useLazyQuery(GET_PATIENTFEEDBACKLIST_DATA);

  const setDefaultStateExcludingLoader = () => {
    setFeedbackType(null);
    setSessionNo(null);
    setSessionPanelExpanded(false);
  };

  useEffect(() => {
    setLoader(true);
    setDefaultStateExcludingLoader();
    gettokenData({ variables: {} });
  }, []);

  useEffect(() => {
    setLoader(true);
    getPatientTherapyData({ variables: {} });
  }, [therapistId]);

  useEffect(() => {
    setLoader(true);
    getPatientSessionData({
      variables: { pttherapyId: therapy },
    });
  }, [therapy]);

  useEffect(() => {
    setLoader(true);
    getPatientFeedbackListData({
      variables: {
        sessionNo: sessionNo,
        feedbackType: feedbackType,
      },
    });
  }, [sessionNo, feedbackType]);

  useEffect(() => {
    /* istanbul ignore else */
    if (
      !tokenLoading &&
      !therapyLoading &&
      !feedbackLoading &&
      !sessionLoading &&
      therapistId &&
      therapy &&
      sessionNo &&
      feedbackType &&
      patientTherapryData &&
      patientSessionData &&
      patientFeedbackData
    ) {
      setLoader(false);
    }
  }, [
    therapy,
    sessionNo,
    feedbackType,
    patientTherapryData,
    patientSessionData,
    patientFeedbackData,
  ]);

  /* istanbul ignore next */
  const onTherapyChange = (event: SelectChangeEvent) => {
    /* istanbul ignore else */
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

  const handleInputChange = (i, e) => {
    let val = e.target.name;
    /* istanbul ignore next */
    if (e.target.id && e.target.id != "undefined") {
      val = e.target.id;
    }

    const p = val.split("_");
    if (p[0]) {
      setFormValues([
        ...formValues,
        {
          therapist_id: therapistId,
          session_no: sessionNo,
          question_id: p[1],
          answer: e.target.value,
        },
      ]);
    }
  };
  const [postPatientFeedback] = useMutation(POST_PATIENT_FEEDBACK);
  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleAdd = (event) => {
    event.preventDefault();
    if (formValues.length == 0) {
      setErrorOpen(true);
    } else {
      setBtndiabled(true);
      postPatientFeedback({
        variables: {
          feedQuesAnsData: JSON.stringify(formValues),
          sessionNo: sessionNo,
          feedbackType: feedbackType,
        },
      });
      setOpen(true);
    }
  };

  /* istanbul ignore next */
  const handleClose = () => {
    window.location.reload();
    setOpen(false);
  };
  /* istanbul ignore next */
  const handleCloseError = () => {
    setErrorOpen(false);
  };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Feedback" />
        <Box style={{ textAlign: "right" }}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="lblSelectTherapy">Select Therapy</InputLabel>
            <Select
              labelId="lblSelectTherapy"
              id="selectTherapy"
              inputProps={{ "data-testid": "selectTherapy" }}
              value={therapy}
              autoWidth
              label="Select Therapy"
              onChange={onTherapyChange}
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
        </Box>
        <Box>
          <Snackbar
            key="1"
            open={open}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Feedback submitted successfully
            </Alert>
          </Snackbar>
          <Snackbar
            key="2"
            open={erroropen}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            autoHideDuration={6000}
            onClose={handleCloseError}
          >
            <Alert
              onClose={handleCloseError}
              severity="error"
              sx={{ width: "100%" }}
            >
              Field can not be left blank
            </Alert>
          </Snackbar>
          {patientSessionData?.getPatientSessionList != null &&
            patientSessionData?.getPatientSessionList.map((v, k) => {
              const p = k + 1;
              const panelName = "panel" + p;
              return (
                <form
                  key={p}
                  onSubmit={(values) => {
                    handleAdd(values);
                  }}
                  data-testid="feedbackForm"
                >
                  <Accordion
                    sx={{ marginTop: "4px", borderRadius: "4px" }}
                    expanded={sessionPanelExpanded === panelName}
                    onChange={handleSessionPanelChange(panelName)}
                    onClick={() => setSessionNo(p)}
                    key={v._id}
                    data-testid="SessionPanelItem"
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
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
                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        Session {p}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ marginBottom: "40px" }}>
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
                      {patientFeedbackData?.getPatientFeedbackList != null &&
                        patientFeedbackData?.getPatientFeedbackList.map(
                          (fv, fk) => {
                            return (
                              <Typography
                                key={fk + ""}
                                gutterBottom
                                component="div"
                              >
                                {fv.answer_type == "list" && (
                                  <Typography
                                    sx={{
                                      backgroundColor: "#dadada52 !important",
                                      border: "1px solid #dadada52 !important",
                                      color: "#3f4040b0 !important",
                                      fontSize: "15px",
                                      paddingLeft: "5px",
                                      fontWeight: "1px !important",
                                    }}
                                  >
                                    {fk + 1}. {fv.question}
                                  </Typography>
                                )}
                                {fv.answer_type == "text" && (
                                  <Typography
                                    sx={{
                                      color: "#6EC9DB !important",
                                      fontSize: "15px",
                                      paddingLeft: "5px",
                                      fontWeight: "700 !important",
                                    }}
                                  >
                                    {fv.question}
                                  </Typography>
                                )}

                                <Typography>
                                  <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    defaultValue={
                                      fv.feedback_ans && fv.feedback_ans.answer
                                        ? fv.feedback_ans.answer
                                        : ""
                                    }
                                  >
                                    {fv.answer_type == "list" &&
                                      fv.answer_options &&
                                      fv.answer_options.map((av, ak) => {
                                        const j = ak + 1;
                                        return (
                                          <FormControlLabel
                                            key={j}
                                            disabled={
                                              fv.feedback_ans &&
                                              fv.feedback_ans.answer
                                                ? true
                                                : false
                                            }
                                            sx={{
                                              fontSize: "15px",
                                              color: "#3f4040b0 !important",
                                            }}
                                            name={"question_" + fv._id}
                                            onChange={(e) =>
                                              handleInputChange(fk, e)
                                            }
                                            value={av}
                                            control={<Radio size="small" />}
                                            label={av}
                                          />
                                        );
                                      })}

                                    {fv.answer_type == "text" && (
                                      <TextareaAutosize
                                        aria-label="empty textarea"
                                        id={fv.answer_type + "_" + fv._id}
                                        onBlur={(e) => handleInputChange(fk, e)}
                                        value={
                                          fv.feedback_ans &&
                                          fv.feedback_ans.answer
                                            ? fv.feedback_ans.answer
                                            : ""
                                        }
                                        style={{
                                          width: 855.5,
                                          height: 216,
                                          left: 454.32,
                                          top: 1044,
                                          backgroundColor: "#C4C4C4",
                                          borderRadius: "12px",
                                          border: "none",
                                        }}
                                      />
                                    )}
                                  </RadioGroup>
                                </Typography>
                              </Typography>
                            );
                          }
                        )}
                      {patientFeedbackData?.getPatientFeedbackList != null &&
                        patientFeedbackData?.getPatientFeedbackList.length !=
                          0 && (
                          <Typography sx={{ textAlign: "center" }}>
                            <Button
                              type="submit"
                              disabled={btndiabled == true ? true : false}
                              variant="contained"
                              data-testid="submitFeedback"
                            >
                              Submit
                            </Button>
                          </Typography>
                        )}
                      {patientFeedbackData?.getPatientFeedbackList == null ||
                        (patientFeedbackData?.getPatientFeedbackList.length ==
                          0 && (
                          <Typography
                            gutterBottom
                            component="div"
                            data-testid="no-data-found-patient-feedback-list"
                          >
                            No Data Found
                          </Typography>
                        ))}
                    </AccordionDetails>
                  </Accordion>
                </form>
              );
            })}
        </Box>
      </Layout>
    </>
  );
};

export default Feedback;
