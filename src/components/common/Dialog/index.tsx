import React, { useState } from "react";
import { getUpdatedFileName, uploadToS3 } from "../../../lib/helpers/s3";
import { GET_UPLOAD_RESOURCE_URL } from "./../../../graphql/query/resource";
import { UPDATE_RESOURCE } from "../../../graphql/mutation/resource";
import { useLazyQuery, useMutation } from "@apollo/client";
// import { ConfirmationDialog } from "../ConfirmationDailog/index";
import { FileUploadDialog } from "../FileUploadDailog/index";
import SureModal from "../../admin/resource/SureModal";
import { Box, Button, FormControl, FormLabel, Grid } from "@mui/material";

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

  const updateFileName = (e) => {
    setUpdatedFileName(getUpdatedFileName(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsConfirmButtonClicked(true);

    const res = await getPreSignedURL({
      variables: updatedFileName,
    });
    if (res) {
      const resp = await uploadToS3(
        updatedFileName?.fileName,
        res?.data.getUploadResourceUrl.resource_upload
      );

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
        <>
          <SureModal modalOpen={isShowConfirm} setModalOpen={setIsShowConfirm}>
            <Box marginTop="20px" display="flex" justifyContent="end">
              <Button
                variant="contained"
                color="inherit"
                size="small"
                data-testid="addResourceModalCancelButton"
                onClick={() => {
                  setIsShowConfirm(false);
                }}
              >
                Cancel
              </Button>
              <Button
                color="error"
                variant="contained"
                sx={{ marginLeft: "5px" }}
                size="small"
                data-testid="addResourceModalConfirmButton"
                onClick={(e) => {
                  setIsShowConfirm(false);
                  handleSubmit(e);
                }}
              >
                Confirm
              </Button>
            </Box>
          </SureModal>
        </>
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
