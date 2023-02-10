import { gql } from "@apollo/client";

export const CREATE_FEEDBACK = gql`
  mutation createFeedback(
    $userType: String = ""
    $sessionNo: String = ""
    $orgId: String = ""
    $feedQuesData: String = ""
    $feedBackName: String = ""
    $feedBackDesc: String
    $visiBility: Int
  ) {
    createFeedback(
      feedBackName: $feedBackName
      orgId: $orgId
      sessionNo: $sessionNo
      userType: $userType
      feedBackDesc: $feedBackDesc
      feedQuesData: $feedQuesData
      visiBility: $visiBility
    ) {
      result
    }
  }
`;
