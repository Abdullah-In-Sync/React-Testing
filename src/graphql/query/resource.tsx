import { gql } from "@apollo/client";

export const GET_PATIENT_RESOURCE_DATA = gql`
  query GetPatientResource {
    getPatientResourceList {
      _id
      ptsharres_session
      created_date
      resource_data {
        resource_name
      }
    }
  }
`;

export const GET_PATIENT_RESOURCE_DETAIL = gql`
  query getResourceDetailById(
    $ptsharresId: String!
    $fileName: String
  ) {
    getResourceDetailById(
      ptsharresId: $ptsharresId, fileName: $fileName
    ) {
      _id
      ptsharres_session
      ptsharres_status
      created_date
      ptsharres_from
      ptsharres_subfrom
      share_from
      resource_upload
      patient_share_filename
      download_patient_filename_url
      patient_id
      resource_id
      resource_data {
        resource_name
        resource_desc
        resource_instruction
        resource_references
        resource_filename
      }
    }
  }
`;
