import { Formik } from "formik";
import React from "react";

import Form from "./UploadFileForm";
import { Stack } from "@mui/material";
import * as Yup from "yup";

export const addPatientFileSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  file_name_file: Yup.mixed()
    .required("File is required")
    .test("type", "Only support PDF, PNG and JPEG file.", function (value) {
      if (value == "undefined" || value) {
        return (
          value &&
          (value.type === "image/jpg" ||
            value.type === "image/jpeg" ||
            value.type === "image/png" ||
            value.type === "application/pdf")
        );
      } else {
        return true;
      }
    }),
});

interface ViewProps {
  data?: {
    uploadInitialData?: any;
    onSubmit?: any;
  };
}

const AddUploadFileForm: React.FC<ViewProps> = ({
  data: { uploadInitialData, onSubmit } = {},
}) => {
  const {
    file_name,
    title = "",
    is_private = 0,
    description = "",
  } = uploadInitialData || {};

  const initialValues = {
    file_name,
    title,
    is_private,
    description,
    file_name_file: undefined,
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={addPatientFileSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        children={(props) => <Form {...props} saveButtonText={"Save"} />}
      />
    );
  };
  return (
    <>
      <Stack className="formWrapper">{commonform()}</Stack>
    </>
  );
};

export default AddUploadFileForm;
