import { gql } from "@apollo/client";

export const GET_PATIENTSESSION_DATA = gql`
  query GetPatientSessionList($pttherapyId: String!, $patientId: String) {
    getPatientSessionList(pttherapyId: $pttherapyId, patientId: $patientId) {
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

export const GET_PROFILE_DATA = gql`
  query GetProfileById($groupName: String!) {
    getProfileById(groupName: $groupName) {
      _id
      patient_sexuality
      patient_lastname
      patient_marrital
      patient_gender
      patient_firstname
      patient_lang
      patient_employment
      patient_contract
      patient_gpemailaddress
      patient_no
      patient_gppostalcode
      patient_gpsurgeryname
      patient_gpname
      patient_gpcontactno
      patient_gpcity
      patient_gpaddressline2
      patient_gpaddress
      addressline2
      birthdate
      city
      created_date
      email
      home_no
      hos_id
      kin_addressline1
      kin_addressline2
      kin_city
      kin_contact_no
      kin_email_address
      kin_postal
      kin_name
      kin_relationship
      nhsno
      patient_contract
      patient_consent
      patient_availability
      org_id
    }
  }
`;
