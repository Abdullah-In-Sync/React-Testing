/* istanbul ignore file */
import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import TherapyTabsGenerator from "../../../../../../components/common/TabsGenerator/TherapyTabGenerator";

export default function TherapyMainComponent({ modifyTabs }) {
  const router = useRouter();
  const {
    query: { id, mainTab },
  } = router;

  const activeTabs = {
    feedback: "&subTab1=therapist-feedback",
    monitor: "&subTab1=patient-monitor",
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
