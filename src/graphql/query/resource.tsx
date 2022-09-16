import { gql } from "@apollo/client";

export const GET_PATIENT_RESOURCE_DATA = gql`
  query GetPatientResource {
    getPatientResourceList {
      _id
      ptsharres_session
      created_date
      patient_share_filename
      download_patient_filename_url
      resource_data {
        resource_name
        resource_type
        resource_url
        download_resource_url
      }
    }
  }
`;

export const GET_PATIENT_RESOURCE_DETAIL = gql`
  query getResourceDetailById($ptsharresId: String!, $fileName: String) {
    getResourceDetailById(ptsharresId: $ptsharresId, fileName: $fileName) {
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
        resource_url
        download_resource_url
      }
      disorder_detail {
        _id
        disorder_name
      }
      model_detail {
        _id
        model_name
      }
    }
  }
`;
