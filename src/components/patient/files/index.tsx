import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import Image from "next/image";
import Layout from "../../../components/layout";

import TabsGeneratorTherapistPatient from "../../../components/common/TabsGenerator/TabsGeneratorTherapistPatient";
import { useAppContext } from "../../../contexts/AuthContext";
import { useStyles } from "./filesStyles";
import moment from "moment";
import FilesPage from "../filesPage";

const FilesPatientComponent = () => {
  const styles = useStyles();
  const {
    user: {
      patient_data: {
        birthdate = undefined,
        patient_firstname: patientFirstName = "",
        patient_lastname: patientLastName = "",
      } = {},
    } = {},
  } = useAppContext();
  const patientFullName = `${patientFirstName} ${patientLastName}`;
  const formatedBirthdate = birthdate
    ? moment(birthdate, "MM-DD-YYYY").format("DD-MM-YYYY")
    : undefined;

  /* istanbul ignore next */
  const tabs2 = [
    {
      label: "Therapy",
      value: "therapy",
      component: null,
    },
    {
      label: "Files",
      value: "files",
      component: <FilesPage />,
    },
  ];

  return (
    <>
      <Layout>
        <Stack className={styles.filesMain}>
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
              {formatedBirthdate && (
                <Typography className="text-white" data-testid="patient_name">
                  {`DOB : ${formatedBirthdate}`}
                </Typography>
              )}
            </Box>
          </Box>
          <Box className="secondSection" data-testid="patientViewMenu">
            <TabsGeneratorTherapistPatient tabsList={tabs2} />
          </Box>
        </Stack>
      </Layout>
    </>
  );
};

export default FilesPatientComponent;
