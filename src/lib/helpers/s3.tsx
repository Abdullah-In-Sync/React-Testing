import axios from "axios";
import { msToTime } from "./common";

export const getUpdatedFileName = (
  selectedFile: File
): { fileName: string } => {
  // const [
  //   getPreSignedURL,
  //   { data: preSignedData },
  // ] = useLazyQuery(GET_UPLOAD_RESOURCE_URL);

  const today = new Date();
  const date =
    today.getFullYear() + "" + (today.getMonth() + 1 < 10)
      ? "0" + (today.getMonth() + 1)
      : today.getMonth() + 1 + "" + today.getDate();
  const time = msToTime(today.getTime());
  return { fileName: date + "" + time + "__" + selectedFile.name };

  // getPreSignedURL({
  //   variables: { fileName: new_file_name },
  // });

  // if (preSignedData && preSignedData.getUploadResourceUrl && preSignedData.getUploadResourceUrl.resource_upload) {
  //   return {
  //     fileName: new_file_name,
  //     url: preSignedData.getUploadResourceUrl.resource_upload
  //   }
  // }
};

export const uploadToS3 = async (
  selectedFile: File,
  preSignedURL: string
): Promise<boolean> => {
  const formData = new FormData();
  formData.append("file", selectedFile);

  const response = await axios.put(preSignedURL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  if (response.status == 200) {
    return true;
  }
};
