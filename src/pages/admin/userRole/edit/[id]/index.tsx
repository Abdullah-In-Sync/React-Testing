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
import { commonLogic } from "../../../../../components/userRole/hooks/commonLogic";
import { GET_ORGANIZATION_LIST } from "../../../../../graphql/query/organization";
import {
  ADMIN_UPDATE_USER_ROLE,
  ADMIN_VIEW_ROLE,
  GET_ADMIN_MODULE_LIST,
} from "../../../../../graphql/userRole/graphql";
import { ModulesAllData } from "../../../../../graphql/userRole/types";

const AdminAddUserRole: NextPage = () => {
  const router = useRouter();
  const {
    query: { id: role_id },
  } = router;

  const { enqueueSnackbar } = useSnackbar();
  const confirmRef = useRef<ConfirmElement>(null);
  const { handleSavePress, onPressCancel, redirectionWithDisplayMessage } =
    commonLogic({ confirmRef });
  const redirectUrl = `/admin/accessControl`;
  const [updateAdminUserRole, { loading: updateUserRoleLoading }] = useMutation(
    ADMIN_UPDATE_USER_ROLE
  );
  const {
    data: { getOrganizationData: organizationList = [] } = {},
    loading: loadingOrganizations,
  } = useQuery(GET_ORGANIZATION_LIST, {
    fetchPolicy: "cache-and-network",
  });

  const { data: { getAdminModuleList = {} } = {}, loading: loadingModule } =
    useQuery<ModulesAllData>(GET_ADMIN_MODULE_LIST, {
      variables: {
        accessibility: "",
      },
      fetchPolicy: "cache-and-network",
    });

  const { data: { adminViewRole = {} } = {}, loading: loadingAdminViewRole } =
    useQuery<any>(ADMIN_VIEW_ROLE, {
      variables: {
        role_id,
      },
      fetchPolicy: "cache-and-network",
    });

  const onSubmitForm = async (formFields, doneCallback) => {
    const { privileges } = formFields;
    const updateRole = {
      ...{ name: formFields.name, position: formFields.position },
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
            updateAdminRoleById: {
              result = undefined,
              message = undefined,
            } = {},
          } = data;
          redirectionWithDisplayMessage({
            result,
            message,
            cMessage: "User role updated successfully!",
            redirectUrl,
          });
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
            submitForm={(formFields, formikProps) =>
              handleSavePress(formFields, formikProps, {
                onSubmitForm,
                description: "Are you sure you want to update user role HCP?",
              })
            }
            confirmRef={confirmRef}
            viewData={adminViewRole}
            onPressCancel={() =>
              onPressCancel({
                description:
                  "Are you sure you want to cancel the user role HCP without saving?",
                redirectUrl,
              })
            }
          />
        )}
    </Layout>
  );
};

export default AdminAddUserRole;
