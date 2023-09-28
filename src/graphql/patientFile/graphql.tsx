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
  query GetPatientFileList($patient_id: String!) {
    getPatientFileList(patient_id: $patient_id) {
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

export const UPDATE_PATIENT_FILE = gql`
  mutation UpdatePatientFile(
    $file_id: String!
    $patient_id: String!
    $update: UpdatePatientFileInput
  ) {
    updatePatientFile(
      file_id: $file_id
      patient_id: $patient_id
      update: $update
    ) {
      result
      message
    }
  }
`;
