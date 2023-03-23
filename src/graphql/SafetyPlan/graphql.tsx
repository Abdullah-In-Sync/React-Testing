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
export const GET_RELAPSE_PLAN_LIST = gql`
  query adminRelapsePlanList(
    $limit: Int
    $planType: String
    $pageNo: Int
    $orgId: String
    $searchText: String
  ) {
    adminRelapsePlanList(
      limit: $limit
      planType: $planType
      pageNo: $pageNo
      orgId: $orgId
      searchText: $searchText
    ) {
      data {
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
      total
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
      questions {
        _id
        created_date
        patient_answer
        patient_id
        plan_id
        safety_ques
        safety_additional_details
        safety_ques_status
        safety_ques_type
        safety_ques_typeoption
        updated_date
      }
      share_status
      therapist_id
      updated_date
      plan_type
      plan_owner
      patient_id
      name
      description
      created_date
      _id
    }
  }
`;

export const GET_RELAPSE_LIST_FOR_THERAPIST = gql`
  query getRelapsePlanListByPatientId(
    $patientId: String
    $planType: String
    $searchText: String
  ) {
    getRelapsePlanListByPatientId(
      patientId: $patientId
      planType: $planType
      searchText: $searchText
    ) {
      _id
      created_date
      description
      name
      patient_id
      plan_owner
      plan_type
      questions {
        _id
        created_date
        patient_answer
        patient_id
        plan_id
        relapse_additional_details
        relapse_ques
        relapse_ques_status
        relapse_ques_type
        relapse_ques_typeoption
        updated_date
      }
      share_status
      therapist_id
      updated_date
    }
  }
`;
export const GET_THERAPIST_SAFETY_PLAN_LIST = gql`
  query getTherapistSafetyPlanList($orgId: String!) {
    getTherapistSafetyPlanList(orgId: $orgId) {
      _id
      description
      name
      org_id
      organization_name
      plan_type
      status
      updated_date
      user_id
      user_type
      created_date
    }
  }
`;
export const VIEW_SAFETY_BY_PATIENT_ID = gql`
  query viewSafetyPlanById($planId: ID!) {
    viewSafetyPlanById(planId: $planId) {
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
      questions {
        _id
        created_date
        plan_id
        safety_ques
        safety_additional_details
        safety_ques_typeoption
        safety_ques_type
        safety_ques_status
        updated_date
        user_id
        user_type
      }
    }
  }
`;

export const CREATE_THERAPIST_SAFETY_PLAN = gql`
  mutation createTherapistSafetyPlan(
    $patientId: String!
    $planName: String!
    $planDesc: String
  ) {
    createTherapistSafetyPlan(
      patientId: $patientId
      planName: $planName
      planDesc: $planDesc
    ) {
      result
    }
  }
`;

export const CREATE_THERAPIST_RELAPSE_PLAN = gql`
  mutation therapistCreateRelapsePlan(
    $patientId: String!
    $planName: String!
    $planDesc: String
  ) {
    therapistCreateRelapsePlan(
      patientId: $patientId
      planName: $planName
      planDesc: $planDesc
    ) {
      _id
    }
  }
`;

export const UPDATE_THERAPIST_SAFETY_PLAN = gql`
  mutation updateTherapistSafetyPlan(
    $planId: ID!
    $updatePlan: UpdatePatientSafetyPlanInput
  ) {
    updateTherapistSafetyPlan(planId: $planId, updatePlan: $updatePlan) {
      _id
    }
  }
`;

export const ADD_THERAPIST_SAFETY_PLAN = gql`
  mutation addTherapistSafetyPlan($patientId: String!, $planId: String!) {
    addTherapistSafetyPlan(patientId: $patientId, planId: $planId) {
      result
    }
  }
`;

export const DELETE_THERAPIST_SAFETY_PLAN = gql`
  mutation ($planId: ID!, $updatePlan: UpdatePatientSafetyPlanInput!) {
    updateTherapistSafetyPlan(planId: $planId, updatePlan: $updatePlan) {
      share_status
    }
  }
`;

export const UPDATE_FEEDBACK = gql`
  mutation ($feedbackId: ID!, $update: UpdateFeedbackInput!) {
    updateFeedbackQuestionById(feedbackId: $feedbackId, update: $update) {
      _id
      answer_options
      answer_type
      created_date
      feedback_type
      org_id
    }
  }
`;

export const GET_PATIENT_SAFETY_PlANS = gql`
  query getPatientSafetyPlans {
    getPatientSafetyPlans {
      name
      description
      questions {
        _id
        patient_answer
        patient_id
        safety_ques
        safety_ques_type
        safety_ques_status
        safety_additional_details
        safety_ques_typeoption
      }
      _id
      share_status
    }
  }
`;

export const ANSWER_SAFETY_PLAN_BY_PATIENT_ID = gql`
  mutation answerSafetyPlanByPatientId($quesData: String!) {
    answerSafetyPlanByPatientId(quesData: $quesData) {
      _id
    }
  }
`;

export const UPDATE_THERAPIST_SAFETY_PLAN_QUESTION = gql`
  mutation createSafetyPlanQuestions(
    $planId: String!
    $patientId: String
    $questions: String
  ) {
    createSafetyPlanQuestions(
      planId: $planId
      patientId: $patientId
      questions: $questions
    ) {
      safety_additional_details
      safety_ques_typeoption
      patient_answer
      updated_date
    }
  }
`;

export const VIEW_PATIENT_SAFETY_PLAN_BY_ID = gql`
  query viewPatientSafetyPlanById($planId: String!, $patientId: String!) {
    viewPatientSafetyPlanById(planId: $planId, patientId: $patientId) {
      _id
      created_date
      patient_answer
      patient_id
      plan_id
      safety_additional_details
      safety_ques
      safety_ques_status
      safety_ques_type
      safety_ques_typeoption
      updated_date
    }
  }
`;

export const DELETE_THERAPIST_SAFETY_PLAN_QUESTION = gql`
  mutation deleteTherapistSafetyPlanQs($questionId: String!) {
    deleteTherapistSafetyPlanQs(questionId: $questionId) {
      result
    }
  }
`;
