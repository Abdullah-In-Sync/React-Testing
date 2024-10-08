import { gql } from "@apollo/client";

export const CREATE_FEEDBACK = gql`
  mutation createFeedback(
    $userType: String = ""
    $sessionNo: String = ""
    $orgId: String = ""
    $feedQuesData: String = ""
    $feedBackName: String = ""
    $feedBackDesc: String
    $visiBility: Int
  ) {
    createFeedback(
      feedBackName: $feedBackName
      orgId: $orgId
      sessionNo: $sessionNo
      userType: $userType
      feedBackDesc: $feedBackDesc
      feedQuesData: $feedQuesData
      visiBility: $visiBility
    ) {
      result
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

export const EDIT_FEEDBACK_BY_ADMIN = gql`
  mutation editFeedbackByAdmin(
    $feedBackDesc: String
    $feedbackId: String!
    $feedBackName: String
    $feedQuesData: String
  ) {
    editFeedbackByAdmin(
      feedBackDesc: $feedBackDesc
      feedbackId: $feedbackId
      feedBackName: $feedBackName
      feedQuesData: $feedQuesData
    ) {
      _id
    }
  }
`;

export const DELETE_FEEDBACK_QUESTION_BY_ADMIN = gql`
  mutation deleteFeedbackQuesByAdmin($questionId: String!) {
    deleteFeedbackQuesByAdmin(questionId: $questionId) {
      result
    }
  }
`;

export const CHECK_FEEDBACK_NAME = gql`
  query checkFeedbackName(
    $orgId: String!
    $sessionNo: String!
    $userType: String!
  ) {
    checkFeedbackName(
      orgId: $orgId
      sessionNo: $sessionNo
      userType: $userType
    ) {
      org_id
      organization_name
      session_no
    }
  }
`;

export const GET_CLIENT_THERAPY_SESSION_LIST = gql`
  query getClientTherapysessionList(
    $patientId: String = ""
    $pttherapyId: String = ""
  ) {
    getClientTherapysessionList(
      patientId: $patientId
      pttherapyId: $pttherapyId
    ) {
      session_no
    }
  }
`;

export const GET_THERAPIST_FEEDBACKLIST_DATA_NEW = gql`
  query therapistGetFeedbackList(
    $sessionNo: String!
    $feedbackType: String!
    $pttherapyId: String!
  ) {
    therapistGetFeedbackList(
      feedbackType: $feedbackType
      sessionNo: $sessionNo
      pttherapyId: $pttherapyId
    ) {
      _id
      created_date
      description
      name
      feedback_type
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

export const THERAPIST_PATIENT_LIST = gql`
  query getPatientList($limit: Int!, $page_no: Int!, $search_text: String) {
    getPatientList(
      limit: $limit
      page_no: $page_no
      search_text: $search_text
    ) {
      patientlist {
        patient_firstname
        patient_lastname
        created_date
        updated_date
        _id
      }
      total
    }
  }
`;

export const VIEW_RESPONSE_DOWNLOAD_CSV = gql`
  query viewResponseDownloadCSV($feedbackId: String!) {
    viewResponseDownloadCSV(feedbackId: $feedbackId) {
      _id
      answer_options
      answer_type
      created_date
      feedback_id
      question
      responses {
        _id
        answer
        created_date
        patient_id
        patient_name
        pttherapy_id
        question_id
        status
        therapist_name
        therapist_id
        therapy_name
        updated_date
      }
      status
      updated_date
    }
  }
`;
