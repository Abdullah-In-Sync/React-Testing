import { gql } from "@apollo/client";

export const GET_UPLOAD_RESOURCE_URL = gql`
query MyQuery($fileName: String!) {
  getUploadResourceUrl(fileName: $fileName) {
    resource_upload
  }
}
`;