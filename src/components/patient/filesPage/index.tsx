import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useSnackbar } from "notistack";
import { useRef, useState } from "react";
import { useAppContext } from "../../../contexts/AuthContext";

import { GET_FILE_UPLOAD_URl } from "../../../graphql/query/common";
import { uploadToS3 } from "../../../lib/helpers/s3";
import ConfirmWrapper, { ConfirmElement } from "../../common/ConfirmWrapper";
import ContentHeader from "../../common/ContentHeader";
import InfoModal, {
  ConfirmInfoElement,
} from "../../common/CustomModal/InfoModal";
import Loader from "../../common/Loader";
import UploadIconButton from "./UploadFileButton";
import { useStyles } from "./filesStyles";
import AddUploadFileForm from "./uploadFile/AddUploadFileForm";
import { Box } from "@mui/material";
import { ADD_PATIENT_FILE } from "../../../graphql/patientFile/graphql";

const FilesPage: NextPage = () => {
  const styles = useStyles();
  const { user: { _id: patient_id } = {} } = useAppContext();
  const [loader, setLoader] = useState<boolean>(false);

  const infoModalRef = useRef<ConfirmInfoElement>(null);
  const confirmRef = useRef<ConfirmElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [getUploadUrl] = useLazyQuery(GET_FILE_UPLOAD_URl);
  const [addPatientFile] = useMutation(ADD_PATIENT_FILE);

  const onPressUploadIconBtn = () => {
    infoModalRef.current.openConfirm({
      data: {
        onSubmit: submitUploadForm,
        headerTitleText: "Upload File",
      },
    });
  };

  const getUrlAndUploadFile = ({ fileName, file }, callback) => {
    getUploadUrl({
      variables: {
        fileName,
        imageFolder: "imageFolder",
      },
      onCompleted: async (data) => {
        const { getFileUploadUrl: { upload_file_url = undefined } = {} } = data;
        if (upload_file_url) {
          if (await uploadToS3(file, upload_file_url)) callback();
        }
      },
      onError: () => {
        enqueueSnackbar("Server error please try later.", {
          variant: "error",
        });
      },
    });
  };

  const submitUpdateProfileApi = async (formFields, doneCallback) => {
    setLoader(true);
    if (formFields.file_name_file) delete formFields.file_name_file;
    try {
      await addPatientFile({
        variables: { ...formFields, patient_id },
        onCompleted: (data) => {
          const { addPatientFile: { result = undefined } = {} } = data;
          if (result) {
            enqueueSnackbar("File uploaded successfully!", {
              variant: "success",
            });
          }
        },
      });
    } catch (e) {
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
      doneCallback();
    } finally {
      doneCallback();
      setLoader(false);
    }
  };

  const submitCallback = () => {
    confirmRef.current.close();
    infoModalRef.current.close();
  };

  const submitUploadForm = (v, { setSubmitting }) => {
    const { file_name, file_name_file } = v;
    getUrlAndUploadFile(
      {
        fileName: file_name,
        file: file_name_file,
      },
      () =>
        confirmRef.current.openConfirm({
          confirmFunction: () => submitUpdateProfileApi(v, submitCallback),
          description: "Are you sure you want to upload this file?",
          setSubmitting,
        })
    );
  };

  return (
    <>
      <ConfirmWrapper ref={confirmRef}>
        <Loader visible={loader} />
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          className={styles.header}
        >
          <ContentHeader title="Files" />
          <UploadIconButton onClick={onPressUploadIconBtn} />
        </Box>
        <InfoModal
          ref={infoModalRef}
          maxWidth="sm"
          className={styles.addUploadModalWrapper}
        >
          <AddUploadFileForm />
        </InfoModal>
      </ConfirmWrapper>
    </>
  );
};
export default FilesPage;
