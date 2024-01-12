import { gql } from "@apollo/client";

export const UPDATE_PROFILE_DATA = gql`
  mutation (
    # $groupName: String!
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
      # groupName: $groupName
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
      data {
        _id
        addressline1
        addressline2
        birthdate
        city
        created_date
        email
        family_name
        home_no
        hos_id
        kin_addressline1
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
        patient_firstname
        patient_gender
        patient_gpaddress
        patient_gpaddressline2
        patient_gpcity
        patient_gpcontactno
        patient_gpemailaddress
        patient_gpname
        patient_gpsurgeryname
        patient_gppostalcode
        patient_illness_ability
        patient_lang
        patient_lastname
        patient_marrital
        patient_no
        patient_physical_health
        patient_sexuality
        patient_status
        phone_number
        postal_code
        religion
        therapist_id
        user_id
      }
      result
      message
    }
  }
`;

export const UPDATE_PROFILE_DATA_FROM_THERAPIST = gql`
  mutation (
    $address_line1: String
    $address_line2: String
    $birthdate: String
    $first_name: String
    $home_no: String
    $kin_addressline1: String
    $kin_addressline2: String
    $kin_city: String
    $kin_contact: String
    $kin_email_address: String
    $kin_name: String
    $kin_postal: String
    $kin_relationship: String
    $last_name: String
    $nhs_no: String
    $patient_city: String
    $patient_id: String
    $postal_code: String
    $religon: String
    $updateData: UpdatePatientInput!
  ) {
    updatePatientProfileById(
      address_line1: $address_line1
      address_line2: $address_line2
      birthdate: $birthdate
      first_name: $first_name
      home_no: $home_no
      kin_addressline1: $kin_addressline1
      kin_addressline2: $kin_addressline2
      kin_city: $kin_city
      kin_contact: $kin_contact
      kin_email_address: $kin_email_address
      kin_name: $kin_name
      kin_postal: $kin_postal
      kin_relationship: $kin_relationship
      last_name: $last_name
      nhs_no: $nhs_no
      patient_city: $patient_city
      patient_id: $patient_id
      postal_code: $postal_code
      religon: $religon
      updateData: $updateData
    ) {
      result
    }
  }
`;

export const UPDATE_PATIENT_GOAL_BY_ID = gql`
  mutation ($ptGoalId: ID!, $update: UpdatePatientGoalInput!) {
    updatePatientGoalById(ptGoalId: $ptGoalId, update: $update) {
      _id
      created_date
      patient_id
      ptgoal_achievementdate
      ptgoal_audio
      ptgoal_achievementgoal
      ptgoal_file
      ptgoal_mygoal
      ptgoal_pregoal
      ptgoal_status
      ptgoal_reviewdate
      ptgoal_success
      ptsession_id
      pttherapy_id
      updated_date
      therapist_id
    }
  }
`;

export const PATIENT_ADD_UPDATE_GOALS = gql`
  mutation (
    $patient_goal: String!
    $pttherapy_id: String!
    $achievement_date: String
    $achievement_goal: String
    $goal_id: String
    $goal_success: Int
    $review_date: String
  ) {
    addUpdatePatientGoal(
      patient_goal: $patient_goal
      pttherapy_id: $pttherapy_id
      achievement_date: $achievement_date
      achievement_goal: $achievement_goal
      goal_id: $goal_id
      goal_success: $goal_success
      review_date: $review_date
    ) {
      result
    }
  }
`;

export const UPDATE_PATIENT_HOME_BY_ID = gql`
  mutation ($appId: ID!) {
    cancelAppByPatient(appId: $appId) {
      _id
      app_trackstatus
    }
  }
`;

export const DELETE_ORG_BY_ID = gql`
  mutation ($orgId: String!) {
    deleteOrgById(orgId: $orgId) {
      deleted
    }
  }
`;

export const DELETE_RESOURCE_BY_ID = gql`
  mutation ($ptsharresId: String!) {
    deleteShareResource(ptsharresId: $ptsharresId) {
      message
      result
    }
  }
`;

export const UPDATE_SAFETY_PLAN_QUESTION_DATA = gql`
  mutation ($quesData: String!) {
    updateSafetyPlanByPatient(quesData: $quesData) {
      _id
      safety_ques_id
      patient_id
      therapist_id
      safety_ques
      safety_additional_details
      safety_ques_type
      safety_ques_typeoption
      safety_ans_status
      safety_ans
      created_date
      updated_date
    }
  }
`;

export const UPDATE_PATIENT_HOMEWORK_BY_ID = gql`
  mutation ($ptHomeworkId: ID!, $update: UpdateHomeworkInput!) {
    updatePatientHomeworkById(update: $update, ptHomeworkId: $ptHomeworkId) {
      data {
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
      }
      result
      message
    }
  }
`;

export const UPDATE_RELAPSE_QUESTION_ANSWER_DATA = gql`
  mutation ($relapse_ans_data: String!) {
    updateRelapseAnswerByPatient(relapse_ans_data: $relapse_ans_data) {
      _id
      created_date
      order_by
      patient_id
      relapse_additional_details
      relapse_ans_detail {
        _id
        created_date
        patient_id
        relapse_ans
        relapse_ans_status
        relapse_ques_id
        therapist_id
        updated_date
      }
      relapse_ques
      relapse_ques_status
      updated_date
      user_type
    }
  }
`;

export const SUBMIT_PATIENT_MONITOR_BY_ID = gql`
  mutation ($monitorId: String!, $data: String!) {
    submitMonitorByPatient(data: $data, monitorId: $monitorId) {
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
