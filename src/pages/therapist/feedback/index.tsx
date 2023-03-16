import React, { useEffect, useState } from "react";

import {
  Box,
  CircularProgress,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_PATIENTSESSION_DATA } from "../../../graphql/query/patient";
import Loader from "../../../components/common/Loader";
import { SuccessModal } from "../../../components/common/SuccessModal";
import TextFieldComponent from "../../../components/common/TextField/TextFieldComponent";
import { useSnackbar } from "notistack";
import { POST_THERAPIST_FEEDBACK_NEW } from "../../../graphql/mutation";
import AddIcon from "@mui/icons-material/Add";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { GET_THERAPIST_FEEDBACKLIST_DATA_NEW } from "../../../graphql/Feedback/graphql";
import RemoveIcon from "@mui/icons-material/Remove";

const TherapyPatientFeedback: any = (props) => {
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [sessionPanelExpanded, setSessionPanelExpanded] = useState<
    string | false
  >(false);
  const [feedbackType, setFeedbackType] = useState<string>("");
  const [sessionNo, setSessionNo] = useState(null);
  const [patientData, setPatientData] = useState<{
    patient_id: string;
    patient_name: string;
  }>({ patient_id: "", patient_name: "" });
  const { enqueueSnackbar } = useSnackbar();
  // Update Mutation
  const [postTherapistFeedbackNew] = useMutation(POST_THERAPIST_FEEDBACK_NEW);
  const [isConfirm, setIsConfirm] = useState(false);

  // Session Queries
  const [
    getPatientSessionData,
    { loading: sessionLoading, data: patientSessionData },
  ] = useLazyQuery(GET_PATIENTSESSION_DATA, {
    onCompleted: (data) => {
      /* istanbul ignore else */
      if (data!.getPatientSessionList) {
        setFeedbackType("therapist");
        setSessionNo("1");
      }
    },
  });

  const [
    getTherapistFeedbackListNewData,
    { loading, data: therapistFeedbackNewData },
  ] = useLazyQuery(GET_THERAPIST_FEEDBACKLIST_DATA_NEW);

  const setDefaultStateExcludingLoader = () => {
    setFeedbackType("therapist");
    setSessionNo("1");
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

  useEffect(() => {
    /* istanbul ignore next */
    if (patientData.patient_id.length > 0) {
      setLoader(true);
      getTherapistFeedbackListNewData({
        variables: {
          sessionNo: sessionNo,
          feedbackType: feedbackType,
          pttherapyId: props.setTherapy,
        },
      });
    }
  }, [sessionNo]);

  useEffect(() => {
    /* istanbul ignore next */
    if (
      !sessionLoading &&
      patientData &&
      sessionNo &&
      feedbackType &&
      patientSessionData
    ) {
      /* istanbul ignore next */
      setLoader(false);
    }
  }, [patientData, sessionNo, feedbackType, patientSessionData]);

  const handleSessionPanelChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setSessionPanelExpanded(
        /* istanbul ignore else */ isExpanded ? panel : false
      );
    };

  const handleOk = () => {
    /* istanbul ignore next */
    setSuccessModal(false);
  };

  const questionnaireList =
    therapistFeedbackNewData?.therapistGetFeedbackList?.length > 0
      ? therapistFeedbackNewData?.therapistGetFeedbackList[0]?.questions
      : [];

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
          questionId: p[1],
          answer: e.target.value,
        },
      ]);
    }
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
        questionId: questionId,
        answer: newAnswer,
      });
    }

    setFormValues(tempSubmitData);
  };

  const handleAdd = () => {
    postTherapistFeedbackNew({
      variables: {
        feedQuesAnsData: JSON.stringify(formValues),
        sessionNo: sessionNo,
        pttherapyId: props.setTherapy,
        patientId: patientData.patient_id,
      },
      onCompleted: () => {
        /* istanbul ignore next */
        setSuccessModal(true);
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* istanbul ignore next */
    if (formValues.length == 0) {
      enqueueSnackbar("Field can not be left blank", {
        variant: "error",
      });
    } else {
      setModalOpen(true);
    }
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
      <Box style={{ paddingBottom: "30px" }}>
        <Box>
          <Accordion
            sx={{ marginTop: "4px", borderRadius: "4px" }}
            style={{
              borderRadius: "14px",
              borderLeft: "1px solid #cecece",
              borderRight: "1px solid #cecece",
            }}
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
                {therapistFeedbackNewData?.therapistGetFeedbackList?.[0]
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
                        {
                          /* istanbul ignore next */

                          therapistFeedbackNewData?.therapistGetFeedbackList[0]
                            ?.description
                        }
                      </Grid>
                    </Box>
                  </>
                )}
                {questionnaireList?.length == 0 ? (
                  <Box>Data not found</Box>
                ) : (
                  <>
                    {questionnaireList?.map((fv, fk) => {
                      /* istanbul ignore next */
                      return (
                        <Typography
                          key={fk + ""}
                          gutterBottom
                          component="div"
                          style={{ marginBottom: "10px" }}
                        >
                          <Box
                            style={{
                              paddingRight: "15px",
                              color: "#6EC9DB",
                              fontWeight: "bold",
                            }}
                            data-testid="safety_ques"
                          >
                            {fk + 1}. {fv.question}
                          </Box>

                          <Typography>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                              defaultValue={
                                fv?.answer?.answer ? fv.answer.answer : ""
                              }
                            >
                              {(fv.answer_type == "2" ||
                                fv.answer_type == "list") &&
                                fv.answer_options &&
                                fv.answer_options.split(",").map((av, ak) => {
                                  /* istanbul ignore next */
                                  const j = ak + 1;
                                  /* istanbul ignore next */
                                  return (
                                    <FormControlLabel
                                      key={j}
                                      disabled={
                                        fv?.answer?.answer ? true : false
                                      }
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
                              cancel
                            </Button>
                          </Grid>
                        </Box>
                      )
                    }
                  </>
                )}
              </AccordionDetails>
            )}
          </Accordion>
        </Box>
        <Box>
          {patientSessionData &&
            patientSessionData.getPatientSessionList &&
            patientSessionData.getPatientSessionList.map((v, k) => {
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
                    style={{
                      borderRadius: "14px",
                      borderLeft: "1px solid #cecece",
                      borderRight: "1px solid #cecece",
                    }}
                    expanded={sessionPanelExpanded === panelName}
                    onChange={handleSessionPanelChange(panelName)}
                    onClick={() => setSessionNo(p)}
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
                        {therapistFeedbackNewData?.therapistGetFeedbackList?.[0]
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
                                {
                                  /* istanbul ignore next */
                                  therapistFeedbackNewData
                                    ?.therapistGetFeedbackList[0]?.description
                                }
                              </Grid>
                            </Box>{" "}
                          </>
                        )}
                        {
                          /* istanbul ignore next */
                          questionnaireList?.length == 0 ? (
                            <Box>Data not found</Box>
                          ) : (
                            <>
                              {questionnaireList?.map((fv, fk) => {
                                /* istanbul ignore next */
                                return (
                                  <Typography
                                    key={fk + ""}
                                    gutterBottom
                                    component="div"
                                    style={{ marginBottom: "10px" }}
                                  >
                                    <Box
                                      style={{
                                        paddingRight: "15px",
                                        color: "#6EC9DB",
                                        fontWeight: "bold",
                                      }}
                                      data-testid="safety_ques"
                                    >
                                      {fk + 1}. {fv.question}
                                    </Box>

                                    <Typography>
                                      <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        defaultValue={
                                          fv?.answer?.answer
                                            ? fv.answer.answer
                                            : ""
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
                                                  md={av.length > 30 ? 6 : 2}
                                                  key={ak}
                                                >
                                                  <FormControlLabel
                                                    disabled={
                                                      !!fv.answer?.answer
                                                    }
                                                    sx={{
                                                      fontSize: "15px",
                                                      color:
                                                        "#3f4040b0 !important",
                                                    }}
                                                    name={"question_" + fv._id}
                                                    onChange={(e) =>
                                                      handleOptionChange(e)
                                                    }
                                                    value={av}
                                                    control={
                                                      <Radio size="small" />
                                                    }
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
                                                name={
                                                  fv.answer_type + "_" + fv._id
                                                }
                                                id={
                                                  fv.answer_type + "_" + fv._id
                                                }
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
                                    <Grid
                                      item
                                      xs={6}
                                      style={{ paddingRight: "50px" }}
                                    >
                                      <Button
                                        type="submit"
                                        disabled={questionnaireList?.some(
                                          (item) => item.answer !== null
                                        )}
                                        onClick={(e) => {
                                          /* istanbul ignore next */
                                          handleSubmit(e);
                                        }}
                                        variant="contained"
                                        data-testid="submitFeedback1"
                                        style={{
                                          backgroundColor:
                                            questionnaireList?.some(
                                              (item) => item.answer !== null
                                            )
                                              ? "#a9a9a9a9"
                                              : "#6EC9DB",
                                          textTransform: "none",
                                        }}
                                      >
                                        Submit
                                      </Button>
                                    </Grid>
                                    <Grid item xs={6} textAlign="center">
                                      <Button
                                        data-testid="cancleFeedbackButton1"
                                        variant="contained"
                                        style={{
                                          backgroundColor:
                                            questionnaireList?.some(
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
                            </>
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
            style={{
              borderRadius: "14px",
              borderLeft: "1px solid #cecece",
              borderRight: "1px solid #cecece",
            }}
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
                {therapistFeedbackNewData?.therapistGetFeedbackList?.[0]
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
                        {
                          /* istanbul ignore next */
                          therapistFeedbackNewData?.therapistGetFeedbackList[0]
                            ?.description
                        }
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
                      <Box
                        style={{
                          paddingRight: "15px",
                          color: "#6EC9DB",
                          fontWeight: "bold",
                        }}
                        data-testid="safety_ques"
                      >
                        {fk + 1}. {fv.question}
                      </Box>

                      <Typography>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          defaultValue={
                            fv?.answer?.answer ? fv.answer.answer : ""
                          }
                        >
                          {(fv.answer_type == "2" ||
                            fv.answer_type == "list") &&
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
                {
                  /* istanbul ignore next */
                  questionnaireList?.length == 0 && <Box>Data not found</Box>
                }
              </AccordionDetails>
            )}
          </Accordion>
        </Box>
      </Box>
      <>
        {modalOpen && (
          <ConfirmationModal
            label="Are you sure you want to submit the feedback?"
            onCancel={() => {
              /* istanbul ignore next */
              setModalOpen(false);
            }}
            onConfirm={() => {
              setModalOpen(false);
              handleAdd();
            }}
          />
        )}
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
            title="Successfull"
            description={"Your feedback has been submitted Successfully."}
            onOk={handleOk}
          />
        )}
      </>
    </>
  );
};

export default TherapyPatientFeedback;
