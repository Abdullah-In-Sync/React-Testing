import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Form, FormikProps } from "formik";
import Link from "next/link";
import * as React from "react";
import FormikTextField from "../../components/common/FormikFields/FormikTextField";
import CommonLoadingButton from "../common/Buttons/CommonLoadingButton";
import { useStyles } from "./loginStyles";

const LoginForm: React.FC<FormikProps<any>> = ({ isSubmitting }) => {
  const styles = useStyles();

  return (
    <Grid container component="main" className={styles.gridContainer}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className="leftColumnGrid" />
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        component={Paper}
        elevation={6}
        square
        className="rightColumnGrid"
      >
        <Box className="formBox">
          <Form className="form">
            <Box>
              <Typography component="h1" variant="h4" fontWeight={"bold"}>
                Welcome!
              </Typography>
              <Typography variant="h6">Login to your MyHelp Account</Typography>
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
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                autoFocus
              />
              <FormikTextField
                margin="normal"
                name="password"
                id="password"
                fullWidth={true}
                type="password"
                inputProps={{ "data-testid": "password" }}
                variant="outlined"
                className=""
                placeholder="Enter your password"
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined />
                    </InputAdornment>
                  ),
                }}
              />
              <Box textAlign={"right"} className="link">
                <Link href="/forgotPassword">Forgot password?</Link>
              </Box>
            </Box>
            <Box>
              <CommonLoadingButton
                type="submit"
                fullWidth
                variant="contained"
                className="loginButton"
                loading={isSubmitting}
                data-testid="loginButton"
              >
                Login
              </CommonLoadingButton>
              <Box textAlign={"center"} className="link">
                <Link href="https://myhelp.co.uk/privacy-policy.html">
                  <a target="_blank">{"Privacy Policy"}</a>
                </Link>
                &nbsp;-&nbsp;
                <Link href="https://myhelp.co.uk/terms-of-use.html">
                  <a target="_blank">{"Terms of Use"}</a>
                </Link>
              </Box>
            </Box>
          </Form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
