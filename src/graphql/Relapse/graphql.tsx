import { gql } from "@apollo/client";

export const UPDATE_RELAPSE_PLAN = gql`
  mutation adminUpdateRelapseById(
    $planId: ID!
    $updatePlan: UpdateRelapseInput
  ) {
    adminUpdateRelapseById(planId: $planId, updatePlan: $updatePlan) {
      _id
    }
  }
`;

export const ADMIN_CREATE_RELAPSE_PLAN = gql`
  mutation adminCreateRelapsePlan(
    $orgId: String = ""
    $planName: String = ""
    $planType: String = ""
    $questions: String = ""
    $planDesc: String = ""
  ) {
    adminCreateRelapsePlan(
      orgId: $orgId
      planName: $planName
      planType: $planType
      questions: $questions
      planDesc: $planDesc
    ) {
      duplicateNames {
        _id
        name
      }
      result
    }
  }
`;

export const VIEW_RELAPSE_BY_PLAN_ID = gql`
  query adminViewRelapseById($planId: ID!) {
    adminViewRelapseById(planId: $planId) {
      _id
      created_date
      description
      name
      org_id
      organization_name
      plan_type
      status
      updated_date
      user_id
      user_type
      questions {
        _id
        created_date
        plan_id
        relapse_additional_details
        relapse_ques
        relapse_ques_status
        relapse_ques_type
        relapse_ques_typeoption
        updated_date
        user_id
        user_type
      }
    }
  }
`;

export const ADD_THERAPIST_RELAPSE_PLAN = gql`
  mutation therapistAddRelapsePlan($patientId: String!, $planId: String!) {
    therapistAddRelapsePlan(patientId: $patientId, planId: $planId) {
      result
    }
  }
`;

export const THERAPIST_GET_ADMIN_RELAPSE_LIST = gql`
  query therapistGetAdminRelapseList($orgId: String!) {
    therapistGetAdminRelapseList(orgId: $orgId) {
      _id
      created_date
      description
      name
      org_id
      organization_name
      plan_type
      status
      updated_date
      user_id
      user_type
    }
  }
`;

export const UPDATE_THERAPIST_RELAPSE_PLAN = gql`
  mutation updateTherapistRelapsePlan(
    $planId: ID!
    $updatePlan: UpdatePatientRelapsePlanInput
  ) {
    updateTherapistRelapsePlan(planId: $planId, updatePlan: $updatePlan) {
      _id
    }
  }
`;

export const DELETE_THERAPIST_RELAPSE_PLAN = gql`
  mutation ($planId: ID!, $updatePlan: UpdatePatientRelapsePlanInput!) {
    updateTherapistRelapsePlan(planId: $planId, updatePlan: $updatePlan) {
      share_status
    }
  }
`;

export const ADMIN_UPDATE_RELAPSE_BY_ID = gql`
  mutation adminUpdateRelapseById(
    $planId: ID = ""
    $questions: String = ""
    $updatePlan: UpdateRelapseInput = {}
  ) {
    adminUpdateRelapseById(
      planId: $planId
      questions: $questions
      updatePlan: $updatePlan
    ) {
      _id
    }
  }
`;

export const ADMIN_DELETE_RELAPSE_PLAN_QS = gql`
  mutation adminDeleteRelapsePlanQs($questionId: ID = "") {
    adminDeleteRelapsePlanQs(questionId: $questionId) {
      _id
      status
    }
  }
`;

export const THERAPIST_VIEW_PATIENT_RELAPSE = gql`
  query therapistViewPatientRelapse($planId: String!, $patientId: String!) {
    therapistViewPatientRelapse(planId: $planId, patientId: $patientId) {
      _id
      patient_answer
      created_date
      patient_id
      relapse_additional_details
      plan_id
      relapse_ques
      relapse_ques_status
      relapse_ques_type
      relapse_ques_typeoption
      updated_date
    }
  }
`;

export const THERAPIST_CREATE_RELAPSE_QUES = gql`
  mutation therapistCreateRelapseQues(
    $planId: String!
    $patientId: String!
    $questions: String!
  ) {
    therapistCreateRelapseQues(
      planId: $planId
      patientId: $patientId
      questions: $questions
    ) {
      relapse_additional_details
      relapse_ques_typeoption
      patient_answer
      updated_date
    }
  }
`;

export const DELETE_THERAPIST_RELAPSE_PLAN_QUESTION = gql`
  mutation therapistDeleteRelapseQues($questionId: String!) {
    therapistDeleteRelapseQues(questionId: $questionId) {
      result
    }
  }
`;
