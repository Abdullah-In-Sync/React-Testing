import { gql } from "@apollo/client";

export const ADD_HOMEWORK = gql`
  mutation (
    $patient_id: String
    $ptsession_id: String
    $pthomewrk_task: String
    $therapy_id: String
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
