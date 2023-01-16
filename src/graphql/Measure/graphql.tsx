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
