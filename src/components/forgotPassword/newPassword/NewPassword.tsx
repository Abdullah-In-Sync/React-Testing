import { Formik, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";
import NewPasswordForm from "./NewPasswordForm";

interface InitialFormValues {
  newPassword: string;
  confirmPassword: string;
}

interface NewPasswordProps {
  submitForm?: (
    formData: InitialFormValues,
    formikHelper: FormikProps<InitialFormValues>
  ) => void;
}

export const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Password is required")
    .min(8, "Least 8 characters")
    .matches(/[a-z]+/, "Lowercase (a-z) and Uppercase (A-Z)")
    .matches(/[A-Z]+/, "Lowercase (a-z) and Uppercase (A-Z)")
    .matches(/[@$!%*#?&]+/, "Least one number (0-9) and a symbol")
    .matches(/\d+/, "Least one number (0-9) and a symbol"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

const NewPassword: React.FC<NewPasswordProps> = ({ submitForm }) => {
  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };
  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={submitForm}
        children={(props) => <NewPasswordForm {...props} />}
      />
    </>
  );
};

export default NewPassword;
