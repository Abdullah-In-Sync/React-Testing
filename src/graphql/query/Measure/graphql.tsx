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
