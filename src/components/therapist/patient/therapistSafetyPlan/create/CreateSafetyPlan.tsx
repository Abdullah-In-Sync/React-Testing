import { InitialFormValues } from "../types";
import { Formik, FormikProps } from "formik";
import React from "react";
import Form from "./Form";
import * as Yup from "yup";

interface ViewProps {
  submitForm?: (
    formData: InitialFormValues,
    formikHelper: FormikProps<InitialFormValues>
  ) => void;
  organizationList?: object[];
  onPressCancel?: () => void;
}

export const safetyPlanValidationSchema = Yup.object().shape({
  planName: Yup.string().required("Plan name is required"),
  // planDesc: Yup.string().required("Description is required"),
});

const CreatePlanForm: React.FC<ViewProps> = ({ submitForm, onPressCancel }) => {
  const initialValues = {
    planDesc: "",
    planName: "",
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={safetyPlanValidationSchema}
        initialValues={initialValues}
        onSubmit={submitForm}
        children={() => <Form onPressCancel={onPressCancel} />}
      />
    );
  };
  return <>{commonform()}</>;
};

export default CreatePlanForm;
