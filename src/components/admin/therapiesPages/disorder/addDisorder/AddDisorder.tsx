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
  org_id: Yup.string().required("Organisation is required"),
});

const AddDisorder: React.FC<ViewProps> = ({
  data: {
    onSubmit,
    value: { disorder_name = "", therapy_id = "", org_id = "" } = {},
    therapyListData,
    saveButtonText,
    organizationList,
  } = {},
}) => {
  const initialValues = {
    disorder_name,
    therapy_id,
    org_id,
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
            organizationList={organizationList}
          />
        )}
      />
    );
  };
  return <>{commonform()}</>;
};

export default AddDisorder;
