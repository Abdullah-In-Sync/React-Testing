import { gql } from "@apollo/client";

export const ADD_THERAPIST_ADD_USER = gql`
  mutation addCustomUser(
    $first_name: String!
    $last_name: String!
    $email: String!
    $role_id: String!
    $org_id: String
    $phone_no: String
  ) {
    addCustomUser(
      first_name: $first_name
      last_name: $last_name
      email: $email
      role_id: $role_id
      org_id: $org_id
      phone_no: $phone_no
    ) {
      message
      result
    }
  }
`;

export const GET_THERAPIST_USER_LIST = gql`
  query getCustomUsersList(
    $page_no: Int!
    $limit: Int!
    $name: String
    $role_id: String
    $org_id: String
  ) {
    getCustomUsersList(
      page_no: $page_no
      limit: $limit
      name: $name
      role_id: $role_id
      org_id: $org_id
    ) {
      total
      data {
        _id
        first_name
        last_name
        email_id
        phone_no
        role_id
        role_detail {
          name
        }
      }
    }
  }
`;

export const GET_USER_DATA_BY_ID = gql`
  query getCustomUserById($custom_user_id: String) {
    getCustomUserById(custom_user_id: $custom_user_id) {
      _id
      added_by
      created_by
      created_date
      email_id
      first_name
      last_name
      phone_no
    }
  }
`;

export const THERAPIST_EDIT_USER = gql`
  mutation updateCustomUserById(
    $custom_user_id: String!
    $update: UpdateCustomUserInput
  ) {
    updateCustomUserById(custom_user_id: $custom_user_id, update: $update) {
      message
      result
    }
  }
`;

export const GET_ROLE_LIST = gql`
  query getRolesbyAccessbility($org_id: String) {
    getRolesbyAccessbility(org_id: $org_id) {
      _id
      accessibility
      created_date
      name
      org_id
      organization_name
      position
      privileges
      status
      updated_date
    }
  }
`;
