import { Box, Stack } from "@mui/material";
import { Form, FormikProps } from "formik";
import * as React from "react";
import CommonLoadingButton from "../common/Buttons/CommonLoadingButton";
import FormikTextField from "../common/FormikFields/FormikTextField";

const ChagnePasswordForm: React.FC<FormikProps<any>> = ({ isSubmitting }) => {
  return (
    <Stack className={"changePasswordFormWrapper"}>
      <Form>
        <Box className="row1 crow">
          <Box className="inputWrapper">
            <FormikTextField
              type="password"
              name="oldPassword"
              id="oldPassword"
              fullWidth={true}
              inputProps={{ "data-testid": "oldPasswordInput" }}
              variant="outlined"
              className="form-control-bg"
              size="small"
              placeholder="Old Password"
              autoComplete="off"
            />
          </Box>
          <Box className="inputWrapper">
            <FormikTextField
              type="password"
              name="newPassword"
              id="newPassword"
              fullWidth={true}
              inputProps={{ "data-testid": "newPasswordInput" }}
              variant="outlined"
              className="form-control-bg"
              size="small"
              placeholder="Password"
              autoComplete="off"
            />
          </Box>
          <Box className="inputWrapper">
            <FormikTextField
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              fullWidth={true}
              inputProps={{ "data-testid": "confirmPasswordInput" }}
              variant="outlined"
              className="form-control-bg"
              size="small"
              placeholder="Confirm Password"
              autoComplete="off"
            />
          </Box>
        </Box>
        <Box className="row2 crow">
          <Box>
            <CommonLoadingButton
              loading={isSubmitting}
              type="submit"
              data-testid="changePasswordSubmitBtn"
              variant="contained"
            >
              Set Password
            </CommonLoadingButton>
          </Box>
        </Box>
      </Form>
    </Stack>
  );
};

export default ChagnePasswordForm;
