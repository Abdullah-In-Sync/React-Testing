import { gql } from "@apollo/client";

export const ADD_FEEDBACK = gql`
  mutation ($feedQuesData: String!) {
    adminCreateFeedback(feedQuesData: $feedQuesData) {
      _id
      answer_type
      created_date
      session_no
      org_id
      question
      status
      updated_date
      user_id
    }
  }
`;

export const UPDATE_FEEDBACK = gql`
  mutation ($feedbackId: ID!, $update: UpdateFeedbackInput!) {
    updateFeedbackQuestionById(feedbackId: $feedbackId, update: $update) {
      _id
      answer_options
      answer_type
      created_date
      feedback_type
      org_id
    }
  }
`;

export const DELETE_FEEDBACK = gql`
  mutation ($feedbackId: String!) {
    deleteFeedbackByAdmin(feedbackId: $feedbackId) {
      result
    }
  }
`;

export const POST_PATIENT_FEEDBACK_NEW = gql`
  mutation (
    $feedQuesAnsData: String!
    $session: String!
    $pttherapyId: String!
  ) {
    answerFeedbackByPatient(
      feedQuesAnsData: $feedQuesAnsData
      session: $session
      pttherapyId: $pttherapyId
    ) {
      result
    }
  }
`;

export const POST_THERAPIST_FEEDBACK_NEW = gql`
  mutation (
    $feedQuesAnsData: String!
    $sessionNo: String!
    $pttherapyId: String!
    $patientId: String!
  ) {
    answerFeedbackByTherapist(
      feedQuesAnsData: $feedQuesAnsData
      sessionNo: $sessionNo
      pttherapyId: $pttherapyId
      patientId: $patientId
    ) {
      _id
      created_date
      description
      feedback_type
      name
      org_id
      organization_name
      patient_name
      questions {
        _id
        answer {
          _id
          answer
          created_date
          patient_id
          pttherapy_id
          question_id
          status
          therapist_id
          updated_date
        }
        answer_options
        answer_type
        created_date
        feedback_id
        question
        status
        updated_date
      }
      session_no
      status
      therapist_name
      therapy_name
      updated_date
      user_id
      user_type
      visibility
    }
  }
`;

export const THERAPIST_ADD_PATIENT = gql`
  mutation (
    $email: String!
    $patient_firstname: String!
    $patient_lastname: String!
    $phone_number: String!
  ) {
    addPatient(
      email: $email
      patient_firstname: $patient_firstname
      patient_lastname: $patient_lastname
      phone_number: $phone_number
    ) {
      message
      result
    }
  }
`;

export const THERAPIST_DELETE_PATIENT = gql`
  mutation ($patient_id: String!) {
    deletePatient(patient_id: $patient_id) {
      message
      result
    }
  }
`;
