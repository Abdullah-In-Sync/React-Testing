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
  query MyQuery {
    getProfileById {
      _id
      addressline2
      addressline1
      birthdate
      city
      created_date
      email
      family_name
      home_no
      hos_id
      kin_addressline1
      user_id
      therapist_id
      religion
      postal_code
      phone_number
      patient_sexuality
      patient_status
      patient_physical_health
      patient_no
      patient_marrital
      patient_lastname
      patient_lang
      patient_illness_ability
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
      kin_addressline2
      kin_city
      kin_contact_no
      kin_email_address
      kin_name
      kin_postal
      kin_relationship
      nhsno
      org_id
      patient_availability
      patient_consent
      patient_contract
      patient_education
      patient_employment
      patient_ethnic_group
    }
  }
`;

export const GET_PROFILE_DROPDOWN_DATA_BY_MASTER_DATA_API = gql`
  query getMasterData($name: String!) {
    getMasterData(name: $name) {
      _id
      display_name
      name
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
      ptsharres_id
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

export const GET_PATIENT_MONITOR_BY_ID = gql`
  query GetPatientMonitorById($monitorId: String!) {
    getPatientMonitorById(monitorId: $monitorId) {
      _id
      created_date
      emoji_ids
      patient_id
      ptmon_ans
      ptmon_id
      ptmonques_listtype
      ptmonques_question
      ptmonques_scalecaption
      ptmonques_scalepoint
      ptmonques_status
      ptmonques_type
      therapist_id
    }
  }
`;

export const GET_PATIENT_MONITOR_ANS_BY_ID = gql`
  query GetPatientMonitorAnsById(
    $monitorId: String!
    $endDate: String!
    $startDate: String!
    $dateSort: String!
  ) {
    getPatientMonitorAnsById(
      monitorId: $monitorId
      endDate: $endDate
      startDate: $startDate
      dateSort: $dateSort
    ) {
      _id
      created_date
      emoji_ids
      patient_id
      ptmon_ans
      ptmon_id
      ptmonques_id
      ptmonques_listtype
      ptmonques_question
      ptmonques_scalecaption
      ptmonques_scalepoint
      ptmonques_status
      ptmonques_type
      ptmonqueslog_by
      therapist_id
    }
  }
`;
