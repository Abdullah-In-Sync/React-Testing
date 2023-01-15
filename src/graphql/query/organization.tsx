import { gql } from "@apollo/client";

export const GET_ORGANIZATION_LIST = gql`
  query getOrganizationData {
    getOrganizationData {
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

export const GET_ORGANIZATION_DETAIL_BY_ID = gql`
  query viewOrganizationById($orgId: String!) {
    viewOrganizationById(orgId: $orgId) {
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
