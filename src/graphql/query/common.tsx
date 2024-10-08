import { gql } from "@apollo/client";
export const GET_PATIENTTHERAPY_DATA = gql`
  query GetPatientTherapy($patientId: String) {
    getPatientTherapy(patientId: $patientId) {
      icd10
      dcm5
      risk_of_suicide
      pttherapy_session
      pttherapy_status
      created_date
      therapist_id
      _id
      disorder_id
      model_id
      patient_id
      therapy_id
      therapy_detail {
        _id
        created_date
        org_id
        therapy_name
        therapy_status
        user_id
        user_type
      }
      model_detail {
        _id
        created_date
        disorder_id
        model_name
        model_status
        user_id
        user_type
      }
      disorder_detail {
        _id
        created_date
        disorder_name
        disorder_status
        therapy_id
        user_id
        user_type
      }
    }
  }
`;

export const GET_PATIENT_FEEDBACKLIST_DATA_NEW = gql`
  query patientGetFeedbackList($session: String!, $pttherapyId: String!) {
    patientGetFeedbackList(session: $session, pttherapyId: $pttherapyId) {
      data {
        _id
        created_date
        description
        feedback_type
        name
        org_id
        questions {
          _id
          answer {
            _id
            answer
            created_date
            patient_id
            pttherapy_id
            question_id
            status
            therapist_id
            updated_date
          }
          answer_options
          answer_type
          created_date
          feedback_id
          question
          status
          updated_date
        }
        session_no
        status
        updated_date
        user_id
        user_type
        visibility
      }
    }
  }
`;

export const GET_PATIENT_GOAL_DATA = gql`
  query patientGoalList($pttherapy_id: String!) {
    patientGoalList(pttherapy_id: $pttherapy_id) {
      result
      data {
        _id
        created_date
        patient_id
        ptgoal_achievementdate
        ptgoal_achievementgoal
        ptgoal_audio
        ptgoal_file
        ptgoal_mygoal
        ptgoal_pregoal
        ptgoal_reviewdate
        ptgoal_status
        ptgoal_success
        ptsession_id
        pttherapy_id
        therapist_id
        updated_date
        user_type
      }
    }
  }
`;

export const GET_TOKEN_DATA = gql`
  query MyQuery {
    getTokenData {
      _id
      user_type
      parent_id
      perm_ids
      user_status
      created_date
      updated_date
      module_data {
        _id
        name
        org_id
        status
      }
      organization_settings {
        _id
        contract
        logo
        logo_url
        name
        panel_color
        patient
        patient_plural
        side_menu_color
        therapist
        therapy
      }
      package_settings {
        _id
        created_date
        package_id
        user_id
      }
      patient_data {
        _id
        created_date
        birthdate
        hos_id
        org_id
        patient_availability
        patient_consent
        patient_contract
        patient_employment
        patient_firstname
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
        patient_lastname
        patient_marrital
        patient_no
        patient_sexuality
        patient_status
        therapist_id
        user_id
      }
      therapist_data {
        _id
        accredited_body
        created_date
        hos_id
        hospital_admin_id
        org_id
        therapist_add
        therapist_inscover
        therapist_name
        therapist_no
        therapist_profaccredition
        therapist_poa_attachment
        therapist_specialization
        therapist_status
        therapist_totexp
        therapist_proofaccredition
        user_id
      }
    }
  }
`;

export const GET_DISORDER_DATA = gql`
  query MyQuery {
    getAllDisorder {
      _id
      disorder_name
      user_type
    }
  }
`;

export const GET_DISORDER_DATA_BY_ORG_ID = gql`
  query MyQuery($orgId: String!) {
    getDisorderByOrgId(orgId: $orgId) {
      _id
      disorder_name
      disorder_status
      user_id
      user_type
    }
  }
`;

export const GET_MODEL_BY_DISORDERID_DATA = gql`
  query MyQuery($disorderId: String!) {
    getModelByDisorderId(disorderId: $disorderId) {
      _id
      model_name
    }
  }
`;

export const GET_CATEGORY_BY_MODELID_DATA = gql`
  query MyQuery($modelId: String!) {
    getCategoryByModelId(modelId: $modelId) {
      _id
      category_name
    }
  }
`;

export const GET_AGENDA_BY_DISORDER_AND_MODEL_DATA = gql`
  query MyQuery($disorderId: String!, $modelId: String!) {
    getAgendaByDisorderAndModel(disorderId: $disorderId, modelId: $modelId) {
      _id
      agenda_name
    }
  }
`;

export const GET_ADMIN_TOKEN_DATA = gql`
  query MyQuery {
    getTokenData {
      _id
      user_type
      parent_id
      perm_ids
      user_status
      created_date
      updated_date
    }
  }
`;

export const GET_THERAPIST_TOKEN_DATA = gql`
  query MyQuery {
    getTokenData {
      _id
      user_type
      parent_id
      perm_ids
      user_status
      created_date
      updated_date
      therapist_data {
        _id
        accredited_body
        created_date
        hos_id
        hospital_admin_id
        org_id
        therapist_add
        therapist_inscover
        therapist_name
        therapist_no
        therapist_profaccredition
        therapist_poa_attachment
        therapist_specialization
        therapist_status
        therapist_totexp
        therapist_proofaccredition
        user_id
      }
      organization_settings {
        _id
      }
    }
  }
`;

export const GET_FILE_UPLOAD_URl = gql`
  query GetFileUploadUrl($fileName: String!, $imageFolder: String) {
    getFileUploadUrl(fileName: $fileName, imageFolder: $imageFolder) {
      upload_file_url
    }
  }
`;
