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

export const GET_PATIENTFEEDBACKLIST_DATA = gql`
  query GetPatientFeedbackList(
    $feedbackType: String!
    $sessionNo: Int!
    $pttherapyId: String!
  ) {
    getPatientFeedbackList(
      feedbackType: $feedbackType
      sessionNo: $sessionNo
      pttherapyId: $pttherapyId
    ) {
      _id
      user_id
      org_id
      session_no
      feedback_type
      question
      answer_type
      answer_options
      status
      created_date
      updated_date
      feedback_ans {
        _id
        answer
        created_date
        patient_id
        question_id
        status
        therapist_id
        updated_date
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
        logo
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
        therapit_proofacredition
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
