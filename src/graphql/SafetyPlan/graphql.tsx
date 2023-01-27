import { gql } from "@apollo/client";

export const GET_SAFETY_PLAN_LIST = gql`
  query getSafetyPlanList(
    $limit: Int
    $planType: String
    $pageNo: Int
    $orgId: String
    $searchText: String
  ) {
    getSafetyPlanList(
      limit: $limit
      planType: $planType
      pageNo: $pageNo
      orgId: $orgId
      searchText: $searchText
    ) {
      total
      data {
        _id
        created_date
        description
        name
        organization_name
        org_id
        plan_type
        status
        updated_date
        user_id
        user_type
      }
    }
  }
`;

export const CREATE_SAFETY_PLAN = gql`
  mutation createSafetyPlan(
    $planType: String!
    $orgId: String!
    $planName: String!
    $planDesc: String
    $questions: String
  ) {
    createSafetyPlan(
      orgId: $orgId
      planType: $planType
      questions: $questions
      planName: $planName
      planDesc: $planDesc
    ) {
      result
    }
  }
`;

export const GET_SAFETY_PLAN_BY_ID = gql`
  query viewSafetyPlanById($planId: ID!) {
    viewSafetyPlanById(planId: $planId) {
      _id
      created_date
      description
      name
      org_id
      status
      plan_type
      updated_date
      user_id
      user_type
      questions {
        _id
        created_date
        plan_id
        safety_additional_details
        safety_ques
        safety_ques_status
        safety_ques_type
        safety_ques_typeoption
        updated_date
        user_id
        user_type
      }
    }
  }
`;

export const UPDATE_SAFETY_PLAN = gql`
  mutation updateSafetyPlanById(
    $planId: ID!
    $questions: String
    $updatePlan: UpdateSafetyPlanInput
  ) {
    updateSafetyPlanById(
      planId: $planId
      questions: $questions
      updatePlan: $updatePlan
    ) {
      _id
    }
  }
`;

export const DELETE_SAFETY_PLAN_QUESTION = gql`
  mutation adminDeleteSafetyPlanQs($questionId: ID!) {
    adminDeleteSafetyPlanQs(questionId: $questionId) {
      _id
    }
  }
`;

export const GET_SAFETY_PLAN_LIST_FOR_THERAPIST = gql`
  query getSafetyPlanListByPatientId(
    $patientId: String
    $planType: String
    $searchText: String
  ) {
    getSafetyPlanListByPatientId(
      patientId: $patientId
      planType: $planType
      searchText: $searchText
    ) {
      _id
      created_date
      description
      plan_owner
      name
      patient_id
      plan_type
    }
  }
`;