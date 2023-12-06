import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Accordion } from "../Accordion";
import { Box, Button, Typography } from "@mui/material";
import { GET_PATIENT_RELAPSE_PLANS } from "../../../graphql/Relapse/graphql";
import { GetPatientRelapsePlan } from "../../../graphql/Relapse/types";
import { RelapsePlanForm } from "./relapsePlanForm";
import SureModal from "../../admin/resource/SureModal";
import ConfirmationModal from "../ConfirmationModal";
import { useSnackbar } from "notistack";
import { checkPrivilageAccess } from "../../../utility/helper";

type propTypes = {
  onSubmit?: (safetyPlan: GetPatientRelapsePlan, callback: any) => void;
  setLoader: any;
};

const RelapsePlan = (props: propTypes) => {
  let onToggle;
  const { enqueueSnackbar } = useSnackbar();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modifiedSafetyPlan, setModifiedSafetyPlan] =
    useState<GetPatientRelapsePlan>();
  const [isConfirm, setIsConfirm] = useState(false);

  //Queries
  const [getPatientRelapsePlans, { data: relapsePlanData, loading }] =
    useLazyQuery(GET_PATIENT_RELAPSE_PLANS, {
      onCompleted: () => {
        props.setLoader(false);
      },
      fetchPolicy: "no-cache",
    });

  useEffect(() => {
    getPatientRelapsePlans();
  }, []);

  const handleSubmit = (modifiedSafetyPlan: GetPatientRelapsePlan) => {
    setModalOpen(true);
    setModifiedSafetyPlan(modifiedSafetyPlan);
  };

  const cancelFunction = () => {
    setIsConfirm(true);
  };

  const cancelConfirm = () => {
    /* istanbul ignore next */
    onToggle();
    setIsConfirm(false);
    /* istanbul ignore next */
    enqueueSnackbar("Relapse cancel successfully", {
      variant: "success",
    });
  };

  const clearIsConfirmCancel = () => {
    /* istanbul ignore next */
    setIsConfirm(false);
  };

  const isViewRelapse = checkPrivilageAccess("Relapse", "View");
  const isEditRelapse = checkPrivilageAccess("Relapse", "Update response");

  return (
    <>
      {relapsePlanData?.getPatientRelapsePlans?.data.map((s) => (
        <Accordion
          key={s._id}
          title={s.name}
          detail={(toggleAccordion) => {
            onToggle = toggleAccordion;
            return (
              (isViewRelapse === true || isViewRelapse === undefined) && (
                <RelapsePlanForm
                  relapsePlan={s}
                  onSubmit={handleSubmit}
                  onCancel={cancelFunction}
                  isEditRelapse={isEditRelapse}
                />
              )
            );
          }}
        />
      ))}
      {!loading && !relapsePlanData?.getPatientRelapsePlans?.data.length && (
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
              props.onSubmit(modifiedSafetyPlan, getPatientRelapsePlans);
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
export default RelapsePlan;
