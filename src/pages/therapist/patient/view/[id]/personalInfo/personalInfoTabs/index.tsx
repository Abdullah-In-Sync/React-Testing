/* istanbul ignore file */
import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import TherapyTabsGenerator from "../../../../../../../components/common/TabsGenerator/TherapyTabGenerator";
import TherapistProfileDetails from "../profileDetails";
import TherapistProfileAgreement from "../profileAgreemet";

export default function TherapyPersonalInfoTabs() {
  const router = useRouter();
  const {
    query: { tab = "personal-info" },
  } = router;

  const tabs = [
    {
      label: "Personal Info",
      value: "personal-info",
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
      <TherapyTabsGenerator tabsList={tabs} activeTabs={tab} loadFromUrl />
    </Box>
  );
}
