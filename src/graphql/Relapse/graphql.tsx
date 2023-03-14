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

export const ADMIN_CREATE_RELAPSE_PLAN = gql`
  mutation adminCreateRelapsePlan(
    $orgId: String = ""
    $planName: String = ""
    $planType: String = ""
    $questions: String = ""
    $planDesc: String = ""
  ) {
    adminCreateRelapsePlan(
      orgId: $orgId
      planName: $planName
      planType: $planType
      questions: $questions
      planDesc: $planDesc
    ) {
      duplicateNames {
        _id
        name
      }
      result
    }
  }
`;
