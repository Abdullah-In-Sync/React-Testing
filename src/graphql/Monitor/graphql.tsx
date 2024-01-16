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
      result
      message
      data {
        _id
        added_by
        created_date
        name
        org_id
        patient_id
        status
        therapist_id
        updated_date
      }
    }
  }
`;

export const PATIENT_VIEW_MONITOR = gql`
  query PatientViewMonitor(
    $monitorId: ID!
    $startDate: String
    $endDate: String
  ) {
    patientViewMonitor(
      monitor_id: $monitorId
      start_date: $startDate
      end_date: $endDate
    ) {
      detail {
        _id
        added_by
        created_date
        name
        org_id
        patient_id
        questions {
          _id
          answer
          answers_list {
            _id
            question_id
            monitor_id
            created_date
            answer
          }
          created_date
          monitor_id
          question
          question_option
          question_type
          status
          updated_date
        }
        share_status
        status
        therapist_id
        updated_date
      }
      message
      result
    }
  }
`;

export const PATIENT_SUBMIT_MONITOR = gql`
  mutation PatientSubmitMonitor($monitorId: ID!, $questions: String!) {
    patientSubmitMonitor(monitor_id: $monitorId, questions: $questions) {
      result
      message
    }
  }
`;

// Piyush
export const GET_THERAPIST_PATIENT_MONITOR_LIST = gql`
  query therapistMonitorList($patient_id: String!) {
    therapistMonitorList(patient_id: $patient_id) {
      data {
        _id
        added_by
        created_date
        name
        org_id
        patient_id
        status
        therapist_id
        updated_date
      }
    }
  }
`;

export const THERAPIST_VIEW_MONITOR = gql`
  query TherapistViewMonitor(
    $patientId: String!
    $monitorId: ID!
    $startDate: String
    $endDate: String
  ) {
    therapistViewMonitor(
      patient_id: $patientId
      monitor_id: $monitorId
      sdate: $startDate
      edate: $endDate
    ) {
      data {
        updated_date
        _id
        added_by
        created_date
        name
        org_id
        patient_id
        share_status
        status
        therapist_id
        questions {
          updated_date
          status
          question_type
          question_option
          question
          monitor_id
          created_date
          answers_list {
            _id
            answer
            created_date
            monitor_id
            question_id
          }
          answer
          _id
        }
      }
    }
  }
`;

export const THERAPIST_SUBMIT_MONITOR = gql`
  mutation TherapistSubmitMonitor(
    $monitorId: ID!
    $patientId: String!
    $questions: String!
  ) {
    therapistSubmitMonitor(
      monitor_id: $monitorId
      patient_id: $patientId
      questions: $questions
    ) {
      message
      result
    }
  }
`;

export const THERAPIST_ADMIN_MONITOR_LIST = gql`
  query GetAdminMonitorList($orgId: String!, $patientId: String!) {
    getAdminMonitorList(org_id: $orgId, patient_id: $patientId) {
      data {
        status
        organization_name
        org_id
        name
        created_date
        _id
        patient_monitor {
          _id
        }
      }
    }
  }
`;

export const THERAPIST_ADD_MONITOR = gql`
  mutation TherapistAddMonitor($monitorId: String!, $patientId: String!) {
    therapistAddMonitor(monitor_id: $monitorId, patient_id: $patientId) {
      result
      message
    }
  }
`;

export const DELETE_SHARED_MONITOR = gql`
  mutation deleteSharedMonitor($patient_id: String!, $ptmon_id: String!) {
    deleteSharedMonitor(patient_id: $patient_id, ptmon_id: $ptmon_id) {
      message
      status
    }
  }
`;
