import { useMutation, useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useSnackbar } from "notistack";
import { useRef } from "react";
import { ConfirmElement } from "../../../../components/common/ConfirmWrapper";
import Loader from "../../../../components/common/Loader";
import Layout from "../../../../components/layout";
import AddUserRole from "../../../../components/userRole/add/AddUserRole";
import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
import {
  ADMIN_ADD_USER_ROLE,
  GET_ADMIN_MODULE_LIST,
} from "../../../../graphql/userRole/graphql";
import { ModulesData } from "../../../../graphql/userRole/types";
import ContentHeader from "../../../../components/common/ContentHeader";

const AdminAddUserRole: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const confirmRef = useRef<ConfirmElement>(null);
  const [addAdminUserRole, { loading: addUserRoleLoading }] =
    useMutation(ADMIN_ADD_USER_ROLE);
  const {
    data: { getOrganizationData: organizationList = [] } = {},
    loading: loadingOrganizations,
  } = useQuery(GET_ORGANIZATION_LIST);

  const { data: { getAdminModuleList = {} } = {}, loading: loadingModule } =
    useQuery<ModulesData>(GET_ADMIN_MODULE_LIST, {
      variables: {
        accessibility: "admin",
      },
    });

  const onSubmitForm = async (formFields, doneCallback) => {
    const { privileges } = formFields;
    const variables = {
      ...formFields,
      ...{ privileges: JSON.stringify(privileges) },
    };
    try {
      await addAdminUserRole({
        variables,
        fetchPolicy: "network-only",
        onCompleted: (data) => {
          const {
            adminAddRole: { result = undefined, message = undefined } = {},
          } = data;
          if (result) {
            enqueueSnackbar("User role added successfully!", {
              variant: "success",
            });
          } else if (!result && message) {
            enqueueSnackbar(message, {
              variant: "error",
            });
          }
        },
      });
    } catch (e) {
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
      doneCallback();
    } finally {
      doneCallback();
    }
  };

  const handleSavePress = (formFields, { setSubmitting }) => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => onSubmitForm(formFields, callback),
      description: "Are you sure you want to add user role?",
      setSubmitting,
    });
  };

  return (
    <>
      <Layout
        boxStyle={{ height: "100vh" }}
        cardWrapper={{ minHeight: "85vh" }}
      >
        <Loader
          visible={loadingModule || loadingOrganizations || addUserRoleLoading}
        />
        <ContentHeader title="Add User Role" />
        {!loadingModule && !loadingOrganizations && getAdminModuleList && (
          <AddUserRole
            organizationList={organizationList}
            modulelistData={getAdminModuleList}
            submitForm={handleSavePress}
            confirmRef={confirmRef}
          />
        )}
      </Layout>
    </>
  );
};

export default AdminAddUserRole;
