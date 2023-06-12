import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormEditAssessmentBox from "./FormEditAssessment";

interface ViewProps {
  submitForm?: any;
  onPressSubmit?: () => void;
  prefilledAssessmentName?: any;
  receiveName?: any;
}

export const safetyPlanValidationSchema = Yup.object().shape({
  planName: Yup.string().required("Plan name is required"),
  // planDesc: Yup.string().required("Description is required"),
});

const EditAssessmentForm: React.FC<ViewProps> = ({
  submitForm,
  onPressSubmit,

  prefilledAssessmentName,

  receiveName,
}) => {
  const initialValues = {
    planDesc: "",
    planName: "",
  };

  const onChangeName = (value) => {
    /* istanbul ignore next */
    receiveName(value);
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={safetyPlanValidationSchema}
        initialValues={initialValues}
        onSubmit={submitForm}
        children={() => (
          <FormEditAssessmentBox
            prefilledAssessmentName={prefilledAssessmentName}
            onPressSubmit={onPressSubmit}
            onAssessmentNameChange={onChangeName}
          />
        )}
      />
    );
  };
  return <>{commonform()}</>;
};

export default EditAssessmentForm;
