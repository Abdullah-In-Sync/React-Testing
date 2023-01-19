import { gql } from "@apollo/client";

export const ADD_ORGANIZATION_DATA = gql`
  mutation (
    $orgName: String!
    $panelColor: String!
    $sideMenuColor: String!
    $therapist: String!
    $patient: String!
    $patientPlural: String!
    $therapy: String!
    $contract: String!
    $patientWelcomeEmail: String!
    $logo: String!
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
    ) {
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
