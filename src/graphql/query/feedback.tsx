
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
  query GetAdminFeedback($status: String!,$pageNo: Int!) {
    getAdminFeedbackList(status: $status,pageNo: $pageNo) {
        answer_type
        created_date
        org_id
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

