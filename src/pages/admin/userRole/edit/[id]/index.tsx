import { useMutation, useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useRef } from "react";
import { ConfirmElement } from "../../../../../components/common/ConfirmWrapper";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Loader from "../../../../../components/common/Loader";
import Layout from "../../../../../components/layout";
import EditUserRole from "../../../../../components/userRole/edit/EditUserRole";
import { GET_ORGANIZATION_LIST } from "../../../../../graphql/query/organization";
import {
  ADMIN_UPDATE_USER_ROLE,
  ADMIN_VIEW_ROLE,
  GET_ADMIN_MODULE_LIST,
} from "../../../../../graphql/userRole/graphql";
import { ModulesData } from "../../../../../graphql/userRole/types";

const AdminAddUserRole: NextPage = () => {
  const router = useRouter();
  const {
    query: { id: role_id },
  } = router;

  const { enqueueSnackbar } = useSnackbar();
  const confirmRef = useRef<ConfirmElement>(null);
  const [updateAdminUserRole, { loading: updateUserRoleLoading }] = useMutation(
    ADMIN_UPDATE_USER_ROLE
  );
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

  const { data: { adminViewRole = {} } = {}, loading: loadingAdminViewRole } =
    useQuery<any>(ADMIN_VIEW_ROLE, {
      variables: {
        role_id,
      },
    });

  const onSubmitForm = async (formFields, doneCallback) => {
    const { privileges } = formFields;
    const updateRole = {
      ...formFields,
      ...{ privileges: JSON.stringify(privileges) },
    };
    const variables = {
      role_id,
      updateRole,
    };

    try {
      await updateAdminUserRole({
        variables,
        fetchPolicy: "network-only",
        onCompleted: (data) => {
          const {
            adminAddRole: { result = undefined, message = undefined } = {},
          } = data;
          if (result) {
            enqueueSnackbar("User role updated successfully!", {
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
      description: "Are you sure you want to update user role HCP?",
      setSubmitting,
    });
  };

  const onPressCancel = () => {
    confirmRef.current.openConfirm({
      confirmFunction: null,
      description:
        "Are you sure you want to cancel the user role HCP without saving?",
    });
  };

  return (
    <Layout boxStyle={{ height: "100vh" }} cardWrapper={{ minHeight: "85vh" }}>
      <Loader
        visible={loadingModule || loadingOrganizations || updateUserRoleLoading}
      />
      <ContentHeader title="Add User Role" />
      {!loadingModule &&
        !loadingOrganizations &&
        !loadingAdminViewRole &&
        getAdminModuleList && (
          <EditUserRole
            organizationList={organizationList}
            modulelistData={getAdminModuleList}
            submitForm={handleSavePress}
            confirmRef={confirmRef}
            viewData={adminViewRole}
            onPressCancel={onPressCancel}
          />
        )}
    </Layout>
  );
};

export default AdminAddUserRole;
