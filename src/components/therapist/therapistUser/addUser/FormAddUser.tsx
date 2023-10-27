import { Box, Button, Grid, Stack } from "@mui/material";
import { Form } from "formik";
import * as React from "react";
import { useStyles } from "../../patient/therapistSafetyPlan/create/therapistSafetyPlanStyles";
import SingleSelectComponent from "../../../common/SelectBox/SingleSelect/SingleSelectComponent";
import TextFieldComponent from "../../../common/TextField/TextFieldComponent";
import { FormEvent, useState } from "react";
import { therapistAddUser } from "../../../../utility/types/resource_types";

const defaultFormValue = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "+44",
  select_role: "",
};

interface ViewProps {
  buttonClick?: (value) => void;
  submit?: any;
  roleListData?: any;
}

const FormBox: React.FC<ViewProps> = ({ submit, roleListData }) => {
  const styles = useStyles();

  const [formFields, setFormFields] = useState<therapistAddUser>({
    ...defaultFormValue,
  });

  const set2 = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const fieldName = e.target.name;
    let value = e.target.value;

    /* istanbul ignore next */
    if (fieldName === "phone" && value.length > 13) {
      value = value.slice(0, 13);
    }

    setFormFields((oldValues) => ({ ...oldValues, [fieldName]: value }));
  };

  const submitFunction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(formFields);
  };
  const formBox = () => {
    return (
      <Stack className={styles.formWrapper}>
        <Form onSubmit={submitFunction} data-testid="role-add-form">
          <Box className="bottomActionButtonsWrapper">
            <Grid container spacing={2} marginBottom={3}>
              <Grid style={{ alignSelf: "stretch" }} item xs={6}>
                <TextFieldComponent
                  required={true}
                  name="first_name"
                  id="first_name"
                  label="First Name"
                  value={formFields.first_name}
                  onChange={set2}
                  fullWidth={true}
                  inputProps={{ "data-testid": "first_name" }}
                  variant="outlined"
                  className="form-control-bg"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextFieldComponent
                  required={true}
                  name="last_name"
                  id="last_name"
                  label="Last Name"
                  value={formFields.last_name}
                  onChange={set2}
                  fullWidth={true}
                  inputProps={{ "data-testid": "last_name" }}
                  variant="outlined"
                  className="form-control-bg"
                  size="small"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} marginBottom={3}>
              <Grid style={{ alignSelf: "stretch" }} item xs={6}>
                <TextFieldComponent
                  required={true}
                  name="email"
                  id="email"
                  label="Email"
                  value={formFields.email}
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
                  name="phone"
                  id="phone"
                  label="Phone Number"
                  value={formFields.phone}
                  onChange={set2}
                  fullWidth={true}
                  inputProps={{ "data-testid": "phone" }}
                  variant="outlined"
                  className="form-control-bg"
                  size="small"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} marginBottom={3}>
              <Grid item xs={6}>
                <SingleSelectComponent
                  fullWidth={true}
                  required={true}
                  id="select_role"
                  labelId="select_role"
                  name="select_role"
                  /* istanbul ignore next */
                  value={formFields.select_role}
                  label="Select Role"
                  onChange={set2}
                  inputProps={{ "data-testid": "select_roledsd" }}
                  options={
                    (roleListData && roleListData.getRolesbyAccessbility) || []
                  }
                  mappingKeys={["_id", "name"]}
                  size="small"
                  className="form-control-bg"
                />
              </Grid>
            </Grid>
            <Box>
              <Button
                type="submit"
                data-testid="submitForm"
                variant="contained"
              >
                Save
              </Button>
            </Box>
          </Box>
        </Form>
      </Stack>
    );
  };

  return <Box className="actionsWrapper">{formBox()}</Box>;
};

export default FormBox;
