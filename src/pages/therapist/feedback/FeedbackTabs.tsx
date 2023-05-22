/* istanbul ignore file */
import React from "react";
import TherapyPatientFeedback from ".";
import { Box } from "@mui/material";
import TherapyTabsGenerator from "../../../components/common/TabsGenerator/TherapyTabGenerator";
import ClientFeedback from "./ClientFeedback";
import ContentHeader from "../../../components/common/ContentHeader";
import { useRouter } from "next/router";

type propTypes = {
  setTherapy: any;
};

export default function TherapistFeedbackTabs(props: propTypes) {
  const setTherapy = props.setTherapy;
  const router = useRouter();
  const {
    query: { tab = "", id },
  } = router;
  const tabs = [
    {
      label: "Therapist Feedback",
      value: "therapist-feedback",
      component: <TherapyPatientFeedback setTherapy={setTherapy} />,
    },

    {
      label: "Client Feedback",
      value: "client-feedback",
      component: <ClientFeedback therapyId={setTherapy} />,
    },
  ];
  return (
    <Box>
      <ContentHeader title="Feedback" />

      <Box data-testid="patientViewTherapyTab">
        <TherapyTabsGenerator
          tabsList={tabs}
          tabLabel={`/therapist/patient/view/${id}/?tab=${tab}&subTab1=`}
        />
      </Box>
    </Box>
  );
}
