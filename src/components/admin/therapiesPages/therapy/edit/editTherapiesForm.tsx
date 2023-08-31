import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormEditTherapiesBox from "./FormEditherapies";

interface ViewProps {
  submitForm?: any;
  onPressSubmit?: () => void;
  prefilledAssessmentName?: any;
  receiveName?: any;
}

export const safetyPlanValidationSchema = Yup.object().shape({
  planName: Yup.string().required("Plan name is required"),
});

const EditTherapiesForm: React.FC<ViewProps> = ({
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
          <FormEditTherapiesBox
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

export default EditTherapiesForm;
