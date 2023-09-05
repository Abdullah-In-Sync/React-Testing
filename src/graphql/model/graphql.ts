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
