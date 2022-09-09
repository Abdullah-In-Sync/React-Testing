import { gql } from "@apollo/client";

export const GET_USER_TOKEN = gql`
  query MyQuery {
    getTokenData {
      _id
      user_type
    }
  }
`;

export const GET_FEEDBACK_DATA = gql`
  query GetAdminFeedback($status: String!, $pageNo: Int!, $limit: Int!) {
    getAdminFeedbackList(status: $status, pageNo: $pageNo, limit: $limit) {
      totalcount
      feedbackdata {
        _id
        created_date
        org_id
        feedback_type
        answer_options
        organization_name
        session_no
        question
        answer_type
        status
      }
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

export const GET_THERAPISTFEEDBACKLIST_DATA = gql`
  query getTherapistFeedbackList(
    $patientId: String!
    $sessionNo: Int!
    $feedbackType: String!
    $pttherapyId: String!
  ) {
    getTherapistFeedbackList(
      feedbackType: $feedbackType
      patientId: $patientId
      sessionNo: $sessionNo
      pttherapyId: $pttherapyId
    ) {
      _id
      answer_options
      answer_type
      created_date
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
      feedback_type
      org_id
      question
      session_no
      status
      updated_date
      user_id
    }
  }
`;
