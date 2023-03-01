import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { editGoalsFormField } from "../../../utility/types/resource_types";
import TextFieldComponent from "../TextField/TextFieldComponent";
import SureModal from "../../admin/resource/SureModal";
import Slider from "@mui/material/Slider";
import {
  GET_PATIENTTHERAPY_DATA,
  GET_PATIENT_GOAL_DATA,
} from "../../../graphql/query/common";
import { useAppContext } from "../../../contexts/AuthContext";

const defaultFormValue = {
  _id: "",
  created_date: "",
  patient_id: "",
  ptgoal_achievementdate: "",
  ptgoal_achievementgoal: "",
  ptgoal_audio: "",
  ptgoal_file: "",
  ptgoal_mygoal: "",
  ptgoal_pregoal: "",
  ptgoal_reviewdate: "",
  ptgoal_status: "",
  ptgoal_success: "",
  ptsession_id: "",
  pttherapy_id: "",
  therapist_id: "",
  updated_date: "",
};

type propTypes = {
  onSubmit?: any;
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
  /* istanbul ignore next */
  const { user: { patient_data: { therapist_id: therapistId } } = {} } =
    useAppContext();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmSubmission, setConfirmSubmission] = useState<boolean>(false);
  const [therapy, setTherapy] = useState<string>("");
  const [goalIndex, setGoalIndex] = useState(null);

  const [formFields, setFormFields] =
    useState<editGoalsFormField>(defaultFormValue);

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

  const [getGoalsData, { loading: GoalsLoading, data: goalsData }] =
    useLazyQuery(GET_PATIENT_GOAL_DATA, {
      onCompleted: (data) => {
        /* istanbul ignore next */
        setFormFields(data?.getPatientGoalList);
      },
    });

  //Dropdown queries important

  const formValueInclude = (goalSuccess) => {
    /* istanbul ignore next */
    if (goalSuccess == "0") {
      return 0;
    }
    /* istanbul ignore next */
    if (goalSuccess == "1") {
      return 25;
    }
    /* istanbul ignore next */
    if (goalSuccess == "2") {
      return 50;
    }
    /* istanbul ignore next */
    if (goalSuccess == "3") {
      return 75;
    }
    /* istanbul ignore next */
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

  const handleSubmit = async (e, index: number) => {
    e.preventDefault();
    setGoalIndex(index);
    setModalOpen(true);
    /* istanbul ignore next */
    if (!confirmSubmission) return;
  };

  const set2 = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index
  ) => {
    const formData = formFields[index];
    let clonedObject: editGoalsFormField = { ...formData };
    clonedObject = { ...clonedObject, ptgoal_achievementgoal: e.target.value };
    setFormFields({ ...formFields, [index]: clonedObject });
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

  /* istanbul ignore next */
  const goalChange = (event, index) => {
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

  return (
    <>
      <>
        <form data-testid="goals-form" style={{ paddingBottom: "30px" }}>
          <Box
            style={{
              padding: "20px",
            }}
          >
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
                    patientTherapryData?.getPatientTherapy &&
                    patientTherapryData?.getPatientTherapy.map((v: any) => {
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

            <Box data-testid="boxId">
              {goalsData?.getPatientGoalList?.map((data, index) => (
                <div>
                  <Box
                    style={{
                      paddingRight: "15px",
                      color: "#6BA08E",
                      fontWeight: "bold",
                    }}
                  >
                    {index + 1 + ".Goal "}
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
                          name="ptgoal_mygoal"
                          id="ptgoal_mygoal"
                          value={formFields[index]?.ptgoal_mygoal}
                          multiline
                          rows={4}
                          inputProps={{ "data-testid": "ptgoal_mygoal" }}
                          fullWidth={true}
                          className="form-control-bg"
                          disabled={true}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={0} marginBottom={0}>
                      <Grid item xs={4}></Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          paddingLeft: "220px",
                          paddingTop: "10px",
                          color: "#6EC9DB",
                          font: "bold",
                        }}
                      >
                        <Typography>Review Date</Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <TextFieldComponent
                          required={true}
                          name="ptgoal_reviewdate"
                          id="ptgoal_reviewdate"
                          value={formFields[index]?.ptgoal_reviewdate}
                          fullWidth={true}
                          inputProps={{ "data-testid": "ptgoal_reviewdate" }}
                          variant="outlined"
                          className="form-control-bg"
                          size="small"
                          disabled={true}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box
                    style={{
                      paddingRight: "15px",
                      color: "#6EC9DB",
                      fontWeight: "bold",
                    }}
                    data-testid="safety_ques"
                  >
                    Achievement of Goal
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
                          name="ptgoal_achievementgoal"
                          id="ptgoal_achievementgoal"
                          value={formFields[index]?.ptgoal_achievementgoal}
                          multiline
                          rows={4}
                          onChange={(e) => set2(e, index)}
                          inputProps={{
                            "data-testid": "ptgoal_achievementgoal",
                          }}
                          fullWidth={true}
                          className="form-control-bg"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={0} marginBottom={0}>
                      <Grid item xs={4}></Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          paddingLeft: "220px",
                          paddingTop: "10px",
                          color: "#6EC9DB",
                          font: "bold",
                        }}
                      >
                        <Typography>Review Date</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <TextFieldComponent
                          required={true}
                          name="ptgoal_achievementdate"
                          id="ptgoal_achievementdate"
                          value={formFields[index]?.ptgoal_achievementdate}
                          fullWidth={true}
                          inputProps={{
                            "data-testid": "ptgoal_achievementdate",
                          }}
                          variant="outlined"
                          className="form-control-bg"
                          size="small"
                          disabled={true}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box
                    style={{
                      paddingRight: "15px",
                      color: "#6BA08E",
                      fontWeight: "bold",
                    }}
                    data-testid="safety_ques"
                  >
                    Success of goal achievement
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
                    <Slider
                      data-testid="ptgoal_success"
                      key={`slider-${formValueInclude(
                        formFields[index]?.ptgoal_success
                      )}`}
                      defaultValue={formValueInclude(
                        formFields[index]?.ptgoal_success
                      )}
                      onChange={(event) =>
                        /* istanbul ignore next */
                        goalChange(event, index)
                      }
                      step={25}
                      marks={marks}
                      valueLabelDisplay="off"
                    />
                  </Box>

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
                        style={{
                          paddingLeft: "50px",
                          paddingRight: "50px",
                          backgroundColor: "#6BA08E",
                        }}
                        data-testid={"safetyPlanSubmitButton_" + data?._id}
                        variant="contained"
                        onClick={(e) => {
                          /* istanbul ignore next */
                          handleSubmit(e, index);
                        }}
                      >
                        Save Goals
                      </Button>
                    </Grid>
                  </Box>
                </div>
              ))}
            </Box>
          </Box>
        </form>
      </>
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
            Are you sure want to save Simple Goals
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
              onClick={() => {
                setModalOpen(false);
                props.onSubmit(formFields[goalIndex]);
                props.setLoader(false);
              }}
            >
              Confirm
            </Button>
          </Box>
        </SureModal>
      </>
    </>
  );
};
export default Goals;
