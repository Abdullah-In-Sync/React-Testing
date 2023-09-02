import { gql } from "@apollo/client";

export const GET_ADMIN_AGENDA_LIST = gql`
  query getAdminAgendaList(
    $limit: Int!
    $pageNo: Int!
    $orgId: String
    $searchText: String
    $session_id: String
    $therapy_id: String
  ) {
    getAdminAgendaList(
      limit: $limit
      pageNo: $pageNo
      orgId: $orgId
      searchText: $searchText
      session_id: $session_id
      therapy_id: $therapy_id
    ) {
      agendalist {
        _id
        session_id
        display_order
        agenda_detail {
          agenda_name
          created_date
          _id
        }
        therapy_detail {
          therapy_name
          _id
        }
      }
      total
    }
  }
`;
