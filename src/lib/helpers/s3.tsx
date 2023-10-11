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

export const strippedBlob = async (
  selectedFile: File,
  callback: any
): Promise<any> => {
  const stripped = new FileReader();
  let blob;
  stripped.readAsArrayBuffer(selectedFile);
  stripped.onload = async function () {
    blob = ignoreExifGenerateBlob(this.result, selectedFile);
    callback(await new File([blob], selectedFile.name, { type: blob.type }));
  };
};

export const ignoreExifGenerateBlob = (fileReaderResult, selectedFile) => {
  const type = selectedFile.type;
  let offset = 0;
  let recess = 0;
  const pieces = [];
  let i = 0;
  const dataView = new DataView(fileReaderResult);
  if (dataView.getUint16(offset) === 0xffd8) {
    offset += 2;
    let app1 = dataView.getUint16(offset);
    offset += 2;
    // This loop doing the acutal reading of the data
    // and creating an array with only the pieces we want.
    while (offset < dataView.byteLength) {
      if (app1 === 0xffe1) {
        pieces[i] = {
          recess: recess,
          offset: offset - 2,
        };

        recess = offset + dataView.getUint16(offset);

        i++;
      } else if (app1 === 0xffda) {
        break;
      }
      offset += dataView.getUint16(offset);
      app1 = dataView.getUint16(offset);
      offset += 2;
    }
    if (pieces.length > 0) {
      const newPieces = [];

      pieces.forEach(function (v) {
        newPieces.push(fileReaderResult.slice(v.recess, v.offset));
      }, this);

      newPieces.push(fileReaderResult.slice(recess));

      return new Blob(newPieces, { type });
    } else {
      return new Blob([dataView], { type });
    }
  } else {
    return new Blob([dataView], { type });
  }
};
