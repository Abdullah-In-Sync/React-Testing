import { useMutation, useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useSnackbar } from "notistack";
import { useRef } from "react";
import { ConfirmElement } from "../../../../components/common/ConfirmWrapper";
import ContentHeader from "../../../../components/common/ContentHeader";
import Loader from "../../../../components/common/Loader";
import Layout from "../../../../components/layout";
import AddUserRole from "../../../../components/userRole/add/AddUserRole";
import { commonLogic } from "../../../../components/userRole/hooks/commonLogic";
import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
import {
  ADMIN_ADD_USER_ROLE,
  GET_ADMIN_MODULE_LIST,
} from "../../../../graphql/userRole/graphql";
import { ModulesAllData } from "../../../../graphql/userRole/types";

const AdminAddUserRole: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const confirmRef = useRef<ConfirmElement>(null);
  const { handleSavePress, onPressCancel, redirectionWithDisplayMessage } =
    commonLogic({ confirmRef });
  const redirectUrl = `/admin/accessControl`;
  const [addAdminUserRole, { loading: addUserRoleLoading }] =
    useMutation(ADMIN_ADD_USER_ROLE);
  const {
    data: { getOrganizationData: organizationList = [] } = {},
    loading: loadingOrganizations,
  } = useQuery(GET_ORGANIZATION_LIST);

  const { data: { getAdminModuleList = {} } = {}, loading: loadingModule } =
    useQuery<ModulesAllData>(GET_ADMIN_MODULE_LIST, {
      variables: {
        accessibility: "",
      },
      fetchPolicy: "cache-and-network",
    });

  const onSubmitForm = async (formFields, doneCallback): Promise<void> => {
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
          redirectionWithDisplayMessage({
            result,
            message,
            cMessage: "User role added successfully!",
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
        visible={loadingModule || loadingOrganizations || addUserRoleLoading}
      />
      <ContentHeader title="Add User Role" />
      {!loadingModule && !loadingOrganizations && getAdminModuleList && (
        <AddUserRole
          organizationList={organizationList}
          modulelistData={getAdminModuleList}
          confirmRef={confirmRef}
          submitForm={(formFields, formikProps) =>
            handleSavePress(formFields, formikProps, {
              onSubmitForm,
              description: "Are you sure you want to add user role HCP?",
            })
          }
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
