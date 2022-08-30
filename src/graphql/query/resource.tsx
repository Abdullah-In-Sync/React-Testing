import { gql } from "@apollo/client";

export const GET_PATIENT_RESOURCE_DATA = gql`
  query GetPatientResource {
    getPatientResourceList {
      _id
      ptsharres_session
      created_date
      resource_data {
        resource_name
        resource_type
      }
    }
  }
`;
