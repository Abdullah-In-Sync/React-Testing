import { useLazyQuery, useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import ConfirmationModal from "../../../../../../components/common/ConfirmationModal";
import { CommonModal } from "../../../../../../components/common/CustomModal/CommonModal";
import TherapistAddAssessmentForm from "../../../../../../components/therapist/assessment/therapistAddAssessment/TherapistAddAssessmentForm";
import {
  THERAPIST_ADD_ASSESSMENT,
  THERAPIST_ADD_ASSESSMENT_DROPDOWN_LIST,
} from "../../../../../../graphql/assessment/graphql";

const TherapistAssessmentMain: React.FC<any> = ({
  modalRefAddAssessment,
  reFetchAssessmentList,
}) => {
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
  // const modalRefAddAssessment = useRef<ModalElement>(null);

  // /* istanbul ignore next */
  // const handleOpenCreateAssessmentModal = useCallback(
  //   () => modalRefAddAssessment.current?.open(),
  //   []
  // );

  // /* istanbul ignore next */
  const handleCloseCreateAssessmentModal = useCallback(
    () => modalRefAddAssessment.current?.close(),
    []
  );

  /* istanbul ignore next */
  const clearIsConfirmCancel = () => {
    setIsConfirmAdd(false);
  };

  /* istanbul ignore next */
  const handleCreateAssessment = async () => {
    try {
      addAssessment({
        variables: {
          assessment_id: addAssessmentId,
          patient_id: patientId,
        },
        onCompleted: (data) => {
          if (data?.therapistAddAssessment?.result === true) {
            reFetchAssessmentList();
            setIsConfirmAdd(false);
            handleCloseCreateAssessmentModal();

            enqueueSnackbar("Assessment added successfully!", {
              variant: "success",
              autoHideDuration: 2000,
            });
          } else {
            reFetchAssessmentList();
            setIsConfirmAdd(false);
            handleCloseCreateAssessmentModal();

            enqueueSnackbar("Assessment already added", {
              variant: "error",
              autoHideDuration: 2000,
            });
          }
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
      <CommonModal
        ref={modalRefAddAssessment}
        headerTitleText="Add Assessment"
        maxWidth="sm"
      >
        <TherapistAddAssessmentForm
          onPressSubmit={() =>
            /* istanbul ignore next */
            setIsConfirmAdd(true)
          }
          organizationList={addAssessmentDropdownData}
          receiveAssessmentId={receiveAssessmentId}
        />
      </CommonModal>

      {
        /* istanbul ignore next */
        isConfirmAdd && (
          <ConfirmationModal
            label="Are you sure you want to add the assessment?"
            onCancel={clearIsConfirmCancel}
            onConfirm={handleCreateAssessment}
          />
        )
      }
    </>
  );
};

export default TherapistAssessmentMain;
