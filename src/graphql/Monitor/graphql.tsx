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

export const GET_ADMIN_MONITOR_LIST = gql`
  query adminMonitorList(
    $limit: Int
    $pageNo: Int
    $orgId: String
    $searchText: String
  ) {
    adminMonitorList(
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

export const THERAPIST_CREATE_MONITOR = gql`
  mutation ($name: String!, $questions: String!) {
    therapistCreateMonitor(name: $name, questions: $questions) {
      message
      status
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

export const ADMIN_DELETE_MONITOR_QUESTION = gql`
  mutation AdminDeleteMonitorQs($questionId: ID!) {
    adminDeleteMonitorQs(question_id: $questionId) {
      _id
    }
  }
`;

export const GET_PATIENT_MONITOR_LIST = gql`
  query PatientMonitorList {
    patientMonitorList {
      _id
      added_by
      created_date
      name
      org_id
      patient_id
      therapist_id
      status
      updated_date
    }
  }
`;
