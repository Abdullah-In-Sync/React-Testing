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
import { useRouter } from "next/router";

const TherapistPatientListPage: NextPage = () => {
  const modalRefAddPlan = useRef<ModalElement>(null);
  const rowsLimit = 10;
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [searchInputValue, setSearchInputValue] = useState("");
  const [loader, setLoader] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmSubmission, setConfirmSubmission] = useState<boolean>(false);
  const [deletePatientId, setDeletePatientId] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [tableCurentPage, setTableCurrentPage] = useState(0);
  const [createPatient] = useMutation(THERAPIST_ADD_PATIENT);
  const [deletePatient] = useMutation(THERAPIST_DELETE_PATIENT);

  const [
    getTherapistPatientList,
    { loading: loadingTherapistList, data: listData, refetch },
  ] = useLazyQuery(THERAPIST_PATIENT_LIST, {
    fetchPolicy: "cache-and-network",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  /* istanbul ignore next */
  const transformedListData = listData?.getPatientList?.patientlist?.map(
    (patient) => ({
      ...patient,
      full_name: `${patient.patient_firstname} ${patient.patient_lastname}`,
      created_date: patient.created_date
        ? patient.created_date.split("T")[0]
        : "",
      updated_date: patient.updated_date
        ? patient.updated_date.split("T")[0]
        : "",
    })
  );

  useEffect(() => {
    getTherapistPatientList({
      variables: {
        search_text: "",
        page_no: tableCurentPage + 1,
        limit: rowsLimit,
      },
      onCompleted: () => {
        setLoader(false);
      },
    });
  }, []);

  /* istanbul ignore next */
  const onPageChange = (event?: any, newPage?: number) => {
    setTableCurrentPage(newPage);
    getTherapistPatientList({
      variables: {
        search_text: searchInputValue,
        page_no: newPage + 1,
        limit: rowsLimit,
      },
      onCompleted: () => {
        setLoader(false);
      },
    });
  };

  /* istanbul ignore next */
  const onChangeSearchInput = (e) => {
    setSearchInputValue(e.target.value);
    getTherapistPatientList({
      variables: { search_text: e.target.value, page_no: 1, limit: rowsLimit },
      onCompleted: () => {
        setLoader(false);
      },
    });
    setTableCurrentPage(0);
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
      await createPatient({
        variables: {
          email: formFields.email,
          patient_firstname: formFields.patient_firstname,
          patient_lastname: formFields.patient_lastname,
          phone_number: formFields.phone_number,
        },
        onCompleted: (data) => {
          handleCloseAddPatientModal();
          if (data.addPatient.result === "error") {
            enqueueSnackbar(
              "An account with this email address already exists.",
              {
                variant: "error",
              }
            );
          } else {
            enqueueSnackbar("Patient added successfully!", {
              variant: "success",
            });
          }

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
  const handleActionButtonClick = (value) => {
    const { pressedIconButton } = value;
    sessionStorage.setItem("patient_name", `${value.full_name}`);
    sessionStorage.setItem("patient_id", `${value._id}`);
    sessionStorage.setItem("user_type", "therapist");

    if (pressedIconButton === "delete") {
      setDeletePatientId(value._id);
      setModalOpen(true);
    }
    if (pressedIconButton == "view")
      router.push(
        `/therapist/patient/view/${value._id}/?mainTab=personal-info&tab=details`
      );

    // if (pressedIconButton == "edit") {
    //   router.push(
    //     `/therapist/patient/view/${value._id}/?mainTab=personal-info&tab=details&editValue=true`
    //   );
    // }

    if (!confirmSubmission) return;
  };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Patients" />
        <TherapistPatientListComponent
          searchInputValue={searchInputValue}
          onChangeSearchInput={onChangeSearchInput}
          onPressSideButton={handleOpenAddPatientModal}
          listData={transformedListData}
          onPageChange={onPageChange}
          totalData={listData?.getPatientList?.total}
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
