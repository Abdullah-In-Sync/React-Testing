import { useLazyQuery, useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  THERAPIST_ADD_ASSESSMENT,
  THERAPIST_ADD_ASSESSMENT_DROPDOWN_LIST,
} from "../../../../../../graphql/assessment/graphql";
import {
  CommonModal,
  ModalElement,
} from "../../../../../../components/common/CustomModal/CommonModal";
import ConfirmationModal from "../../../../../../components/common/ConfirmationModal";
import TherapistAddAssessmentForm from "../../../../../../components/therapist/assessment/therapistAddAssessment/TherapistAddAssessmentForm";
import { Box, Button } from "@mui/material";

const TherapistAssessmentMain: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const patientId = sessionStorage.getItem("patient_id");

  const [isConfirmAdd, setIsConfirmAdd] = useState(false);
  const [addAssessmentId, setAddAssessmentId] = useState("");

  // Mutation
  const [addAssessment] = useMutation(THERAPIST_ADD_ASSESSMENT);

  // Queries
  const [getAddAssessmentDropdownList, { data: addAssessmentDropdownData }] =
    useLazyQuery(THERAPIST_ADD_ASSESSMENT_DROPDOWN_LIST, {
      onCompleted: (data) => {
        /* istanbul ignore next */
        console.log("Koca: data ", data);
      },
    });

  useEffect(() => {
    getAddAssessmentDropdownList();
  }, []);

  /* istanbul ignore next */
  const modalRefAddAssessment = useRef<ModalElement>(null);

  /* istanbul ignore next */
  const handleOpenCreateAssessmentModal = useCallback(
    () => modalRefAddAssessment.current?.open(),
    []
  );

  /* istanbul ignore next */
  const handleCloseCreateAssessmentModal = useCallback(
    () => modalRefAddAssessment.current?.close(),
    []
  );

  /* istanbul ignore next */
  const clearIsConfirmCancel = () => {
    setIsConfirmAdd(false);
  };

  const handleCreateAssessment = async () => {
    try {
      addAssessment({
        variables: {
          assessment_id: addAssessmentId,
          patient_id: patientId,
        },
        onCompleted: () => {
          setIsConfirmAdd(false);
          handleCloseCreateAssessmentModal();

          enqueueSnackbar("Assessment added successfully!", {
            variant: "success",
            autoHideDuration: 2000,
          });
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  /* istanbul ignore next */
  const receiveAssessmentId = (value) => {
    setAddAssessmentId(value);
  };

  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: "10px",
          paddingTop: "10px",
        }}
      >
        <Button
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            backgroundColor: "#6EC9DB",
            color: "white",
            textTransform: "none",
          }}
          data-testid={"addAssessmentButton"}
          variant="contained"
          onClick={handleOpenCreateAssessmentModal}
        >
          Add Assessment
        </Button>
      </Box>

      <CommonModal
        ref={modalRefAddAssessment}
        headerTitleText="Add Assessment"
        maxWidth="sm"
      >
        <TherapistAddAssessmentForm
          onPressSubmit={() => setIsConfirmAdd(true)}
          organizationList={addAssessmentDropdownData}
          receiveAssessmentId={receiveAssessmentId}
        />
      </CommonModal>

      {isConfirmAdd && (
        <ConfirmationModal
          label="Are you sure you want to add the Assessment?"
          onCancel={clearIsConfirmCancel}
          onConfirm={handleCreateAssessment}
        />
      )}
    </>
  );
};

export default TherapistAssessmentMain;
