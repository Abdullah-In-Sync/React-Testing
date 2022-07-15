
import { gql } from '@apollo/client';

export const GET_USER_TOKEN = gql`
query MyQuery {
  getTokenData {
    _id
    user_type
  }
}
`;

export const GET_FEEDBACK_DATA = gql`
  query GetAdminFeedback($status: String!,$pageNo:Int!) {
    getAdminFeedbackList(status: $status, pageNo:$pageNo) {
        _id
        created_date
        org_id
        feedback_type
        organization_name
        session_no
        question
    }
  }
`;



export const GET_FEEDBACK_BY_ID = gql`
  query GetAdminFeedbackById($feedbackId: String!) {
    getFeedbackQuestionById(feedbackId: $feedbackId) {
        _id
        answer_options
        answer_type
        created_date
        org_id
        feedback_type
        organization_name
        session_no
        question
        status
    }
  }
`;

export const GET_ORG_DATA = gql`
{
    getOrganizationData {
      _id
      name
    }
  }
`;

