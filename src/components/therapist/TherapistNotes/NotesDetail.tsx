import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
  styled,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import TextFieldComponent from "../../common/TextField/TextFieldComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationModal from "../../common/ConfirmationModal";
import { SuccessModal } from "../../common/SuccessModal";
import { useLazyQuery, useMutation } from "@apollo/client";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {
  ADD_HOMEWORK,
  ASSIGN_RESOURCE_HOMEWORK,
  COMPLETE_HOMEWORK,
  DELETE_HOMEWORK_TASK,
} from "../../../graphql/mutation/therapist";
import { useSnackbar } from "notistack";
import {
  GET_POPUP_RESOURCE_LIST_DATA,
  GET_THERAPIST_HOMEWORK,
  GET_THERAPIST_HOMEWORK_OLD_SESSION_DATA,
  GET_THERAPIST_NOTES_DATA,
} from "../../../graphql/query/therapist";
import ConfirmBoxModal from "../../common/ConfirmBoxModal";
import { ModalElement } from "../../common/CustomModal/CommonModal";
import { useAppContext } from "../../../contexts/AuthContext";

import { useStyles } from "../../common/AddQuestionsBox/addQuestionsBoxStyles";
import ResourcePopup from "../patient/TherapsitHomework/resourcePopup";

import { GET_RISKS_LIST } from "../../../graphql/assessment/graphql";
import { Box } from "@material-ui/core";

const IconButtonWrapper = styled(IconButton)(
  () => `
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  margin-right: 5px;
`
);

type propTypes = {
  sessionId?: any;
  therapyId?: any;
  sessionNo?: any;
  onCancel?: any;
  toggleAccordion?: any;
};

function NotesDetail(props: propTypes) {
  const { user } = useAppContext();
  const styles = useStyles();
  const orgId = user?.therapist_data?.org_id;
  const { enqueueSnackbar } = useSnackbar();
  const confirmModalRef = useRef<ModalElement>(null);
  const confirmModalRefForOldHomework = useRef<ModalElement>(null);
  const patientId = sessionStorage.getItem("patient_id");

  // Use State
  const [inputs, setInputs] = useState([]);
  const [riskInputsBox, setRiskInputsBox] = useState();
  const [sessionSummaryInputsBox, setSessionSummaryInputsBox] = useState();
  const [therapistInputs, setTherapistInputs] = useState([]);
  const [patientInputs, setpatientInputs] = useState([]);
  const [lptHomeworkId, setLptHomeworkId] = useState([]);
  const [completeHomeworkid, setCompleteHomeWorkId] = useState("");
  const [checkCompleteCheckBox, setCheckCompleteCheckbox] = useState<any>();
  const [isConfirm, setIsConfirm] = useState(false);
  const [isConfirmDeleteTask, setIsConfirmDeleteTask] = useState(false);
  const [isConfirmCompleteTask, setIsConfirmCompleteTask] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState("");
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [previoushomeworkId, setPrevioushomeworkId] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [ptHomeworkId, setPtHomeworkId] = useState("");
  const [ptShareId, setPtShareId] = useState("");
  const [myResource, setMyResource] = useState(0);
  const [myFavourites, setMyFavourites] = useState(0);
  const [riskId, setRiskId] = React.useState<string[]>([]);
  const [noteUpdateId, setNoteUpdateId] = useState("");
  const [openResourceModal, setOpenResourceModal] = useState(false);
  const [deleteTasksuccessModal, setDeleteTaskSuccessModal] =
    useState<boolean>(false);

  const [completeTasksuccessModal, setCompleteTaskSuccessModal] =
    useState<boolean>(false);

  const [completeResourceAssignedModal, setCompleteResourceAssignedModal] =
    useState<boolean>(false);

  // Mutation
  const [addHomework] = useMutation(ADD_HOMEWORK);
  const [deleteHomeworkTask] = useMutation(DELETE_HOMEWORK_TASK);
  const [CompleteHomeworkTask] = useMutation(COMPLETE_HOMEWORK);
  const [AssigneResource] = useMutation(ASSIGN_RESOURCE_HOMEWORK);

  // Queries

  const [getiskData, { data: riskListData }] = useLazyQuery(GET_RISKS_LIST, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      console.log("Koca: risk data ", data);
    },
  });

  const [
    getTherapistHomeworkData2,
    { data: therapistHomeworkDataData2, refetch },
  ] = useLazyQuery(GET_THERAPIST_HOMEWORK_OLD_SESSION_DATA, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      console.log("Koca: data ", data);
    },
  });

  const [getTherapistNotesData, { data: therapistNotesData }] = useLazyQuery(
    GET_THERAPIST_NOTES_DATA,
    {
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        console.log("Koca: notes prefiled data ", data);
      },
    }
  );

  const [getTherapistHomeworkData, { data: therapistHomeworkDataData }] =
    useLazyQuery(GET_THERAPIST_HOMEWORK, {
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        const last_homework_list =
          data?.therapistViewPatientHomework?.last_homework_list;
        const ids = last_homework_list?.map((item) => item._id);
        setCompleteHomeWorkId(ids);

        const verifyValuetoCheckBox = last_homework_list?.some(
          (item) => item.complete_status
        );

        /* istanbul ignore next */
        if (verifyValuetoCheckBox == true) {
          setCheckCompleteCheckbox(1);
        }
      },
    });

  const [getPopupData, { data: popupData }] = useLazyQuery(
    GET_POPUP_RESOURCE_LIST_DATA,
    {
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        console.log("Koca: data ", data);
      },
    }
  );

  const patientMeasureTable =
    therapistNotesData?.getPatientNotesData?.patientmeasure;

  const patientMonitorTable =
    therapistNotesData?.getPatientNotesData?.patientmonitor;

  const lastHomeworkList =
    therapistHomeworkDataData?.therapistViewPatientHomework?.last_homework_list;

  const previousSessionTaskData =
    therapistHomeworkDataData2?.getPatientHomeworkData;

  useEffect(() => {
    /* istanbul ignore next */
    if (therapistNotesData?.getPatientNotesData?.patientnotes.length) {
      const preFilledData =
        therapistNotesData?.getPatientNotesData?.patientnotes[0];

      setRiskInputsBox(preFilledData.patnotes_risk_comment);

      setSessionSummaryInputsBox(preFilledData.patnotes_summary);

      setRiskId(preFilledData.risk_id);

      setNoteUpdateId(preFilledData._id);
    }
  }, [therapistNotesData?.getPatientNotesData?.patientnotes]);

  useEffect(() => {
    getiskData();
    getTherapistHomeworkData2({
      variables: {
        patient_id: patientId,
        ptsession_id: props.sessionId,
        therapy_id: props.therapyId,
      },
    });
  }, [props.sessionId, props.therapyId, patientId]);

  useEffect(() => {
    getTherapistNotesData({
      variables: {
        patient_id: patientId,
        ptsession_id: props.sessionId,
        pttherapy_id: props.therapyId,
      },
    });
  }, [props.sessionId, props.therapyId, patientId]);

  useEffect(() => {
    getTherapistHomeworkData({
      variables: {
        patient_id: patientId,
        ptsession_id: props.sessionId,
        ptsession_no: props.sessionNo,
        pttherapy_id: props.therapyId,
      },
    });
  }, [props.sessionId, props.sessionNo, props.therapyId, patientId]);

  useEffect(() => {
    getPopupData({
      variables: {
        therapyId: props.therapyId,
        orgId: orgId,
        searchText: searchValue,
        myResource: myResource,
        myFav: myFavourites,
      },
    });
  }, [
    props.sessionId,
    props.sessionNo,
    props.therapyId,
    patientId,
    searchValue,
    myResource,
    myFavourites,
  ]);

  /* istanbul ignore next */
  function refreshData() {
    getTherapistHomeworkData({
      variables: {
        patient_id: patientId,
        ptsession_id: props.sessionId,
        ptsession_no: props.sessionNo,
        pttherapy_id: props.therapyId,
      },
      fetchPolicy: "network-only",
    });
  }

  /* istanbul ignore next */
  const handleSearchData = (data) => {
    setSearchValue(data);
  };

  /* istanbul ignore next */
  const handleCreateInput = () => {
    if (previousSessionTaskData?.length > 0) {
      confirmModalRefForOldHomework.current?.open();

      return;
    }
    if (inputs.length >= 15) {
      confirmModalRef.current?.open();
      return; // exit the function without creating a new input
    }
    setInputs([...inputs, ""]);
  };

  /* istanbul ignore next */
  const handleInputChangePrviousHomework = (index, value, Id) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);

    const updatedId = [...previoushomeworkId];
    updatedId[index] = Id;
    setPrevioushomeworkId(updatedId);
  };

  /* istanbul ignore next */
  const handleInputChange = (index, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
  };

  /* istanbul ignore next */
  const handleRiskInputBoxChange = (value) => {
    setRiskInputsBox(value);
  };

  /* istanbul ignore next */
  const handleSessionSummaryChange = (value) => {
    setSessionSummaryInputsBox(value);
  };

  /* istanbul ignore next */
  const handleTherapistInputChange = (index, value, Id) => {
    const updatedInputs = [...therapistInputs];

    updatedInputs[index] = value;
    setTherapistInputs(updatedInputs);

    const updatedId = [...lptHomeworkId];
    updatedId[index] = Id;
    setLptHomeworkId(updatedId);
  };

  /* istanbul ignore next */
  const handlePatientInputChange = (index, value, Id) => {
    const updatedInputs = [...patientInputs];
    updatedInputs[index] = value;
    setpatientInputs(updatedInputs);

    const updatedId = [...lptHomeworkId];
    updatedId[index] = Id;
    setLptHomeworkId(updatedId);
  };

  /* istanbul ignore next */
  const handleDeleteInput = (index) => {
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
  };

  /* istanbul ignore next */
  const handlerAddAndUpdate = async () => {
    try {
      await addHomework({
        variables: {
          patient_id: patientId,
          ptsession_id: props.sessionId,
          therapy_id: props.therapyId,
          pthomework_id: JSON.stringify(previoushomeworkId),
          pthomewrk_task: JSON.stringify(inputs),
          lpthomework_id: JSON.stringify(lptHomeworkId),
          pthomewrk_resp: JSON.stringify(patientInputs),
          therapist_resp: JSON.stringify(therapistInputs),

          notes_id: noteUpdateId,
          notes_risk_comment: riskInputsBox,
          notes_summary: sessionSummaryInputsBox,
          risk_id: riskId.toString(),
          pttherapy_id: props.therapyId,
        },
        onCompleted: () => {
          setIsConfirm(false);
          setSuccessModal(true);
          setInputs([]);
          refetch();
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  /* istanbul ignore next */
  const handleDeleteHomeworkTask = async () => {
    try {
      await deleteHomeworkTask({
        variables: {
          patient_id: patientId,
          pthomework_id: deleteTaskId,
        },
        onCompleted: () => {
          setIsConfirmDeleteTask(false);
          setDeleteTaskSuccessModal(true);
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  /* istanbul ignore next */
  const compleateHomework = async () => {
    try {
      await CompleteHomeworkTask({
        variables: {
          patient_id: patientId,
          last_session_homeworkid: completeHomeworkid.toString(),
          complete_status: checkCompleteCheckBox,
        },
        onCompleted: () => {
          setIsConfirmCompleteTask(false);
          setCompleteTaskSuccessModal(true);

          refreshData();
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  const assigneHomeworkResources = async (resourceId) => {
    try {
      await AssigneResource({
        variables: {
          patient_id: patientId,
          ptsession_id: props.sessionId,
          therapy_id: props.therapyId,
          session_no: `${props.sessionNo}`,
          pthomework_id: ptHomeworkId,
          ptshare_id: ptShareId,
          source_id: "3",
          restype: 0,
          resource_id: resourceId,
        },
        onCompleted: () => {
          setCompleteResourceAssignedModal(true);
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsConfirm(true);
    /* istanbul ignore next */
    if (!isConfirm) return;
  };

  /* istanbul ignore next */
  const clearIsConfirmCancel = () => {
    setIsConfirm(false);
    setIsConfirmDeleteTask(false);
    setIsConfirmCompleteTask(false);
    setCheckCompleteCheckbox("");
  };

  /* istanbul ignore next */
  const handleOk = () => {
    setSuccessModal(false);
    setCompleteTaskSuccessModal(false);
    setCompleteResourceAssignedModal(false);
    setOpenResourceModal(false);
    refetch();
  };

  /* istanbul ignore next */
  const handleOk2 = () => {
    setDeleteTaskSuccessModal(false);
    setInputs([]);
    refetch();
  };

  /* istanbul ignore next */
  const setCheckBox = () => {
    setIsConfirmCompleteTask(true);
    setCheckCompleteCheckbox(1);
  };

  /* istanbul ignore next */

  const handleMyRes = () => {
    if (myFavourites === 1) {
      setMyFavourites(0);
    }
    setMyResource((prevValue) => (prevValue === 1 ? 0 : 1));
  };

  /* istanbul ignore next */
  const handleMyFav = () => {
    if (myResource === 1) {
      setMyResource(0);
    }
    setMyFavourites((prevValue) => (prevValue === 1 ? 0 : 1));
  };

  /* istanbul ignore next */
  const addResourceFunction = () => {
    const hasCompleteStatus = previousSessionTaskData.some(
      (obj) => obj.complete_status === "1"
    );

    /* istanbul ignore next */
    if (hasCompleteStatus) {
      enqueueSnackbar("Resources cannot be attached to completed tasks.", {
        variant: "error",
      });
    } else {
      setOpenResourceModal(true);
    }
  };

  return (
    <>
      <div>
        <Grid container spacing={2} marginBottom={5}>
          <Grid item xs={6}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead
                  style={{
                    borderRadius: "4px 4px 0px 0px",
                    border: "1px solid rgba(0, 0, 0, 0.20)",
                    background: "#6EC9DB",
                  }}
                >
                  <TableRow>
                    <TableCell style={{ color: "white" }}>
                      Measure Name
                    </TableCell>
                    <TableCell style={{ color: "white" }}>
                      Current Score
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {
                    /* istanbul ignore next */
                    patientMeasureTable?.map((data) => (
                      <TableRow>
                        <TableCell>{data.title}</TableCell>
                        <TableCell>{data.score}</TableCell>
                      </TableRow>
                    ))
                  }

                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      textDecoration: "underline",
                      paddingLeft: "200px",
                    }}
                  >
                    <Typography
                      style={{
                        color: "#6EC9DB",
                      }}
                    >
                      View More
                    </Typography>
                  </Box>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={6}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead
                  style={{
                    borderRadius: "4px 4px 0px 0px",
                    border: "1px solid rgba(0, 0, 0, 0.20)",
                    background: "#6EC9DB",
                  }}
                >
                  <TableRow>
                    <TableCell style={{ color: "white" }}>
                      Monitor Name
                    </TableCell>
                    <TableCell style={{ color: "white" }}>
                      Current Answer
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {
                    /* istanbul ignore next */
                    patientMonitorTable?.map((data) => (
                      <TableRow>
                        <TableCell>{data.name}</TableCell>
                        <TableCell>{data.score}</TableCell>
                      </TableRow>
                    ))
                  }

                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      textDecoration: "underline",
                      paddingLeft: "200px",
                    }}
                  >
                    <Typography
                      style={{
                        color: "#6EC9DB",
                      }}
                    >
                      View More
                    </Typography>
                  </Box>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        <Box>
          <Typography
            style={{
              paddingRight: "15px",
              // color: "#6EC9DB",
              fontWeight: "bold",
              display: "flex",
              textAlign: "start",
            }}
            data-testid="safety_ques"
          >
            Risk
          </Typography>
          <Autocomplete
            multiple
            fullWidth={true}
            data-testid="relapsePlanDropdown"
            id="name"
            value={
              /* istanbul ignore next */
              riskListData && riskListData.getRisksList
                ? riskListData.getRisksList.filter((option) =>
                    riskId.includes(option._id)
                  )
                : []
            }
            options={(riskListData && riskListData.getRisksList) || []}
            getOptionLabel={(option) =>
              /* istanbul ignore next */
              option.name
            }
            onChange={(e, newValue) => {
              /* istanbul ignore next */
              if (newValue) {
                const selectedValues = newValue.map((value) => value._id);
                setRiskId(selectedValues);
              } else {
                setRiskId([]);
              }
            }}
            renderOption={(props, option) => (
              <>
                <Box
                  style={{ display: "flex", flex: 1, width: "100%" }}
                  {...props}
                >
                  <Box style={{ flex: 1 }}>{option.name}</Box>
                </Box>
              </>
            )}
            renderInput={(params) => (
              <TextField
                style={{
                  backgroundColor: "white",
                }}
                {...params}
                size="small"
                className="form-control-bg"
              />
            )}
          />

          <Grid item xs={12} pt={1}>
            <TextFieldComponent
              style={{
                backgroundColor: "white",
              }}
              name="resource_references"
              id="references"
              value={riskInputsBox}
              placeholder={"Please write the risk assessment here"}
              multiline
              rows={4}
              onChange={(e) => handleRiskInputBoxChange(e.target.value)}
              inputProps={{
                "data-testid": `risk_assessment`,
              }}
              fullWidth={true}
              className="form-control-bg"
            />
          </Grid>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingTop: "10px",
          }}
        >
          {lastHomeworkList?.length > 0 && (
            <Box style={{ paddingRight: "10px" }}>
              <FormControl
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  border: "1px solid #6EC9DB",
                  paddingLeft: "10px",
                  borderRadius: "5px",
                  height: "38px",
                }}
                data-testid="complete_checkbox"
              >
                <FormGroup aria-label="position">
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      onChange={setCheckBox}
                      checked={checkCompleteCheckBox === 1 ? true : false}
                      label={
                        <Grid>
                          <Typography
                            style={{ color: "#6EC9DB", fontWeight: "bold" }}
                          >
                            Completed
                          </Typography>
                        </Grid>
                      }
                      disabled={lastHomeworkList?.some((homework) =>
                        homework?.complete_status === 1 ? true : false
                      )}
                    />
                  </FormGroup>
                </FormGroup>
              </FormControl>
            </Box>
          )}

          <Box>
            <Button
              onClick={handleCreateInput}
              data-testid={`add_homework_button`}
              variant="outlined"
              style={{
                color: "#6EC9DB",
                fontWeight: "bold",
                border: "1px solid #6EC9DB",
              }}
            >
              Add Homework
            </Button>
          </Box>
        </Box>

        {lastHomeworkList?.length > 0 && (
          <Box>
            <Typography
              style={{
                paddingRight: "15px",
                color: "#6EC9DB",
                fontWeight: "bold",
                display: "flex",
                textAlign: "start",
              }}
              data-testid="safety_ques"
            >
              Last Session's Homework
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                border: "1px solid #cecece",
                display: "grid",
              }}
              p={5}
              marginBottom={"25px"}
              borderRadius={"7px"}
            >
              {lastHomeworkList?.map((data, index) => (
                <div>
                  <Typography
                    style={{
                      textAlign: "left",
                      color: "#000000DE",
                    }}
                  >
                    {index + 1 + "."}
                    {data.pthomewrk_task}
                  </Typography>
                </div>
              ))}
            </Box>
            {lastHomeworkList?.map((data, index) => (
              <Box style={{ paddingBottom: "20px" }}>
                <Typography
                  style={{
                    paddingRight: "15px",
                    color: "#6EC9DB",
                    fontWeight: "bold",
                    display: "flex",
                    textAlign: "start",
                  }}
                  data-testid="safety_ques"
                >
                  Homework Review Task {index + 1}
                </Typography>
                <Box
                  sx={{
                    border: "1px solid #cecece",
                    padding: "10px",
                  }}
                  borderRadius={"7px"}
                >
                  <Typography
                    style={{
                      paddingRight: "15px",
                      color: "#6EC9DB",
                      fontWeight: "bold",
                      display: "flex",
                      textAlign: "start",
                    }}
                    data-testid="safety_ques"
                  >
                    Patient Response
                  </Typography>

                  <Grid container spacing={2} marginBottom={0}>
                    <Grid item xs={12}>
                      <TextFieldComponent
                        name="resource_references"
                        id="references"
                        value={
                          patientInputs[index]
                            ? patientInputs[index]
                            : data?.pthomewrk_resp
                        }
                        multiline
                        rows={4}
                        onChange={(e) =>
                          /* istanbul ignore next */
                          handlePatientInputChange(
                            index,
                            e.target.value,
                            data._id
                          )
                        }
                        inputProps={{ "data-testid": "resource_references" }}
                        fullWidth={true}
                        className="form-control-bg"
                      />
                    </Grid>
                  </Grid>

                  <Typography
                    style={{
                      paddingRight: "15px",
                      color: "#6EC9DB",
                      fontWeight: "bold",
                      paddingTop: "10px",
                      display: "flex",
                      textAlign: "start",
                    }}
                    data-testid="safety_ques"
                  >
                    Therapist Response
                  </Typography>

                  <Grid container spacing={2} marginBottom={0}>
                    <Grid item xs={12}>
                      <TextFieldComponent
                        name="therapist_resp"
                        id="references"
                        value={
                          therapistInputs[index]
                            ? therapistInputs[index]
                            : data?.therapist_resp
                        }
                        multiline
                        rows={4}
                        onChange={(e) =>
                          /* istanbul ignore next */
                          handleTherapistInputChange(
                            index,
                            e.target.value,
                            data._id
                          )
                        }
                        inputProps={{ "data-testid": "therapist_resp" }}
                        fullWidth={true}
                        className="form-control-bg"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {previousSessionTaskData?.length > 0 && (
          <div>
            {previousSessionTaskData?.map((data, index) => (
              <Box style={{ paddingTop: "10px" }}>
                <Box
                  className="fieldBox second"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingBottom: "5px",
                    paddingTop: "5px",
                  }}
                >
                  <Typography
                    style={{
                      paddingRight: "15px",
                      color: "#6EC9DB",
                      fontWeight: "bold",
                    }}
                    data-testid="safety_ques"
                  >
                    Homework Task {index + 1}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    border: "1px solid #cecece",
                    padding: "10px",
                  }}
                  borderRadius={"7px"}
                >
                  <Grid item xs={12}>
                    <TextFieldComponent
                      name="resource_references"
                      id="references"
                      value={
                        inputs[index] ? inputs[index] : data?.pthomewrk_task
                      }
                      multiline
                      rows={4}
                      onChange={(e) =>
                        /* istanbul ignore next */
                        handleInputChangePrviousHomework(
                          index,
                          e.target.value,
                          data._id
                        )
                      }
                      inputProps={{
                        "data-testid": `Pre_homework_task${index}`,
                      }}
                      fullWidth={true}
                      className="form-control-bg"
                    />
                  </Grid>

                  <Box
                    className="fieldBox second"
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      paddingTop: "10px",
                    }}
                  >
                    <Link
                      data-testid="edit-upload-file"
                      href={data?.resource_url}
                      underline="none"
                      target="_blank"
                      style={{ paddingTop: "10px", paddingRight: "20px" }}
                    >
                      <Typography style={{ color: "black" }}>
                        {data?.resource_name}
                      </Typography>
                    </Link>

                    <Button
                      onClick={() => {
                        /* istanbul ignore next */
                        addResourceFunction();
                        /* istanbul ignore next */
                        setPtHomeworkId(data._id);
                        /* istanbul ignore next */
                        setPtShareId(data.ptshareres_id);
                      }}
                      data-testid={`addNewQuestion_${index}`}
                      variant="outlined"
                      startIcon={<AttachFileIcon />}
                    >
                      Add Resource
                    </Button>

                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        paddingBottom: "5px",
                        paddingLeft: "5px",
                      }}
                    >
                      <IconButtonWrapper
                        aria-label="create"
                        size="small"
                        style={{ backgroundColor: "#6EC9DB" }}
                      >
                        <DeleteIcon
                          style={{ color: "white" }}
                          data-testid={`button-delete-icon${index}`}
                          onClick={() => {
                            setIsConfirmDeleteTask(true);
                            setDeleteTaskId(data._id);
                          }}
                        />
                      </IconButtonWrapper>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </div>
        )}

        {!previousSessionTaskData?.length && (
          <Box>
            {inputs.map((input, index) => (
              <div key={index}>
                <Box
                  className="fieldBox second"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingBottom: "5px",
                    paddingTop: "5px",
                  }}
                >
                  <Typography
                    style={{
                      paddingRight: "15px",
                      color: "#6EC9DB",
                      fontWeight: "bold",
                    }}
                    data-testid="safety_ques"
                  >
                    Homework Task {index + 1}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    border: "1px solid #cecece",
                    padding: "10px",
                  }}
                  borderRadius={"7px"}
                >
                  <Grid item xs={12}>
                    <TextFieldComponent
                      name="resource_references"
                      id="references"
                      value={input}
                      multiline
                      rows={4}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      inputProps={{
                        "data-testid": `homework_task${index}`,
                      }}
                      fullWidth={true}
                      className="form-control-bg"
                    />
                  </Grid>

                  <Box
                    className="fieldBox second"
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      paddingTop: "10px",
                    }}
                  >
                    <Button
                      onClick={() => setOpenResourceModal(true)}
                      data-testid={`addResource2_${index}`}
                      variant="outlined"
                      startIcon={<AttachFileIcon />}
                    >
                      Add Resource
                    </Button>

                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        paddingBottom: "5px",
                        paddingLeft: "5px",
                      }}
                    >
                      <IconButtonWrapper
                        aria-label="create"
                        size="small"
                        style={{ backgroundColor: "#6EC9DB" }}
                      >
                        <DeleteIcon
                          style={{ color: "white" }}
                          onClick={() =>
                            /* istanbul ignore next */
                            handleDeleteInput(index)
                          }
                        />
                      </IconButtonWrapper>
                    </Box>
                  </Box>
                </Box>
              </div>
            ))}
          </Box>
        )}

        <Box style={{ paddingTop: "10px" }}>
          <Typography
            style={{
              paddingRight: "15px",
              // color: "#6EC9DB",
              fontWeight: "bold",
              display: "flex",
              textAlign: "start",
            }}
            data-testid="safety_ques"
          >
            Session Summary
          </Typography>
          <Grid item xs={12} pt={1}>
            <TextFieldComponent
              style={{
                backgroundColor: "white",
              }}
              name="resource_references"
              id="references"
              value={sessionSummaryInputsBox}
              // label="Session Summary"
              // placeholder={"Please write the risk assessment here"}
              multiline
              rows={4}
              onChange={(e) => handleSessionSummaryChange(e.target.value)}
              inputProps={{
                "data-testid": "session_summary",
              }}
              fullWidth={true}
              className="form-control-bg"
            />
          </Grid>
        </Box>

        {/* {inputs.length > 0 ||
        previousSessionTaskData?.length ||
        lastHomeworkList?.length ? ( */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
            paddingTop: "50px",
          }}
        >
          <Grid item xs={6} style={{ paddingRight: "50px" }}>
            <Button
              data-testid="editTemplateSubmitButton"
              variant="contained"
              // type="submit"
              onClick={(e) => {
                /* istanbul ignore next */
                handleSubmit(e);
                setIsConfirm(true);
              }}
              style={{ paddingLeft: "50px", paddingRight: "50px" }}
            >
              Save
            </Button>
          </Grid>
          <Grid item xs={6} textAlign="center">
            <Button
              data-testid="editTemplateCancelButton"
              variant="contained"
              style={{
                paddingLeft: "40px",
                paddingRight: "40px",
                backgroundColor: "#6BA08E",
              }}
              onClick={() => props.onCancel(props.toggleAccordion)}
            >
              Cancel
            </Button>
          </Grid>
        </Box>
        {/* ) : null} */}

        {isConfirm && (
          <ConfirmationModal
            label="Are you sure you want to save sessinon notes?"
            onCancel={clearIsConfirmCancel}
            onConfirm={handlerAddAndUpdate}
          />
        )}

        {isConfirmDeleteTask && (
          <ConfirmationModal
            label="Are you sure you want to delete the task?"
            onCancel={clearIsConfirmCancel}
            onConfirm={handleDeleteHomeworkTask}
          />
        )}

        {deleteTasksuccessModal && (
          <SuccessModal
            isOpen={deleteTasksuccessModal}
            title="Successful"
            description={"Your task has been deleted successfully."}
            onOk={handleOk2}
          />
        )}

        {successModal && (
          <SuccessModal
            isOpen={successModal}
            title="Successful"
            description={"Saved Successfully."}
            onOk={handleOk}
          />
        )}

        {isConfirmCompleteTask && (
          <ConfirmationModal
            label="Are you sure, you want to mark last session's homework as completed?"
            onCancel={clearIsConfirmCancel}
            onConfirm={compleateHomework}
          />
        )}

        {completeTasksuccessModal && (
          <SuccessModal
            isOpen={completeTasksuccessModal}
            title="Successful"
            description={"Your task has been completed successfully."}
            onOk={handleOk}
          />
        )}

        {completeResourceAssignedModal && (
          <SuccessModal
            isOpen={completeResourceAssignedModal}
            title="Successful"
            description={"Resource assigned successfully."}
            onOk={handleOk}
          />
        )}
      </div>

      <ConfirmBoxModal
        infoMessage="You cannot add more than 15 tasks, Please delete a task to add a new task"
        confirmModalRef={confirmModalRef}
      />
      <Stack className={styles.questionsFieldsWrapper}>
        <ConfirmBoxModal
          infoMessage="Homework tasks cannot be added to older session, please add task to the next session."
          confirmModalRef={confirmModalRefForOldHomework}
        />
      </Stack>

      <ResourcePopup
        openResourceModal={openResourceModal}
        setOpenResourceModal={setOpenResourceModal}
        popupData={popupData}
        onSearchData={handleSearchData}
        assigneHomeworkResources={assigneHomeworkResources}
        handleMyRes={handleMyRes}
        handleMyFav={handleMyFav}
      />
    </>
  );
}

export default NotesDetail;
