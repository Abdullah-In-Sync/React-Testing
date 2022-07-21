import { gql } from '@apollo/client';
export const GET_PATIENTTHERAPY_DATA = gql`
query GetPatientTherapy($patientId: String) {
  getPatientTherapy(patientId: $patientId) {
    icd10
    dcm5
    risk_of_suicide
    pttherapy_session
    pttherapy_status
    created_date
    therapist_id
    _id
    disorder_id
    model_id
    patient_id
    therapy_id
    therapy_detail {
      _id
      created_date
      org_id
      therapy_name
      therapy_status
      user_id
      user_type
    }
    model_detail {
      _id
      created_date
      disorder_id
      model_name
      model_status
      user_id
      user_type
    }
    disorder_detail {
      _id
      created_date
      disorder_name
      disorder_status
      therapy_id
      user_id
      user_type
    }
  } 
}
`;

export const GET_PATIENTFEEDBACKLIST_DATA = gql`
  query GetPatientFeedbackList($feedbackType: String!, $sessionNo: String!) {
    getPatientFeedbackList(feedbackType: $feedbackType, sessionNo: $sessionNo) {
      _id
      user_id
      org_id
      session_no
      feedback_type
      question
      answer_type
      answer_options
      status
      created_date
      updated_date
    }
  }
`;