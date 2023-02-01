import { InitialFormValues } from "../types";
import { Formik, FormikProps } from "formik";
import { ViewSafetyPlanById } from "../../../../../graphql/SafetyPlan/types";
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
  currentSafetyPlan?: ViewSafetyPlanById;
}

export const safetyPlanValidationSchema = Yup.object().shape({
  planName: Yup.string().required("Plan name is required"),
  // planDesc: Yup.string().required("Description is required"),
});

const CreatePlanForm: React.FC<ViewProps> = ({
  submitForm,
  onPressCancel,
  currentSafetyPlan,
}) => {
  const { name: planName = "", description: planDesc = "" } =
    currentSafetyPlan || {};
  const initialValues = {
    planDesc,
    planName,
  };

  const commonform = () => {
    return (
      <Formik
        enableReinitialize
        validationSchema={safetyPlanValidationSchema}
        initialValues={initialValues}
        onSubmit={submitForm}
        children={() => (
          <Form
            onPressCancel={onPressCancel}
            submitButtonText={currentSafetyPlan ? "Update" : "Save"}
          />
        )}
      />
    );
  };
  return <>{commonform()}</>;
};

export default CreatePlanForm;
