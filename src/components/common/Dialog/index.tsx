import * as React from "react";
import { getUpdatedFileName, uploadToS3 } from "../../../lib/helpers/s3";
import { GET_UPLOAD_RESOURCE_URL } from "./../../../graphql/query/resource";
import { UPDATE_RESOURCE } from "../../../graphql/mutation/resource";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ConfirmationDialog } from "../ConfirmationDailog/index";
import { FileUploadDialog } from "../FileUploadDailog/index";

export default function FileUpload({ open, closeFileUploadDialog, ptshareId }) {
  const [isSubmit, setIsSubmit] = React.useState<boolean>(false);
  const [isShowConfirm, setIsShowConfirm] = React.useState<boolean>(false);
  const [updatedFileName, setUpdatedFileName] = React.useState<{
    fileName: any;
  }>({ fileName: null });

  const [isConfirmButtonClicked, setIsConfirmButtonClicked] =
    React.useState<boolean>(false);

  const [getPreSignedURL] = useLazyQuery(GET_UPLOAD_RESOURCE_URL);

  const [getUpdatedResource] = useMutation(UPDATE_RESOURCE);

  const openConfirmationDialog = (e) => {
    e.preventDefault();
    setIsShowConfirm(true);
  };
  const closeConfirmationDialog = () => {
    setIsShowConfirm(false);
  };

  const updateFileName = (e) => {
    setUpdatedFileName(getUpdatedFileName(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsConfirmButtonClicked(true);

    const res = await getPreSignedURL({
      variables: updatedFileName,
    });
    console.log("RES before if: ", res);
    if (res) {
      console.log("RES after if: ", res);
      console.log("updatedFileName: ", updatedFileName);
      const resp = await uploadToS3(
        updatedFileName?.fileName,
        res?.data.getUploadResourceUrl.resource_upload
      );
      console.log("resp:  ", resp);

      if (resp) {
        if (Object.keys(updatedFileName).length > 0) {
          const res2 = await getUpdatedResource({
            variables: {
              ptsharresId: ptshareId,
              update: {
                patient_share_filename: updatedFileName?.fileName,
              },
            },
          });
          console.log("res2: ", res2);
          if (res2) {
            setIsShowConfirm(false);
            closeFileUploadDialog();
            setIsSubmit(false);
            setIsConfirmButtonClicked(false);
          }
        }
      }
    }
  };

  return (
    <div data-testid="openFileUpload">
      {isShowConfirm && (
        <ConfirmationDialog
          open={isShowConfirm}
          closeConfirmationDialog={closeConfirmationDialog}
          isConfirmButtonClicked={isConfirmButtonClicked}
          onConfirmation={handleSubmit}
          title="Are you sure you want to add doc"
        />
      )}

      {open === true && (
        <FileUploadDialog
          open={open}
          onClose={closeFileUploadDialog}
          openConfirmationDialog={openConfirmationDialog}
          onChange={updateFileName}
          isSubmit={isSubmit}
          heading={"Upload Doc File"}
        />
      )}
    </div>
  );
}
