import { Formik } from "formik";
import React from "react";
import Form from "./FormTagUser";

interface ViewProps {
  submitForm?: any;
  patientList?: any;
}

const TagUserMain: React.FC<ViewProps> = ({ submitForm, patientList }) => {
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
          <Form patientList={patientList} submit={submitFormData} />
        )}
      />
    );
  };
  return <>{commonform()}</>;
};

export default TagUserMain;
