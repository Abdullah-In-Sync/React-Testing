import { gql } from "@apollo/client";

export const GET_SAFETY_PLAN_LIST = gql`
  query getSafetyPlanList(
    $limit: Int
    $planType: String
    $pageNo: Int
    $orgId: String
    $searchText: String
  ) {
    getSafetyPlanList(
      limit: $limit
      planType: $planType
      pageNo: $pageNo
      orgId: $orgId
      searchText: $searchText
    ) {
      total
      data {
        _id
        created_date
        description
        name
        organization_name
        org_id
        plan_type
        status
        updated_date
        user_id
        user_type
      }
    }
  }
`;
