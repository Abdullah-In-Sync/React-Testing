/* istanbul ignore file */
import React from "react";
import TherapyTabsGenerator from "../../../../../../components/common/TabsGenerator/TherapyTabGenerator";
import TherapyPatientFeedback from "../../../../feedback";
import { Box } from "@material-ui/core";
import PatientEditTemplatePage2 from "../resources";

type propTypes = {
  setTherapy: any;
};
export default function TherapyMainComponent(props: propTypes) {
  const setTherapy = props.setTherapy;

  const tabs = [
    {
      label: "Safety Plan",
      value: "safety-plan",
      //  component: < />,
    },
    {
      label: "Measures",
      value: "measures",
      //  component: < />,
    },
    {
      label: "Formulation",
      value: "formulation",
      //    component: <TherapyMainComponent />,
    },
    {
      label: "Goals",
      value: "goals",
      //  component: < />,
    },
    {
      label: "Tools",
      value: "tools",
      //  component: < />,
    },
    {
      label: "Homework",
      value: "homework",
      //  component: < />,
    },
    {
      label: "Relapse",
      value: "relapse",
      //  component: < />,
    },
    {
      label: "Resources",
      value: "resources",
      component: <PatientEditTemplatePage2 />,
    },
    {
      label: "Feedback",
      value: "feedback",
      component: <TherapyPatientFeedback setTherapy={setTherapy} />,
    },
  ];
  return (
    <Box>
      <Box data-testid="patientViewTherapyTab" style={{ paddingTop: "30px" }}>
        <TherapyTabsGenerator tabsList={tabs} activeTabs="" />
      </Box>
    </Box>
  );
}
