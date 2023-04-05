/* istanbul ignore file */
import React from "react";
import TherapyPatientFeedback from ".";
import { Box } from "@mui/material";
import TherapyTabsGenerator from "../../../components/common/TabsGenerator/TherapyTabGenerator";
import ClientFeedback from "./ClientFeedback";
import ContentHeader from "../../../components/common/ContentHeader";

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
      <ContentHeader title="Feedback" />

      <Box data-testid="patientViewTherapyTab">
        <TherapyTabsGenerator tabsList={tabs} activeTabs="" />
      </Box>
    </Box>
  );
}
