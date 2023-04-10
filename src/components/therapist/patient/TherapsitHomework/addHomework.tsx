import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TextFieldComponent from "../../../common/TextField/TextFieldComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStyles } from "../therapistRelapse/therapistRelapsePlanStyles";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { SuccessModal } from "../../../common/SuccessModal";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ADD_HOMEWORK } from "../../../../graphql/mutation/therapist";
import { useSnackbar } from "notistack";
import { GET_THERAPIST_HOMEWORK } from "../../../../graphql/query/therapist";

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
};

function HomeworkDetails(props: propTypes) {
  const { enqueueSnackbar } = useSnackbar();
  const styles = useStyles();
  const patientId = sessionStorage.getItem("patient_id");

  // Use State
  const [inputs, setInputs] = useState([""]);
  const [therapistInputs, setTherapistInputs] = useState([]);
  const [patientInputs, setpatientInputs] = useState([]);
  const [lptHomeworkId, setLptHomeworkId] = useState([]);
  const [isConfirm, setIsConfirm] = useState(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);

  // Mutation
  const [addHomework] = useMutation(ADD_HOMEWORK);

  // Queries
  const [getTherapistHomeworkData, { data: therapistHomeworkDataData }] =
    useLazyQuery(GET_THERAPIST_HOMEWORK, {
      onCompleted: () => {
        // setLoader(false);
      },
    });

  const lastHomeworkList =
    therapistHomeworkDataData?.therapistViewPatientHomework?.last_homework_list;

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

  const handleCreateInput = () => {
    if (inputs.length >= 15) {
      enqueueSnackbar(
        "You cannot add more than 15 task, Please delete a task to add a new task",
        { variant: "error" }
      );
      return; // exit the function without creating a new input
    }
    setInputs([...inputs, ""]);
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

  const clearIsConfirmCancel = () => {
    /* istanbul ignore next */
    setIsConfirm(false);
  };

  const handleOk = () => {
    /* istanbul ignore next */
    setSuccessModal(false);
  };

  const handlerAddAndUpdate = async () => {
    try {
      await addHomework({
        variables: {
          patient_id: patientId,
          ptsession_id: props.sessionId,
          therapy_id: props.therapyId,
          // pthomework_id: ,

          pthomewrk_task: JSON.stringify(inputs),
          lpthomework_id: JSON.stringify(lptHomeworkId),
          pthomewrk_resp: JSON.stringify(patientInputs),
          therapist_resp: JSON.stringify(therapistInputs),
        },
        onCompleted: () => {
          setIsConfirm(false);
          setSuccessModal(true);
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Please fill the all fields", { variant: "error" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsConfirm(true);
    /* istanbul ignore next */
    if (!isConfirm) return;
  };

  return (
    <div>
      <Stack className={styles.formWrapper}>
        <Box
          className="fieldBox second"
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            onClick={handleCreateInput}
            data-testid={`addNewQuestion_${"planId"}`}
            variant="outlined"
          >
            Add Homework
          </Button>
        </Box>
        {lastHomeworkList?.length > 0 && (
          <Box>
            <Box
              style={{
                paddingRight: "15px",
                color: "#6EC9DB",
                fontWeight: "bold",
              }}
              data-testid="safety_ques"
            >
              Last Session's Homework
            </Box>
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
                  <Typography>
                    {index + 1 + "."}
                    {data.pthomewrk_task}
                  </Typography>
                </div>
              ))}
            </Box>
            {lastHomeworkList?.map((data, index) => (
              <Box>
                <Box
                  style={{
                    paddingRight: "15px",
                    color: "#6EC9DB",
                    fontWeight: "bold",
                  }}
                  data-testid="safety_ques"
                >
                  Homework Review Task {index + 1}
                </Box>
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
                  <Box
                    style={{
                      paddingRight: "15px",
                      color: "#6EC9DB",
                      fontWeight: "bold",
                    }}
                    data-testid="safety_ques"
                  >
                    Patient Response
                  </Box>

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

                  <Box
                    style={{
                      paddingRight: "15px",
                      color: "#6EC9DB",
                      fontWeight: "bold",
                      paddingTop: "10px",
                    }}
                    data-testid="safety_ques"
                  >
                    THERAPIST Response
                  </Box>

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
              <Box
                style={{
                  paddingRight: "15px",
                  color: "#6EC9DB",
                  fontWeight: "bold",
                }}
                data-testid="safety_ques"
              >
                Homework Task {index + 1}
              </Box>

              <IconButtonWrapper
                aria-label="create"
                size="small"
                style={{ backgroundColor: "#6EC9DB" }}
                data-testid={`button-delete-icon_`}
              >
                <DeleteIcon
                  style={{ color: "white" }}
                  onClick={() => handleDeleteInput(index)}
                />
              </IconButtonWrapper>
            </Box>

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
              <Grid container spacing={2} marginBottom={0}>
                <Grid item xs={12}>
                  <TextFieldComponent
                    name="resource_references"
                    id="references"
                    value={input}
                    multiline
                    rows={4}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    inputProps={{ "data-testid": `homework_task${index}` }}
                    fullWidth={true}
                    className="form-control-bg"
                  />
                </Grid>
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
                  onClick={handleCreateInput}
                  data-testid={`addNewQuestion_${"planId"}`}
                  variant="outlined"
                >
                  Add Resource
                </Button>
              </Box>
            </Box>
          </div>
        ))}
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
              onClick={props.onCancel}
            >
              Cancel
            </Button>
          </Grid>
        </Box>
      </Stack>

      {isConfirm && (
        <ConfirmationModal
          label="Are you sure you want to add the homework?"
          onCancel={clearIsConfirmCancel}
          onConfirm={handlerAddAndUpdate}
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
    </div>
  );
}

export default HomeworkDetails;
