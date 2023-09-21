import { gql } from "@apollo/client";

export const ADD_PATIENT_FILE = gql`
  mutation AddPatientFile(
    $file_name: String!
    $patient_id: String!
    $title: String!
    $is_private: Int
    $description: String
  ) {
    addPatientFile(
      file_name: $file_name
      patient_id: $patient_id
      title: $title
      is_private: $is_private
      description: $description
    ) {
      message
      result
    }
  }
`;

export const GET_PATIENT_FILE_LIST = gql`
  query GetPatientFileListByTherapist(
    $patient_id: String!
    $search_text: String
  ) {
    getPatientFileListByTherapist(
      patient_id: $patient_id
      search_text: $search_text
    ) {
      _id
      added_by
      created_date
      description
      download_file_url
      file_name
      file_url
      patient_id
      share_status
      status
      title
      updated_date
    }
  }
`;
