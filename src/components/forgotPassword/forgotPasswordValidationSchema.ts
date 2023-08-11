import * as Yup from "yup";

export const forgotPasswordValidationSchema = Yup.object().shape({
  username: Yup.string().required("Email is required"),
});

export const securityVerificationCodeValidationSchema = Yup.object().shape({
  code: Yup.string().min(6).max(6).required("Code is required"),
});
