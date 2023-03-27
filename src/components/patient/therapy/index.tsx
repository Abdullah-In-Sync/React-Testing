import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import Image from "next/image";
import Layout from "../../../components/layout";

import TabsGeneratorTherapistPatient from "../../../components/common/TabsGenerator/TabsGeneratorTherapistPatient";
import { useAppContext } from "../../../contexts/AuthContext";
import TherapyMainComponent from "./Therapy";
import { useStyles } from "./therapyStyles";

const TherapyPatientComponent = () => {
  const styles = useStyles();
  const {
    user: {
      patient_data: {
        patient_firstname: patientFirstName = "",
        patient_lastname: patientLastName = "",
      } = {},
    } = {},
  } = useAppContext();
  const patientFullName = `${patientFirstName} ${patientLastName}`;

  /* istanbul ignore next */
  const tabs2 = [
    {
      label: "Therapy",
      value: "therapy",
      component: <TherapyMainComponent />,
    },
  ];

  return (
    <>
      <Layout>
        <Stack className={styles.therapyMain}>
          <Box className="firstSection">
            <Box className="userImageWrapper">
              <Image
                alt="Therapist"
                src="/images/user.png"
                width="100"
                height="100"
              />
            </Box>
            <Box className="userNameWrapper">
              <Typography
                variant="subtitle1"
                className="text-white"
                data-testid="patient_name"
              >
                {patientFullName}
              </Typography>
            </Box>
          </Box>
          <Box className="secondSection" data-testid="patientViewMenu">
            <TabsGeneratorTherapistPatient
              tabsList={tabs2}
              activeTabs="therapy"
            />
          </Box>
        </Stack>
      </Layout>
    </>
  );
};

export default TherapyPatientComponent;
