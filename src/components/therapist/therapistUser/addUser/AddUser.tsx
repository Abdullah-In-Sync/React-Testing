import { Formik } from "formik";
import React from "react";
import Form from "./FormAddUser";

interface ViewProps {
  submitForm?: any;
  onPressCancel?: () => void;
  roleListData?: any;
  organizationList?: any;
  setOrg?: any;
}

const AddUserMain: React.FC<ViewProps> = ({
  submitForm,
  onPressCancel,
  roleListData,
  organizationList,
  setOrg,
}) => {
  const submitFormData = (data) => {
    submitForm(data);
  };

  const commonform = () => {
    return (
      <Formik
        enableReinitialize
        initialValues={{}}
        onSubmit={submitForm}
        children={() => (
          <Form
            onPressCancel={onPressCancel}
            roleListData={roleListData}
            submit={submitFormData}
            organizationList={organizationList}
            setOrg={setOrg}
          />
        )}
      />
    );
  };
  return <>{commonform()}</>;
};

export default AddUserMain;
