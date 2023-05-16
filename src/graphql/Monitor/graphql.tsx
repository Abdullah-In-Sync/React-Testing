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

export const ADMIN_VIEW_MONITOR = gql`
  query AdminViewMonitorById($monitorId: ID!) {
    adminViewMonitorById(monitor_id: $monitorId) {
      _id
      name
      created_date
      org_id
      organization_name
      status
      updated_date
      questions {
        _id
        created_date
        monitor_id
        question
        question_option
        question_type
        status
        updated_date
      }
    }
  }
`;

export const ADMIN_UPDATE_MONITOR = gql`
  mutation AdminUpdateMonitorById(
    $monitorId: ID!
    $update: UpdateMonitorInput
    $questions: String
  ) {
    adminUpdateMonitorById(
      monitor_id: $monitorId
      questions: $questions
      update: $update
    ) {
      _id
      status
    }
  }
`;
