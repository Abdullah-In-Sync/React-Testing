import { Formik } from "formik";
import React from "react";
import Form from "./FormAddUser";

interface ViewProps {
  submitForm?: any;
  roleListData?: any;
  organizationList?: any;
  setOrg?: any;
  editPrefilledData?: any;
}

const AddUserMain: React.FC<ViewProps> = ({
  submitForm,
  roleListData,
  organizationList,
  setOrg,
  editPrefilledData,
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
            roleListData={roleListData}
            organizationList={organizationList}
            setOrg={setOrg}
            editPrefilledData={editPrefilledData}
            submit={submitFormData}
          />
        )}
      />
    );
  };
  return <>{commonform()}</>;
};

export default AddUserMain;
