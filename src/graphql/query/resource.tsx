import { gql } from "@apollo/client";

export const GET_CATEGORY = gql`
  query GetCategoryByModelId($modelId: String) {
    getCategoryByModelId(modelId: $modelId) {
      _id
      category_name
    }
  }
`;

export const GET_DISORDER_MODEL_LIST = gql`
  query GetDisorderModelList {
    getDisorderModel {
      _id
      disorder_name
      disordermodel_data {
        _id
        model_name
        model_status
      }
    }
  }
`;

export const GET_ADMIN_RESOURCE_DATA = gql`
  query getAdminResourceList(
    $userType: String!
    $resourceStatus: Int!
    $modelId: String
    $disorderId: String
    $categoryId: String
    $resourceType: String
    $mode: String
    $myResource: Int
    $myFav: Int
    $searchText: String
  ) {
    getAdminResourceList(
      userType: $userType
      resourceStatus: $resourceStatus
      modelId: $modelId
      disorderId: $disorderId
      categoryId: $categoryId
      resourceType: $resourceType
      mode: $mode
      myResource: $myResource
      myFav: $myFav
      searchText: $searchText
    ) {
      _id
      fav_res_detail {
        _id
        created_date
        resfav_status
        resource_id
        user_id
        user_type
      }
      resource_desc
      resource_name
      user_id
    }
  }
`;

export const GET_PATIENT_RESOURCE_DATA = gql`
  query GetPatientResource {
    getPatientResourceList {
      _id
      ptsharres_session
      created_date
      resource_data {
        resource_name
        resource_type
      }
    }
  }
`;

export const GET_PATIENT_RESOURCE_DETAIL = gql`
  query getResourceDetailById($ptsharresId: String!, $fileName: String) {
    getResourceDetailById(ptsharresId: $ptsharresId, fileName: $fileName) {
      _id
      ptsharres_session
      ptsharres_status
      created_date
      ptsharres_from
      ptsharres_subfrom
      share_from
      resource_upload
      patient_share_filename
      download_patient_filename_url
      patient_id
      resource_id
      resource_data {
        resource_name
        resource_desc
        resource_instruction
        resource_references
        resource_filename
      }
      disorder_detail {
        _id
        disorder_name
      }
      model_detail {
        _id
        model_name
      }
    }
  }
`;
