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
      addressline1
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
      religion
      phone_number
      postal_code
    }
  }
`;

export const GET_PATIENT_HOMEWORK_LIST = gql`
  query GetHomeworksByPatientId($therapyId: ID!) {
    getHomeworksByPatientId(therapyId: $therapyId) {
      therapy_id
      ptsession_id
      therapist_id
      patient_id
      pthomewrk_task
      pthomewrk_status
      pthomewrk_date
      pthomewrk_resp
      therapist_resp
      resource_id
      ptshareres_id
      complete_status
      created_date
      resource_data {
        user_id
        user_type
        resource_name
        resource_type
        resource_issmartdraw
        resource_isformualation
        disorder_id
        model_id
        category_id
        org_id
        resource_desc
        resource_instruction
        resource_references
        resource_session_no
        agenda_id
        resource_url
        resource_avail_therapist
        resource_avail_onlyme
        resource_filename
        resource_status
        resource_returnurl
        download_resource_url
        template_id
        template_data
        created_date
        updated_date
        _id
      }
      _id
    }
  }
`;

export const GET_PATIENT_MONITORING_LIST = gql`
  query GetPatientMonitorList {
    getPatientMonitorList {
      _id
      ca_cat_id
      ca_subcat_id
      monitor_cat_id
      patient_id
      ptmon_frequency
      ptmon_name
      ptmon_status
      therapist_id
    }
  }
`;
