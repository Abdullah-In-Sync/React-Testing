import { gql } from "@apollo/client";

export const UPDATE_RELAPSE_PLAN = gql`
  mutation adminUpdateRelapseById(
    $planId: ID!
    $updatePlan: UpdateRelapseInput
  ) {
    adminUpdateRelapseById(planId: $planId, updatePlan: $updatePlan) {
      _id
    }
  }
`;

export const VIEW_RELAPSE_BY_PLAN_ID = gql`
  query adminViewRelapseById($planId: ID!) {
    adminViewRelapseById(planId: $planId) {
      _id
      created_date
      description
      name
      org_id
      organization_name
      plan_type
      status
      updated_date
      user_id
      user_type
      questions {
        _id
        created_date
        plan_id
        relapse_additional_details
        relapse_ques
        relapse_ques_status
        relapse_ques_type
        relapse_ques_typeoption
        updated_date
        user_id
        user_type
      }
    }
  }
`;
