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
      formulation_returnurl
      formulation_status
      formulation_type
      updated_date
      user_id
    }
  }
`;
