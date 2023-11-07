import { Formik, FormikProps } from "formik";
import React, { ForwardedRef } from "react";
import { GetAllModuleList } from "../../../graphql/userRole/types";
import ConfirmWrapper, { ConfirmElement } from "../../common/ConfirmWrapper";
import UserRoleForm from "../form/UserRoleForm";
import * as Yup from "yup";

interface InitialData {
  name: string;
  org_id: string;
  accessibility: string;
  position: string;
  privileges: any;
}

interface ViewProps {
  submitForm?: (
    formData: InitialData,
    formikHelper: FormikProps<InitialData>
  ) => void;
  organizationList?: object[];
  onPressCancel?: () => void;
  confirmRef?: ForwardedRef<ConfirmElement>;
  modulelistData: GetAllModuleList;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter user role"),
  accessibility: Yup.string().required("Please select accessibility"),
  org_id: Yup.string().required("Please select organization"),
  position: Yup.string().required("Please select position"),
});

const AddUserRole: React.FC<ViewProps> = ({
  submitForm,
  onPressCancel,
  confirmRef,
  modulelistData,
  organizationList,
}) => {
  // const { modulelist = [] } = modulelistData || {};
  let privileges = {};

  modulelistData[`${"admin"}_privileges`].forEach((item) => {
    privileges = { ...privileges, ...{ [item.name]: [] } };
  });

  const initialValues = {
    name: "",
    org_id: "",
    accessibility: "admin",
    position: "",
    privileges,
  };
  const commonform = () => {
    return (
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={submitForm}
        children={(props: any) => (
          <UserRoleForm
            modulesData={modulelistData}
            formikProps={props}
            onPressCancel={onPressCancel}
            organizationList={organizationList}
            defaultPrivileges={true}
          />
        )}
      />
    );
  };

  return <ConfirmWrapper ref={confirmRef}>{commonform()}</ConfirmWrapper>;
};

export default AddUserRole;
