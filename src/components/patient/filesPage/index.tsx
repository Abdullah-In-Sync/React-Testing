import { useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useSnackbar } from "notistack";
import { useRef, useState } from "react";
import { useAppContext } from "../../../contexts/AuthContext";

import { Box } from "@mui/material";
import { ADD_PATIENT_FILE } from "../../../graphql/patientFile/graphql";
import { fetchUrlAndUploadFile } from "../../../hooks/fetchUrlAndUploadFile";
import { removeProp } from "../../../utility/helper";
import ConfirmWrapper, { ConfirmElement } from "../../common/ConfirmWrapper";
import ContentHeader from "../../common/ContentHeader";
import InfoModal, {
  ConfirmInfoElement,
} from "../../common/CustomModal/InfoModal";
import Loader from "../../common/Loader";
import UploadIconButton from "./UploadFileButton";
import { useStyles } from "./filesStyles";
import AddUploadFileForm from "./uploadFile/AddUploadFileForm";
const FilesPage: NextPage = () => {
  const styles = useStyles();
  const { user: { _id: patient_id } = {} } = useAppContext();
  const { uploadFile } = fetchUrlAndUploadFile();
  const [loader, setLoader] = useState<boolean>(false);

  const infoModalRef = useRef<ConfirmInfoElement>(null);
  const confirmRef = useRef<ConfirmElement>(null);
  const { enqueueSnackbar } = useSnackbar();
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
    uploadFile({ fileName, file, imageFolder: "imageFolder" }, callback, () => {
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
    });
  };

  const submitUpdateProfileApi = async (formFields, doneCallback) => {
    setLoader(true);
    const variables = removeProp(formFields, ["file_name_file"]);
    try {
      await addPatientFile({
        variables: { ...variables, patient_id },
        onCompleted: (data) => {
          const {
            addPatientFile: { result = undefined, message = undefined } = {},
          } = data;
          if (result) {
            enqueueSnackbar("File uploaded successfully!", {
              variant: "success",
            });
            doneCallback();
          } else if (message) {
            enqueueSnackbar(message, {
              variant: "error",
            });
          }
        },
      });
    } catch (e) {
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
    } finally {
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
