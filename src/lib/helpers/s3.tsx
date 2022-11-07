import axios from "axios";
import { msToTime } from "./common";

export const getUpdatedFileName = (
  selectedFile: File
): { fileName: string } => {
  const today = new Date();
  const date =
    today.getFullYear() + "" + (today.getMonth() + 1 < 10)
      ? "0" + (today.getMonth() + 1)
      : today.getMonth() + 1 + "" + today.getDate();
  const time = msToTime(today.getTime());
  return { fileName: date + "" + time + "__" + selectedFile.name };
};

export const uploadToS3 = async (
  selectedFile: File,
  preSignedURL: string
): Promise<boolean> => {
  const response = await axios.put(preSignedURL, selectedFile, {
    headers: { "Content-Type": selectedFile.type },
  });
  if (response.status == 200) {
    return true;
  }
};
