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
