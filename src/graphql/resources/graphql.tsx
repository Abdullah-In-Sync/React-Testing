import { gql } from "@apollo/client";

export const THERAPIST_SHARE_RESOURCE = gql`
  mutation ($ptsharresId: String!) {
    therapistSharePatientResource(ptsharresId: $ptsharresId) {
      message
      result
    }
  }
`;
