import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import TextFieldComponent from "../../../common/TextField/TextFieldComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { SuccessModal } from "../../../common/SuccessModal";
import { useLazyQuery, useMutation } from "@apollo/client";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {
  ADD_HOMEWORK,
  ASSIGN_RESOURCE_HOMEWORK,
  COMPLETE_HOMEWORK,
  DELETE_HOMEWORK_TASK,
} from "../../../../graphql/mutation/therapist";
import { useSnackbar } from "notistack";
import {
  GET_POPUP_RESOURCE_LIST_DATA,
  GET_THERAPIST_HOMEWORK,
  GET_THERAPIST_HOMEWORK_OLD_SESSION_DATA,
} from "../../../../graphql/query/therapist";
import ConfirmBoxModal from "../../../common/ConfirmBoxModal";
import { ModalElement } from "../../../common/CustomModal/CommonModal";
import { useAppContext } from "../../../../contexts/AuthContext";
import ResourcePopup from "./resourcePopup";
import { useStyles } from "../../../common/AddQuestionsBox/addQuestionsBoxStyles";

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

function HomeworkDetails(props: propTypes) {
  const { user } = useAppContext();
  const styles = useStyles();
  const orgId = user?.therapist_data?.org_id;
  const { enqueueSnackbar } = useSnackbar();
  const confirmModalRef = useRef<ModalElement>(null);
  const confirmModalRefForOldHomework = useRef<ModalElement>(null);

  const patientId = sessionStorage.getItem("patient_id");

  // Use State
  const [inputs, setInputs] = useState([]);
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
  const [
    getTherapistHomeworkData2,
    { data: therapistHomeworkDataData2, refetch },
  ] = useLazyQuery(GET_THERAPIST_HOMEWORK_OLD_SESSION_DATA, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      console.log("Koca: data ", data);
    },
  });

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

  const lastHomeworkList =
    therapistHomeworkDataData?.therapistViewPatientHomework?.last_homework_list;

  const previousSessionTaskData =
    therapistHomeworkDataData2?.getPatientHomeworkData;

  useEffect(() => {
    getTherapistHomeworkData2({
      variables: {
        patient_id: patientId,
        ptsession_id: props.sessionId,
        therapy_id: props.therapyId,
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

  const handleSearchData = (data) => {
    setSearchValue(data);
  };

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

  const handleInputChangePrviousHomework = (index, value, Id) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);

    const updatedId = [...previoushomeworkId];
    updatedId[index] = Id;
    setPrevioushomeworkId(updatedId);
  };

  const handleInputChange = (index, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
  };

  const handleTherapistInputChange = (index, value, Id) => {
    const updatedInputs = [...therapistInputs];

    updatedInputs[index] = value;
    setTherapistInputs(updatedInputs);

    const updatedId = [...lptHomeworkId];
    updatedId[index] = Id;
    setLptHomeworkId(updatedId);
  };

  const handlePatientInputChange = (index, value, Id) => {
    const updatedInputs = [...patientInputs];
    updatedInputs[index] = value;
    setpatientInputs(updatedInputs);

    const updatedId = [...lptHomeworkId];
    updatedId[index] = Id;
    setLptHomeworkId(updatedId);
  };

  const handleDeleteInput = (index) => {
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
  };

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

  const clearIsConfirmCancel = () => {
    /* istanbul ignore next */
    setIsConfirm(false);
    setIsConfirmDeleteTask(false);
    setIsConfirmCompleteTask(false);
    setCheckCompleteCheckbox("");
  };

  const handleOk = () => {
    /* istanbul ignore next */
    setSuccessModal(false);
    setCompleteTaskSuccessModal(false);
    setCompleteResourceAssignedModal(false);
    setOpenResourceModal(false);
    refetch();
  };

  const handleOk2 = () => {
    /* istanbul ignore next */
    setDeleteTaskSuccessModal(false);
    setInputs([]);
    refetch();
  };

  const setCheckBox = () => {
    setIsConfirmCompleteTask(true);
    setCheckCompleteCheckbox(1);
  };

  const handleMyRes = () => {
    if (myFavourites === 1) {
      setMyFavourites(0);
    }
    setMyResource((prevValue) => (prevValue === 1 ? 0 : 1));
  };

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
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
                        addResourceFunction();
                        setPtHomeworkId(data._id);
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
                          onClick={() => handleDeleteInput(index)}
                        />
                      </IconButtonWrapper>
                    </Box>
                  </Box>
                </Box>
              </div>
            ))}
          </Box>
        )}

        {inputs.length > 0 ||
        previousSessionTaskData?.length ||
        lastHomeworkList?.length ? (
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
        ) : null}

        {isConfirm && (
          <ConfirmationModal
            label="Are you sure you want to save?"
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

export default HomeworkDetails;
