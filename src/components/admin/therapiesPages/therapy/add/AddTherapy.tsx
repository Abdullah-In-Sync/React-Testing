import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import AddTherapy from "./AddTherapyForm";

interface ViewProps {
  submitForm?: any;
  onPressSubmit?: () => void;

  organizationList?: any;
  receiveOrgId: any;
  receiveName?: any;
}

export const safetyPlanValidationSchema = Yup.object().shape({
  planName: Yup.string().required("Plan name is required"),
  // planDesc: Yup.string().required("Description is required"),
});

const AddTherapyForm: React.FC<ViewProps> = ({
  submitForm,
  onPressSubmit,
  organizationList,
  receiveOrgId,
  receiveName,
}) => {
  const initialValues = {
    planDesc: "",
    planName: "",
  };

  /* istanbul ignore next */
  const onChangePlanId = (value) => {
    console.log("Koca:org ids valu value ", value);
    const convertedValue = value.flat();
    receiveOrgId(convertedValue);
  };

  /* istanbul ignore next */
  const onChangeName = (value) => {
    receiveName(value);
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={safetyPlanValidationSchema}
        initialValues={initialValues}
        onSubmit={submitForm}
        children={() => (
          <AddTherapy
            organizationList={organizationList}
            onChangePlanId={onChangePlanId}
            onPressSubmit={onPressSubmit}
            onTherapyNameChange={onChangeName}
          />
        )}
      />
    );
  };
  return <>{commonform()}</>;
};

export default AddTherapyForm;
