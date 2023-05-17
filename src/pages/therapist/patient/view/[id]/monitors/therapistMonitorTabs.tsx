/* istanbul ignore file */
import React from "react";
import TherapyTabsGenerator from "../../../../../../components/common/TabsGenerator/TherapyTabGenerator";
import ContentHeader from "../../../../../../components/common/ContentHeader";
import TherapyMyMonitorList from "./myMonitor";

export default function TherapistMonotorTabs() {
  const tabs = [
    {
      label: "Patient Monitor",
      value: "feedback",
      // component: <TherapyMyMonitorList />,
    },

    {
      label: "My Monitors",
      value: "resources",
      component: <TherapyMyMonitorList />,
    },
  ];
  return (
    <>
      <ContentHeader title="Monitor" />
      <TherapyTabsGenerator tabsList={tabs} activeTabs="" />
    </>
  );
}
