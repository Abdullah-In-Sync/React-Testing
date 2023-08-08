import { Formik, FormikProps } from "formik";
import React from "react";
import LoginForm from "./Form";
import { LoginValidationSchema } from "./LoginFormValidationSchema";

interface InitialFormValues {
  username?: string;
  password?: string;
}

interface ViewProps {
  submitForm?: (
    formData: InitialFormValues,
    formikHelper: FormikProps<InitialFormValues>
  ) => void;
}

const LoginComponent: React.FC<ViewProps> = ({ submitForm }) => {
  const initialValues = {
    username: "",
    password: "",
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={LoginValidationSchema}
        initialValues={initialValues}
        onSubmit={submitForm}
        children={(props) => <LoginForm {...props} />}
      />
    );
  };

  return <>{commonform()}</>;
};

export default LoginComponent;
