import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import Image from "next/image";
import Layout from "../../../components/layout";

import TabsGeneratorTherapistPatient from "../../../components/common/TabsGenerator/TabsGeneratorTherapistPatient";
import { useAppContext } from "../../../contexts/AuthContext";
import TherapyMainComponent from "./Therapy";
import { useStyles } from "./therapyStyles";
import moment from "moment";
import { checkPrivilageAccess } from "../../../utility/helper";
import TherapyTabs from "./TherapyTabs";
import { useEffect } from "react";
import { useRouter } from "next/router";

const TherapyPatientComponent = () => {
  const router = useRouter();
  /* istanbul ignore file */
  const {
    query: { tab },
  } = router;
  const styles = useStyles();
  /* istanbul ignore file */
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
  const modifyTabs = TherapyTabs.filter((v) => {
    const { moduleName } = v;
    const status = checkPrivilageAccess(moduleName);
    if (status === undefined) return true;
    else return status;
  });
  useEffect(() => {
    if (modifyTabs.length > 0 && modifyTabs[0]["value"] && !tab)
      router.push(
        `/patient/therapy/?mainTab=therapy&tab=${modifyTabs[0]["value"]}`
      );
  }, [modifyTabs?.[0]?.["value"], tab]);

  /* istanbul ignore next */
  const tabs2 = [
    {
      label: "Therapy",
      value: "therapy",
      component: <TherapyMainComponent tabs={modifyTabs} />,
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
              {formatedBirthdate && (
                <Typography className="text-white" data-testid="patient_name">
                  {`DOB : ${formatedBirthdate}`}
                </Typography>
              )}
            </Box>
          </Box>
          <Box className="secondSection" data-testid="patientViewMenu">
            <TabsGeneratorTherapistPatient
              tabsList={tabs2}
              tabLabel={`/patient/therapy/?mainTab=`}
            />
          </Box>
        </Stack>
      </Layout>
    </>
  );
};
//mainTab=therapy&tab=safety-plan
export default TherapyPatientComponent;
