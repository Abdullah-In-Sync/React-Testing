/* istanbul ignore file */
import React from "react";
import TherapyTabsGenerator from "../../../../../../components/common/TabsGenerator/TherapyTabGenerator";
import ContentHeader from "../../../../../../components/common/ContentHeader";
import TherapyMyMonitorList from "./myMonitor";
import { useRouter } from "next/router";
import TherapyPatientMonitorList from "../../../../../../components/therapist/patient/patientMonitor";

export default function TherapistMonotorTabs() {
  const router = useRouter();
  const {
    query: { tab = "", id, mainTab },
  } = router;
  const tabs = [
    {
      label: "Patient Monitor",
      value: "patient-monitor",
      component: <TherapyPatientMonitorList />,
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
      <TherapyTabsGenerator
        tabsList={tabs}
        tabLabel={`/therapist/patient/view/${id}/?mainTab=${mainTab}&tab=${tab}&subTab1=`}
      />
    </>
  );
}
