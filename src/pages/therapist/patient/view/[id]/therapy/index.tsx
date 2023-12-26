/* istanbul ignore file */
import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import TherapyTabsGenerator from "../../../../../../components/common/TabsGenerator/TherapyTabGenerator";
import {
  checkPrivilageAccess,
  checkUserType,
} from "../../../../../../utility/helper";

export default function TherapyMainComponent({ modifyTabs }) {
  const { userType } = checkUserType();
  const isTherapy = checkPrivilageAccess("Therapy", "View");
  const router = useRouter();
  const {
    query: { id, mainTab, tab },
  } = router;

  useEffect(() => {
    /* istanbul ignore next */
    if (
      userType === "custom" &&
      modifyTabs.length > 0 &&
      mainTab === "therapy" &&
      !isTherapy &&
      !tab
    )
      router.push(
        `/therapist/patient/view/${id}/?mainTab=${mainTab}&tab=${modifyTabs[0]["value"]}`
      );
  }, [mainTab, tab]);

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
