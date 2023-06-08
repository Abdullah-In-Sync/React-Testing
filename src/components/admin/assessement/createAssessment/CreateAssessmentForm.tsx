import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormAssessmentBox from "./FormAssessment";

interface ViewProps {
  submitForm?: any;
  onPressSubmit?: () => void;
  setPlanId?: any;
  organizationList?: any;
  receivePlanId: any;
  receiveName?: any;
}

export const safetyPlanValidationSchema = Yup.object().shape({
  planName: Yup.string().required("Plan name is required"),
  // planDesc: Yup.string().required("Description is required"),
});

const CreateAssessmentForm: React.FC<ViewProps> = ({
  submitForm,
  onPressSubmit,
  setPlanId,
  organizationList,
  receivePlanId,
  receiveName,
}) => {
  const initialValues = {
    planDesc: "",
    planName: "",
  };

  //   const onChangePlanId = (value) => {
  //     console.log("Koca: onChangePlanId value ", value);
  //     /* istanbul ignore next */
  //     receivePlanId(value);
  //   };

  const onChangePlanId = (value) => {
    console.log("Koca: onChangePlanId value ", value);
    /* istanbul ignore next */
    const convertedValue = value.flat();
    receivePlanId(convertedValue);
  };

  const onChangeName = (value) => {
    console.log("Koca:onChangeName value ", value);
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
          <FormAssessmentBox
            organizationList={organizationList}
            setPlanId={setPlanId}
            onChangePlanId={onChangePlanId}
            onPressSubmit={onPressSubmit}
            onAssessmentNameChange={onChangeName}
          />
        )}
      />
    );
  };
  return <>{commonform()}</>;
};

export default CreateAssessmentForm;
