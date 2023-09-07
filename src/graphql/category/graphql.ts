import { gql } from "@apollo/client";

export const GET_ADMIN_MODEL_LIST = gql`
  query GetAdminModelList(
    $limit: Int
    $pageNo: Int
    $orgId: String
    $searchText: String
    $therapyId: String
    $disorderId: String
  ) {
    getAdminModelList(
      limit: $limit
      pageNo: $pageNo
      org_id: $orgId
      therapy_id: $therapyId
      search_text: $searchText
      disorder_id: $disorderId
    ) {
      total
      data {
        _id
        created_date
        disorder_detail {
          _id
          created_date
          disorder_name
          disorder_status
          therapy_id
          user_id
          user_type
        }
        disorder_id
        model_name
        therapy_detail {
          _id
          created_date
          org_id
          therapy_name
          therapy_status
          updated_date
          user_id
          user_type
        }
        updated_date
        user_id
        user_type
        model_status
      }
    }
  }
`;

export const GET_ADMIN_CATEGORY_LIST = gql`
  query GetAdminCategoryList(
    $limit: Int
    $pageNo: Int
    $searchText: String
    $therapyId: String
    $disorderId: String
    $modelId: String
    $org_id: String
  ) {
    getAdminCategoryList(
      limit: $limit
      pageNo: $pageNo
      therapy_id: $therapyId
      search_text: $searchText
      disorder_id: $disorderId
      model_id: $modelId
      org_id: $org_id
    ) {
      total
      data {
        _id
        category_name
        category_status
        created_date
        disorder_detail {
          _id
          created_date
          disorder_name
          disorder_status
          therapy_id
          user_id
          user_type
        }
        disorder_id
        model_detail {
          _id
          created_date
          disorder_id
          model_name
          model_status
          updated_date
          user_id
          user_type
        }
        model_id
        updated_date
        user_id
        user_type
        therapy_detail {
          _id
          created_date
          org_id
          therapy_name
          therapy_status
          updated_date
          user_id
          user_type
        }
      }
    }
  }
`;

export const ADD_ADMIN_CATEGORY = gql`
  mutation AdminAddCategory(
    $category_name: String!
    $disorder_id: String!
    $model_id: String!
  ) {
    adminAddCategory(
      category_name: $category_name
      disorder_id: $disorder_id
      model_id: $model_id
    ) {
      message
      result
    }
  }
`;

export const UPDATE_ADMIN_CATEGORY = gql`
  mutation AdminUpdateCategory(
    $category_id: ID!
    $update_category: UpdateCategoryInput
  ) {
    adminUpdateCategory(
      category_id: $category_id
      update_category: $update_category
    ) {
      _id
    }
  }
`;
