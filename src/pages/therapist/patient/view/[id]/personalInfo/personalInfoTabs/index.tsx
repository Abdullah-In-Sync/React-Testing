/* istanbul ignore file */
import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import TherapyTabsGenerator from "../../../../../../../components/common/TabsGenerator/TherapyTabGenerator";
import TherapistProfileDetails from "../profileDetails";
import TherapistProfileAgreement from "../profileAgreemet";

export default function TherapyPersonalInfoTabs() {
  const router = useRouter();
  const {
    query: { id, mainTab },
  } = router;

  const tabs = [
    {
      label: "Details",
      value: "details",
      component: <TherapistProfileDetails />,
    },
    {
      label: "Agreement",
      value: "agreement",
      component: <TherapistProfileAgreement />,
    },
  ];

  return (
    <Box
      style={{ paddingTop: "20px" }}
      data-testid="patientViewTherapyTab"
      className="therapyTabsWrapper"
    >
      <TherapyTabsGenerator
        tabsList={tabs}
        tabLabel={`/therapist/patient/view/${id}/?mainTab=${mainTab}&tab=`}
      />
    </Box>
  );
}
