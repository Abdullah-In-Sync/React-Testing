import { gql } from "@apollo/client";

export const GET_USER_ROLE_LIST = gql`
  query getUserRoleList(
    $limit: Int!
    $pageNo: Int!
    $orgId: String
    $searchText: String
    $accessibility: String
  ) {
    getUserRoleList(
      limit: $limit
      page_no: $pageNo
      org_id: $orgId
      search_text: $searchText
      accessibility: $accessibility
    ) {
      rolelist {
        _id
        accessibility
        created_date
        name
        org_id
        organization_name
        position
        updated_date
        status
        privileges
      }
      totalcount
    }
  }
`;

export const GET_ADMIN_MODULE_LIST = gql`
  query GetAdminModuleList($accessibility: String!) {
    getAdminModuleList(accessibility: $accessibility) {
      admin_modulelist {
        _id
        accessibility
        admin_privileges
        name
        status
      }
      admin_privileges {
        _id
        accessibility
        name
        status
      }
      patient_modulelist {
        _id
        accessibility
        name
        patient_privileges
        status
      }
      patient_privileges {
        _id
        name
        accessibility
        status
      }
      therapist_modulelist {
        _id
        accessibility
        name
        status
        therapist_privileges
      }
      therapist_privileges {
        _id
        accessibility
        name
        status
      }
    }
  }
`;

export const ADMIN_ADD_USER_ROLE = gql`
  mutation AdminAddRole(
    $accessibility: String!
    $name: String!
    $org_id: String!
    $position: String!
    $privileges: String!
  ) {
    adminAddRole(
      accessibility: $accessibility
      name: $name
      org_id: $org_id
      position: $position
      privileges: $privileges
    ) {
      duplicateNames {
        _id
        name
      }
      message
      result
    }
  }
`;

export const ADMIN_VIEW_ROLE = gql`
  query AdminViewRole($role_id: ID!) {
    adminViewRole(role_id: $role_id) {
      _id
      accessibility
      created_date
      org_id
      name
      organization_name
      position
      privileges
      status
      updated_date
    }
  }
`;

export const ADMIN_UPDATE_USER_ROLE = gql`
  mutation UpdateAdminRoleById(
    $role_id: String!
    $updateRole: UpdateRoleInput
  ) {
    updateAdminRoleById(role_id: $role_id, updateRole: $updateRole) {
      result
      message
      role_id
    }
  }
`;

export const PATIENT_CUSTOM_USER_LIST = gql`
  query GetCustomUsersList(
    $limit: Int!
    $pageNo: Int!
    $orgId: String
    $name: String
    $roleId: String
  ) {
    getCustomUsersList(
      limit: $limit
      page_no: $pageNo
      org_id: $orgId
      name: $name
      role_id: $roleId
    ) {
      data {
        _id
        added_by
        created_by
        created_date
        first_name
        last_name
        role_id
        status
        updated_date
        user_id
        org_detail {
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
        org_id
        role_detail {
          _id
          accessibility
          created_date
          name
          org_id
          position
          organization_name
          privileges
          status
          updated_date
        }
      }
      total
    }
  }
`;

export const GET_ROLES_ACCESSBILITY = gql`
  query GetRolesbyAccessbility($org_id: String) {
    getRolesbyAccessbility(org_id: $org_id) {
      _id
      created_date
      name
      accessibility
      org_id
      organization_name
      position
      privileges
      status
      updated_date
    }
  }
`;

export const ADD_CUSTOM_USER = gql`
  mutation AddCustomUser(
    $email: String!
    $first_name: String!
    $last_name: String!
    $role_id: String!
    $org_id: String
    $phone_no: String
  ) {
    addCustomUser(
      email: $email
      first_name: $first_name
      last_name: $last_name
      role_id: $role_id
      org_id: $org_id
      phone_no: $phone_no
    ) {
      message
      result
    }
  }
`;

export const GET_CUSTOM_USER_BY_ID = gql`
  query GetCustomUserById($custom_user_id: String!) {
    getCustomUserById(custom_user_id: $custom_user_id) {
      added_by
      _id
      email
      first_name
      last_name
      phone_no
      role_id
    }
  }
`;

export const UPDATE_CUSTOM_USER = gql`
  mutation UpdateCustomUserById(
    $custom_user_id: String!
    $update: UpdateCustomUserInput
  ) {
    updateCustomUserById(custom_user_id: $custom_user_id, update: $update) {
      message
      result
    }
  }
`;

// getCustomUserById
