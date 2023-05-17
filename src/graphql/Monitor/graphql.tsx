import { gql } from "@apollo/client";

export const ADMIN_CREATE_MONITOR = gql`
  mutation adminCreateMonitor(
    $name: String!
    $orgId: String!
    $questions: String!
  ) {
    adminCreateMonitor(name: $name, org_id: $orgId, questions: $questions) {
      duplicateNames {
        _id
        name
      }
      result
    }
  }
`;

export const THERAPIST_CREATE_MONITOR = gql`
  mutation ($name: String!, $questions: String!) {
    therapistCreateMonitor(name: $name, questions: $questions) {
      message
      status
    }
  }
`;
