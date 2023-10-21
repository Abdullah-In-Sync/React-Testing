import { Formik } from "formik";
import React from "react";
import { GetAdminModuleList } from "../../../graphql/userRole/types";
import UserRoleForm from "../form/UserRoleForm";

interface ViewProps {
  organizationList?: object[];
  modulelistData: GetAdminModuleList;
  viewData?: any;
}

const ViewUserRole: React.FC<ViewProps> = ({
  modulelistData,
  organizationList,
  viewData,
}) => {
  const {
    privileges: initPrivileges = "{}",
    accessibility = "",
    name = "",
    org_id = "",
    position = "",
  } = viewData;

  const privileges = JSON.parse(initPrivileges);

  const initialValues = {
    name,
    org_id,
    accessibility,
    position,
    privileges,
  };
  const commonform = () => {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={null}
        children={(props: any) => (
          <UserRoleForm
            modulesData={modulelistData}
            formikProps={props}
            organizationList={organizationList}
            view
          />
        )}
      />
    );
  };

  return commonform();
};

export default ViewUserRole;
