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

export const DELETE_THERAPIST_MY_MONITOR = gql`
  mutation ($monitor_id: String!) {
    deleteTherapistMonitor(monitor_id: $monitor_id) {
      deleted
    }
  }
`;

export const SHARE_THERAPIST_MY_MONITOR = gql`
  mutation ($monitor_id: String!, $patient_id: String!) {
    shareTherapistMonitor(monitor_id: $monitor_id, patient_id: $patient_id) {
      message
      status
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

export const ADD_UPDATE_THERAPIST_GOALS = gql`
  mutation (
    $patient_id: String!
    $pttherapy_id: String!
    $achievement_date: String
    $achievement_goal: String
    $goal_id: String
    $goal_success: Int
    $patient_goal: String!
    $review_date: String
  ) {
    addUpdateTherapistGoal(
      patient_id: $patient_id
      pttherapy_id: $pttherapy_id
      achievement_date: $achievement_date
      achievement_goal: $achievement_goal
      goal_id: $goal_id
      goal_success: $goal_success
      patient_goal: $patient_goal
      review_date: $review_date
    ) {
      result
    }
  }
`;

export const DELETE_THERAPIST_GOALS = gql`
  mutation ($goal_id: String!, $patient_id: String!) {
    deleteTherapistGoal(goal_id: $goal_id, patient_id: $patient_id) {
      result
    }
  }
`;
