import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormShareBox from "./monitorFormShare";

interface ViewProps {
  submitForm?: any;
  onPressSubmit?: () => void;
  setPlanId?: any;
  therapistSafetyPlanList?: any;
  receivePlanId: any;
}

export const safetyPlanValidationSchema = Yup.object().shape({
  planName: Yup.string().required("Plan name is required"),
  // planDesc: Yup.string().required("Description is required"),
});

const SharePlanForm: React.FC<ViewProps> = ({
  submitForm,
  onPressSubmit,
  setPlanId,
  therapistSafetyPlanList,
  receivePlanId,
}) => {
  const initialValues = {
    planDesc: "",
    planName: "",
  };

  const onChangePlanId = (value) => {
    /* istanbul ignore next */
    receivePlanId(value);
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={safetyPlanValidationSchema}
        initialValues={initialValues}
        onSubmit={submitForm}
        children={() => (
          <FormShareBox
            therapistSafetyPlanList={therapistSafetyPlanList}
            setPlanId={setPlanId}
            onChangePlanId={onChangePlanId}
            onPressSubmit={onPressSubmit}
          />
        )}
      />
    );
  };
  return <>{commonform()}</>;
};

export default SharePlanForm;
