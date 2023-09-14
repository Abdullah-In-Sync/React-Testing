import { Stack } from "@mui/material";
import Box from "@mui/material/Box";

import Layout from "../../layout";

import TabsGeneratorTherapist from "../../common/TabsGenerator/TabsGeneratorTherapistPatient";

import { useStyles } from "./settingsStyles";
import TherapistProfile from "../settingsPages/profile";

const SettingsTherapistComponent = () => {
  const styles = useStyles();

  /* istanbul ignore next */
  const tabs2 = [
    {
      label: "Profile",
      value: "profile",
      component: <TherapistProfile />,
    },
    {
      label: "Communication",
      value: "communication",
      component: null,
    },
  ];

  return (
    <>
      <Layout>
        <Stack className={styles.settingMain}>
          <Box className="secondSection" data-testid="patientViewMenu">
            <TabsGeneratorTherapist tabsList={tabs2} />
          </Box>
        </Stack>
      </Layout>
    </>
  );
};

export default SettingsTherapistComponent;
