import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import SureModal from "../../admin/resource/SureModal";
import { Accordion } from "../Accordion";
import { GET_PATIENT_SAFETY_PlANS } from "../../../graphql/SafetyPlan/graphql";
import {
  GetPatientSafetyPlansRes,
  ViewSafetyPlanById,
} from "../../../graphql/SafetyPlan/types";
import { SafetyPlanForm } from "./safetyPlanForm";

type propTypes = {
  onSubmit?: (safetyPlan: ViewSafetyPlanById) => void;
  setLoader: any;
};

const SafetyPlan = (props: propTypes) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [modifiedSafetyPlan, setModifiedSafetyPlan] =
    useState<ViewSafetyPlanById>();

  //GraphQL Queries
  const { data: safetyPlanData } = useQuery<GetPatientSafetyPlansRes>(
    GET_PATIENT_SAFETY_PlANS,
    {
      onCompleted: () => {
        props.setLoader(false);
      },
    }
  );

  const handleSubmit = (modifiedSafetyPlan: ViewSafetyPlanById) => {
    setModalOpen(true);
    setModifiedSafetyPlan(modifiedSafetyPlan);
  };

  return (
    <>
      {safetyPlanData?.getPatientSafetyPlans?.map((s) => (
        <Accordion
          title={s.name}
          detail={(toggleAccordion) => (
            <SafetyPlanForm
              safetyPlan={s}
              onSubmit={handleSubmit}
              onCancel={toggleAccordion}
            />
          )}
        />
      ))}
      <SureModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <Typography
          sx={{
            fontWeight: "600",
            textAlign: "center",
            fontSize: "27px",
          }}
        >
          Are you sure you want to save these details
        </Typography>
        <Box marginTop="20px" display="flex" justifyContent="end">
          <Button
            variant="contained"
            color="inherit"
            size="small"
            data-testid="editSafetyPlanCancelButton"
            onClick={() => {
              setModalOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            sx={{ marginLeft: "5px" }}
            size="small"
            data-testid="editSafetyPlanConfirmButton"
            onClick={() => {
              setModalOpen(false);
              props.onSubmit(modifiedSafetyPlan);
              props.setLoader(false);
            }}
          >
            Confirm
          </Button>
        </Box>
      </SureModal>
    </>
  );
};
export default SafetyPlan;
