import { gql } from "@apollo/client";

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
