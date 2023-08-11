import { Formik, FormikProps } from "formik";
import React from "react";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { forgotPasswordValidationSchema } from "./forgotPasswordValidationSchema";

interface InitialFormValues {
  username?: string;
}

interface ViewProps {
  submitForm?: (
    formData: InitialFormValues,
    formikHelper: FormikProps<InitialFormValues>
  ) => void;
}

const ForgotPasswordComponent: React.FC<ViewProps> = ({ submitForm }) => {
  const initialValues = {
    username: "",
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={forgotPasswordValidationSchema}
        initialValues={initialValues}
        onSubmit={submitForm}
        children={(props) => <ForgotPasswordForm {...props} />}
      />
    );
  };

  return <>{commonform()}</>;
};

export default ForgotPasswordComponent;
