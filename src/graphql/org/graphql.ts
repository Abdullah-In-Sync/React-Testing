import { gql } from "@apollo/client";

export const GET_ORG_PUBLIC_DATA = gql`
  query GetOrgByDomain($name: String!) {
    getOrgByDomain(name: $name) {
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
