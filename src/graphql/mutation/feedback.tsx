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

// updateFeedbackQuestionById(feedbackId: ID! ,update: UpdateFeedbackInput): FeedbackQuestion
export const POST_PATIENT_FEEDBACK = gql`
  mutation (
    $feedQuesAnsData: String!
    $sessionNo: String!
    $feedbackType: String
  ) {
    postPatientFeedback(
      feedQuesAnsData: $feedQuesAnsData
      sessionNo: $sessionNo
      feedbackType: $feedbackType
    ) {
      _id
      user_id
      org_id
      session_no
      feedback_type
      question
      answer_type
      status
      created_date
      updated_date
      answer_options
      feedback_ans {
        _id
        answer
        created_date
        patient_id
        question_id
        status
        therapist_id
        updated_date
      }
    }
  }
`;
