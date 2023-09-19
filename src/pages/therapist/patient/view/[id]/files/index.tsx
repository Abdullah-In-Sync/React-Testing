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
  GET_THERAPIST_FILE_LIST,
} from "../../../../../../graphql/mutation/resource";
import TherapistFileList from "../../../../../../components/therapist/patient/files/list";

export default function TherapistFilesList() {
  const { enqueueSnackbar } = useSnackbar();
  const modalRefAddPlan = useRef<ModalElement>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState("");

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
  return (
    <>
      <Loader visible={loader} />

      <TherapistFileList
        fileListData={fileListData}
        onSearchData={onSearchData}
        handleFileUpload={() => handleOpenAddFileModal()}
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
