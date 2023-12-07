import { useLazyQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loader from "../../../../../components/common/Loader";
import Layout from "../../../../../components/layout";
import { GET_PATIENTTHERAPY_DATA } from "../../../../../graphql/query/common";

import { useRouter } from "next/router";
import TabsGeneratorTherapistPatient from "../../../../../components/common/TabsGenerator/TabsGeneratorTherapistPatient";
import TherapistPatientAssessment from "../../../../../components/therapist/patient/Assessment";
import TherapisTherapyList from "../../../therapy";
import TherapistFilesList from "./files";
import TherapistNotesList from "./notes";
import TherapyPersonalInfoTabs from "./personalInfo/personalInfoTabs";
import TherapyMainComponent from "./therapy";

interface Props {
  children: React.ReactNode;
  patientId: string | any;
  loader: boolean;
}

const MainWraperTherapyPatient: React.FC<Props> = ({
  patientId,
  loader: pLoader,
}) => {
  const [therapy, setTherapy] = useState<string>("pt_therapy_id");
  const [loader, setLoader] = useState<boolean>(pLoader);

  const [patientData, setPatientData] = useState<{
    patient_id: string;
    patient_name: string;
  }>({ patient_id: "", patient_name: "" });

  const router = useRouter();
  /* istanbul ignore next */
  const patId = router?.query.id as string;
  /* istanbul ignore next */
  const tab = router?.query?.mainTab as string;
  /* istanbul ignore next */
  const tab2 = router?.query?.tab as string;

  // const {
  //   query: { id },
  // } = router;

  /* istanbul ignore next */
  const [getPatientTherapyData] = useLazyQuery(GET_PATIENTTHERAPY_DATA, {
    onCompleted: (data) => {
      /* istanbul ignore next */
      if (data!.getPatientTherapy) {
        /* istanbul ignore next */
        const pttherapyId = data!.getPatientTherapy[0]?._id;
        if (pttherapyId) {
          setTherapy(pttherapyId);
        }
      }
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  /* istanbul ignore next */
  const setDefaultStateExcludingLoader = () => {
    setPatientData({
      patient_id: patientId,
      patient_name: sessionStorage.getItem("patient_name"),
    });
  };

  useEffect(() => {
    /* istanbul ignore next */
    setDefaultStateExcludingLoader();
  }, []);

  useEffect(() => {
    /* istanbul ignore next */
    setLoader(true);
    getPatientTherapyData({
      variables: { patientId: patId },
    });
  }, [patientId]);

  /* istanbul ignore next */
  const tabs2 = [
    {
      label: "Personal Info",
      value: "personal-info",
      component: <TherapyPersonalInfoTabs />,
    },
    {
      label: "Assessment",
      value: "assessment",
      component: <TherapistPatientAssessment />,
    },
    {
      label: "Therapy",
      value: "therapy",
      component: <TherapyMainComponent setTherapy={therapy} />,
    },
    {
      label: "Notes",
      value: "notes",
      component: <TherapistNotesList setTherapy={therapy} />,
    },
    {
      label: "Files",
      value: "files",
      component: <TherapistFilesList />,
    },
  ];

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <Box
          sx={{ flexGrow: 1 }}
          p={5}
          borderRadius="7px"
          className="bg-themegreen"
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={2}
              sx={{ textAlign: "center" }}
              data-testid="container_img"
            >
              <Image
                alt="Therapist"
                src="/images/user.png"
                width="100"
                height="100"
                style={{ borderRadius: "50%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h4"
                className="text-white tit"
                data-testid="patient_name"
              >
                {patientData.patient_name}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Box data-testid="patientViewMenu" style={{ paddingTop: "20px" }}>
            <TabsGeneratorTherapistPatient
              tabsList={tabs2}
              tabLabel={`/therapist/patient/view/${patId}/?mainTab=`}
              defaultTabs={defaultTabs}
            />
            {tab === "therapy" && !tab2 && (
              <TherapisTherapyList setTherapy={therapy} />
            )}
          </Box>
        </Box>
      </Layout>
    </>
  );
};

const defaultTabs = {
  // therapy: "&tab=safety-plan",
  "personal-info": "&tab=details",
};

export default MainWraperTherapyPatient;
