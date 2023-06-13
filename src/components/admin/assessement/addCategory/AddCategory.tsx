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
  name: Yup.string().required("Category name is required"),
});

const AddCategory: React.FC<ViewProps> = ({
  data: { onSubmit, value: { name = "" } = {} } = {},
}) => {
  const initialValues = {
    name,
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        children={(props) => <AddCategoryForm {...props} />}
      />
    );
  };
  return <>{commonform()}</>;
};

export default AddCategory;
