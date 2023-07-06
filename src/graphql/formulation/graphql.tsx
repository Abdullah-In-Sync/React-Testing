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
