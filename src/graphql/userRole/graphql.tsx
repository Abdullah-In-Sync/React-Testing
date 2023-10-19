import { gql } from "@apollo/client";

export const GET_USER_ROLE_LIST = gql`
  query getUserRoleList(
    $limit: Int!
    $pageNo: Int!
    $orgId: String
    $searchText: String
    $accessibility: String
  ) {
    getUserRoleList(
      limit: $limit
      page_no: $pageNo
      org_id: $orgId
      search_text: $searchText
      accessibility: $accessibility
    ) {
      rolelist {
        _id
        accessibility
        created_date
        name
        org_id
        organization_name
        position
        updated_date
        status
        privileges
      }
      totalcount
    }
  }
`;

export const GET_ADMIN_MODULE_LIST = gql`
  query GetAdminModuleList($accessibility: String!) {
    getAdminModuleList(accessibility: $accessibility) {
      modulelist {
        _id
        accessibility
        name
        privileges
        status
      }
      privileges {
        _id
        name
        status
      }
    }
  }
`;

export const ADMIN_ADD_USER_ROLE = gql`
  mutation AdminAddRole(
    $accessibility: String!
    $name: String!
    $org_id: String!
    $position: String!
    $privileges: String!
  ) {
    adminAddRole(
      accessibility: $accessibility
      name: $name
      org_id: $org_id
      position: $position
      privileges: $privileges
    ) {
      duplicateNames {
        _id
        name
      }
      message
      result
    }
  }
`;
