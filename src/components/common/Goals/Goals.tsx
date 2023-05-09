import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { editGoalsFormField } from "../../../utility/types/resource_types";
import TextFieldComponent from "../TextField/TextFieldComponent";
import Slider from "@mui/material/Slider";
import {
  GET_PATIENTTHERAPY_DATA,
  GET_PATIENT_GOAL_DATA,
} from "../../../graphql/query/common";
import { useAppContext } from "../../../contexts/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import ConfirmationModal from "../ConfirmationModal";
import { useSnackbar } from "notistack";
import { useStyles } from "../../therapist/patient/therapistGoals/style";
import { PATIENT_ADD_UPDATE_GOALS } from "../../../graphql/mutation/patient";
import moment from "moment";

const defaultFormValue = {
  _id: "",
  ptgoal_mygoal: "",
  ptgoal_reviewdate: "",
  ptgoal_achievementdate: "",
  ptgoal_achievementgoal: "",
  ptgoal_success: "",
};

const IconButtonWrapper = styled(IconButton)(
  () => `
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  margin-right: 5px;
`
);

type propTypes = {
  setLoader: any;
};

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

const Goals = (props: propTypes) => {
  const styles = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const patientId = sessionStorage.getItem("patient_id");

  /* istanbul ignore next */
  const { user: { patient_data: { therapist_id: therapistId } } = {} } =
    useAppContext();
  const [therapy, setTherapy] = useState<string>("");
  const [goalIndex, setGoalIndex] = useState(null);
  const [inputs, setInputs] = useState([]);
  const [goalInput, setGoalInput] = useState("");
  const [goalDate, setGoalDate] = React.useState<Dayjs | null>(null);
  const [achivDate, setAchivDate] = React.useState<Dayjs | null>(null);
  const [patientInputs, setpatientInputs] = useState();
  const [sliderInputs, setSliderInputs] = useState();
  const [isConfirmAddGoals, setIsAddGoals] = useState(false);
  const [isConfirmCompleteTask, setIsConfirmCompleteTask] = useState(false);

  const [formFields, setFormFields] =
    useState<editGoalsFormField>(defaultFormValue);

  // Mutation
  const [addUpdateGoals] = useMutation(PATIENT_ADD_UPDATE_GOALS);

  //GraphQL Queries
  const [
    getPatientTherapyData,
    { loading: therapyLoading, data: patientTherapryData },
  ] = useLazyQuery(GET_PATIENTTHERAPY_DATA, {
    onCompleted: (data) => {
      /* istanbul ignore next */
      if (data!.getPatientTherapy) {
        const pttherapyId = data!.getPatientTherapy[0]._id;
        /* istanbul ignore else */
        if (pttherapyId) {
          setTherapy(pttherapyId);
        }
      }
    },
  });

  const [getGoalsData, { loading: GoalsLoading, data: goalsData, refetch }] =
    useLazyQuery(GET_PATIENT_GOAL_DATA, {
      onCompleted: (data) => {
        /* istanbul ignore next */
        setFormFields(data?.getPatientGoalList);
      },
    });

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
  const onTherapyChange = (event: SelectChangeEvent) => {
    /* istanbul ignore else */
    props.setLoader(true);
    /* istanbul ignore next */
    setTherapy(event.target.value);
  };

  useEffect(() => {
    props.setLoader(true);
    getPatientTherapyData();
  }, [therapistId]);

  useEffect(() => {
    /* istanbul ignore next */
    if (!therapyLoading && !GoalsLoading && goalsData && patientTherapryData) {
      props.setLoader(false);
    }
  }, [goalsData, patientTherapryData]);

  useEffect(() => {
    /* istanbul ignore next */
    props.setLoader(true);
    if (therapy) {
      getGoalsData({
        variables: { pttherapyId: therapy },
      });
    }

    props.setLoader(false);
  }, [therapy]);

  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  /* istanbul ignore next */
  const deleteInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const updateGoalInput = (index, value) => {
    setGoalInput(value);
  };

  /* istanbul ignore next */
  const goalChangeDate = (newValue: Dayjs | null) => {
    /* istanbul ignore next */
    setGoalDate(newValue);
  };

  const handlePatientInputChange = (index, value) => {
    setpatientInputs(value);
  };

  const achivChangeDate = (newValue: Dayjs | null) => {
    /* istanbul ignore next */
    setAchivDate(newValue);
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

  const clearIsConfirmCancel = () => {
    /* istanbul ignore next */
    setIsAddGoals(false);
  };

  const handlerAddGoal = async () => {
    try {
      await addUpdateGoals({
        variables: {
          patient_id: patientId,
          pttherapy_id: therapy,
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
          setAchivDate(undefined);
          setGoalDate(undefined);
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
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

  const handlerUpdateGoal = async (formFields) => {
    try {
      await addUpdateGoals({
        variables: {
          patient_id: patientId,
          pttherapy_id: therapy,
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

  const handleSubmit = async (e, index: number) => {
    e.preventDefault();
    setGoalIndex(index);
    setIsConfirmCompleteTask(true);

    /* istanbul ignore next */
    if (!isConfirmCompleteTask) return;
  };
  return (
    <>
      <>
        <Box style={{ textAlign: "right", paddingBottom: "10px" }}>
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
              {
                /* istanbul ignore next */
                patientTherapryData &&
                  patientTherapryData?.getPatientTherapy &&
                  patientTherapryData?.getPatientTherapy.map((v: any) => {
                    return (
                      <MenuItem key={"therapy" + v._id} value={v._id}>
                        {v.therapy_detail.therapy_name}/
                        {v.disorder_detail.disorder_name}/
                        {v.model_detail.model_name}
                      </MenuItem>
                    );
                  })
              }
            </Select>
          </FormControl>
        </Box>

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
          {goalsData?.getPatientGoalList?.map((data, index) => (
            <Box className={styles.outerBorder} borderRadius={"7px"}>
              <Box key={index}>
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
                    <FormControl
                      className={styles.patientSideDate}
                      data-testid="goal_date"
                    >
                      {
                        /* istanbul ignore next */
                        formFields[index]?.ptgoal_reviewdate ? (
                          <Typography style={{ padding: "8px" }}>
                            {/* Goal Date: {formFields[index]?.ptgoal_reviewdate}{" "} */}
                            Goal Date:{" "}
                            {moment(
                              formFields[index]?.ptgoal_reviewdate
                            ).format("DD-MM-YYYY")}
                          </Typography>
                        ) : (
                          <Typography style={{ padding: "8px" }}>
                            No Date Added
                          </Typography>
                        )
                      }
                    </FormControl>
                  </Box>

                  <Box style={{ paddingRight: "10px" }}></Box>
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
                    <FormControl
                      className={styles.patientSideDate}
                      data-testid="achievement_date"
                    >
                      {
                        /* istanbul ignore next */
                        formFields[index]?.ptgoal_achievementdate ? (
                          <Typography style={{ padding: "8px" }}>
                            Achievement Date:{" "}
                            {moment(
                              formFields[index]?.ptgoal_achievementdate
                            ).format("DD-MM-YYYY")}
                          </Typography>
                        ) : (
                          <Typography style={{ padding: "8px" }}>
                            No Date Added
                          </Typography>
                        )
                      }
                    </FormControl>
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
                          formFields[index]?.ptgoal_success
                        )}`
                      }
                      defaultValue={
                        /* istanbul ignore next */
                        formValueInclude(formFields[index]?.ptgoal_success)
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
                  Update Save Goals
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
                    Goal {index + 1} (Added by patient)
                  </Typography>

                  <TextFieldComponent
                    name="resource_references"
                    id="references"
                    value={goalInput}
                    multiline
                    rows={4}
                    onChange={(e) => updateGoalInput(index, e.target.value)}
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
                          inputFormat="DD-MM-YYYY"
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
                          inputFormat="DD-MM-YYYY"
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
                    setIsAddGoals(true);
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
            label="Are you sure, you want to save the Goal?"
            onCancel={clearIsConfirmCancel}
            onConfirm={handlerAddGoal}
          />
        )}

        {isConfirmCompleteTask && (
          <ConfirmationModal
            label="Are you sure, you want to update the Goal?"
            onCancel={clearIsConfirmCancel}
            onConfirm={() => handlerUpdateGoal(formFields[goalIndex])}
          />
        )}
      </>
    </>
  );
};
export default Goals;
