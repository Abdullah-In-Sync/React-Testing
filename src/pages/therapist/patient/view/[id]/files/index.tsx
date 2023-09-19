import React, { useCallback, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import Loader from "../../../../../../components/common/Loader";
import ContentHeader from "../../../../../../components/common/ContentHeader";
import { useSnackbar } from "notistack";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  CommonModal,
  ModalElement,
} from "../../../../../../components/common/CustomModal/CommonModal";
import UploadFileMainForm from "../../../../../../components/therapist/patient/files/uploadFiles/UploadFiles";
import { therapistUploadFile } from "../../../../../../utility/types/resource_types";
import { ADD_PATIENT_FILE } from "../../../../../../graphql/mutation/resource";

export default function TherapistFilesList() {
  const { enqueueSnackbar } = useSnackbar();
  const modalRefAddPlan = useRef<ModalElement>(null);
  const [loader, setLoader] = useState<boolean>(true);

  const [aadFile] = useMutation(ADD_PATIENT_FILE);

  /* istanbul ignore next */
  const handleOpenAddFileModal = useCallback(
    () => modalRefAddPlan.current?.open(),
    []
  );

  /* istanbul ignore next */
  const handleCloseAddFileModal = useCallback(() => {
    modalRefAddPlan.current?.close();
  }, []);

  const dataSubmit = async (formFields: therapistUploadFile) => {
    try {
      aadFile({
        variables: {
          description: formFields.description,
          file_name: formFields.file_name,
          patient_id: sessionStorage.getItem("patient_id"),
          title: formFields.title,
        },
        onCompleted: () => {
          handleCloseAddFileModal();
          enqueueSnackbar("File added successfully!", {
            variant: "success",
            autoHideDuration: 2000,
          });
        },
      });

      setLoader(false);
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("There is something wrong", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };
  return (
    <>
      <Loader visible={loader} />
      <ContentHeader title="Files" />
      <FileUploadIcon
        data-testid="upload_file_button"
        onClick={handleOpenAddFileModal}
      />

      <CommonModal
        ref={modalRefAddPlan}
        headerTitleText={"Upload File"}
        maxWidth="sm"
      >
        <UploadFileMainForm uploadDataSubmit={dataSubmit} />
      </CommonModal>
    </>
  );
}
