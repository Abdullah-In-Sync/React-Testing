import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import AddUserForm from "./AddUserForm";

interface ViewProps {
  onSubmit?: any;
  assessmentId?: string;
  data?: any;
}

export const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
});

const PatientAddUser: React.FC<ViewProps> = ({
  data: {
    onSubmit,
    value: {
      first_name = "",
      last_name = "",
      email = "",
      phone_no = "",
      role_id = "",
    } = {},
    roles = [],
  } = {},
}) => {
  const initialValues = {
    first_name,
    last_name,
    email,
    phone_no,
    role_id,
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        children={(props) => <AddUserForm formikProps={props} roles={roles} />}
      />
    );
  };
  return <>{commonform()}</>;
};

export default PatientAddUser;
