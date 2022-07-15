import { gql } from '@apollo/client';

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
mutation ($feedbackId:ID!,$update:UpdateFeedbackInput!) {
  updateFeedbackQuestionById(feedbackId:$feedbackId, update:$update) {
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
mutation ($feedbackId:ID!,$update:UpdateFeedbackInput!) {
  updateFeedbackQuestionById(feedbackId:$feedbackId, update:$update) {
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