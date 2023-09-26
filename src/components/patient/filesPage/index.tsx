import { useMutation, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useSnackbar } from "notistack";
import { useRef, useState } from "react";
import { useAppContext } from "../../../contexts/AuthContext";

import { Box } from "@mui/material";
import {
  ADD_PATIENT_FILE,
  GET_PATIENT_FILE_LIST,
  UPDATE_PATIENT_FILE,
} from "../../../graphql/patientFile/graphql";
import { PaitentFileListData } from "../../../graphql/patientFile/type";
import { fetchUrlAndUploadFile } from "../../../hooks/fetchUrlAndUploadFile";
import { removeProp } from "../../../utility/helper";
import { ConfirmElement } from "../../common/ConfirmWrapper";
import ContentHeader from "../../common/ContentHeader";
import { ConfirmInfoElement } from "../../common/CustomModal/InfoModal";
import Loader from "../../common/Loader";
import UploadIconButton from "./UploadFileButton";
import FilesListComponent from "./filesList/FilesList";
import { useStyles } from "./filesStyles";
const FilesPage: NextPage = () => {
  const styles = useStyles();
  const { user: { _id: patient_id } = {} } = useAppContext();
  const { uploadFile } = fetchUrlAndUploadFile();
  const [loader, setLoader] = useState<boolean>(false);

  const infoModalRef = useRef<ConfirmInfoElement>(null);
  const confirmRef = useRef<ConfirmElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [addPatientFile] = useMutation(ADD_PATIENT_FILE);
  const [updatePatientFile] = useMutation(UPDATE_PATIENT_FILE);

  const {
    data: { getPatientFileListByTherapist: patientFilesList = undefined } = {},
    refetch: refetchPatientList,
    loading: loadingPatientFileData,
  } = useQuery<PaitentFileListData>(GET_PATIENT_FILE_LIST, {
    variables: {
      patient_id,
    },
    fetchPolicy: "no-cache",
  });

  const getUrlAndUploadFile = ({ fileName, file }, callback) => {
    uploadFile(
      { fileName, file, imageFolder: "patientfiles" },
      callback,
      () => {
        enqueueSnackbar("Server error please try later.", {
          variant: "error",
        });
      }
    );
  };

  const submitAddUploadApi = async (formFields, doneCallback) => {
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
            refetchPatientList();
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

  const submitUpdateUploadApi = async (
    v,
    doneCallback,
    successMessage?: string
  ) => {
    setLoader(true);
    const { formFields, file_id } = v;
    const variables = removeProp(formFields, ["file_name_file", "is_private"]);
    try {
      await updatePatientFile({
        variables: { file_id, patient_id, update: variables },
        onCompleted: (data) => {
          const {
            updatePatientFile: { result = undefined, message = "" } = {},
          } = data;

          if (result) {
            refetchPatientList();
            doneCallback();
            return enqueueSnackbar(
              successMessage ? successMessage : "File updated successfully!",
              {
                variant: "success",
              }
            );
          }
          doneCallback();
          return enqueueSnackbar(message, {
            variant: "error",
          });
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
          confirmFunction: () => submitAddUploadApi(v, submitCallback),
          description: "Are you sure you want to upload this file?",
          setSubmitting,
        })
    );
  };

  const submitUpdateUploadedFile = (v, { setSubmitting }) => {
    const { formFields } = v;
    const { file_name, file_name_file } = formFields;
    if (file_name_file)
      getUrlAndUploadFile(
        {
          fileName: file_name,
          file: file_name_file,
        },
        () =>
          confirmRef.current.openConfirm({
            confirmFunction: () => submitUpdateUploadApi(v, submitCallback),
            description: "Are you sure you want to update the file?",
            setSubmitting,
          })
      );
    else
      confirmRef.current.openConfirm({
        confirmFunction: () => submitUpdateUploadApi(v, submitCallback),
        description: "Are you sure you want to update the file?",
        setSubmitting,
      });
  };

  const onPressUploadIconBtn = () => {
    infoModalRef.current.openConfirm({
      data: {
        onSubmit: submitUploadForm,
        headerTitleText: "Upload File",
      },
    });
  };

  const pageActionButtonClick = (value) => {
    const { pressedIconButton, _id: file_id, file_url } = value;
    if (pressedIconButton === "edit")
      return infoModalRef.current.openConfirm({
        data: {
          onSubmit: (v, formikProps) =>
            submitUpdateUploadedFile({ formFields: v, file_id }, formikProps),
          headerTitleText: "Upload File",
          uploadInitialData: value,
          saveButtonText: "Update",
        },
      });
    else if (pressedIconButton === "delete")
      return confirmRef.current.openConfirm({
        confirmFunction: () =>
          submitUpdateUploadApi(
            { formFields: { status: 0 }, file_id },
            submitCallback,
            "File deleted successfully!"
          ),
        description: "Are you sure you want to delete?",
      });
    else if (pressedIconButton === "view") window.open(file_url, "_blank");
  };

  return (
    <>
      <Loader visible={loader || loadingPatientFileData} />
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        className={styles.header}
      >
        <ContentHeader title="Files" />
        <UploadIconButton onClick={onPressUploadIconBtn} />
      </Box>
      <FilesListComponent
        listData={patientFilesList}
        confirmRef={confirmRef}
        infoModalRef={infoModalRef}
        pageActionButtonClick={pageActionButtonClick}
        loadingPatientFileData={loadingPatientFileData}
      />
    </>
  );
};
export default FilesPage;
