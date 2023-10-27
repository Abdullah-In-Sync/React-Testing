import { gql } from "@apollo/client";

export const GET_CUSTOM_USERS_LIST = gql`
  query getCustomUsersList(
    $limit: Int!
    $pageNo: Int!
    $searchText: String
    $orgId: String
    $roleId: String
  ) {
    getCustomUsersList(
      limit: $limit
      page_no: $pageNo
      name: $searchText
      org_id: $orgId
      role_id: $roleId
    ) {
      total
      data {
        _id
        first_name
        last_name
        role_detail {
          _id
          name
          organization_name
          status
        }
      }
    }
  }
`;

export const GET_ROLES_BY_ACCESSBILITY = gql`
  query getRolesbyAccessbility($orgId: String) {
    getRolesbyAccessbility(org_id: $orgId) {
      _id
      name
      org_id
    }
  }
`;
