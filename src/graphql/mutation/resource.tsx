import { gql } from "@apollo/client";
export const DELETE_RESOURCE = gql`
  mutation ($resourceId: String!) {
    deleteResource(resourceId: $resourceId) {
      deleted
    }
  }
`;
