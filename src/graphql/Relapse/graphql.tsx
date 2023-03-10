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
