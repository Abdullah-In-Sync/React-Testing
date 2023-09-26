import { Box, Button, Grid } from "@mui/material";
import React, { FormEvent, useState } from "react";
import TextFieldComponent from "../../common/TextField/TextFieldComponent";
import { addPatientFormFields } from "../../../utility/types/resource_types";
import ConfirmationModal from "../../common/ConfirmationModal";

type propTypes = {
  onClickSendregistrationtothepatient?: any;
};

const initialState = {
  email: "",
  patient_firstname: "",
  patient_lastname: "",
  phone_number: "+44",
};

export default function AddPatientForm(props: propTypes) {
  const [isConfirmSubmit, setIsConfirmSubmit] = useState(false);
  const [formFields, setFormFields] =
    useState<addPatientFormFields>(initialState);

  /* istanbul ignore next */
  const set2 = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const fieldName = e.target.name;
    let value = e.target.value;

    // Ensure the value is no longer than 13  characters
    if (fieldName === "phone_number" && value.length > 13) {
      value = value.slice(0, 13);
    }

    setFormFields((oldValues) => ({ ...oldValues, [fieldName]: value }));
  };

  /* istanbul ignore next */
  const clearIsConfirmCancel = () => {
    setIsConfirmSubmit(false);
  };

  /* istanbul ignore next */
  const handleCreatePatient = (formFields) => {
    props.onClickSendregistrationtothepatient(formFields);
  };

  /* istanbul ignore next */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsConfirmSubmit(true);
    /* istanbul ignore next */
    if (!isConfirmSubmit) return;
  };
  return (
    <Box>
      <form onSubmit={handleSubmit} data-testid="resource-add-form">
        <Box style={{ paddingTop: "20px" }}>
          <Grid container spacing={2} marginBottom={2}>
            <Grid item xs={6}>
              <TextFieldComponent
                required={true}
                name="patient_firstname"
                id="patient_firstname"
                label="First Name"
                value={
                  /* istanbul ignore next */
                  formFields?.patient_firstname
                }
                onChange={set2}
                fullWidth={true}
                inputProps={{ "data-testid": "patient_firstname" }}
                variant="outlined"
                className="form-control-bg"
                size="small"
              />
            </Grid>

            <Grid item xs={6}>
              <TextFieldComponent
                required={true}
                name="patient_lastname"
                id="patient_lastname"
                label="Last Name"
                value={
                  /* istanbul ignore next */
                  formFields?.patient_lastname
                }
                onChange={set2}
                fullWidth={true}
                inputProps={{ "data-testid": "patient_lastname" }}
                variant="outlined"
                className="form-control-bg"
                size="small"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} marginBottom={2}>
            <Grid item xs={6}>
              <TextFieldComponent
                required={true}
                name="email"
                id="email"
                label="Email"
                value={
                  /* istanbul ignore next */
                  formFields?.email
                }
                onChange={set2}
                fullWidth={true}
                inputProps={{ "data-testid": "email" }}
                variant="outlined"
                className="form-control-bg"
                size="small"
              />
            </Grid>

            <Grid item xs={6}>
              <TextFieldComponent
                required={true}
                name="phone_number"
                id="phone_number"
                label="Phone Number"
                value={
                  /* istanbul ignore next */
                  formFields?.phone_number
                }
                onChange={set2}
                fullWidth={true}
                inputProps={{ "data-testid": "phone_number" }}
                variant="outlined"
                className="form-control-bg"
                size="small"
              />
            </Grid>
          </Grid>
        </Box>

        <Box style={{ paddingLeft: "10px", paddingRight: "10px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <Button
              data-testid="editTemplateSubmitButton"
              type="submit"
              variant="contained"
            >
              Send registration to the patient
            </Button>

            <Button
              type="submit"
              data-testid="editTemplateCancelButton"
              variant="contained"
              style={{
                backgroundColor: "#6BA08E",
              }}
            >
              Complete registration online
            </Button>
          </Box>
        </Box>
      </form>

      {isConfirmSubmit && (
        <ConfirmationModal
          label="Are you sure you want to add this patient?"
          onCancel={clearIsConfirmCancel}
          onConfirm={() =>
            /* istanbul ignore next */
            handleCreatePatient(formFields)
          }
        />
      )}
    </Box>
  );
}
