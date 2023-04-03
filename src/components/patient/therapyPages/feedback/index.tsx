import { useState, useEffect, forwardRef } from "react";
import type { NextPage } from "next";
// GRAPHQL
import { useMutation, useLazyQuery } from "@apollo/client";
import {
  GET_PATIENTTHERAPY_DATA,
  GET_PATIENT_FEEDBACKLIST_DATA_NEW,
} from "../../../../graphql/query/common";
import { GET_PATIENTSESSION_DATA } from "../../../../graphql/query/patient";
import { POST_PATIENT_FEEDBACK_NEW } from "../../../../graphql/mutation";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  CircularProgress,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  InputLabel,
  Radio,
  FormControlLabel,
  RadioGroup,
  Snackbar,
  Grid,
} from "@mui/material";

// MUI COMPONENTS
import Loader from "../../../common/Loader";
import ContentHeader from "../../../common/ContentHeader";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useSnackbar } from "notistack";

import withAuthentication from "../../../../hoc/auth";
import { useAppContext } from "../../../../contexts/AuthContext";
import TextFieldComponent from "../../../common/TextField/TextFieldComponent";
import { SuccessModal } from "../../../common/SuccessModal";
import SureModal from "../../../admin/resource/SureModal";
import ConfirmationModal from "../../../common/ConfirmationModal";

const Feedback: NextPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmSubmission, setConfirmSubmission] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [therapy, setTherapy] = useState<string>("");
  const [feedbackType, setFeedbackType] = useState<string>(null);
  const [formValues, setFormValues] = useState<any>([]);
  const [sessionNo, setSessionNo] = useState(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [sessionPanelExpanded, setSessionPanelExpanded] = useState<
    string | false
  >(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [erroropen, setErrorOpen] = useState<boolean>(false);
  /* istanbul ignore next */
  const { user: { patient_data: { therapist_id: therapistId } } = {} } =
    useAppContext();
  const { enqueueSnackbar } = useSnackbar();

  const [
    getPatientTherapyData,
    { loading: therapyLoading, data: patientTherapryData },
  ] = useLazyQuery(GET_PATIENTTHERAPY_DATA, {
    onCompleted: (data) => {
      /* istanbul ignore next */

      if (data!.getPatientTherapy) {
        /* istanbul ignore next */
        const pttherapyId = data!.getPatientTherapy[0]?._id;
        /* istanbul ignore next */
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
      if (data!.getPatientSessionList) {
        setFeedbackType("session");
        setSessionNo("1");
      }
    },
    onError: (error) => {
      console.log(error, "error");
    },
  });

  const [
    getPatientFeedbackListDataNew,
    { loading, data: patientNewFeedbackData },
  ] = useLazyQuery(GET_PATIENT_FEEDBACKLIST_DATA_NEW, {
    onCompleted: (data) => {
      console.log("list: data ", JSON.stringify(data));
    },
  });

  const setDefaultStateExcludingLoader = () => {
    /* istanbul ignore next */
    setFeedbackType(null);
    /* istanbul ignore next */
    setSessionNo(null);
    /* istanbul ignore next */
    setSessionPanelExpanded(false);
  };

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
    getPatientFeedbackListDataNew({
      variables: {
        session: sessionNo,
        pttherapyId: therapy,
      },
    });
  }, [sessionNo]);

  useEffect(() => {
    if (
      !therapyLoading &&
      !sessionLoading &&
      therapistId &&
      therapy &&
      sessionNo &&
      feedbackType &&
      patientTherapryData &&
      patientSessionData
    ) {
      setLoader(false);
    }
  }, [
    therapy,
    sessionNo,
    feedbackType,
    patientTherapryData,
    patientSessionData,
  ]);

  /* istanbul ignore next */
  const onTherapyChange = (event: SelectChangeEvent) => {
    setLoader(true);
    setDefaultStateExcludingLoader();
    setTherapy(event.target.value);
  };

  /* istanbul ignore next */
  const handleSessionPanelChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setSessionPanelExpanded(isExpanded ? panel : false);
    };

  /* istanbul ignore next */
  const handleOptionChange = (e) => {
    const val = e.target.name;
    /* istanbul ignore next */
    const p = val.split("_");
    /* istanbul ignore next */
    if (p[0]) {
      setFormValues([
        ...formValues,
        {
          therapist_id: therapistId,
          session_no: sessionNo,
          questionId: p[1],
          answer: e.target.value,
        },
      ]);
    }
  };

  const handleTextChange = (questionId: any, newAnswer: any) => {
    const tempSubmitData = [...formValues]; // create a copy of formValues array
    const existingIndex = tempSubmitData.findIndex(
      /* istanbul ignore next */
      (item) => item.questionId === questionId
    );
    /* istanbul ignore next */
    if (existingIndex > -1) {
      // if the questionId already exists in formValues array
      tempSubmitData[existingIndex].answer = newAnswer;
    } else {
      // if the questionId does not exist in formValues array
      tempSubmitData.push({
        therapist_id: therapistId,
        session_no: sessionNo,
        questionId: questionId,
        answer: newAnswer,
      });
    }

    setFormValues(tempSubmitData);
  };

  const [postPatientFeedbackNew] = useMutation(POST_PATIENT_FEEDBACK_NEW);

  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    /* istanbul ignore next */
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleAdd = (event) => {
    event.preventDefault();

    postPatientFeedbackNew({
      variables: {
        feedQuesAnsData: JSON.stringify(formValues),
        session: sessionNo,
        pttherapyId: therapy,
      },
      onCompleted: () => {
        /* istanbul ignore next */
        setSuccessModal(true);
        // window.location.reload();
      },
    });
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

  /* istanbul ignore next */
  const questionnaireList =
    patientNewFeedbackData?.patientGetFeedbackList?.length > 0
      ? patientNewFeedbackData?.patientGetFeedbackList[0]?.questions
      : [];

  const handleOk = () => {
    /* istanbul ignore next */
    setSuccessModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* istanbul ignore next */
    if (formValues.length === 0) {
      enqueueSnackbar("Field can not be left blank", {
        variant: "error",
      });
    } else if (questionnaireList.length === formValues.length) {
      setModalOpen(true);
    } else {
      enqueueSnackbar("Please attempt all questions", {
        variant: "error",
      });
    }
    /* istanbul ignore next */
    if (!confirmSubmission) return;
  };

  const cancelConfirm = () => {
    /* istanbul ignore next */
    setFormValues([]);
    /* istanbul ignore next */
    setIsConfirm(false);
    /* istanbul ignore next */
    enqueueSnackbar("Feedback cancel successfully", {
      variant: "success",
    });
  };

  const clearIsConfirmCancel = () => {
    /* istanbul ignore next */
    setIsConfirm(false);
  };

  const cancleFunction = () => {
    /* istanbul ignore next */
    if (formValues.length) {
      setIsConfirm(true);
    }
  };
  return (
    <>
      <Loader visible={loader} />
      <ContentHeader title="Feedback" />
      <Box style={{ textAlign: "right" }} data-testid="123456">
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
      </Box>
      <Box>
        <Accordion
          sx={{ marginTop: "4px", borderRadius: "4px" }}
          style={{ borderRadius: "14px" }}
          expanded={sessionPanelExpanded === "before_therapy"}
          onChange={handleSessionPanelChange("before_therapy")}
          onClick={() => {
            /* istanbul ignore next */
            setSessionNo("before_therapy");
          }}
          data-testid="SessionPanelItem"
        >
          <AccordionSummary
            expandIcon={
              sessionPanelExpanded === "before_therapy" ? (
                <RemoveIcon className="text-white" />
              ) : (
                <AddIcon className="text-white" />
              )
            }
            style={{ minHeight: "0px", height: "45px" }}
            aria-controls={"before_therapy" + "bh-content"}
            id={"before_therapy" + "bh-header"}
            data-testid={"before_therapy" + "bh-header"}
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
              Before Therapy
            </Typography>
          </AccordionSummary>
          {loading ? (
            <Box
              height={"100px"}
              display="flex"
              justifyContent={"center"}
              alignItems="center"
            >
              <CircularProgress size={30} />
            </Box>
          ) : (
            <AccordionDetails>
              {!patientNewFeedbackData?.patientGetFeedbackList?.[0]
                ?.description &&
                !questionnaireList.length && <Box>Data Not Available</Box>}

              {patientNewFeedbackData?.patientGetFeedbackList?.[0]
                ?.description && (
                <>
                  <Box>
                    <Typography style={{ fontWeight: "bold" }}>
                      Instruction
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      flexGrow: 1,
                      border: "1px solid #cecece",
                      display: "grid",
                    }}
                    p={2}
                    marginBottom={"25px"}
                    borderRadius={"7px"}
                  >
                    <Grid>
                      <Typography>
                        {
                          patientNewFeedbackData?.patientGetFeedbackList[0]
                            ?.description
                        }
                      </Typography>
                    </Grid>
                  </Box>
                </>
              )}

              {questionnaireList?.map((fv, fk) => {
                /* istanbul ignore next */
                return (
                  <Typography
                    key={fk + ""}
                    gutterBottom
                    component="div"
                    style={{ marginBottom: "10px" }}
                  >
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

                    <Typography>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue={
                          fv?.answer?.answer ? fv.answer.answer : ""
                        }
                      >
                        {(fv.answer_type == "2" || fv.answer_type == "list") &&
                          fv.answer_options &&
                          fv.answer_options.split(",").map((av, ak) => {
                            /* istanbul ignore next */
                            const j = ak + 1;
                            /* istanbul ignore next */
                            return (
                              <FormControlLabel
                                key={j}
                                disabled={fv?.answer?.answer ? true : false}
                                sx={{
                                  fontSize: "15px",
                                  color: "#3f4040b0 !important",
                                  marginRight: "300px",
                                }}
                                name={"question_" + fv._id}
                                onChange={(e) =>
                                  /* istanbul ignore next */
                                  handleOptionChange(e)
                                }
                                value={av}
                                control={<Radio size="small" />}
                                label={av}
                              />
                            );
                          })}

                        {(fv.answer_type == "1" ||
                          fv.answer_type == "text") && (
                          <Grid
                            container
                            spacing={2}
                            marginBottom={0}
                            paddingTop={1}
                          >
                            <Grid item xs={12}>
                              <TextFieldComponent
                                name={fv.answer_type + "_" + fv._id}
                                id={fv.answer_type + "_" + fv._id}
                                value={
                                  fv?.answer?.answer
                                    ? fv.answer.answer
                                    : formValues.length
                                    ? formValues.answer
                                    : ""
                                }
                                multiline
                                rows={4}
                                onChange={(e) =>
                                  /* istanbul ignore next */
                                  handleTextChange(fv._id, e.target.value)
                                }
                                fullWidth={true}
                                className="form-control-bg"
                              />
                            </Grid>
                          </Grid>
                        )}
                      </RadioGroup>
                    </Typography>
                  </Typography>
                );
              })}
              {
                /* istanbul ignore next */
                questionnaireList?.length > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      p: 1,
                      m: 1,
                      bgcolor: "background.paper",
                      borderRadius: 1,
                    }}
                  >
                    <Grid item xs={6} style={{ paddingRight: "50px" }}>
                      <Button
                        type="submit"
                        style={{
                          backgroundColor: questionnaireList?.some(
                            (item) => item.answer !== null
                          )
                            ? "#a9a9a9a9"
                            : "#6EC9DB",
                          textTransform: "none",
                        }}
                        disabled={questionnaireList?.some(
                          (item) => item.answer !== null
                        )}
                        onClick={(e) => {
                          /* istanbul ignore next */
                          handleSubmit(e);
                        }}
                        variant="contained"
                        data-testid="submitFeedback1"
                      >
                        Submit
                      </Button>
                    </Grid>
                    <Grid item xs={6} textAlign="center">
                      <Button
                        data-testid="cancleFeedbackButton"
                        variant="contained"
                        style={{
                          backgroundColor: questionnaireList?.some(
                            (item) => item.answer !== null
                          )
                            ? "#a9a9a9a9"
                            : "#6BA08E",
                          textTransform: "none",
                        }}
                        disabled={questionnaireList?.some(
                          (item) => item.answer !== null
                        )}
                        onClick={
                          /* istanbul ignore next */
                          cancleFunction
                        }
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Box>
                )
              }
            </AccordionDetails>
          )}
        </Accordion>
      </Box>
      <Box>
        {patientSessionData?.getPatientSessionList != null &&
          /* istanbul ignore next */
          patientSessionData?.getPatientSessionList.map((v, k) => {
            /* istanbul ignore next */
            const p = k + 1;
            const panelName = "panel" + p;
            return (
              <form
                key={p}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
                data-testid="feedbackForm"
              >
                <Accordion
                  sx={{ marginTop: "4px", borderRadius: "4px" }}
                  style={{ borderRadius: "14px" }}
                  expanded={sessionPanelExpanded === panelName}
                  onChange={handleSessionPanelChange(panelName)}
                  onClick={() => {
                    setSessionNo(p);
                  }}
                  key={v._id}
                  data-testid="SessionPanelItem"
                >
                  <AccordionSummary
                    expandIcon={
                      sessionPanelExpanded === panelName ? (
                        <RemoveIcon className="text-white" />
                      ) : (
                        <AddIcon className="text-white" />
                      )
                    }
                    style={{ minHeight: "0px", height: "45px" }}
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
                  {loading ? (
                    <Box
                      height={"100px"}
                      display="flex"
                      justifyContent={"center"}
                      alignItems="center"
                    >
                      <CircularProgress size={30} />
                    </Box>
                  ) : (
                    <AccordionDetails>
                      {!patientNewFeedbackData?.patientGetFeedbackList?.[0]
                        ?.description &&
                        !questionnaireList.length && (
                          <Box>Data Not Available</Box>
                        )}

                      {patientNewFeedbackData?.patientGetFeedbackList?.[0]
                        ?.description && (
                        <>
                          <Box>
                            <Typography style={{ fontWeight: "bold" }}>
                              Instruction
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              flexGrow: 1,
                              border: "1px solid #cecece",
                              display: "grid",
                            }}
                            p={2}
                            marginBottom={"25px"}
                            borderRadius={"7px"}
                            data-testid="instruction"
                          >
                            <Grid>
                              <Typography>
                                {patientNewFeedbackData &&
                                  /* istanbul ignore next */
                                  patientNewFeedbackData
                                    ?.patientGetFeedbackList[0]?.description}
                              </Typography>
                            </Grid>
                          </Box>
                        </>
                      )}
                      {questionnaireList?.map((fv, fk) => {
                        /* istanbul ignore next */
                        return (
                          <Typography
                            key={fk + ""}
                            gutterBottom
                            component="div"
                            style={{ marginBottom: "10px" }}
                          >
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

                            <Typography>
                              <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                defaultValue={
                                  fv?.answer?.answer ? fv.answer.answer : ""
                                }
                              >
                                {fv.answer_type === "2" ||
                                fv.answer_type === "list" ? (
                                  <Grid container spacing={1}>
                                    {fv.answer_options
                                      .split(",")
                                      .map((av, ak) => (
                                        <Grid
                                          item
                                          xs={10}
                                          sm={5}
                                          md={av.length > 15 ? 6 : 2}
                                          key={ak}
                                        >
                                          <FormControlLabel
                                            disabled={!!fv.answer?.answer}
                                            sx={{
                                              fontSize: "15px",
                                              color: "#3f4040b0 !important",
                                            }}
                                            name={"question_" + fv._id}
                                            onChange={(e) =>
                                              handleOptionChange(e)
                                            }
                                            value={av}
                                            control={<Radio size="small" />}
                                            label={av}
                                          />
                                        </Grid>
                                      ))}
                                  </Grid>
                                ) : null}

                                {(fv.answer_type == "1" ||
                                  fv.answer_type == "text") && (
                                  <Grid
                                    container
                                    spacing={2}
                                    marginBottom={0}
                                    paddingTop={1}
                                  >
                                    <Grid item xs={12}>
                                      <TextFieldComponent
                                        required
                                        name={fv.answer_type + "_" + fv._id}
                                        id={fv.answer_type + "_" + fv._id}
                                        value={
                                          fv?.answer?.answer
                                            ? fv.answer.answer
                                            : formValues.length
                                            ? formValues.answer
                                            : ""
                                        }
                                        multiline
                                        rows={4}
                                        onChange={(e) =>
                                          /* istanbul ignore next */
                                          handleTextChange(
                                            fv._id,
                                            e.target.value
                                          )
                                        }
                                        inputProps={{
                                          "data-testid": "texBoxInput",
                                        }}
                                        fullWidth={true}
                                        className="form-control-bg"
                                      />
                                    </Grid>
                                  </Grid>
                                )}
                              </RadioGroup>
                            </Typography>
                          </Typography>
                        );
                      })}

                      {
                        /* istanbul ignore next */
                        questionnaireList?.length > 0 && (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              p: 1,
                              m: 1,
                              bgcolor: "background.paper",
                              borderRadius: 1,
                            }}
                          >
                            <Grid item xs={6} style={{ paddingRight: "50px" }}>
                              <Button
                                type="submit"
                                style={{
                                  backgroundColor: questionnaireList?.some(
                                    (item) => item.answer !== null
                                  )
                                    ? "#a9a9a9a9"
                                    : "#6EC9DB",
                                  textTransform: "none",
                                }}
                                disabled={questionnaireList?.some(
                                  (item) => item.answer !== null
                                )}
                                onClick={(e) => {
                                  /* istanbul ignore next */
                                  handleSubmit(e);
                                }}
                                variant="contained"
                                data-testid="submitFeedback1"
                              >
                                Submit
                              </Button>
                            </Grid>
                            <Grid item xs={6} textAlign="center">
                              <Button
                                data-testid="cancleFeedbackButton1"
                                variant="contained"
                                style={{
                                  backgroundColor: questionnaireList?.some(
                                    (item) => item.answer !== null
                                  )
                                    ? "#a9a9a9a9"
                                    : "#6BA08E",
                                  textTransform: "none",
                                }}
                                disabled={questionnaireList?.some(
                                  (item) => item.answer !== null
                                )}
                                onClick={
                                  /* istanbul ignore next */
                                  cancleFunction
                                }
                              >
                                Cancel
                              </Button>
                            </Grid>
                          </Box>
                        )
                      }
                    </AccordionDetails>
                  )}
                </Accordion>
              </form>
            );
          })}
      </Box>
      <Box>
        <Accordion
          sx={{ marginTop: "4px", borderRadius: "4px" }}
          style={{ borderRadius: "14px" }}
          expanded={sessionPanelExpanded === "after_therapy"}
          onChange={handleSessionPanelChange("after_therapy")}
          onClick={() => {
            /* istanbul ignore next */
            setSessionNo("after_therapy");
          }}
          data-testid="SessionPanelItem"
        >
          <AccordionSummary
            expandIcon={
              sessionPanelExpanded === "after_therapy" ? (
                <RemoveIcon className="text-white" />
              ) : (
                <AddIcon className="text-white" />
              )
            }
            style={{ minHeight: "0px", height: "45px" }}
            aria-controls={"after_therapy" + "bh-content"}
            id={"after_therapy" + "bh-header"}
            data-testid={"after_therapy" + "bh-header"}
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
              After Therapy
            </Typography>
          </AccordionSummary>
          {loading ? (
            <Box
              height={"100px"}
              display="flex"
              justifyContent={"center"}
              alignItems="center"
            >
              <CircularProgress size={30} />
            </Box>
          ) : (
            <AccordionDetails>
              {!patientNewFeedbackData?.patientGetFeedbackList?.[0]
                ?.description &&
                !questionnaireList.length && <Box>Data Not Available</Box>}

              {patientNewFeedbackData?.patientGetFeedbackList?.[0]
                ?.description && (
                <>
                  <Box>
                    <Typography style={{ fontWeight: "bold" }}>
                      Instruction
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      flexGrow: 1,
                      border: "1px solid #cecece",
                      display: "grid",
                    }}
                    p={2}
                    marginBottom={"25px"}
                    borderRadius={"7px"}
                  >
                    <Grid>
                      <Typography>
                        {
                          patientNewFeedbackData?.patientGetFeedbackList[0]
                            ?.description
                        }
                      </Typography>
                    </Grid>
                  </Box>
                </>
              )}
              {questionnaireList?.map((fv, fk) => {
                /* istanbul ignore next */
                return (
                  /* istanbul ignore next */
                  <Typography
                    key={fk + ""}
                    gutterBottom
                    component="div"
                    style={{ marginBottom: "10px" }}
                  >
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

                    <Typography>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue={
                          fv?.answer?.answer ? fv.answer.answer : ""
                        }
                      >
                        {(fv.answer_type == "2" || fv.answer_type == "list") &&
                          fv.answer_options &&
                          fv.answer_options.split(",").map((av, ak) => {
                            /* istanbul ignore next */
                            const j = ak + 1;
                            /* istanbul ignore next */
                            return (
                              <FormControlLabel
                                key={j}
                                disabled={fv?.answer?.answer ? true : false}
                                sx={{
                                  fontSize: "15px",
                                  color: "#3f4040b0 !important",
                                  marginRight: "300px",
                                }}
                                name={"question_" + fv._id}
                                onChange={(e) => handleOptionChange(e)}
                                value={av}
                                control={<Radio size="small" />}
                                label={av}
                              />
                            );
                          })}
                        {(fv.answer_type == "1" ||
                          fv.answer_type == "text") && (
                          <Grid
                            container
                            spacing={2}
                            marginBottom={0}
                            paddingTop={1}
                          >
                            <Grid item xs={12}>
                              <TextFieldComponent
                                name={fv.answer_type + "_" + fv._id}
                                id={fv.answer_type + "_" + fv._id}
                                value={
                                  fv?.answer?.answer
                                    ? fv.answer.answer
                                    : formValues.length
                                    ? formValues.answer
                                    : ""
                                }
                                multiline
                                rows={4}
                                onChange={(e) =>
                                  /* istanbul ignore next */
                                  handleTextChange(fv._id, e.target.value)
                                }
                                fullWidth={true}
                                className="form-control-bg"
                              />
                            </Grid>
                          </Grid>
                        )}
                      </RadioGroup>
                    </Typography>
                  </Typography>
                );
              })}
              {
                /* istanbul ignore next */
                questionnaireList?.length > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      p: 1,
                      m: 1,
                      bgcolor: "background.paper",
                      borderRadius: 1,
                    }}
                  >
                    <Grid item xs={6} style={{ paddingRight: "50px" }}>
                      <Button
                        type="submit"
                        style={{
                          backgroundColor: questionnaireList?.some(
                            (item) => item.answer !== null
                          )
                            ? "#a9a9a9a9"
                            : "#6EC9DB",
                          textTransform: "none",
                        }}
                        disabled={questionnaireList?.some(
                          (item) => item.answer !== null
                        )}
                        onClick={(e) => {
                          /* istanbul ignore next */
                          handleSubmit(e);
                        }}
                        variant="contained"
                        data-testid="submitFeedback1"
                      >
                        Submit
                      </Button>
                    </Grid>
                    <Grid item xs={6} textAlign="center">
                      <Button
                        data-testid="cancleFeedbackButton"
                        variant="contained"
                        style={{
                          backgroundColor: questionnaireList?.some(
                            (item) => item.answer !== null
                          )
                            ? "#a9a9a9a9"
                            : "#6BA08E",
                          textTransform: "none",
                        }}
                        disabled={questionnaireList?.some(
                          (item) => item.answer !== null
                        )}
                        onClick={
                          /* istanbul ignore next */
                          cancleFunction
                        }
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Box>
                )
              }
            </AccordionDetails>
          )}
        </Accordion>
      </Box>
      <>
        <SureModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setConfirmSubmission={setConfirmSubmission}
        >
          <Typography
            sx={{
              fontWeight: "600",
              textAlign: "center",
              fontSize: "27px",
            }}
          >
            Are you sure you want to submit the feedback?
          </Typography>
          <Box marginTop="20px" display="flex" justifyContent="end">
            <Button
              variant="contained"
              color="inherit"
              size="small"
              data-testid="feedbackCancelButton"
              onClick={() => {
                /* istanbul ignore next */
                setModalOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              color="error"
              variant="contained"
              sx={{ marginLeft: "5px" }}
              size="small"
              data-testid="feedbackConfirmButton"
              onClick={(value) => {
                setModalOpen(false);
                handleAdd(value);
              }}
            >
              Confirm
            </Button>
          </Box>
        </SureModal>

        {isConfirm && (
          <ConfirmationModal
            label="Are you sure you want to cancel the feedback?"
            onCancel={clearIsConfirmCancel}
            onConfirm={cancelConfirm}
          />
        )}
        {successModal && (
          <SuccessModal
            isOpen={successModal}
            title="Successful"
            description={"Your feedback has been submited Successfully"}
            onOk={handleOk}
          />
        )}
      </>
    </>
  );
};

export default withAuthentication(Feedback, ["patient"]);
