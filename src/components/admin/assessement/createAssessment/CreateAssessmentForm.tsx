import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormAssessmentBox from "./FormAssessment";

interface ViewProps {
  submitForm?: any;
  organizationList?: any;
  receiveAllData?: any;
}

export const safetyPlanValidationSchema = Yup.object().shape({
  planName: Yup.string().required("Plan name is required"),
  // planDesc: Yup.string().required("Description is required"),
});

const CreateAssessmentForm: React.FC<ViewProps> = ({
  submitForm,
  organizationList,
  receiveAllData,
}) => {
  const initialValues = {
    planDesc: "",
    planName: "",
  };

  const setSendRecFormData = (value) => {
    receiveAllData(value);
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={safetyPlanValidationSchema}
        initialValues={initialValues}
        onSubmit={submitForm}
        children={() => (
          <FormAssessmentBox
            organizationList={organizationList}
            setSendFormData={setSendRecFormData}
          />
        )}
      />
    );
  };
  return <>{commonform()}</>;
};

export default CreateAssessmentForm;
