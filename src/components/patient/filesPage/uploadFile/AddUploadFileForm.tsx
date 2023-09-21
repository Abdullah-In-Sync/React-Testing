import { Formik } from "formik";
import React from "react";

import Form from "./UploadFileForm";
import { Stack } from "@mui/material";
import * as Yup from "yup";

export const addPatientFileSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  file_name: Yup.string().required("File is required"),
  file_name_file: Yup.mixed().test(
    "type",
    "Only support PDF, MP4, PNG and JPEG file.",
    function (value) {
      if (value == "undefined" || value) {
        return (
          value &&
          (value.type === "image/jpg" ||
            value.type === "image/jpeg" ||
            value.type === "image/png" ||
            value.type === "application/pdf" ||
            value.type === "video/mp4")
        );
      } else {
        return true;
      }
    }
  ),
});

interface ViewProps {
  data?: {
    uploadInitialData?: any;
    onSubmit?: any;
    saveButtonText?: string;
  };
}

const AddUploadFileForm: React.FC<ViewProps> = ({
  data: { uploadInitialData, onSubmit, saveButtonText = "Save" } = {},
}) => {
  const {
    file_name,
    title = "",
    is_private = 0,
    description = "",
    pressedIconButton,
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
        children={(props) => (
          <Form
            {...props}
            saveButtonText={saveButtonText}
            pressedIconButton={pressedIconButton}
          />
        )}
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
