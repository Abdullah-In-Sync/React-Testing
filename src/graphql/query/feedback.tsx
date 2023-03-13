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
        created_date
        description
        feedback_type
        name
        org_detail {
          _id
          contract
          created_date
          logo
          logo_url
          name
          panel_color
          patient
          patient_plural
          patient_welcome_email
          side_menu_color
          therapist
          therapy
        }
        org_id
        session_no
        status
        updated_date
        user_id
        user_type
        visibility
      }
      feedbackresponse {
        _id
        answer
        created_date
        feedbackquestion {
          _id
          answer_options
          answer_type
          created_date
          feedback_type
          org_id
          organization_name
          question
          session_no
          status
          updated_date
          user_id
        }
        patient_id
        patient_name
        pttherapy_id
        question_id
        status
        therapist_id
        therapist_name
        therapy_name
        updated_date
      }
      totalcount
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

export const VIEW_FEEDBACK_BY_ID = gql`
  query ViewFeedbackByAdmin($feedbackId: String!) {
    viewFeedbackByAdmin(feedbackId: $feedbackId) {
      _id
      created_date
      description
      feedback_type
      name
      org_id
      organization_name
      session_no
      status
      updated_date
      user_id
      user_type
      visibility
      questions {
        _id
        answer_options
        answer_type
        created_date
        feedback_id
        question
        status
        updated_date
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
      }
    }
  }
`;

export const VIEW_ADMIN_FEEDBACK_BY_ID = gql`
  query AdminViewResponseDetailById(
    $feedbackId: String!
    $pttherapyId: String!
    $userId: String!
  ) {
    adminViewResponseDetailById(
      feedbackId: $feedbackId
      pttherapyId: $pttherapyId
      userId: $userId
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
        answer_options
        answer_type
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
      visibility
    }
  }
`;
