/* istanbul ignore file */
import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import TherapyTabsGenerator from "../../../../../../../components/common/TabsGenerator/TherapyTabGenerator";
import TherapistProfileDetails from "../profileDetails";
import TherapistProfileAgreement from "../profileAgreemet";
import { checkPrivilageAccess } from "../../../../../../../utility/helper";

export default function TherapyPersonalInfoTabs() {
  const isCustomAgreement = checkPrivilageAccess("Agreement", "View");
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
  ];

  const isCustomAgreementTabs = isCustomAgreement
    ? [
        {
          label: "Agreement",
          value: "agreement",
          component: <TherapistProfileAgreement />,
        },
      ]
    : [];

  return (
    <Box
      style={{ paddingTop: "20px" }}
      data-testid="patientViewTherapyTab"
      className="therapyTabsWrapper"
    >
      <TherapyTabsGenerator
        tabsList={[...tabs, ...isCustomAgreementTabs]}
        tabLabel={`/therapist/patient/view/${id}/?mainTab=${mainTab}&tab=`}
      />
    </Box>
  );
}
