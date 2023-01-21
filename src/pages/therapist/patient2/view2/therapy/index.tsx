import React, { useState } from "react";
import TherapyTabsGenerator from "../../../../../components/common/TabsGenerator/TherapyTabGenerator";
import PatientEditTemplatePage from "../../../patient/view/[id]/resources";
import TherapyPatientFeedback from "../../../feedback";

type propTypes = {
  patientTherapryData: any;
  setTherapy: any;
};
export default function TherapyMainComponent(props: propTypes) {
  console.log("main: props ", props);
  const [activeTab, setActiveTab] = useState("");
  const onTabChange3 = (currentTab) => setActiveTab(currentTab);

  const patientTherapryData2 = props.patientTherapryData;
  const setTherapy = props.setTherapy;

  const tabs = [
    {
      label: "Safety Plan",
      value: "safety-plan",
      //  component: <Agreement />,
    },
    {
      label: "Measures",
      value: "measures",
      //  component: <Agreement />,
    },
    {
      label: "Formulation",
      value: "formulation",
      //    component: <TherapyMainComponent />,
    },
    {
      label: "Goals",
      value: "goals",
      //  component: <Agreement />,
    },
    {
      label: "Tools",
      value: "tools",
      //  component: <Agreement />,
    },
    {
      label: "Homework",
      value: "homework",
      //  component: <Agreement />,
    },
    {
      label: "Relapse",
      value: "relapse",
      //  component: <Agreement />,
    },
    {
      label: "Resources",
      value: "resources",
      component: <PatientEditTemplatePage />,
    },
    {
      label: "Feedback",
      value: "feedback",
      component: (
        <TherapyPatientFeedback
          patientTherapryData2={patientTherapryData2}
          setTherapy={setTherapy}
        />
      ),
    },
  ];
  return (
    <div>
      <div data-testid="patientViewTherapyTab" style={{ paddingTop: "30px" }}>
        <TherapyTabsGenerator
          tabsList={tabs}
          activeTabs=""
          onTabChange={onTabChange3}
        />
      </div>
    </div>
  );
}
