import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Loader from "../../../../../components/common/Loader";
import Layout from "../../../../../components/layout";
import ViewUserRole from "../../../../../components/userRole/view/ViewUserRole";
import { GET_ORGANIZATION_LIST } from "../../../../../graphql/query/organization";
import {
  ADMIN_VIEW_ROLE,
  GET_ADMIN_MODULE_LIST,
} from "../../../../../graphql/userRole/graphql";
import { ModulesData } from "../../../../../graphql/userRole/types";

const AdminAddUserRole: NextPage = () => {
  const router = useRouter();
  const {
    query: { id: role_id },
  } = router;

  const {
    data: { getOrganizationData: organizationList = [] } = {},
    loading: loadingOrganizations,
  } = useQuery(GET_ORGANIZATION_LIST);

  const { data: { getAdminModuleList = {} } = {}, loading: loadingModule } =
    useQuery<ModulesData>(GET_ADMIN_MODULE_LIST, {
      variables: {
        accessibility: "",
      },
    });

  const { data: { adminViewRole = {} } = {}, loading: loadingAdminViewRole } =
    useQuery<any>(ADMIN_VIEW_ROLE, {
      variables: {
        role_id,
      },
    });

  return (
    <Layout boxStyle={{ height: "100vh" }} cardWrapper={{ minHeight: "85vh" }}>
      <Loader visible={loadingModule || loadingOrganizations} />
      <ContentHeader title="Add User Role" />
      {!loadingModule &&
        !loadingOrganizations &&
        !loadingAdminViewRole &&
        getAdminModuleList && (
          <ViewUserRole
            organizationList={organizationList}
            modulelistData={getAdminModuleList}
            viewData={adminViewRole}
          />
        )}
    </Layout>
  );
};

export default AdminAddUserRole;
