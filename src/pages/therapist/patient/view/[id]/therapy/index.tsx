/* istanbul ignore file */
import React from "react";
import TherapyTabsGenerator from "../../../../../../components/common/TabsGenerator/TherapyTabGenerator";
import { Box } from "@material-ui/core";
import PatientEditTemplatePage2 from "../resources";
import { useRouter } from "next/router";
import { Link } from "../../../../../../lib/helpers/common";
import TherapistSafetyPlanIndex from "../safetyPlan";
import TherapistFeedbackTabs from "../../../../feedback/FeedbackTabs";
import TherapistRelapseIndex from "../relapse";
import TherapyPatientHomeworkIndex from "../homework";
import Measures from "../../../../../../components/therapist/measures";
import TherapyPatientGoalsIndex from "../goals";
import TherapistMonotorTabs from "../monitors/therapistMonitorTabs";

type propTypes = {
  setTherapy: any;
};
export default function TherapyMainComponent(props: propTypes) {
  const setTherapy = props.setTherapy;
  const router = useRouter();
  const patId = router?.query.id as string;
  const {
    query: { id },
  } = router;
  const tabs = [
    {
      label: "Safety Plan",
      value: "safety-plan",
      //  component: < />,
      // redirectUrl: Link + `therapist/patient/view/${patId}?tab=safety_plan`,
      component: <TherapistSafetyPlanIndex />,
    },
    {
      label: "Measures",
      value: "measures",
      component: <Measures />,
      // redirectUrl: Link + `/therapist/patient/view/${patId}?tab=measures`,
    },
    {
      label: "Formulation",
      value: "formulation",
      //    component: <TherapyMainComponent />,
      redirectUrl: Link + `/therapist/patient/view/${patId}?tab=formulation`,
    },
    {
      label: "Goals",
      value: "goals",
      component: <TherapyPatientGoalsIndex setTherapy={setTherapy} />,
      // redirectUrl: Link + `/therapist/patient/view/${patId}?tab=goals`,
    },
    {
      label: "Monitor",
      value: "monitor",
      component: <TherapistMonotorTabs />,
      // redirectUrl: Link + `/therapist/patient/view/${patId}?tab=tools`,
    },
    {
      label: "Homework",
      value: "homework",
      component: <TherapyPatientHomeworkIndex setTherapy={setTherapy} />,
      // redirectUrl: Link + `/therapist/patient/view/${patId}?tab=homework`,
    },
    {
      label: "Relapse",
      value: "relapse",
      component: <TherapistRelapseIndex />,
      // redirectUrl: Link + `/therapist/patient/view/${patId}?tab=relapse`,
    },
    {
      label: "Resources",
      value: "resources",
      component: <PatientEditTemplatePage2 />,
    },
    {
      label: "Feedback",
      value: "feedback",
      component: <TherapistFeedbackTabs setTherapy={setTherapy} />,
    },
  ];
  const activeTabs = {
    feedback: "&subTab1=therapist-feedback",
    monitor: "&subTab1=my-monitor",
  };
  return (
    <Box>
      <Box data-testid="patientViewTherapyTab" style={{ paddingTop: "30px" }}>
        <TherapyTabsGenerator
          tabsList={tabs}
          activeTabs={activeTabs}
          tabLabel={`/therapist/patient/view/${id}/?tab=`}
        />
      </Box>
    </Box>
  );
}
