import { gql } from "@apollo/client";

export const GET_PATIENT_MEASURE_LIST = gql`
  query getPatientMeasureList {
    getPatientMeasureList {
      user_type
      user_id
      therapist_id
      status
      patient_id
      measure_cat_type
      measure_cat_name
      last_completed_date
      is_default
      created_date
      current_score
      _id
    }
  }
`;

export const GET_MEASURE_DETAIL_BY_PATIENT = gql`
  query getMeasureDetailByPatient($measureCatId: String!) {
    getMeasureDetailByPatient(measureCatId: $measureCatId) {
      _id
      measure_cat_id
      measure_cat_ques
      measure_cat_name
      measure_cat_ques_type
    }
  }
`;

export const UPDATE_MEASURE_SCORE_BY_PATIENT = gql`
  mutation updateMeasureScoreByPatien(
    $measureCatId: ID!
    $patmscore_difficult: Int!
    $patmscore_everyday_value: Int!
    $patmscore_halfthedays_value: Int!
    $patmscore_notatall_value: Int!
    $patmscore_severaldays_value: Int!
    $patmscore_value: Int!
    $qdata: String!
  ) {
    updateMeasureScoreByPatient(
      measureCatId: $measureCatId
      patmscore_difficult: $patmscore_difficult
      patmscore_everyday_value: $patmscore_everyday_value
      patmscore_halfthedays_value: $patmscore_halfthedays_value
      patmscore_notatall_value: $patmscore_notatall_value
      patmscore_severaldays_value: $patmscore_severaldays_value
      patmscore_value: $patmscore_value
      qdata: $qdata
    ) {
      _id
    }
  }
`;

export const VIEW_MEASURE_SCORE_BY_PATIENT = gql`
  query viewMeasureScoreByPatient($measureCatId: String!) {
    viewMeasureScoreByPatient(measureCatId: $measureCatId) {
      scale_data
      measure_cat_name
      score_data {
        created_date
        _id
        patmscore_value
      }
    }
  }
`;

export const VIEW_MEASURE_RESPONSE = gql`
  query viewMeasureResponse($patScoreId: String = "") {
    viewMeasureResponse(patScoreId: $patScoreId) {
      created_date
      measure_cat_id
      patient_id
      patmscore_difficult
      patmscore_everyday_value
      patmscore_halfthedays_value
      patmscore_severaldays_value
      patmscore_notatall_value
      patmscore_status
      patmscore_value
      patientmeasurequestion {
        measure_cat_ques_id
        patmques_everyday
        measure_cat_id
        patmques_ques
        patmques_halfthedays
        patmques_notatall
        patmques_severaldays
      }
      _id
    }
  }
`;

export const GET_ADMIN_MEASURES_LIST = gql`
  query adminMeasuresList(
    $limit: Int
    $pageNo: Int
    $orgId: String
    $searchText: String
  ) {
    adminMeasuresList(
      limit: $limit
      pageNo: $pageNo
      org_id: $orgId
      title: $searchText
    ) {
      data {
        _id
        created_date
        description
        org_id
        organization_name
        status
        template_data
        updated_date
        title
        template_id
      }
      total
    }
  }
`;

export const CREATE_MEASURE_TEMPLATE = gql`
  mutation adminCreateMeasures(
    $orgId: String!
    $templateData: String!
    $templateId: String!
    $title: String!
    $description: String
  ) {
    adminCreateMeasures(
      org_id: $orgId
      template_data: $templateData
      template_id: $templateId
      title: $title
      description: $description
    ) {
      duplicateNames {
        _id
        name
      }
      result
    }
  }
`;

export const ADMIN_UPDATE_MEASURE = gql`
  mutation adminUpdateMeasureById(
    $measureId: ID!
    $update: UpdateMeasureInput
  ) {
    adminUpdateMeasureById(measure_id: $measureId, update: $update) {
      _id
      created_date
      description
      org_id
      organization_name
      status
      template_data
      template_id
      title
      updated_date
    }
  }
`;

export const AdMIN_VIEW_MEASURE = gql`
  query adminViewMeasureById($measureId: ID!) {
    adminViewMeasureById(measure_id: $measureId) {
      _id
      created_date
      description
      org_id
      organization_name
      status
      template_data
      template_id
      title
      updated_date
    }
  }
`;

export const THERAPIST_CREATE_MEASURES = gql`
  mutation therapistCreateMeasures(
    $patientId: String!
    $templateData: String!
    $templateId: String!
    $title: String!
    $description: String
  ) {
    therapistCreateMeasures(
      patient_id: $patientId
      template_data: $templateData
      template_id: $templateId
      title: $title
      description: $description
    ) {
      duplicateNames {
        _id
        name
      }
      result
    }
  }
`;

export const GET_THERAPIST_MEASURES_LIST = gql`
  query TherapistListMeasures($patientId: String!) {
    therapistListMeasures(patient_id: $patientId) {
      _id
      created_date
      description
      patient_id
      score
      score_date
      scores_list {
        _id
        added_by
        created_date
        measure_id
        score
        status
        template_data
        template_id
      }
      share_status
      status
      template_data
      template_id
      therapist_id
      title
      updated_date
    }
  }
`;

export const UPDATE_THERAPIST_MEASURE = gql`
  mutation updateTherapistMeasure(
    $measure_id: String = ""
    $update: UpdateTherapistMeasureInput = {}
  ) {
    updateTherapistMeasure(measure_id: $measure_id, update: $update) {
      _id
    }
  }
`;

export const THERAPIST_VIEW_MEASURE = gql`
  query TherapistViewMeasure($measureId: String!) {
    therapistViewMeasure(measure_id: $measureId) {
      _id
      created_date
      description
      patient_id
      score
      score_date
      scores_list {
        _id
        added_by
        created_date
        measure_id
        score
        status
        template_data
        template_id
      }
      share_status
      status
      template_data
      template_id
      therapist_id
      title
      updated_date
    }
  }
`;

export const THERAPIST_UPDATE_MEASURE = gql`
  mutation UpdateTherapistMeasure(
    $measureId: String!
    $update: UpdateTherapistMeasureInput
  ) {
    updateTherapistMeasure(measure_id: $measureId, update: $update) {
      _id
      created_date
      description
      patient_id
      score
      score_date
      scores_list {
        template_id
        template_data
        status
        score
        measure_id
        created_date
        added_by
        _id
      }
      updated_date
      title
      therapist_id
      template_id
      template_data
      status
      share_status
    }
  }
`;


export const THERAPIST_MEASURE_SUBMIT_TEST = gql`
  mutation TherapistMeasureSubmitTest(
    $measureId: String!
    $score: Int!
    $templateData: String!
    $sessionNo: String
    $templateId: String!
  ) {
    therapistMeasureSubmitTest(measure_id: $measureId, score: $score, template_data: $templateData, template_id: $templateId, session_no: $sessionNo) {
      _id
      added_by
      created_date
      measure_id
      score
      session_no
      template_data
      template_id
      status
    }
  }
`;
