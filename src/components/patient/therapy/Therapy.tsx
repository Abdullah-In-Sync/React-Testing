/* istanbul ignore file */
import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import TherapyTabsGenerator from "../../../components/common/TabsGenerator/TherapyTabGenerator";
import Feedback from "../../../components/patient/therapyPages/feedback";
import Goals from "../../../components/patient/therapyPages/goals";
import Homework from "../../../components/patient/therapyPages/homework";
import Measures from "../../../components/patient/therapyPages/measures";
import Monitors from "../../../components/patient/therapyPages/monitoring";
import Relapse from "../../../components/patient/therapyPages/relapse";
import Resources from "../../../components/patient/therapyPages/resource";
import SafetyPlan from "../../../components/patient/therapyPages/safetyPlan";

export default function TherapyMainComponent() {
  const router = useRouter();
  const {
    query: { tab = "" },
  } = router;

  const tabs = [
    {
      label: "Safety Plan",
      value: "safety-plan",
      component: <SafetyPlan />,
    },
    {
      label: "Relapse Plan",
      value: "relapse-plan",
      component: <Relapse />,
    },
    {
      label: "Homework",
      value: "homework",
      component: <Homework />,
    },
    {
      label: "Goals",
      value: "goals",
      component: <Goals />,
    },
    {
      label: "Resources",
      value: "resources",
      component: <Resources />,
    },
    {
      label: "Feedback",
      value: "feddback",
      component: <Feedback />,
    },
    {
      label: "Measures",
      value: "measures",
      component: <Measures />,
    },
    {
      label: "Monitors",
      value: "monitors",
      component: <Monitors />,
    },
  ];
  return (
    <Box data-testid="patientViewTherapyTab" className="therapyTabsWrapper">
      <TherapyTabsGenerator tabsList={tabs} activeTabs={tab} loadFromUrl />
    </Box>
  );
}
