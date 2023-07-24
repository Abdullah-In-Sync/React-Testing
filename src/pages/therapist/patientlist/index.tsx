import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ContentHeader from "../../../components/common/ContentHeader";
import Loader from "../../../components/common/Loader";
import Layout from "../../../components/layout";
import { Box, Button, Typography } from "@mui/material";
import TherapistPatientListComponent from "../../../components/therapist/patientList";
import { THERAPIST_PATIENT_LIST } from "../../../graphql/Feedback/graphql";
import {
  CommonModal,
  ModalElement,
} from "../../../components/common/CustomModal/CommonModal";
import AddPatientForm from "../../../components/therapist/patientList/addPatientForm";
import {
  THERAPIST_ADD_PATIENT,
  THERAPIST_DELETE_PATIENT,
} from "../../../graphql/mutation";
import { useSnackbar } from "notistack";
import SureModal from "../../../components/admin/resource/SureModal";
import ConfirmationModal from "../../../components/common/ConfirmationModal";

const TherapistPatientListPage: NextPage = () => {
  const modalRefAddPlan = useRef<ModalElement>(null);
  const rowsLimit = 10;
  const { enqueueSnackbar } = useSnackbar();

  const [searchInputValue, setSearchInputValue] = useState("");
  const [loader, setLoader] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmSubmission, setConfirmSubmission] = useState<boolean>(false);
  const [deletePatientId, setDeletePatientId] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [tableCurentPage, setTableCurrentPage] = useState(0);
  const [paginationTokenList, setPaginationToken] = useState([]);
  const [createAssessment] = useMutation(THERAPIST_ADD_PATIENT);
  const [deletePatient] = useMutation(THERAPIST_DELETE_PATIENT);

  useEffect(() => {
    getTherapistPatientList({
      variables: { name: "", next_pagination_token: "", limit: rowsLimit },
      onCompleted: (data) => {
        addPaginationToken(data);
        setLoader(false);
      },
    });
  }, []);

  const [
    getTherapistPatientList,
    { loading: loadingTherapistList, data: listData, refetch },
  ] = useLazyQuery(THERAPIST_PATIENT_LIST, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      /* istanbul ignore next */
      addPaginationToken(data);
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  /* istanbul ignore next */
  const onChangeSearchInput = (e) => {
    setPaginationToken([]);
    setTableCurrentPage(0);
    setSearchInputValue(() => {
      getTherapistPatientList({
        variables: {
          limit: rowsLimit,
          name: e.target.value,
          next_pagination_token: "",
        },
        onCompleted: (data) => {
          addPaginationToken(data);
        },
      });
      return e.target.value;
    });
  };

  /* istanbul ignore next */
  const handleOpenAddPatientModal = useCallback(
    () => modalRefAddPlan.current?.open(),
    []
  );

  /* istanbul ignore next */
  const handleCloseAddPatientModal = useCallback(() => {
    modalRefAddPlan.current?.close();
  }, []);

  /* istanbul ignore next */
  const handleCreatePatient = async (formFields) => {
    try {
      await createAssessment({
        variables: {
          email: formFields.email,
          patient_firstname: formFields.patient_firstname,
          patient_lastname: formFields.patient_lastname,
          phone_number: formFields.phone_number,
        },
        onCompleted: () => {
          handleCloseAddPatientModal();
          enqueueSnackbar("Patient added successfully!", {
            variant: "success",
          });
          refetch();
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  /* istanbul ignore next */
  const clearIsConfirmCancel = () => {
    setIsConfirm(false);
  };

  /* istanbul ignore next */
  const submitFormHandlerFormulation = async () => {
    try {
      deletePatient({
        variables: {
          patient_id: deletePatientId,
        },
        onCompleted: () => {
          /* istanbul ignore next */
          setIsConfirm(false);
          enqueueSnackbar("Patient deleted successfully!", {
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
  const addPaginationToken = (data) => {
    const { getPatientList: { pagination = undefined } = {} } = data;
    if (pagination && !paginationTokenList.includes(pagination))
      setPaginationToken([...paginationTokenList, ...[pagination]]);
  };

  /* istanbul ignore next */
  const onPageChange = (event?: any, newPage?: number) => {
    const searchText =
      searchInputValue && searchInputValue !== ""
        ? { name: searchInputValue }
        : { name: "" };
    const tempNewPage = paginationTokenList[newPage - 1];

    getTherapistPatientList({
      variables: {
        limit: rowsLimit,
        next_pagination_token: tempNewPage,
        ...searchText,
      },
      onCompleted: (data) => {
        addPaginationToken(data);
        setLoader(false);
        setTableCurrentPage(newPage);
      },
    });
  };

  /* istanbul ignore next */
  const handleActionButtonClick = (value) => {
    const { pressedIconButton } = value;

    if (pressedIconButton === "delete") {
      setDeletePatientId(value.patient_id);
      setModalOpen(true);
    }
    if (!confirmSubmission) return;
  };

  //

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Patients" />
        <TherapistPatientListComponent
          searchInputValue={searchInputValue}
          onChangeSearchInput={onChangeSearchInput}
          onPressSideButton={handleOpenAddPatientModal}
          listData={listData?.getPatientList?.patientlist}
          onPageChange={onPageChange}
          totalData={
            /* istanbul ignore next */
            listData?.getPatientList?.patientlist?.length === rowsLimit
              ? (tableCurentPage + 2) * rowsLimit
              : tableCurentPage * rowsLimit
          }
          tableCurentPage={tableCurentPage}
          rowsLimit={rowsLimit}
          loadingTherapistList={loadingTherapistList}
          pageActionButtonClick={handleActionButtonClick}
        />

        <CommonModal
          ref={modalRefAddPlan}
          headerTitleText={"Add new patient"}
          maxWidth="sm"
        >
          <AddPatientForm
            onClickSendregistrationtothepatient={handleCreatePatient}
          />
        </CommonModal>

        <SureModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setConfirmSubmission={setConfirmSubmission}
        >
          <Typography
            sx={{
              fontWeight: "600",
              textAlign: "center",
              fontSize: "27px",
            }}
          >
            Deleting this patient will{" "}
            <span style={{ color: "red" }}>permanently delete</span> all the
            data related to the patient
          </Typography>

          <Box marginTop="20px" display="flex" justifyContent="center">
            <Button
              color="error"
              variant="contained"
              sx={{ marginRight: "15px" }}
              size="small"
              data-testid="addResourceModalConfirmButton"
              onClick={() => {
                /* istanbul ignore next */
                setModalOpen(false);
                setIsConfirm(true);
              }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="inherit"
              sx={{ marginRight: "5px" }}
              size="small"
              data-testid="addResourceModalCancelButton"
              onClick={() => {
                /* istanbul ignore next */
                setModalOpen(false);
              }}
            >
              Cancel
            </Button>
          </Box>
        </SureModal>

        {isConfirm && (
          <ConfirmationModal
            label="Are you sure you want to delete this patient?"
            onCancel={clearIsConfirmCancel}
            onConfirm={() => {
              /* istanbul ignore next */
              submitFormHandlerFormulation();
            }}
          />
        )}
      </Layout>
    </>
  );
};
export default TherapistPatientListPage;
