import { gql } from "@apollo/client";

export const ADD_HOMEWORK = gql`
  mutation (
    $patient_id: String!
    $ptsession_id: String!
    $pthomewrk_task: String!
    $therapy_id: String!
    $lpthomework_id: String
    $pthomework_id: String
    $pthomewrk_resp: String
    $therapist_resp: String
  ) {
    saveHomeworkTask(
      patient_id: $patient_id
      ptsession_id: $ptsession_id
      pthomewrk_task: $pthomewrk_task
      therapy_id: $therapy_id

      lpthomework_id: $lpthomework_id
      pthomework_id: $pthomework_id
      pthomewrk_resp: $pthomewrk_resp
      therapist_resp: $therapist_resp
    ) {
      result
    }
  }
`;

export const DELETE_HOMEWORK_TASK = gql`
  mutation ($patient_id: String!, $pthomework_id: String!) {
    deleteHomeworkTask(patient_id: $patient_id, pthomework_id: $pthomework_id) {
      deleted
    }
  }
`;

export const COMPLETE_HOMEWORK = gql`
  mutation (
    $complete_status: Int!
    $patient_id: String!
    $last_session_homeworkid: String!
  ) {
    completeHomeworkTask(
      complete_status: $complete_status
      patient_id: $patient_id
      last_session_homeworkid: $last_session_homeworkid
    ) {
      result
    }
  }
`;

export const ASSIGN_RESOURCE_HOMEWORK = gql`
  mutation (
    $patient_id: String!
    $ptsession_id: String!
    $therapy_id: String!
    $session_no: String!
    $pthomework_id: String
    $ptshare_id: String
    $source_id: String
    $restype: Int
    $resource_id: String
  ) {
    assignedResource(
      patient_id: $patient_id
      ptsession_id: $ptsession_id
      therapy_id: $therapy_id
      session_no: $session_no
      pthomework_id: $pthomework_id
      ptshare_id: $ptshare_id
      source_id: $source_id
      restype: $restype
      resource_id: $resource_id
    ) {
      _id
    }
  }
`;
