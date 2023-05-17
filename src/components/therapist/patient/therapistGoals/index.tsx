import {
  Box,
  Button,
  Grid,
  Typography,
  styled,
  IconButton,
  Stack,
  TextField,
  Slider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TextFieldComponent from "../../../common/TextField/TextFieldComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  editGoalsFormField,
  therapistGoalsFormField,
} from "../../../../utility/types/resource_types";
import dayjs, { Dayjs } from "dayjs";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  ADD_UPDATE_THERAPIST_GOALS,
  DELETE_THERAPIST_GOALS,
} from "../../../../graphql/mutation/therapist";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { useSnackbar } from "notistack";
import { GET_THERAPIST_GOALS_DATA } from "../../../../graphql/query/therapist";
import { useStyles } from "./style";

type propTypes = {
  setTherapy?: any;
};

const IconButtonWrapper = styled(IconButton)(
  () => `
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  margin-right: 5px;
`
);

const marks = [
  {
    value: 0,
    label: "Start",
  },

  {
    value: 25,
    label: "25% Success",
  },
  {
    value: 50,
    label: "50% Success",
  },
  {
    value: 75,
    label: "75% Success",
  },
  {
    value: 100,
    label: "Complete ",
  },
];

/* istanbul ignore next */
const defaultFormValue = {
  _id: "",
  ptgoal_mygoal: "",
  ptgoal_reviewdate: "",
  ptgoal_achievementdate: "",
  ptgoal_achievementgoal: "",
  ptgoal_success: "",
};

export default function TherapistGoal(props: propTypes) {
  const styles = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const patientId = sessionStorage.getItem("patient_id");

  /* istanbul ignore next */
  const [formFields, setFormFields] =
    useState<therapistGoalsFormField>(defaultFormValue);
  const [goalDate, setGoalDate] = React.useState<Dayjs | null>(null);
  const [achivDate, setAchivDate] = React.useState<Dayjs | null>(null);
  const [inputs, setInputs] = useState([]);
  const [goalInput, setGoalInput] = useState("");
  const [patientInputs, setpatientInputs] = useState();
  const [sliderInputs, setSliderInputs] = useState();
  const [isConfirmCompleteTask, setIsConfirmCompleteTask] = useState(false);
  const [isConfirmAddGoals, setIsAddGoals] = useState(false);
  const [goalIndex, setGoalIndex] = useState(null);
  const [deleteGoalId, setDeleteGoalId] = useState(null);
  const [isConfirmDelete, setIsConfirmDeleteGoal] = useState(false);

  // Mutation
  const [addUpdateGoals] = useMutation(ADD_UPDATE_THERAPIST_GOALS);
  const [deleteGoals] = useMutation(DELETE_THERAPIST_GOALS);

  // Queries
  const [getGoalData, { data: goalsData, refetch }] = useLazyQuery(
    GET_THERAPIST_GOALS_DATA,
    {
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        /* istanbul ignore next */
        setFormFields(data?.getTherapistGoalList);
      },
    }
  );

  /* istanbul ignore next */
  useEffect(() => {
    getGoalData({
      variables: {
        pttherapy_id: props.setTherapy,
        patient_id: patientId,
      },
    });
  }, [props.setTherapy]);

  /* istanbul ignore next */
  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  /* istanbul ignore next */
  const deleteInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const updateGoalInput = (value) => {
    setGoalInput(value);
  };

  /* istanbul ignore next */
  const setGoalTextInput = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index
  ) => {
    const formData = formFields[index];
    let clonedObject: editGoalsFormField = { ...formData };
    clonedObject = {
      ...clonedObject,
      ptgoal_mygoal: e.target.value,
    };
    setFormFields({ ...formFields, [index]: clonedObject });
  };

  /* istanbul ignore next */
  const setAchievementTextInput = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index
  ) => {
    const formData = formFields[index];
    let clonedObject: editGoalsFormField = { ...formData };
    clonedObject = {
      ...clonedObject,
      ptgoal_achievementgoal: e.target.value,
    };
    setFormFields({ ...formFields, [index]: clonedObject });
  };

  /* istanbul ignore next */
  const getGoalChangeDate = (date: any, index) => {
    const formData = formFields[index];
    let clonedObject: editGoalsFormField = { ...formData };
    clonedObject = {
      ...clonedObject,
      ptgoal_reviewdate: dayjs(date).format("MM-DD-YYYY"),
    };
    setFormFields({ ...formFields, [index]: clonedObject });
  };

  /* istanbul ignore next */
  const getAchievementChangeDate = (date: any, index) => {
    const formData = formFields[index];
    let clonedObject: editGoalsFormField = { ...formData };
    clonedObject = {
      ...clonedObject,
      ptgoal_achievementdate: dayjs(date).format("MM-DD-YYYY"),
    };
    setFormFields({ ...formFields, [index]: clonedObject });
  };

  /* istanbul ignore next */
  const goalChangeDate = (newValue: Dayjs | null) => {
    /* istanbul ignore next */
    setGoalDate(newValue);
  };

  /* istanbul ignore next */
  const achivChangeDate = (newValue: Dayjs | null) => {
    /* istanbul ignore next */
    setAchivDate(newValue);
  };

  /* istanbul ignore next */
  const formValueInclude = (goalSuccess) => {
    if (goalSuccess == "0") {
      return 0;
    }

    if (goalSuccess == "1") {
      return 25;
    }

    if (goalSuccess == "2") {
      return 50;
    }

    if (goalSuccess == "3") {
      return 75;
    }

    if (goalSuccess == "4") {
      return 100;
    }
  };

  /* istanbul ignore next */
  const goalSliderChange = (event, index) => {
    let newValue;
    const value = event.target.value;
    const formData = formFields[index];

    switch (value) {
      case 0:
        newValue = 0;
        break;
      case 25:
        newValue = 1;
        break;
      case 50:
        newValue = 2;
        break;
      case 75:
        newValue = 3;
        break;
      case 100:
        newValue = 4;
        break;
    }
    let clonedObject: editGoalsFormField = { ...formData };
    clonedObject = { ...clonedObject, ptgoal_success: newValue };
    setFormFields({ ...formFields, [index]: clonedObject });
  };

  /* istanbul ignore next */
  const goalAddSlider = (event) => {
    let newValue;
    const value = event.target.value;

    switch (value) {
      case 0:
        newValue = 0;
        break;
      case 25:
        newValue = 1;
        break;
      case 50:
        newValue = 2;
        break;
      case 75:
        newValue = 3;
        break;
      case 100:
        newValue = 4;
        break;
    }

    setSliderInputs(newValue);
  };

  // Achivement of goles input handle
  const handlePatientInputChange = (index, value) => {
    setpatientInputs(value);
  };

  /* istanbul ignore next */
  const handlerAddGoal = async () => {
    try {
      await addUpdateGoals({
        variables: {
          patient_id: patientId,
          pttherapy_id: props.setTherapy,
          achievement_date: achivDate,
          achievement_goal: patientInputs,
          goal_id: "",
          goal_success: sliderInputs,
          patient_goal: goalInput,
          review_date: goalDate,
        },
        onCompleted: () => {
          setIsAddGoals(false);
          enqueueSnackbar("Your goal has been saved successfully.", {
            variant: "success",
            autoHideDuration: 2000,
          });
          refetch();
          setInputs([]);
          setpatientInputs(undefined);
          setSliderInputs(undefined);
          setGoalInput(undefined);
          setAchivDate(null);
          setGoalDate(null);
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  /* istanbul ignore next */
  const handlerUpdateGoal = async (formFields) => {
    try {
      await addUpdateGoals({
        variables: {
          patient_id: patientId,
          pttherapy_id: props.setTherapy,
          achievement_date: formFields.ptgoal_achievementdate,
          achievement_goal: formFields.ptgoal_achievementgoal,
          goal_id: formFields._id,
          patient_goal: formFields.ptgoal_mygoal,
          review_date: formFields.ptgoal_reviewdate,
          goal_success: formFields.ptgoal_success,
        },
        onCompleted: () => {
          setIsConfirmCompleteTask(false);
          enqueueSnackbar("Your goal has been updated successfully.", {
            variant: "success",
            autoHideDuration: 2000,
          });
          refetch();
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  /* istanbul ignore next */
  const clearIsConfirmCancel = () => {
    /* istanbul ignore next */
    setIsConfirmCompleteTask(false);
    /* istanbul ignore next */
    setIsAddGoals(false);
    setIsConfirmDeleteGoal(false);
  };

  /* istanbul ignore next */
  const handleDeleteGoal = async () => {
    try {
      await deleteGoals({
        variables: {
          goal_id: deleteGoalId,
          patient_id: patientId,
        },
        onCompleted: () => {
          setIsConfirmDeleteGoal(false);
          enqueueSnackbar("Your Goal has been deleted successfully.", {
            variant: "success",
            autoHideDuration: 2000,
          });
          refetch();
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  /* istanbul ignore next */
  const handleSubmit = async (e, index: number) => {
    e.preventDefault();
    setGoalIndex(index);
    setIsConfirmCompleteTask(true);

    /* istanbul ignore next */
    if (!isConfirmCompleteTask) return;
  };

  return (
    <Box>
      <Box className={styles.addGoalButtonBox}>
        <Button
          className={styles.smallButton}
          data-testid={"addGoalButton"}
          variant="contained"
          onClick={addInput}
          disabled={inputs.length > 0}
        >
          Add Goals
        </Button>
      </Box>
      <Box style={{ paddingBottom: "30px" }}>
        {goalsData?.getTherapistGoalList?.map((data, index) => (
          <Box className={styles.outerBorder} borderRadius={"7px"}>
            <Box key={index}>
              <Box className={styles.deleteButton}>
                <IconButtonWrapper
                  aria-label="create"
                  size="small"
                  style={{ backgroundColor: "#6EC9DB" }}
                  data-testid={`updateDelectIcon${index}`}
                  onClick={() => {
                    setDeleteGoalId(data._id);
                    setIsConfirmDeleteGoal(true);
                  }}
                >
                  <DeleteIcon style={{ color: "white" }} />
                </IconButtonWrapper>
              </Box>
              <Box className={styles.outerBorder} borderRadius={"7px"}>
                <Typography
                  className={styles.textStyle}
                  data-testid="safety_ques"
                >
                  Goal {index + 1} (Added by {data.user_type})
                </Typography>

                <TextFieldComponent
                  name="ptgoal_mygoal"
                  id="ptgoal_mygoal"
                  value={
                    /* istanbul ignore next */
                    formFields[index]?.ptgoal_mygoal
                  }
                  multiline
                  rows={4}
                  onChange={(e) =>
                    /* istanbul ignore next */
                    setGoalTextInput(e, index)
                  }
                  inputProps={{
                    "data-testid": "ptgoal_mygoal",
                  }}
                  fullWidth={true}
                  className="form-control-bg"
                />

                <Box className={styles.datePicker}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={1}>
                      <DatePicker
                        disableFuture
                        label="Goal Date"
                        openTo="year"
                        views={["year", "month", "day"]}
                        value={
                          /* istanbul ignore next */
                          formFields[index]?.ptgoal_reviewdate || null
                        }
                        onChange={(newValue) =>
                          /* istanbul ignore next */
                          getGoalChangeDate(newValue, index)
                        }
                        renderInput={(params) => <TextField {...params} />}
                        className="form-control-bg"
                      />
                    </Stack>
                  </LocalizationProvider>
                </Box>
              </Box>

              <Box className={styles.outerBorder} borderRadius={"7px"}>
                <Typography
                  className={styles.textStyle}
                  data-testid="safety_ques"
                >
                  Achievement of Goals
                </Typography>

                <Grid item xs={12}>
                  <TextFieldComponent
                    name="ptgoal_achievementgoal"
                    id="ptgoal_achievementgoal"
                    value={
                      /* istanbul ignore next */
                      formFields[index]?.ptgoal_achievementgoal
                    }
                    multiline
                    rows={4}
                    onChange={(e) =>
                      /* istanbul ignore next */
                      setAchievementTextInput(e, index)
                    }
                    inputProps={{ "data-testid": "ptgoal_achievementgoal" }}
                    fullWidth={true}
                    className="form-control-bg"
                  />
                </Grid>
                <Box className={styles.datePicker}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={1}>
                      <DatePicker
                        disableFuture
                        label="Achievement Date"
                        openTo="year"
                        views={["year", "month", "day"]}
                        value={formFields[index].ptgoal_achievementdate || null}
                        onChange={(newValue) =>
                          /* istanbul ignore next */
                          getAchievementChangeDate(newValue, index)
                        }
                        renderInput={(params) => <TextField {...params} />}
                        className="form-control-bg"
                      />
                    </Stack>
                  </LocalizationProvider>
                </Box>
              </Box>

              <Box className={styles.outerBorder} borderRadius={"7px"}>
                <Typography
                  className={styles.textStyle}
                  data-testid="safety_ques"
                >
                  Success of Goal achievement
                </Typography>
                <Box className={styles.sliderBox} borderRadius={"7px"}>
                  <Slider
                    data-testid="ptgoal_success"
                    key={
                      /* istanbul ignore next */
                      `slider-${formValueInclude(
                        /* istanbul ignore next */
                        formFields[index]?.ptgoal_success
                      )}`
                    }
                    defaultValue={
                      /* istanbul ignore next */
                      formValueInclude(
                        /* istanbul ignore next */
                        formFields[index]?.ptgoal_success
                      )
                    }
                    onChange={(event) =>
                      /* istanbul ignore next */
                      goalSliderChange(event, index)
                    }
                    step={25}
                    marks={marks}
                    valueLabelDisplay="off"
                  />
                </Box>
              </Box>
            </Box>
            <Box className={styles.saveUpdateButton}>
              <Button
                className={styles.largeButton}
                data-testid="upadteSaveGoalButton"
                variant="contained"
                onClick={(e) => {
                  /* istanbul ignore next */
                  handleSubmit(e, index);
                }}
              >
                Save Goals
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      <Box style={{ paddingBottom: "30px" }}>
        {inputs.map((input, index) => (
          <Box className={styles.outerBorder} borderRadius={"7px"}>
            <Box key={index}>
              <Box className={styles.deleteButton}>
                <IconButtonWrapper
                  aria-label="create"
                  size="small"
                  style={{ backgroundColor: "#6EC9DB" }}
                >
                  <DeleteIcon
                    style={{ color: "white" }}
                    onClick={() =>
                      /* istanbul ignore next */
                      deleteInput(index)
                    }
                  />
                </IconButtonWrapper>
              </Box>
              <Box className={styles.outerBorder} borderRadius={"7px"}>
                <Typography
                  className={styles.textStyle}
                  data-testid="safety_ques"
                >
                  Goal (Added by therapist)
                </Typography>

                <TextFieldComponent
                  name="resource_references"
                  id="references"
                  value={goalInput}
                  multiline
                  rows={4}
                  onChange={(e) => updateGoalInput(e.target.value)}
                  inputProps={{
                    "data-testid": `addGoalTextInput${index}`,
                  }}
                  fullWidth={true}
                  className="form-control-bg"
                />

                <Box className={styles.datePicker}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={1}>
                      <DatePicker
                        disableFuture
                        inputFormat="MM-DD-YYYY"
                        data-testid="StartDateBox"
                        disabled={false}
                        label="Goal Date"
                        openTo="year"
                        views={["year", "month", "day"]}
                        value={goalDate}
                        onChange={goalChangeDate}
                        renderInput={(params) => <TextField {...params} />}
                        className="form-control-bg"
                      />
                    </Stack>
                  </LocalizationProvider>
                </Box>
              </Box>

              <Box className={styles.outerBorder} borderRadius={"7px"}>
                <Typography
                  className={styles.textStyle}
                  data-testid="safety_ques"
                >
                  Achievement of Goals
                </Typography>

                <Grid item xs={12}>
                  <TextFieldComponent
                    name="resource_references"
                    id="references"
                    value={patientInputs}
                    multiline
                    rows={4}
                    onChange={(e) =>
                      handlePatientInputChange(index, e.target.value)
                    }
                    inputProps={{
                      "data-testid": `addAchievementTextInput${index}`,
                    }}
                    fullWidth={true}
                    className="form-control-bg"
                  />
                </Grid>
                <Box className={styles.datePicker}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={1}>
                      <DatePicker
                        disableFuture
                        inputFormat="MM-DD-YYYY"
                        label="Achievement Date"
                        openTo="year"
                        views={["year", "month", "day"]}
                        value={achivDate}
                        onChange={achivChangeDate}
                        renderInput={(params) => <TextField {...params} />}
                        className="form-control-bg"
                      />
                    </Stack>
                  </LocalizationProvider>
                </Box>
              </Box>

              <Box className={styles.outerBorder} borderRadius={"7px"}>
                <Typography
                  className={styles.textStyle}
                  data-testid="safety_ques"
                >
                  Success of Goal achievement
                </Typography>
                <Box className={styles.sliderBox} borderRadius={"7px"}>
                  <Slider
                    data-testid="ptgoal_success"
                    onChange={(event) =>
                      /* istanbul ignore next */
                      goalAddSlider(event)
                    }
                    step={25}
                    marks={marks}
                    valueLabelDisplay="off"
                  />
                </Box>
              </Box>
            </Box>
            <Box className={styles.saveUpdateButton}>
              <Button
                className={styles.largeButton}
                data-testid="addGoalSubmitButton"
                variant="contained"
                onClick={() => {
                  /* istanbul ignore next */
                  if (goalInput.length) {
                    setIsAddGoals(true);
                  } else {
                    enqueueSnackbar("Goal input cannot be blank", {
                      variant: "error",
                    });
                  }
                }}
              >
                Save Goals
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
      {isConfirmAddGoals && (
        <ConfirmationModal
          label="Are you sure you want to save the goal?"
          onCancel={clearIsConfirmCancel}
          onConfirm={handlerAddGoal}
        />
      )}
      {isConfirmCompleteTask && (
        <ConfirmationModal
          label="Are you sure you want to update the goal?"
          onCancel={clearIsConfirmCancel}
          onConfirm={() => handlerUpdateGoal(formFields[goalIndex])}
        />
      )}

      {isConfirmDelete && (
        <ConfirmationModal
          label="Are you sure you want to delete the goal?"
          onCancel={clearIsConfirmCancel}
          onConfirm={handleDeleteGoal}
        />
      )}
    </Box>
  );
}
