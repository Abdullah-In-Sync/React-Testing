import { LockOutlined } from "@mui/icons-material";
import { Box, InputAdornment, Stack, Typography } from "@mui/material";
import { Form, FormikProps } from "formik";
import * as React from "react";
import CommonLoadingButton from "../../common/Buttons/CommonLoadingButton";
import FormikTextField from "../../common/FormikFields/FormikTextField";
import SideImageLayout from "../../layouts/SideImageLayout";
import { useStyles } from "../forgotPasswordStyles";

const NewPasswordForm: React.FC<FormikProps<any>> = ({ isSubmitting }) => {
  const styles = useStyles();
  return (
    <Stack component="main" className={styles.forgotScreenStack}>
      <SideImageLayout>
        <Box className="formBox">
          <Form className="form">
            <Box>
              <Typography component="h1" variant="h4" fontWeight={"bold"}>
                Create new password
              </Typography>
              <Typography variant="h6">Create unique password</Typography>
            </Box>
            <Box>
              <Box mt={2.5}>
                <FormikTextField
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  fullWidth={true}
                  inputProps={{ "data-testid": "newPasswordInput" }}
                  variant="outlined"
                  placeholder="New Password"
                  autoComplete="off"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box mt={2}>
                <FormikTextField
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  fullWidth={true}
                  inputProps={{ "data-testid": "confirmPasswordInput" }}
                  variant="outlined"
                  placeholder="Confirm Password"
                  autoComplete="off"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
            <Box mt={2}>
              <Box>
                <CommonLoadingButton
                  loading={isSubmitting}
                  type="submit"
                  data-testid="newPasswordSubmitBtn"
                  variant="contained"
                  fullWidth
                >
                  Reset Password
                </CommonLoadingButton>
              </Box>
            </Box>
          </Form>
        </Box>
      </SideImageLayout>
    </Stack>
  );
};

export default NewPasswordForm;
