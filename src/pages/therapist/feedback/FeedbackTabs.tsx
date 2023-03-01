/* istanbul ignore file */
import React from "react";
import TherapyPatientFeedback from ".";
import { Box, Typography } from "@mui/material";
import TherapyTabsGenerator from "../../../components/common/TabsGenerator/TherapyTabGenerator";
import ClientFeedback from "./ClientFeedback";

type propTypes = {
  setTherapy: any;
};

export default function TherapistFeedbackTabs(props: propTypes) {
  const setTherapy = props.setTherapy;

  const tabs = [
    {
      label: "Therapist Feedback",
      value: "feedback",
      component: <TherapyPatientFeedback setTherapy={setTherapy} />,
    },

    {
      label: "Client Feedback",
      value: "resources",
      component: <ClientFeedback therapyId={setTherapy} />,
    },
  ];
  return (
    <Box>
      <Typography
        variant="h4"
        mt={4}
        mb={2}
        sx={{ fontWeight: "bold" }}
        className="text-blue"
      >
        Feedback
      </Typography>
      <Box data-testid="patientViewTherapyTab">
        <TherapyTabsGenerator tabsList={tabs} activeTabs="" />
      </Box>
    </Box>
  );
}
