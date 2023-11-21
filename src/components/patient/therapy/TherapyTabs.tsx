import Feedback from "../../../components/patient/therapyPages/feedback";
import Goals from "../../../components/patient/therapyPages/goals";
import Homework from "../../../components/patient/therapyPages/homework";
import Measures from "../../../components/patient/therapyPages/measures";
import Monitors from "../../../components/patient/therapyPages/monitors";
import Relapse from "../../../components/patient/therapyPages/relapse";
import Resources from "../../../components/patient/therapyPages/resource";
import SafetyPlan from "../../../components/patient/therapyPages/safetyPlan";
import PatientFormulation from "../therapyPages/formulation";

export default [
  {
    label: "Safety Plan",
    value: "safety-plan",
    component: <SafetyPlan />,
    moduleName: "Safety Plan",
  },
  {
    label: "Measures",
    value: "measures",
    component: <Measures />,
    moduleName: "Measures",
  },
  {
    label: "Goals",
    value: "goals",
    component: <Goals />,
    moduleName: "Goals",
  },
  {
    label: "Monitors",
    value: "monitors",
    component: <Monitors />,
    moduleName: "Monitors",
  },
  {
    label: "Homework",
    value: "homework",
    component: <Homework />,
    moduleName: "Homework",
  },
  {
    label: "Resources",
    value: "resources",
    component: <Resources />,
    moduleName: "Resource",
  },
  {
    label: "Formulation",
    value: "formulation",
    component: <PatientFormulation />,
    moduleName: "Formulation",
  },
  {
    label: "Relapse Plan",
    value: "relapse-plan",
    component: <Relapse />,
    moduleName: "Relapse Plan",
  },

  {
    label: "Feedback",
    value: "feedback",
    component: <Feedback />,
    moduleName: "Feedback",
  },
];
