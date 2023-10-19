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
