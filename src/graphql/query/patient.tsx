import { gql } from '@apollo/client';


export const GET_PATIENTSESSION_DATA = gql`
  query GetPatientSessionList($pttherapyId: String!) {
    getPatientSessionList(pttherapyId: $pttherapyId) {
        _id
        patient_id
        therapist_id
        pttherapy_id
        ptsession_no
        ptsession_status
        created_date
        updated_date
    }
  }
`;