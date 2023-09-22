import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import Loader from "../../../../../../components/common/Loader";
import { useSnackbar } from "notistack";
import {
  CommonModal,
  ModalElement,
} from "../../../../../../components/common/CustomModal/CommonModal";
import UploadFileMainForm from "../../../../../../components/therapist/patient/files/uploadFiles/UploadFiles";
import { therapistUploadFile } from "../../../../../../utility/types/resource_types";
import {
  ADD_PATIENT_FILE,
  DELETE_THERAPIST_FILE,
  GET_THERAPIST_FILE_LIST,
} from "../../../../../../graphql/mutation/resource";
import TherapistFileList from "../../../../../../components/therapist/patient/files/list";
import ConfirmationModal from "../../../../../../components/common/ConfirmationModal";
import ConfirmBoxModal from "../../../../../../components/common/ConfirmBoxModal";

export default function TherapistFilesList() {
  const { enqueueSnackbar } = useSnackbar();
  const confirmModalRef = useRef<ModalElement>(null);
  const modalRefAddPlan = useRef<ModalElement>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState("");
  const [isConfirmDeleteFile, setIsConfirmDeleteFile] = useState(false);
  const [selectCheckBoxForDeleteAndShare, setSelectCheckBoxForDeleteAndShare] =
    useState("");
  console.log(
    "Koca: selectCheckBoxForDeleteAndShare ",
    selectCheckBoxForDeleteAndShare
  );
  const [aadFile] = useMutation(ADD_PATIENT_FILE);

  const [getPatientFileListByTherapist, { data: fileListData, refetch }] =
    useLazyQuery(GET_THERAPIST_FILE_LIST, {
      onCompleted: () => {
        setLoader(false);
      },
    });

  useEffect(() => {
    getPatientFileListByTherapist({
      variables: {
        patient_id: sessionStorage.getItem("patient_id"),
        search_text: searchValue,
      },
    });
  }, [searchValue]);

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
          refetch();
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

  /* istanbul ignore next */
  const onSearchData = (data) => {
    setSearchValue(data);
  };

  /* istanbul ignore next */
  const checkBoxIds = (data) => {
    const joinedData = data.join(",");
    setSelectCheckBoxForDeleteAndShare(joinedData);

    /* istanbul ignore next */
    if (joinedData) {
      setIsConfirmDeleteFile(true);
    } else {
      confirmModalRef.current?.open();
    }
  };

  /* istanbul ignore next */
  const clearIsConfirmCancel = () => {
    setIsConfirmDeleteFile(false);
  };

  const [deleteAndShareFile] = useMutation(DELETE_THERAPIST_FILE);

  const deleteFileHandler = async () => {
    try {
      deleteAndShareFile({
        variables: {
          file_id: selectCheckBoxForDeleteAndShare,
          update: {
            status: 0,
          },
        },
        onCompleted: () => {
          setIsConfirmDeleteFile(false);
          /* istanbul ignore next */
          enqueueSnackbar("File deleted successfully!", {
            variant: "success",
            autoHideDuration: 2000,
          });
          setSelectCheckBoxForDeleteAndShare("");
          /* istanbul ignore next */
          refetch();
        },
      });
      setLoader(false);
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong.", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <>
      <Loader visible={loader} />

      <TherapistFileList
        fileListData={fileListData}
        onSearchData={onSearchData}
        handleFileUpload={() => handleOpenAddFileModal()}
        handleDelete={checkBoxIds}
        // onSelectedCheckboxes={checkBoxIds}
      />
      <CommonModal
        ref={modalRefAddPlan}
        headerTitleText={"Upload File"}
        maxWidth="sm"
      >
        <UploadFileMainForm uploadDataSubmit={dataSubmit} />
      </CommonModal>

      {isConfirmDeleteFile && (
        <ConfirmationModal
          label="Are you sure, you want to delete?"
          onCancel={clearIsConfirmCancel}
          onConfirm={deleteFileHandler}
        />
      )}

      <ConfirmBoxModal
        infoMessage="Please select at least one file to perform the action."
        confirmModalRef={confirmModalRef}
      />
    </>
  );
}
