import { gql } from "@apollo/client";

export const GET_ADMIN_THERAPIST_LIST = gql`
  query GetTherapistList($limit: Int!, $pageNo: Int!, $searchText: String) {
    getTherapistList(limit: $limit, pageNo: $pageNo, searchText: $searchText) {
      total
      therapistlist {
        _id
        therapist_name
        therapist_status
        plan
        user_id
        org_data {
          name
          _id
        }
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
    $therapist_profaccredition: String
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
      therapist_profaccredition: $therapist_profaccredition
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

export const GET_THERAPIST_BY_ID = gql`
  query GetTherapistById($user_id: String!) {
    getTherapistById(user_id: $user_id) {
      user_id
      email
      phone_number
      plan
      therapist_proofaccredition
      therapist_totexp
      therapist_status
      therapist_profaccredition
      therapist_poa_attachment
      therapist_no
      therapist_name
      _id
      accredited_body
      created_date
      hos_id
      hospital_admin_id
      org_id
      poa_url
      therapist_add
      therapist_inscover
      therapist_specialization
      therapist_add
      trial_period
    }
  }
`;

export const UPDATE_THERAPIST_BY_ID = gql`
  mutation UpdateTherapistById(
    $user_id: String!
    $therapist_add: String
    $therapist_name: String
    $update: UpdateTherapistInput
  ) {
    updateTherapistById(
      user_id: $user_id
      therapist_add: $therapist_add
      therapist_name: $therapist_name
      update: $update
    ) {
      _id
      user_id
    }
  }
`;

export const DELETE_THERAPIST_BY_ID = gql`
  mutation DeleteTherapist($therapist_id: String!) {
    deleteTherapist(therapist_id: $therapist_id) {
      message
      result
    }
  }
`;
