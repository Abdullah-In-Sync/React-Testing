import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import AddUserForm from "./AddUserForm";
import { phoneRegExp } from "../../../../lib/constants";

interface ViewProps {
  data?: any;
}

export const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().required("Email is required").email("Invalid email"),
  phone_no: Yup.string()
    .required("Phone number is required")
    .matches(phoneRegExp, "Phone number is not valid"),
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
