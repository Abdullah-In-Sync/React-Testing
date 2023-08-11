import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { ErrorMessage, Form } from "formik";
import Typography from "@mui/material/Typography";

import * as React from "react";
import VarificationCodeInputs from "../../VarificationCodeInputs/VarificationCodeInputs";
import CommonButton from "../../common/Buttons/CommonButton";
import CommonLoadingButton from "../../common/Buttons/CommonLoadingButton";
import SideImageLayout from "../../layouts/SideImageLayout";
import { useStyles } from "../forgotPasswordStyles";

const SecurityVerificationCodeForm: React.FC<any> = ({
  isSubmitting,
  setFieldValue,
  resendConfirmation,
  username = "",
}) => {
  const styles = useStyles();

  const handleCodeChange = (res) => {
    setFieldValue("code", res);
  };

  return (
    <Stack component="main" className={styles.forgotScreenStack}>
      <SideImageLayout>
        <Box className="formBox">
          <Form className="form">
            <Box>
              <Typography component="h1" variant="h4" fontWeight={"bold"}>
                Enter Code
              </Typography>
              <Typography variant="h6">{`We have sent a password reset code by email to ${username} Enter it below to reset your password.`}</Typography>
            </Box>
            <Box mt={3} textAlign={"center"}>
              <VarificationCodeInputs handleChange={handleCodeChange} />
              <ErrorMessage
                name={`code`}
                component="div"
                className="invalid-input-message"
              />
            </Box>
            <Box>
              <CommonLoadingButton
                type="submit"
                fullWidth
                variant="contained"
                className="loginButton"
                loading={isSubmitting}
                data-testid="verifyCodeButton"
              >
                submit
              </CommonLoadingButton>
              <Box textAlign={"center"}>
                <CommonButton
                  variant="text"
                  onClick={resendConfirmation}
                  data-testid={"resendCodeButton"}
                >
                  Resend the code
                </CommonButton>
              </Box>
            </Box>
          </Form>
        </Box>
      </SideImageLayout>
    </Stack>
  );
};

export default SecurityVerificationCodeForm;
