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