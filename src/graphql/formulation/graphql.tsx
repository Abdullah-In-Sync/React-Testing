import { gql } from "@apollo/client";

export const GET_FORMULATION_LIST = gql`
  query GetFormulationList(
    $my_fav: Int
    $my_formulation: Int
    $search_text: String
  ) {
    getFormulationList(
      my_fav: $my_fav
      my_formulation: $my_formulation
      search_text: $search_text
    ) {
      _id
      created_date
      download_formulation_url
      fav_for_detail {
        _id
        created_date
        forfav_status
        formulation_id
        updated_date
        user_id
      }
      formulation_avail_for
      formulation_desc
      formulation_img
      formulation_instruction
      formulation_name
      formulation_status
      formulation_type
      updated_date
      user_id
    }
  }
`;

export const ADD_FAV_FORMULATION = gql`
  mutation AddFavouriteFormulation($formulation_id: String!) {
    addFavouriteFormulation(formulation_id: $formulation_id) {
      fav_formulation_id
    }
  }
`;

export const REMOVE_FAV_FORMULATION = gql`
  mutation DeleteFavouriteFormulation($fav_formulation_id: String!) {
    deleteFavouriteFormulation(fav_formulation_id: $fav_formulation_id) {
      deleted
    }
  }
`;

export const GET_FORMULATION_BY_ID = gql`
  query GetFormulationById($formulation_id: String!) {
    getFormulationById(formulation_id: $formulation_id) {
      fav_for_detail {
        _id
        forfav_status
        formulation_id
        user_id
      }
      formulation_avail_for
      formulation_desc
      formulation_img
      formulation_instruction
      formulation_name
      formulation_status
      formulation_type
      formulation_url
      org_id
      template_data
      template_id
      user_id
      _id
      download_formulation_url
    }
  }
`;

export const UPDATE_FORMULATION = gql`
  mutation UpdateFormulationById(
    $formulation_id: ID!
    $updateFormulation: UpdateFormulationInput
  ) {
    updateFormulationById(
      formulation_id: $formulation_id
      updateFormulation: $updateFormulation
    ) {
      _id
    }
  }
`;

export const UPDATE_ADMIN_FORMULATION_BY_ID = gql`
  mutation ($formulation_id: ID!, $updateFormulation: UpdateFormulationInput) {
    updateFormulationById(
      formulation_id: $formulation_id
      updateFormulation: $updateFormulation
    ) {
      _id
      created_date
      download_formulation_url
      formulation_avail_for
      formulation_desc
      formulation_img
      formulation_instruction
      formulation_returnurl
      formulation_name
      formulation_status
      formulation_type
      formulation_url
      updated_date
      user_id
    }
  }
`;

export const ADMIN_SHARE_FORMULATION = gql`
  mutation adminShareFormulation($formulation_id: String!, $org_id: String!) {
    adminShareFormulation(formulation_id: $formulation_id, org_id: $org_id) {
      duplicateNames {
        _id
        name
      }
      result
    }
  }
`;

export const THERAPIST_SHARE_FORMULATION_BY_ID = gql`
  mutation therapistShareFormulationById(
    $formulation_id: String!
    $patient_id: String!
  ) {
    therapistShareFormulationById(
      formulation_id: $formulation_id
      patient_id: $patient_id
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

export const GET_PATIENT_SHARED_LIST = gql`
  query getPatientSharedList($name: String!, $share_type: String!) {
    getPatientSharedList(name: $name, share_type: $share_type) {
      _id
      is_shared
      patient_firstname
      patient_lastname
    }
  }
`;

export const GET_PATIENT_FORMULATION_LIST = gql`
  query getPatientFormulationList {
    getPatientFormulationList {
      _id
      created_date
      formulation_data {
        formulation_name
        download_formulation_url
        formulation_avail_for
        formulation_img
        formulation_returnurl
        formulation_url
      }
    }
  }
`;

export const UPDATE_PAT_FORMULATION_BY_ID = gql`
  mutation updatePatFormulationById(
    $patient_id: String
    $ptsharresId: ID!
    $updateShareForm: UpdatePatientFormulationInput
  ) {
    updatePatFormulationById(
      patient_id: $patient_id
      ptsharresId: $ptsharresId
      updateShareForm: $updateShareForm
    ) {
      _id
      formulation_id
      template_id
      template_response
    }
  }
`;

export const GET_FORMULATION_BY_SHARE_ID = gql`
  query getFormulationByShareId($ptsharresId: String!, $patient_id: String) {
    getFormulationByShareId(
      ptsharresId: $ptsharresId
      patient_id: $patient_id
    ) {
      _id
      created_date
      formulation_data {
        user_id
        formulation_url
        formulation_type
        formulation_status
        formulation_returnurl
        formulation_name
        formulation_instruction
        formulation_img
        formulation_desc
        formulation_avail_for
        download_formulation_url
        template_data
      }
      template_detail {
        component_name
        category
        name
      }
      formulation_id
      patient_id
      share_from
      updated_date
      template_response
    }
  }
`;

export const GET_PAT_FORMULATION_LIST = gql`
  query getPatFormulationList($patientId: String!) {
    getPatFormulationList(patientId: $patientId) {
      _id
      created_date
      formulation_data {
        _id
        formulation_name
        download_formulation_url
        formulation_avail_for
        formulation_img
        formulation_returnurl
        formulation_url
      }
      template_detail {
        _id
        category
        component_name
        created_date
        name
        updated_date
      }
      template_id
      template_response
      updated_date
    }
  }
`;

export const THERAPIST_DELETE_FORMULATION_BY_ID = gql`
  mutation therapistDeleteFormulationById($patient_formulation_id: String!) {
    therapistDeleteFormulationById(
      patient_formulation_id: $patient_formulation_id
    ) {
      message
      result
    }
  }
`;
