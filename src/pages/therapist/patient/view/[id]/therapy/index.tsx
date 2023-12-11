/* istanbul ignore file */
import React from "react";
import TherapyTabsGenerator from "../../../../../../components/common/TabsGenerator/TherapyTabGenerator";
import { Box } from "@material-ui/core";
import PatientEditTemplatePage2 from "../resources";
import { useRouter } from "next/router";
import TherapistSafetyPlanIndex from "../safetyPlan";
import TherapistFeedbackTabs from "../../../../feedback/FeedbackTabs";
import TherapistRelapseIndex from "../relapse";
import TherapyPatientHomeworkIndex from "../homework";
import Measures from "../../../../../../components/therapist/measures";
import TherapyPatientGoalsIndex from "../goals";
import TherapistMonotorTabs from "../monitors/therapistMonitorTabs";
import TherapistPatientFormulation from "../formulation";
import { modifyTabsData } from "../../../../../../utility/helper";

type propTypes = {
  setTherapy: any;
};
export default function TherapyMainComponent(props: propTypes) {
  const setTherapy = props.setTherapy;
  const router = useRouter();
  const {
    query: { id, mainTab },
  } = router;
  const tabs = [
    {
      label: "Safety Plan",
      value: "safety-plan",
      component: <TherapistSafetyPlanIndex />,
      moduleName: "Safety Plan",
    },
    {
      label: "Formulation",
      value: "formulation",
      component: <TherapistPatientFormulation />,
      moduleName: "Formulation",
    },
    {
      label: "Goals",
      value: "goals",
      component: <TherapyPatientGoalsIndex setTherapy={setTherapy} />,
      moduleName: "Goals",
    },
    {
      label: "Homework",
      value: "homework",
      component: <TherapyPatientHomeworkIndex setTherapy={setTherapy} />,
      moduleName: "Homework",
    },
    {
      label: "Measures",
      value: "measures",
      component: <Measures />,
      moduleName: "Measures",
    },

    {
      label: "Monitors",
      value: "monitor",
      component: <TherapistMonotorTabs />,
      moduleName: "Monitors",
    },
    {
      label: "Resources",
      value: "resources",
      component: <PatientEditTemplatePage2 />,
      moduleName: "Resources",
    },
    {
      label: "Relapse",
      value: "relapse",
      component: <TherapistRelapseIndex />,
      moduleName: "Relapse",
    },
    {
      label: "Feedback",
      value: "feedback",
      component: <TherapistFeedbackTabs setTherapy={setTherapy} />,
      moduleName: "Feedback",
    },
  ];
  const modifyTabs = modifyTabsData(tabs);
  const activeTabs = {
    feedback: "&subTab1=therapist-feedback",
    monitor: "&subTab1=my-monitor",
  };
  return (
    <Box>
      <Box data-testid="patientViewTherapyTab" style={{ paddingTop: "30px" }}>
        <TherapyTabsGenerator
          tabsList={modifyTabs}
          activeTabs={activeTabs}
          tabLabel={`/therapist/patient/view/${id}/?mainTab=${mainTab}&tab=`}
        />
      </Box>
    </Box>
  );
}
