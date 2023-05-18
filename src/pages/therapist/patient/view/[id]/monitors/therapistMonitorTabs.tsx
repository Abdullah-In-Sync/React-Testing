/* istanbul ignore file */
import React from "react";
import TherapyTabsGenerator from "../../../../../../components/common/TabsGenerator/TherapyTabGenerator";
import ContentHeader from "../../../../../../components/common/ContentHeader";
import TherapyMyMonitorList from "./myMonitor";
import { useRouter } from "next/router";

export default function TherapistMonotorTabs() {
  const router = useRouter();
  const {
    query: { tab = "" },
  } = router;
  const tabs = [
    {
      label: "Patient Monitor",
      value: "patient-monitor",
      // component: <TherapyMyMonitorList />,
    },

    {
      label: "My Monitors",
      value: "my-monitor",
      component: <TherapyMyMonitorList />,
    },
  ];
  return (
    <>
      <ContentHeader title="Monitor" />
      <TherapyTabsGenerator tabsList={tabs} activeTabs={tab} loadFromUrl />
    </>
  );
}
