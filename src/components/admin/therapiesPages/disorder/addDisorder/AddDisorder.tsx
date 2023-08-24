import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import AddDisorderForm from "./AddDisorderForm";

interface ViewProps {
  onSubmit?: any;
  assessmentId?: string;
  data?: any;
}

export const validationSchema = Yup.object().shape({
  disorder_name: Yup.string().required("Disorder name is required"),
  therapy_id: Yup.string().required("Therapy is required"),
});

const AddDisorder: React.FC<ViewProps> = ({
  data: {
    onSubmit,
    value: { disorder_name = "", therapy_id = "" } = {},
    therapyListData,
    saveButtonText,
  } = {},
}) => {
  const initialValues = {
    disorder_name,
    therapy_id,
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        children={(props) => (
          <AddDisorderForm
            {...props}
            therapyListData={therapyListData}
            saveButtonText={saveButtonText}
          />
        )}
      />
    );
  };
  return <>{commonform()}</>;
};

export default AddDisorder;
