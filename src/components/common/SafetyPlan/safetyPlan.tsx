import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import SureModal from "../../admin/resource/SureModal";
import { Accordion } from "../Accordion";
import { GET_PATIENT_SAFETY_PlANS } from "../../../graphql/SafetyPlan/graphql";
import {
  GetPatientSafetyPlansRes,
  ViewSafetyPlanById,
} from "../../../graphql/SafetyPlan/types";
import { SafetyPlanForm } from "./safetyPlanForm";
import ConfirmationModal from "../ConfirmationModal";
import { useSnackbar } from "notistack";

type propTypes = {
  onSubmit?: (safetyPlan: ViewSafetyPlanById, callback: any) => void;
  setLoader: any;
};

const SafetyPlan = (props: propTypes) => {
  let onToggle;
  const { enqueueSnackbar } = useSnackbar();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const [modifiedSafetyPlan, setModifiedSafetyPlan] =
    useState<ViewSafetyPlanById>();

  const [getPatientSafetyPlans, { data: safetyPlanData, loading }] =
    useLazyQuery<GetPatientSafetyPlansRes>(GET_PATIENT_SAFETY_PlANS, {
      onCompleted: () => {
        props.setLoader(false);
      },
      fetchPolicy: "no-cache",
    });

  const handleSubmit = (modifiedSafetyPlan: ViewSafetyPlanById) => {
    setModalOpen(true);
    setModifiedSafetyPlan(modifiedSafetyPlan);
  };

  useEffect(() => {
    getPatientSafetyPlans();
  }, []);

  const cancelConfirm = () => {
    /* istanbul ignore next */
    onToggle();
    setIsConfirm(false);
    /* istanbul ignore next */
    enqueueSnackbar("Response cancel successfully", {
      variant: "success",
    });
  };

  const clearIsConfirmCancel = () => {
    /* istanbul ignore next */
    setIsConfirm(false);
  };
  const cancelFunction = () => {
    setIsConfirm(true);
  };
  return (
    <>
      {/* istanbul ignore next */}
      {safetyPlanData?.getPatientSafetyPlans?.data?.map((s) => (
        <Accordion
          key={s._id}
          title={s.name}
          detail={(toggleAccordion) => {
            onToggle = toggleAccordion;
            return (
              <SafetyPlanForm
                safetyPlan={s}
                onSubmit={handleSubmit}
                onCancel={cancelFunction}
              />
            );
          }}
        />
      ))}
      {!loading && !safetyPlanData?.getPatientSafetyPlans?.data?.length && (
        <Box marginTop={"10px"}>No data found</Box>
      )}
      <SureModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Are you sure you want to submit the response?
        </Typography>
        <Box marginTop="20px" display="flex" justifyContent="center">
          <Button
            color="primary"
            variant="contained"
            sx={{ marginRight: "10px" }}
            size="small"
            data-testid="editSafetyPlanConfirmButton"
            onClick={() => {
              setModalOpen(false);
              props.onSubmit(modifiedSafetyPlan, getPatientSafetyPlans);
              props.setLoader(false);
            }}
          >
            Confirm
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            data-testid="editSafetyPlanCancelButton"
            onClick={() => {
              setModalOpen(false);
            }}
          >
            Cancel
          </Button>
        </Box>
      </SureModal>

      {isConfirm && (
        <ConfirmationModal
          label="Are you sure you are canceling the response without submitting?"
          onCancel={clearIsConfirmCancel}
          onConfirm={cancelConfirm}
        />
      )}
    </>
  );
};
export default SafetyPlan;
