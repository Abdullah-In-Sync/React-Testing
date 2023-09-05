import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import AddCategoryForm from "./AddCategoryForm";

interface ViewProps {
  onSubmit?: any;
  assessmentId?: string;
  data?: any;
}

export const validationSchema = Yup.object().shape({
  category_name: Yup.string().required("Category name is required"),
  disorder_id: Yup.string().required("Disorder is required"),
  model_id: Yup.string().required("Model is required"),
  org_id: Yup.string().required("Organisation is required"),
});

const AddDisorder: React.FC<ViewProps> = ({
  data: {
    onSubmit,
    value: {
      category_name = "",
      disorder_id = "",
      model_id = "",
      org_id = "",
    } = {},
    therapyListData,
    saveButtonText,
    organizationList,
    disorderListData,
    modelListData,
  } = {},
}) => {
  const initialValues = {
    org_id,
    category_name,
    disorder_id,
    model_id,
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        children={(props) => (
          <AddCategoryForm
            {...props}
            therapyListData={therapyListData}
            organizationList={organizationList}
            saveButtonText={saveButtonText}
            disorderListData={disorderListData}
            modelListData={modelListData}
          />
        )}
      />
    );
  };
  return <>{commonform()}</>;
};

export default AddDisorder;
