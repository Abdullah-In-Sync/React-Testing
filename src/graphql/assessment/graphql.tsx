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

export const ADMIN_CREATE_ASSESSMENT = gql`
  mutation adminCreateAssessment($org_id: String!, $name: String!) {
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
