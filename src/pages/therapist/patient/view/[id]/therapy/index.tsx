/* istanbul ignore file */
import React from "react";
import TherapyTabsGenerator from "../../../../../../components/common/TabsGenerator/TherapyTabGenerator";
import TherapyPatientFeedback from "../../../../feedback";
import { Box } from "@material-ui/core";
import PatientEditTemplatePage2 from "../resources";
import { useRouter } from "next/router";
import { Link } from "../../../../../../lib/helpers/common";

type propTypes = {
  setTherapy: any;
};
export default function TherapyMainComponent(props: propTypes) {
  const setTherapy = props.setTherapy;
  const router = useRouter();
  const patId = router?.query.id as string;
  const tabs = [
    {
      label: "Safety Plan",
      value: "safety-plan",
      //  component: < />,
      redirectUrl: Link + `therapist/patient/view/${patId}?tab=safety-plan`,
    },
    {
      label: "Measures",
      value: "measures",
      //  component: < />,
      redirectUrl: Link + `/therapist/patient/view/${patId}?tab=measures`,
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
      //  component: < />,
      redirectUrl: Link + `/therapist/patient/view/${patId}?tab=goals`,
    },
    {
      label: "Tools",
      value: "tools",
      //  component: < />,
      redirectUrl: Link + `/therapist/patient/view/${patId}?tab=tools`,
    },
    {
      label: "Homework",
      value: "homework",
      //  component: < />,
      redirectUrl: Link + `/therapist/patient/view/${patId}?tab=homework`,
    },
    {
      label: "Relapse",
      value: "relapse",
      //  component: < />,
      redirectUrl: Link + `/therapist/patient/view/${patId}?tab=relapse`,
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
