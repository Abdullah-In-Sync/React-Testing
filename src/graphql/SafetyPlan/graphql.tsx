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
// mutation (
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
