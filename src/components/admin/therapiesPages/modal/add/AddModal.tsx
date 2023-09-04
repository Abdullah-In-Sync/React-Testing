import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import AddTherapy from "./AddModalForm";

interface ViewProps {
  submitForm?: any;
  onPressSubmit?: () => void;
  organizationList?: any;
  disorderDataList?: any;
  receiveOrgId?: any;
  receiveDisorderId?: any;
  receiveName?: any;
}

export const safetyPlanValidationSchema = Yup.object().shape({
  planName: Yup.string().required("Plan name is required"),
  // planDesc: Yup.string().required("Description is required"),
});

const AddModalForm: React.FC<ViewProps> = ({
  submitForm,
  onPressSubmit,
  organizationList,
  disorderDataList,
  receiveOrgId,
  receiveDisorderId,

  receiveName,
}) => {
  const initialValues = {
    planDesc: "",
    planName: "",
  };

  /* istanbul ignore next */
  const onChangeOrgId = (value) => {
    receiveOrgId(value);
  };

  /* istanbul ignore next */
  const onChangeDisorderId = (value) => {
    receiveDisorderId(value);
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
            disorderDataList={disorderDataList}
            onChangeOrgId={onChangeOrgId}
            onChangeDisorderId={onChangeDisorderId}
            onPressSubmit={onPressSubmit}
            onModalNameChange={onChangeName}
          />
        )}
      />
    );
  };
  return <>{commonform()}</>;
};

export default AddModalForm;
