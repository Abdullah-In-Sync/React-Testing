import { gql } from "@apollo/client";

export const ADD_ORGANIZATION_DATA = gql`
  mutation (
    $contract: String!
    $disorder_id: String!
    $logo: String
    $model_id: String!
    $orgName: String!
    $panelColor: String!
    $patient: String!
    $patientPlural: String!
    $patientWelcomeEmail: String!
    $sideMenuColor: String!
    $therapist: String!
    $therapy: String!
    $therapy_id: String!
  ) {
    createOrganization(
      orgName: $orgName
      panelColor: $panelColor
      sideMenuColor: $sideMenuColor
      therapist: $therapist
      patient: $patient
      patientPlural: $patientPlural
      therapy: $therapy
      contract: $contract
      patientWelcomeEmail: $patientWelcomeEmail
      logo: $logo
      model_id: $model_id
      therapy_id: $therapy_id
      disorder_id: $disorder_id
    ) {
      _id
      contract
      created_date
      disorder_id
      logo
      logo_url
      model_id
      name
      panel_color
      patient
      patient_plural
      patient_welcome_email
      side_menu_color
      therapist
      therapy
      therapy_id
    }
  }
`;

export const UPDATE_ORG_BY_ID = gql`
  mutation ($orgId: ID!, $update: UpdateOrgInput!) {
    updateOrgById(orgId: $orgId, update: $update) {
      _id
      contract
      created_date
      logo
      logo_url
      name
      panel_color
      patient
      patient_plural
      patient_welcome_email
      side_menu_color
      therapist
      therapy
    }
  }
`;

//Update API
export const UPDATE_ORG_CONFIG = gql`
  mutation ($moduleName: String!, $orgId: ID!) {
    updateOrgConfig(moduleName: $moduleName, orgId: $orgId) {
      _id
      name
      org_id
      status
    }
  }
`;

export const GET_THERAPIST_LIST_BY_ORG_ID = gql`
  query MyQuery($orgId: String) {
    getTherapyListByOrgId(orgId: $orgId) {
      _id
      created_date
      org_id
      therapy_name
      therapy_status
      user_id
      user_type
    }
  }
`;

export const GET_ADMIN_AGENDA_BY_ID = gql`
  query MyQuery($agenda_id: String) {
    getAdminAgendaById(agenda_id: $agenda_id) {
      _id
      agenda_name
      org_id
      agenda_status
      created_date
      disorder_id
      model_id
      session
      therapy_id
      user_id
      user_type
      agenda_session_detail {
        display_order
      }
    }
  }
`;

export const GET_DISORDER_LIST_BY_THERAPY_ID = gql`
  query MyQuery($therapyId: String!) {
    getDisorderByTherapyId(therapyId: $therapyId) {
      _id
      created_date
      disorder_name
      disorder_status
      therapy_detail {
        _id
        created_date
        org_id
        therapy_name
        therapy_status
        updated_date
        user_id
        user_type
      }
      therapy_id
      updated_date
      user_id
      user_type
    }
  }
`;

export const GET_MODLE_DISORDER_LIST_BY_DISORDER_ID = gql`
  query MyQuery($disorderId: String!) {
    getModelDisorderList(disorderId: $disorderId) {
      _id
      created_date
      disorder_id
      model_name
      model_status
      updated_date
      user_id
      user_type
    }
  }
`;
