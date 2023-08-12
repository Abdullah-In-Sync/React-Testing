import { Formik, FormikProps } from "formik";
import React from "react";
import SecurityVerificationCodeForm from "./SecurityVerificationCodeForm";
import { securityVerificationCodeValidationSchema } from "../forgotPasswordValidationSchema";

interface InitialFormValues {
  code?: string;
}

interface ViewProps {
  submitForm?: (
    formData: InitialFormValues,
    formikHelper: FormikProps<InitialFormValues>
  ) => void;
  resendConfirmation?: () => void;
  username?: string;
}

const SecurityVerificationCodeComponent: React.FC<ViewProps> = ({
  submitForm,
  resendConfirmation,
  username,
}) => {
  const initialValues = {
    code: "",
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={securityVerificationCodeValidationSchema}
        initialValues={initialValues}
        onSubmit={submitForm}
        children={(props) => (
          <SecurityVerificationCodeForm
            {...props}
            resendConfirmation={resendConfirmation}
            username={username}
          />
        )}
      />
    );
  };

  return <>{commonform()}</>;
};

export default SecurityVerificationCodeComponent;
