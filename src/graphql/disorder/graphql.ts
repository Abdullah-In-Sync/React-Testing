import { gql } from "@apollo/client";

export const GET_ADMIN_DISORDER_LIST = gql`
  query GetAdminDisorderList(
    $limit: Int
    $pageNo: Int
    $orgId: String
    $searchText: String
    $therapyId: String
  ) {
    getAdminDisorderList(
      limit: $limit
      pageNo: $pageNo
      org_id: $orgId
      therapy_id: $therapyId
      search_text: $searchText
    ) {
      data {
        _id
        disorder_name
        disorder_status
        organization_settings {
          _id
          name
        }
        therapy_detail {
          _id
          therapy_name
        }
      }
      total
    }
  }
`;

export const GET_ADMIN_THERAPY_LIST = gql`
  query AdminTherapyList(
    $limit: Int
    $pageNo: Int
    $orgId: String
    $searchText: String
  ) {
    adminTherapyList(
      limit: $limit
      pageNo: $pageNo
      org_id: $orgId
      therapy_name: $searchText
    ) {
      data {
        therapy_name
        therapy_status
        organization_name
        org_id
        _id
      }
      total
    }
  }
`;

export const ADD_ADMIN_DISORDER = gql`
  mutation AdminAddDisorder($disorder_name: String!, $therapy_id: String!) {
    adminAddDisorder(disorder_name: $disorder_name, therapy_id: $therapy_id) {
      message
      result
    }
  }
`;
