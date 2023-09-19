import { useLazyQuery } from "@apollo/client";

import { GET_FILE_UPLOAD_URl } from "../graphql/query/common";
import { uploadToS3 } from "../lib/helpers/s3";
export const fetchUrlAndUploadFile = () => {
  const [getUploadUrl] = useLazyQuery(GET_FILE_UPLOAD_URl);
  const uploadFile = ({ fileName, file, imageFolder }, callback, onError) => {
    getUploadUrl({
      variables: {
        fileName,
        imageFolder,
      },
      onCompleted: async (data) => {
        const { getFileUploadUrl: { upload_file_url = undefined } = {} } = data;
        if (upload_file_url) {
          if (await uploadToS3(file, upload_file_url)) callback();
        }
      },
      onError,
    });
  };
  return { uploadFile };
};
