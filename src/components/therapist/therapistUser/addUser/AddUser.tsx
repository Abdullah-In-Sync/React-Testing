import { Formik } from "formik";
import React from "react";
import Form from "./FormAddUser";

interface ViewProps {
  submitForm?: any;
  roleListData?: any;
}

const AddUserMain: React.FC<ViewProps> = ({ submitForm, roleListData }) => {
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
          <Form roleListData={roleListData} submit={submitFormData} />
        )}
      />
    );
  };
  return <>{commonform()}</>;
};

export default AddUserMain;
