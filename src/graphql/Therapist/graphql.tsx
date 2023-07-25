import { gql } from "@apollo/client";

export const GET_ADMIN_THERAPIST_LIST = gql`
  query GetTherapistList(
    $limit: Int!
    $name: String
    $paginationtoken: String
  ) {
    getTherapistList(
      limit: $limit
      name: $name
      paginationtoken: $paginationtoken
    ) {
      pagination
      therapistlist {
        name
        email
        phone_number
        specialization
        therapist_id
      }
    }
  }
`;

export const ADD_ADMIN_THERAPIST = gql`
  mutation AddTherapist(
    $email: String!
    $therapist_name: String!
    $password: String!
    $org_id: String!
    $plan: String!
    $trial_period: String!
    $therapist_specialization: String
    $therapist_proofaccredition: Int
    $accredited_body: String
    $therapist_totexp: String
    $therapist_add: String
    $therapist_inscover: String
    $therapist_poa_attachment: String
    $phone_number: String
  ) {
    addTherapist(
      email: $email
      therapist_name: $therapist_name
      password: $password
      org_id: $org_id
      plan: $plan
      trial_period: $trial_period
      therapist_specialization: $therapist_specialization
      therapist_proofaccredition: $therapist_proofaccredition
      accredited_body: $accredited_body
      therapist_totexp: $therapist_totexp
      therapist_add: $therapist_add
      therapist_inscover: $therapist_inscover
      therapist_poa_attachment: $therapist_poa_attachment
      phone_number: $phone_number
    ) {
      message
      result
    }
  }
`;

export const GET_MASTER_DATA = gql`
  query GetMasterData($name: String!) {
    getMasterData(name: $name) {
      _id
      display_name
      name
    }
  }
`;
