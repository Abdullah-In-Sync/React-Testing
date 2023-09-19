import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import UploadFile from "./UploadFilesForm";

interface ViewProps {
  submitForm?: any;
  uploadDataSubmit?: any;
}

export const safetyPlanValidationSchema = Yup.object().shape({
  planName: Yup.string().required("Plan name is required"),
  // planDesc: Yup.string().required("Description is required"),
});

const UploadFileMainForm: React.FC<ViewProps> = ({
  submitForm,
  uploadDataSubmit,
}) => {
  const initialValues = {
    planDesc: "",
    planName: "",
  };

  const dataSubmit = (value) => {
    uploadDataSubmit(value);
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={safetyPlanValidationSchema}
        initialValues={initialValues}
        onSubmit={submitForm}
        children={() => <UploadFile dataSubmit={dataSubmit} />}
      />
    );
  };
  return <>{commonform()}</>;
};

export default UploadFileMainForm;
