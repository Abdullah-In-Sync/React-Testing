import { gql } from "@apollo/client";

export const GET_ADMIN_ASSESSMENT_LIST = gql`
  query adminAssessmentList(
    $limit: Int
    $pageNo: Int
    $orgId: String
    $searchText: String
  ) {
    adminAssessmentList(
      limit: $limit
      pageNo: $pageNo
      org_id: $orgId
      name: $searchText
    ) {
      data {
        _id
        created_date
        name
        org_id
        organization_name
        status
        updated_date
      }
      total
    }
  }
`;

export const GET_ADMIN_THERAPIES_LIST = gql`
  query adminTherapyList(
    $limit: Int
    $pageNo: Int
    $orgId: String
    $therapy_name: String
  ) {
    adminTherapyList(
      limit: $limit
      pageNo: $pageNo
      org_id: $orgId
      therapy_name: $therapy_name
    ) {
      data {
        _id
        created_date
        org_id
        organization_name
        therapy_status
        therapy_name
        updated_date
        user_id
        user_type
      }
      total
    }
  }
`;

export const ADMIN_ADD_THERAPY = gql`
  mutation adminAddTherapy($org_id: String!, $therapy_name: String!) {
    adminAddTherapy(org_id: $org_id, therapy_name: $therapy_name) {
      message
      result
    }
  }
`;

export const ADMIN_ADD_MODAL = gql`
  mutation adminAddModel($disorder_id: String!, $model_name: String!) {
    adminAddModel(disorder_id: $disorder_id, model_name: $model_name) {
      message
      result
    }
  }
`;

export const ADMIN_UPDATE_MODAL = gql`
  mutation adminUpdateModel($model_id: ID!, $update_model: UpdateModelInput) {
    adminUpdateModel(model_id: $model_id, update_model: $update_model) {
      _id
      created_date
      model_name
      disorder_id
      model_status
      updated_date
      user_id
      user_type
    }
  }
`;

export const ADMIN_DELETE_THERAPY = gql`
  mutation adminUpdateTherapy($therapy_id: ID!, $update: UpdateTherapyInput) {
    adminUpdateTherapy(therapy_id: $therapy_id, update: $update) {
      _id
      created_date
      org_id
      organization_name
      therapy_name
      therapy_status
      updated_date
      user_id
      user_type
    }
  }
`;

export const ADMIN_CREATE_ASSESSMENT = gql`
  mutation adminCreateAssessment($org_id: String, $name: String!) {
    adminCreateAssessment(org_id: $org_id, name: $name) {
      duplicateNames {
        _id
        name
      }
      result
    }
  }
`;

export const ADMIN_DELETE_AND_UPDATE_ASSESSMENT = gql`
  mutation adminUpdateAssessment(
    $assessment_id: ID!
    $update: UpdateMonitorInput
  ) {
    adminUpdateAssessment(assessment_id: $assessment_id, update: $update) {
      _id
      category {
        _id
        assessment_id
        created_date
        name
        status
        updated_date
      }
      created_date
      org_id
      name
      status
      updated_date
    }
  }
`;

export const ADMIN_VIEW_ASSESSMENT = gql`
  query AdminViewAssessment($assessmentId: ID!) {
    adminViewAssessment(assessment_id: $assessmentId) {
      _id
      category {
        _id
        assessment_id
        created_date
        name
        status
      }
      created_date
      name
      org_id
    }
  }
`;

export const ADMIN_ADD_CATEGORY = gql`
  mutation AdminCreateAssessmentCategory($assessmentId: ID!, $name: String!) {
    adminCreateAssessmentCategory(assessment_id: $assessmentId, name: $name) {
      _id
    }
  }
`;

export const GET_ADMIN_ASSESSMENT_DATA_BY_ID = gql`
  query adminViewAssessment($assessment_id: ID!) {
    adminViewAssessment(assessment_id: $assessment_id) {
      _id
      category {
        _id
        assessment_id
        created_date
        name
        status
        updated_date
      }
      created_date
      name
      org_id
      status
      updated_date
    }
  }
`;

export const ADMIN_UPDATE_ASSESSMENT_CATEGORY = gql`
  mutation AdminUpdateAssessmentCategory(
    $categoryId: ID!
    $updateCat: UpdateAssessCatInput
  ) {
    adminUpdateAssessmentCategory(
      category_id: $categoryId
      updateCat: $updateCat
    ) {
      _id
    }
  }
`;
export const ADMIN_SHARE_ASSESSMENT = gql`
  mutation adminShareAssessment($assessment_id: String!, $org_id: String!) {
    adminShareAssessment(assessment_id: $assessment_id, org_id: $org_id) {
      duplicateNames {
        _id
        name
      }
      result
    }
  }
`;

export const ADMIN_ADD_ASSESSMENT_CATEGORY_QUESSTION = gql`
  mutation AdminAssessmentAddQs($categoryId: ID!, $question: String!) {
    adminAssessmentAddQs(category_id: $categoryId, question: $question) {
      _id
    }
  }
`;

export const ADMIN_VIEW_ASSESSMENT_QUESTIONS = gql`
  query AdminAssessmentViewQs($categoryId: ID!) {
    adminAssessmentViewQs(category_id: $categoryId) {
      _id
      category_id
      created_date
      question
      status
      updated_date
    }
  }
`;

export const ADMIN_DELETE_AND_UPDATE_ASSESSMENT_QUESTION = gql`
  mutation AdminAssessmentUpdateQs(
    $questionId: ID!
    $updateQuestions: UpdateAssessQsInput
  ) {
    adminAssessmentUpdateQs(
      question_id: $questionId
      updateQs: $updateQuestions
    ) {
      _id
    }
  }
`;

export const GET_RISKS_LIST = gql`
  query GetRisksList {
    getRisksList {
      _id
      name
      status
    }
  }
`;

export const THERAPIST_SUBMIT_ASSESSMENT = gql`
  mutation TherapistSubmitAssessment(
    $patientId: String!
    $overallAssesmentText: String!
    $pttherapySession: String!
    $risk: String
  ) {
    therapistSubmitAssessment(
      overall_assesment_text: $overallAssesmentText
      patient_id: $patientId
      pttherapy_session: $pttherapySession
      risk: $risk
    ) {
      result
      message
    }
  }
`;

export const THERAPIST_GET_PATIENT_ASSESSMENT = gql`
  query TherapistGetPatientAssessment($patientId: String!) {
    therapistGetPatientAssessment(patient_id: $patientId) {
      result
      data {
        risk
        overall_assesment_text
        list {
          name
          _id
        }
        therapies {
          _id
          pttherapy_session
          pttherapy_status
        }
      }
    }
  }
`;

export const THERAPIST_GET_ASSESSMENT_SUMMARY_VIEW = gql`
  query assessmentSummaryView($patient_id: String!, $assessment_id: String!) {
    assessmentSummaryView(
      patient_id: $patient_id
      assessment_id: $assessment_id
    ) {
      result
      data {
        _id
        added_by
        answer
        category_name
        category_id
        created_date
        patient_id
        question
        status
        updated_date
      }
    }
  }
`;

export const GET_ORGANISATION_SHARED_LIST = gql`
  query getOrganisationSharedList($name: String!, $share_type: String!) {
    getOrganisationSharedList(name: $name, share_type: $share_type) {
      _id
      is_shared
      name
    }
  }
`;

export const THERAPIST_ADD_ASSESSMENT_DROPDOWN_LIST = gql`
  query getAdminAssessmentList {
    getAdminAssessmentList {
      message
      result
      data {
        _id
        name
        organization_name
        org_id
        created_date
        status
        updated_date
      }
    }
  }
`;

export const THERAPIST_ADD_ASSESSMENT = gql`
  mutation therapistAddAssessment(
    $assessment_id: String!
    $patient_id: String!
  ) {
    therapistAddAssessment(
      assessment_id: $assessment_id
      patient_id: $patient_id
    ) {
      message
      result
    }
  }
`;

export const THERAPIST_VIEW_ASSESSMENT = gql`
  query TherapistviewAssessment($assessmentId: ID!) {
    therapistviewAssessment(assessment_id: $assessmentId) {
      result
      data {
        _id
        created_date
        name
        patient_id
        status
        updated_date
        category {
          _id
          assessment_id
          created_date
          name
          patient_id
          share_status
          status
          updated_date
        }
      }
    }
  }
`;

export const THERAPIST_UPDATE_ASSESSMENT_CATEGORY = gql`
  mutation TherapistUpdateAssessmentCat(
    $categoryId: String!
    $patientId: String!
    $updateCat: UpdateTherapistAssessCatInput
  ) {
    therapistUpdateAssessmentCat(
      category_id: $categoryId
      updateCat: $updateCat
      patient_id: $patientId
    ) {
      result
    }
  }
`;

export const THERAPIST_VIEW_ASSESSMENT_QUESTION = gql`
  query TherapistviewAssessmentQs($categoryId: ID!, $patientId: String!) {
    therapistviewAssessmentQs(
      category_id: $categoryId
      patient_id: $patientId
    ) {
      result
      data {
        _id
        added_by
        answer
        category_id
        created_date
        patient_id
        question
        status
      }
    }
  }
`;

export const THERAPIST_ASSESSMENT_SUBMIT_ANSWER = gql`
  mutation TherapistAssessmentSubmitAns(
    $categoryId: String!
    $patientId: String!
    $quesData: String!
  ) {
    therapistAssessmentSubmitAns(
      category_id: $categoryId
      patient_id: $patientId
      quesData: $quesData
    ) {
      result
    }
  }
`;

export const THERAPIST_UPDATE_ASSESSMENT_QUESTION = gql`
  mutation TherapistUpdateAssessmentQs(
    $categoryId: String!
    $patientId: String!
    $questionId: String!
    $update: UpdateAssessAnsInput
  ) {
    therapistUpdateAssessmentQs(
      category_id: $categoryId
      update: $update
      patient_id: $patientId
      question_id: $questionId
    ) {
      message
      result
    }
  }
`;
