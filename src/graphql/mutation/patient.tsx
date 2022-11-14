import { gql } from "@apollo/client";

export const UPDATE_PROFILE_DATA = gql`
  mutation ($groupName: String!, $update: UpdatePatientInput!) {
    updateProfileById(groupName: $groupName, update: $update) {
      _id
      user_id
      patient_status
      patient_sexuality
      patient_no
      patient_marrital
      patient_lastname
      patient_lang
      patient_gpsurgeryname
      patient_gppostalcode
      patient_gpname
      patient_gpemailaddress
      patient_gpcontactno
      patient_gpcity
      patient_gpaddressline2
      patient_gpaddress
      patient_gender
      patient_firstname
      patient_employment
      patient_contract
      patient_consent
      patient_availability
    }
  }
`;
