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
    ){
      _id
    }
  }
`;
