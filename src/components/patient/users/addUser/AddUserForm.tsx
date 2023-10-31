import { Box, Stack } from "@mui/material";
import { Form } from "formik";
import * as React from "react";
import CommonButton from "../../../common/Buttons/CommonButton";
import FormikTextField from "../../../common/FormikFields/FormikTextField";
import FormikSelectDropdown from "../../../common/FormikFields/FormikSelectDropdown";

const AddUserForm: React.FC<any> = ({
  formikProps: { isSubmitting },
  roles,
  isEdit,
  buttonText,
}) => {
  return (
    <Stack className={"addUserFormWrapper"}>
      <Form>
        <Box className="row1 crow">
          <Box>
            <FormikTextField
              name="first_name"
              id="first_name"
              label="First Name*"
              fullWidth={true}
              inputProps={{ "data-testid": "firstNameInput" }}
              variant="outlined"
              className="form-control-bg"
              size="small"
              placeholder="First Name*"
            />
          </Box>
          <Box>
            <FormikTextField
              name="last_name"
              id="last_name"
              label="Last Name*"
              fullWidth={true}
              inputProps={{ "data-testid": "lastNameInput" }}
              variant="outlined"
              className="form-control-bg"
              size="small"
              placeholder="Last Name*"
            />
          </Box>
        </Box>
        <Box className="row2 crow">
          <Box>
            <FormikTextField
              name="email"
              id="email"
              label="Email*"
              fullWidth={true}
              inputProps={{ "data-testid": "emailInput" }}
              variant="outlined"
              className="form-control-bg"
              size="small"
              placeholder="Email*"
              disabled={isEdit}
            />
          </Box>
          <Box>
            <FormikTextField
              name="phone_no"
              id="phone_no"
              label="Phone number*"
              fullWidth={true}
              inputProps={{ "data-testid": "phoneNumberInput" }}
              variant="outlined"
              className="form-control-bg"
              size="small"
              placeholder="Phone number"
              disabled={isEdit}
            />
          </Box>
        </Box>
        <Box className="row3 crow">
          <Box>
            <FormikSelectDropdown
              id="role_id"
              labelId={`role_id`}
              name={`role_id`}
              showDefaultSelectOption={false}
              label="Select Role"
              options={roles}
              mappingKeys={["_id", "name"]}
              size="small"
              className="form-control-bg addRoleDropdown"
              extraProps={{ "data-testid": `addRoleDropdown` }}
              disabled={isEdit}
            />
          </Box>
          <Box />
        </Box>
        <Box className="row4 crow">
          <Box>
            <CommonButton
              disabled={isSubmitting}
              type="submit"
              data-testid="newUserSubmit"
              variant="contained"
            >
              {buttonText || "Save"}
            </CommonButton>
          </Box>
        </Box>
      </Form>
    </Stack>
  );
};

export default AddUserForm;
