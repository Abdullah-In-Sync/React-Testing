/* istanbul ignore file */
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormAdminAssessmentBox from "./FormTherapistAddAssessment";

interface ViewProps {
  submitForm?: any;
  onPressSubmit?: () => void;
  organizationList?: any;
  receiveAssessmentId: any;
}

export const safetyPlanValidationSchema = Yup.object().shape({
  planName: Yup.string().required("Plan name is required"),
  // planDesc: Yup.string().required("Description is required"),
});

const TherapistAddAssessmentForm: React.FC<ViewProps> = ({
  submitForm,
  onPressSubmit,
  organizationList,
  receiveAssessmentId,
}) => {
  const initialValues = {
    planDesc: "",
    planName: "",
  };

  /* istanbul ignore next */
  const onChangeAssessmentId = (value) => {
    receiveAssessmentId(value);
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={safetyPlanValidationSchema}
        initialValues={initialValues}
        onSubmit={submitForm}
        children={() => (
          <FormAdminAssessmentBox
            organizationList={organizationList}
            onChangeAssessmentId={onChangeAssessmentId}
            onPressSubmit={onPressSubmit}
          />
        )}
      />
    );
  };
  return <>{commonform()}</>;
};

export default TherapistAddAssessmentForm;
