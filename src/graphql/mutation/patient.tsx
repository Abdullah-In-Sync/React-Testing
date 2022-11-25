import { gql } from "@apollo/client";

export const UPDATE_PROFILE_DATA = gql`
  mutation (
    $groupName: String!
    $firstName: String
    $dob: String
    $city: String
    $addressLine2: String
    $addressLine1: String
    $homeNo: String
    $kinAddressLine1: String
    $kinAddressLine2: String
    $kinCity: String
    $kinContactNo: String
    $kinEmailAddress: String
    $kinName: String
    $kinPostal: String
    $kinRelationship: String
    $lastName: String
    $nhsNo: String
    $postalCode: String
    $religion: String
    $update: UpdatePatientInput!
  ) {
    updateProfileById(
      groupName: $groupName
      firstName: $firstName
      dob: $dob
      city: $city
      addressLine2: $addressLine2
      addressLine1: $addressLine1
      homeNo: $homeNo
      kinAddressLine1: $kinAddressLine1
      kinAddressLine2: $kinAddressLine2
      kinCity: $kinCity
      kinContactNo: $kinContactNo
      kinEmailAddress: $kinEmailAddress
      kinName: $kinName
      kinPostal: $kinPostal
      kinRelationship: $kinRelationship
      lastName: $lastName
      nhsNo: $nhsNo
      postalCode: $postalCode
      religion: $religion
      update: $update
    ) {
      patient_firstname
      patient_lastname
      created_date
      hos_id
      org_id
      therapist_id
      patient_no
      user_id
      patient_contract
      patient_consent
      patient_status
      patient_availability
      patient_employment
      patient_gender
      patient_gpaddress
      patient_gpaddressline2
      patient_gpcity
      patient_gpcontactno
      patient_gpemailaddress
      patient_gpname
      patient_gppostalcode
      patient_gpsurgeryname
      patient_lang
      patient_marrital
      patient_sexuality
      email
      birthdate
      phone_number
      postal_code
      kin_contact_no
      kin_city
      kin_postal
      addressline1
      addressline2
      kin_addressline2
      kin_addressline1
      kin_relationship
      nhsno
      home_no
      kin_email_address
      kin_name
      city
      religion
    }
  }
`;
