import { useState, useEffect, forwardRef } from "react";
import type { NextPage } from "next";
// GRAPHQL
import { useMutation, useLazyQuery } from "@apollo/client";
import {
  GET_PATIENTTHERAPY_DATA,
  GET_PATIENTFEEDBACKLIST_DATA,
  GET_PATIENT_FEEDBACKLIST_DATA_NEW,
} from "../../../graphql/query/common";
import { GET_PATIENTSESSION_DATA } from "../../../graphql/query/patient";
import {
  POST_PATIENT_FEEDBACK,
  POST_PATIENT_FEEDBACK_NEW,
} from "../../../graphql/mutation";

// MUI COMPONENTS
import Box from "@mui/material/Box";
import Layout from "../../../components/layout";
import Loader from "../../../components/common/Loader";
import ContentHeader from "../../../components/common/ContentHeader";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSnackbar } from "notistack";

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
  Grid,
} from "@mui/material";
import withAuthentication from "../../../hoc/auth";
import { useAppContext } from "../../../contexts/AuthContext";
import TextFieldComponent from "../../../components/common/TextField/TextFieldComponent";
import { SuccessModal } from "../../../components/common/SuccessModal";
import SureModal from "../../../components/admin/resource/SureModal";

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
  const [open, setOpen] = useState<boolean>(false);
  const [erroropen, setErrorOpen] = useState<boolean>(false);
  const [btndiabled, setBtndiabled] = useState<boolean>(false);
  const { user: { patient_data: { therapist_id: therapistId } } = {} } =
    useAppContext();
  const { enqueueSnackbar } = useSnackbar();
  let btnvalue = 0;
  let ansvalue = 0;

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
      console.log("session: data ", data);
      /* istanbul ignore else */
      if (data!.getPatientSessionList) {
        setFeedbackType("session");
        setSessionNo("1");
      }
    },
    onError: (error) => {
      console.log(error, "error");
    },
  });
  // console.log("Koca: patientSessionData ", patientSessionData);

  // const [
  //   getPatientFeedbackListData,
  //   { loading: feedbackLoading, data: patientFeedbackData },
  // ] = useLazyQuery(GET_PATIENTFEEDBACKLIST_DATA);
  // /* istanbul ignore else */
  // console.log("Koca: dsdsdpatientFeedbackData ", patientFeedbackData);

  const [
    getPatientFeedbackListDataNew,
    { loading: newFeedbackLoading, data: patientNewFeedbackData },
  ] = useLazyQuery(GET_PATIENT_FEEDBACKLIST_DATA_NEW, {
    onCompleted: (data) => {
      console.debug("list: data ", data);
    },
  });

  console.log("Koca: patientNewFeedbackData ", patientNewFeedbackData);

  const setDefaultStateExcludingLoader = () => {
    /* istanbul ignore else */
    setFeedbackType(null);
    setSessionNo(null);
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
    console.log("therapy-changed", therapy);
  }, [therapy]);

  // useEffect(() => {
  //   setLoader(true);
  //   getPatientFeedbackListData({
  //     variables: {
  //       sessionNo: sessionNo,
  //       feedbackType: feedbackType,
  //       pttherapyId: therapy,
  //     },
  //   });
  // }, [sessionNo, feedbackType]);

  useEffect(() => {
    console.debug("variable question list", {
      session: sessionNo,
      pttherapyId: therapy,
    });
    setLoader(true);
    getPatientFeedbackListDataNew({
      // variables: {
      //   session: 1,
      //   pttherapyId: "fadb3fc55d1d4c698d0826a6767a7cd8",
      // },
      variables: {
        session: sessionNo,
        pttherapyId: therapy,
      },
    });
  }, [sessionNo]);

  useEffect(() => {
    /* istanbul ignore else */
    if (
      !therapyLoading &&
      // !feedbackLoading &&
      !sessionLoading &&
      therapistId &&
      therapy &&
      sessionNo &&
      feedbackType &&
      patientTherapryData &&
      patientSessionData
      // patientFeedbackData
    ) {
      setLoader(false);
    }
  }, [
    therapy,
    sessionNo,
    feedbackType,
    patientTherapryData,
    patientSessionData,
    // patientFeedbackData,
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

  // const handleInputChange = (e, index) => {
  //   console.log("handleInputChange: ", e, index, e.target.value, e.target.id);
  //   let val = e.target.name;
  //   console.log("Koca: val ", val);

  //   // /* istanbul ignore next */
  //   // if (e.target.id && e.target.id != "undefined") {
  //   //   val = e.target.id;
  //   // }
  //   // const p = val.split("_");
  //   // if (p[0]) {
  //   //   setFormValues([
  //   //     ...formValues,
  //   //     {
  //   //       therapist_id: therapistId,
  //   //       session_no: sessionNo,
  //   //       questionId: p[1],
  //   //       answer: e.target.value,
  //   //     },
  //   //   ]);
  //   // }
  // };

  // const handleOptionChange = (e) => {
  //   let val = e.target.name;
  //   console.log("Koca: e ", e);
  //   /* istanbul ignore next */

  //   const p = val.split("_");
  //   console.log("Koca: p ", p);
  //   if (p[0]) {
  //     setFormValues([
  //       ...formValues,
  //       {
  //         therapist_id: therapistId,
  //         session_no: sessionNo,
  //         questionId: p[1],
  //         answer: e.target.value,
  //       },
  //     ]);
  //   }
  // };
  const handleOptionChange = (e) => {
    let val = e.target.name;
    const p = val.split("_");
    const answer = e.target.value;
    const updatedFormValues = formValues.map((item) => {
      if (item.questionId === p[1]) {
        return { ...item, answer: item.answer + answer };
      }
      return item;
    });
    if (!updatedFormValues.some((item) => item.questionId === p[1])) {
      updatedFormValues.push({
        therapist_id: therapistId,
        session_no: sessionNo,
        questionId: p[1],
        answer: answer,
      });
    }
    setFormValues(updatedFormValues);
  };

  // const handleOptionChange = (e) => {
  //   let val = e.target.name;
  //   const p = val.split("_");
  //   if (p[0]) {
  //     setFormValues((prevFormValues) => [
  //       ...prevFormValues.filter((item) => item.questionId !== p[1]), // remove previous item with same questionId
  //       {
  //         therapist_id: therapistId,
  //         session_no: sessionNo,
  //         questionId: p[1],
  //         answer: e.target.value,
  //       },
  //     ]);
  //   }
  // };

  const [postPatientFeedback] = useMutation(POST_PATIENT_FEEDBACK);

  const [postPatientFeedbackNew] = useMutation(POST_PATIENT_FEEDBACK_NEW);

  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleAdd = (event) => {
    event.preventDefault();
    if (formValues.length == 0) {
      enqueueSnackbar("Field can not be left blank", {
        variant: "error",
      });
    } else {
      setBtndiabled(true);
      postPatientFeedbackNew({
        variables: {
          feedQuesAnsData: JSON.stringify(formValues),
          session: sessionNo,
          pttherapyId: therapy,
        },
        onCompleted: () => {
          setSuccessModal(true);
          // enqueueSnackbar("Feedback submitted successfully", {
          //   variant: "success",
          // });
          // window.location.reload();
        },
      });
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

  const questionnaireList =
    patientNewFeedbackData?.patientGetFeedbackList?.length > 0
      ? patientNewFeedbackData?.patientGetFeedbackList[0]?.questions
      : [];

  console.log("questionnaireList: ", questionnaireList);

  const handleOk = () => {
    /* istanbul ignore next */
    // router.push("/admin/safetyPlan");
    setSuccessModal(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValues.length == 0) {
      enqueueSnackbar("Field can not be left blank", {
        variant: "error",
      });
    } else {
      setModalOpen(true);
    }
    setModalOpen(true);
    /* istanbul ignore next */
    if (!confirmSubmission) return;
  };

  console.log("form-text: ", formValues);
  return (
    <>
      <Layout>
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
              setSessionNo("before_therapy");
              btnvalue = 0;
            }}
            // key={v._id}
            data-testid="SessionPanelItem"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="text-white" />}
              style={{ minHeight: "0px", height: "45px" }}
              aria-controls={"before_session" + "bh-content"}
              id={"before_session" + "bh-header"}
              data-testid={"before_session" + "bh-header"}
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
            <AccordionDetails>
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
              {questionnaireList?.map((fv, fk) => {
                console.log("Koca: fv ", fv);
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
                          fv.feedback_ans && fv.feedback_ans.answer
                            ? fv.feedback_ans.answer
                            : ""
                        }
                      >
                        {fv.answer_type == "2" &&
                          fv.answer_options &&
                          fv.answer_options.split(",").map((av, ak) => {
                            console.log({ av, ak }, "[av, ak]");
                            const j = ak + 1;
                            return (
                              <FormControlLabel
                                key={j}
                                // disabled={fv.answer ? true : false}
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

                        {fv.answer_type == "1" && (
                          <Grid
                            container
                            spacing={2}
                            marginBottom={0}
                            paddingTop={1}
                          >
                            <Grid item xs={12}>
                              <TextFieldComponent
                                name="ptgoal_achievementgoal"
                                id="ptgoal_achievementgoal"
                                value={""}
                                multiline
                                rows={4}
                                // onChange={(e) => handleInputChange(fk, e)}
                                inputProps={{
                                  "data-testid": "ptgoal_achievementgoal",
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
              {questionnaireList?.length > 0 && (
                <Typography sx={{ textAlign: "center" }}>
                  <Button
                    type="submit"
                    // disabled={
                    //   btndiabled == true || btnvalue == ansvalue ? true : false
                    // }
                    onClick={(values) => {
                      handleAdd(values);
                    }}
                    variant="contained"
                    data-testid="submitFeedback"
                  >
                    Submit
                  </Button>
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box>
          {patientSessionData?.getPatientSessionList != null &&
            patientSessionData?.getPatientSessionList.map((v, k) => {
              const p = k + 1;
              const panelName = "panel" + p;
              console.log("Koca: panelName ", panelName);
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
                    style={{ borderRadius: "14px" }}
                    expanded={sessionPanelExpanded === panelName}
                    onChange={handleSessionPanelChange(panelName)}
                    onClick={() => {
                      setSessionNo(p);
                      btnvalue = 0;
                    }}
                    key={v._id}
                    data-testid="SessionPanelItem"
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon className="text-white" />}
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
                    <AccordionDetails>
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
                          {/* <Typography>
                            {patientNewFeedbackData &&
                              patientNewFeedbackData?.patientGetFeedbackList[0]
                                ?.description}
                          </Typography> */}
                        </Grid>
                      </Box>
                      {questionnaireList?.map((fv, fk) => {
                        console.log("Koca: fv ", fv);
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
                                {fv.answer_type === "2" &&
                                  fv.answer_options &&
                                  fv.answer_options.split(",").map((av, ak) => {
                                    const j = ak + 1;
                                    return (
                                      <FormControlLabel
                                        key={j}
                                        // disabled={
                                        //   fv?.answer?.answer ? true : false
                                        // }
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

                                {fv.answer_type == "1" && (
                                  <Grid
                                    container
                                    spacing={2}
                                    marginBottom={0}
                                    paddingTop={1}
                                  >
                                    <Grid item xs={12}>
                                      <TextFieldComponent
                                        name="ptgoal_achievementgoal"
                                        // id="ptgoal_achievementgoal"
                                        id={fv.answer_type + "_" + fv._id}
                                        value={formValues?.answer}
                                        multiline
                                        rows={4}
                                        onChange={(e) => handleOptionChange(e)}
                                        inputProps={{
                                          "data-testid":
                                            "ptgoal_achievementgoal",
                                        }}
                                        fullWidth={true}
                                        className="form-control-bg"
                                      />
                                    </Grid>
                                  </Grid>
                                )}
                              </RadioGroup>
                              {/* <TextareaAutosize
                                aria-label="empty textarea"
                                id={fv.answer_type + "_" + fv._id}
                                onBlur={(e) => handleInputChange(fk, e)}
                                disabled={
                                  fv.feedback_ans && fv.feedback_ans.answer
                                    ? true
                                    : false
                                }
                                defaultValue={
                                  fv.feedback_ans && fv.feedback_ans.answer
                                    ? fv.feedback_ans.answer
                                    : ""
                                }
                                style={{
                                  width: 982.5,
                                  height: 216,
                                  left: 454.32,
                                  top: 1044,
                                  backgroundColor: "#dadada52",
                                  borderRadius: "12px",
                                  border: "none",
                                }}
                              /> */}
                            </Typography>
                          </Typography>
                        );
                      })}

                      {/* {patientFeedbackData?.getPatientFeedbackList != null &&
                        patientFeedbackData?.getPatientFeedbackList.length !=
                          0 && (
                          <Typography sx={{ textAlign: "center" }}>
                            <Button
                              type="submit"
                              disabled={
                                btndiabled == true || btnvalue == ansvalue
                                  ? true
                                  : false
                              }
                              variant="contained"
                              data-testid="submitFeedback"
                            >
                              Submit
                            </Button>
                          </Typography>
                        )} */}

                      {questionnaireList?.length > 0 && (
                        // <Typography sx={{ textAlign: "center" }}>
                        //   <Button
                        //     type="submit"
                        //     // disabled={
                        //     //   btndiabled == true || btnvalue == ansvalue ? true : false
                        //     // }
                        //     // onClick={(values) => {
                        //     //   handleAdd(values);
                        //     // }}
                        //     // onClick={(e, values) => {
                        //     //   handleSubmit(e, values);
                        //     // }}
                        //     onClick={(e) => {
                        //       handleSubmit(e);
                        //     }}
                        //     variant="contained"
                        //     data-testid="submitFeedback"
                        //   >
                        //     Submit
                        //   </Button>
                        // </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            p: 1,
                            m: 1,
                            bgcolor: "background.paper",
                            borderRadius: 1,
                            // paddingTop: "50px",
                          }}
                        >
                          <Grid item xs={6} style={{ paddingRight: "50px" }}>
                            <Button
                              type="submit"
                              // disabled={
                              //   btndiabled == true || btnvalue == ansvalue
                              //     ? true
                              //     : false
                              // }
                              style={{
                                textTransform: "none",
                              }}
                              // disabled={questionnaireList?.some(
                              //   (item) => item.answer !== null
                              // )}
                              onClick={(e) => {
                                handleSubmit(e);
                              }}
                              variant="contained"
                              data-testid="submitFeedback"
                            >
                              Submit
                            </Button>
                          </Grid>
                          <Grid item xs={6} textAlign="center">
                            <Button
                              data-testid="cancleFeedbackButton"
                              variant="contained"
                              style={{
                                backgroundColor: "#6BA08E",
                                textTransform: "none",
                              }}
                              onClick={() => {
                                setSessionPanelExpanded(false);
                              }}
                            >
                              Cancel
                            </Button>
                          </Grid>
                        </Box>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </form>
              );
            })}
        </Box>
      </Layout>
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
              data-testid="editGoalCancelButton"
              onClick={() => {
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
              data-testid="editGoalConfirmButton"
              onClick={(value) => {
                setModalOpen(false);
                handleAdd(value);
              }}
            >
              Confirm
            </Button>
          </Box>
        </SureModal>

        {successModal && (
          <SuccessModal
            isOpen={successModal}
            title="Successfull"
            description={"Your feedback has been submited Successfully"}
            onOk={handleOk}
          />
        )}
      </>
    </>
  );
};

export default withAuthentication(Feedback, ["patient"]);
