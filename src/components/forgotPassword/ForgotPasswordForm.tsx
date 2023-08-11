import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import { Form, FormikProps } from "formik";
import Link from "next/link";
import * as React from "react";
import CommonLoadingButton from "../common/Buttons/CommonLoadingButton";
import FormikTextField from "../common/FormikFields/FormikTextField";
import SideImageLayout from "../layouts/SideImageLayout";
import { useStyles } from "./forgotPasswordStyles";

const ForgotPasswordForm: React.FC<FormikProps<any>> = ({ isSubmitting }) => {
  const styles = useStyles();

  return (
    <Stack className={styles.forgotScreenStack}>
      <SideImageLayout>
        <Box className="formBox">
          <Form className="form">
            <Box>
              <Typography component="h1" variant="h4" fontWeight={"bold"}>
                Forgot Password?
              </Typography>
              <Typography variant="h6">
                No worries, we will send you reset instructions
              </Typography>
            </Box>
            <Box mt={1}>
              <FormikTextField
                margin="normal"
                name="username"
                id="username"
                fullWidth={true}
                inputProps={{ "data-testid": "userName" }}
                variant="outlined"
                className=""
                placeholder="Your email address"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                autoFocus
              />
            </Box>
            <Box>
              <CommonLoadingButton
                type="submit"
                fullWidth
                variant="contained"
                className="loginButton"
                loading={isSubmitting}
                data-testid="forgotPasswordButton"
              >
                submit
              </CommonLoadingButton>
              <Box textAlign={"center"} className="link backLinkWrapper">
                <KeyboardBackspaceOutlinedIcon className="backIcon" />{" "}
                <Link href="/login">{"Back to login"}</Link>
              </Box>
            </Box>
          </Form>
        </Box>
      </SideImageLayout>
    </Stack>
  );
};

export default ForgotPasswordForm;
