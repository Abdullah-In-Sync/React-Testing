import { gql } from "@apollo/client";

export const GET_ADMIN_ASSESSMENT_LIST = gql`
  query adminAssessmentList(
    $limit: Int
    $pageNo: Int
    $orgId: String
    $searchText: String
  ) {
    adminAssessmentList(
      limit: $limit
      pageNo: $pageNo
      org_id: $orgId
      name: $searchText
    ) {
      data {
        _id
        created_date
        name
        org_id
        organization_name
        status
        updated_date
      }
      total
    }
  }
`;
