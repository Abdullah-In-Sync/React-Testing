import { Formik } from "formik";
import React from "react";

import Form from "./UploadFileForm";
import { Stack } from "@mui/material";
import * as Yup from "yup";
import { FILEEXTENSION } from "../../../../lib/constants";

export const addPatientFileSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  file_name: Yup.string().required("File is required"),
  file_name_file: Yup.mixed().test(
    "type",
    "You can upload jpg, jpeg, png, gif, mp3, wav, mp4, mov, .pdf, doc, docx file type Only.",
    function (value) {
      if (value == "undefined" || value) {
        return value && FILEEXTENSION.indexOf(value.type) > -1;
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
    is_private = 1,
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
