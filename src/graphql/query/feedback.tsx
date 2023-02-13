import { gql } from "@apollo/client";

export const GET_USER_TOKEN = gql`
  query MyQuery {
    getTokenData {
      _id
      user_type
    }
  }
`;

export const GET_ADMIN_FEEDBACK_LIST = gql`
  query GetFeedbackListByAdmin($pageNo: Int!, $limit: Int!) {
    getFeedbackListByAdmin(pageNo: $pageNo, limit: $limit) {
      totalcount
      feedbackdata {
        _id
        created_date
        description
        feedback_type
        name
        org_id
        organization_name
        session_no
        status
        user_id
        updated_date
        user_type
        visibility
      }
    }
  }
`;

export const GET_ADMIN_FEEDBACK_RESPONSE_LIST = gql`
  query adminViewResponseByFeedbackId(
    $feedbackId: String!
    $endDate: String
    $startDate: String
    $pageNo: Int!
    $limit: Int!
  ) {
    adminViewResponseByFeedbackId(
      feedbackId: $feedbackId
      endDate: $endDate
      startDate: $startDate
      pageNo: $pageNo
      limit: $limit
    ) {
      feedbackdata {
        _id
        user_type
        created_date
        name
        feedback_type
        description
        session_no
        org_detail {
          _id
          name
        }
      }
      feedbackresponse {
        _id
        answer
        feedbackquestion {
          _id
          answer_type
        }
        patient_detail {
          _id
          created_date
          hos_id
          org_id
          patient_firstname
          patient_gender
          patient_lastname
        }
        therapist_detail {
          org_id
          therapist_name
        }
        therapist_id
        therapy_detail {
          _id
          created_date
          therapy_name
        }
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
