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
import {
  checkPrivilageAccess,
  checkUserType,
  modifyTabsData,
} from "../../../../../utility/helper";
import TherapistSafetyPlanIndex from "./safetyPlan";
import TherapistPatientFormulation from "./formulation";
import TherapyPatientGoalsIndex from "./goals";
import TherapyPatientHomeworkIndex from "./homework";
import Measures from "../../../../../components/therapist/measures";
import TherapistMonotorTabs from "./monitors/therapistMonitorTabs";
import PatientEditTemplatePage2 from "./resources";
import TherapistFeedbackTabs from "../../../feedback/FeedbackTabs";
import TherapistRelapseIndex from "./relapse";

interface Props {
  children: React.ReactNode;
  patientId: string | any;
  loader: boolean;
}

const MainWraperTherapyPatient: React.FC<Props> = ({
  patientId,
  loader: pLoader,
}) => {
  const [therapy, setTherapy] = useState<string>();
  const [loader, setLoader] = useState<boolean>(pLoader);
  const { userType } = checkUserType();

  const [patientData, setPatientData] = useState<{
    patient_id: string;
    patient_name: string;
  }>({ patient_id: "", patient_name: "" });

  const router = useRouter();
  const patId = router?.query.id as string;
  const tab = router?.query?.mainTab as string;
  /* istanbul ignore next */
  const tab2 = router?.query?.tab as string;
  /* istanbul ignore next */
  const isCustomTherapy = checkPrivilageAccess("Therapy", "View");
  /* istanbul ignore next */
  const isTherapy = isCustomTherapy && tab === "therapy";

  /* istanbul ignore next */
  const [getPatientTherapyData] = useLazyQuery(GET_PATIENTTHERAPY_DATA, {
    fetchPolicy: "cache-and-network",
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
    if (patId) {
      setLoader(true);
      getPatientTherapyData({
        variables: { patientId: patId },
      });
    }
  }, [tab]);

  const tabs = [
    {
      label: "Safety Plan",
      value: "safety-plan",
      component: <TherapistSafetyPlanIndex />,
      moduleName: "Safety Plan",
    },
    {
      label: "Formulation",
      value: "formulation",
      component: <TherapistPatientFormulation />,
      moduleName: "Formulation",
    },
    {
      label: "Goals",
      value: "goals",
      component: <TherapyPatientGoalsIndex setTherapy={therapy} />,
      moduleName: "Goals",
    },
    {
      label: "Homework",
      value: "homework",
      component: <TherapyPatientHomeworkIndex setTherapy={therapy} />,
      moduleName: "Homework",
    },
    {
      label: "Measures",
      value: "measures",
      component: <Measures />,
      moduleName: "Measures",
    },

    {
      label: "Monitors",
      value: "monitor",
      component: <TherapistMonotorTabs />,
      moduleName: "Monitors",
    },
    {
      label: "Resources",
      value: "resources",
      component: <PatientEditTemplatePage2 />,
      moduleName: "Resources",
    },
    {
      label: "Relapse",
      value: "relapse",
      component: <TherapistRelapseIndex />,
      moduleName: "Relapse",
    },
    {
      label: "Feedback",
      value: "feedback",
      component: <TherapistFeedbackTabs setTherapy={therapy} />,
      moduleName: "Feedback",
    },
  ];
  const modifyTabs2 = modifyTabsData(tabs);
  const modifyTabs2IsEmpty = modifyTabs2.length > 0;
  /* istanbul ignore next */
  const tabs1 = [
    {
      label: "Personal Info",
      value: "personal-info",
      component: <TherapyPersonalInfoTabs />,
      moduleName: "Personal Info",
      subTab: "&tab=details",
    },
    {
      label: "Assessment",
      value: "assessment",
      component: <TherapistPatientAssessment />,
      moduleName: "Assessment",
      subTab: "",
    },
    (modifyTabs2IsEmpty || isCustomTherapy) && {
      label: "Therapy",
      value: "therapy",
      component: modifyTabs2IsEmpty && (
        <TherapyMainComponent modifyTabs={modifyTabs2} />
      ),
      moduleName: "default",
      subTab:
        modifyTabs2IsEmpty && userType === "custom" && !isCustomTherapy
          ? `&tab=${modifyTabs2[0]["value"]}`
          : "",
    },
    {
      label: "Notes",
      value: "notes",
      component: <TherapistNotesList setTherapy={therapy} />,
      moduleName: "Notes",
      subTab: "",
    },
    {
      label: "Files",
      value: "files",
      component: <TherapistFilesList />,
      moduleName: "Files",
      subTab: "",
    },
  ];

  const modifyTabs = modifyTabsData(tabs1) || [];
  const mainTab = modifyTabs.filter((item) => item.value === tab);
  useEffect(() => {
    /* istanbul ignore next */
    if (modifyTabs.length > 0 && !tab)
      router.push(
        `/therapist/patient/view/${patId}/?mainTab=${modifyTabs[0]["value"]}${modifyTabs[0]["subTab"]}`
      );
  }, [tab]);

  useEffect(() => {
    /* istanbul ignore next */
    if (mainTab.length > 0 && !isTherapy && !tab2)
      router.push(
        `/therapist/patient/view/${patId}/?mainTab=${tab}${mainTab[0]["subTab"]}`
      );
  }, [tab, tab2]);

  return (
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
            tabsList={modifyTabs}
            tabLabel={`/therapist/patient/view/${patId}/?mainTab=`}
          />
          {isTherapy && !tab2 && <TherapisTherapyList setTherapy={therapy} />}
        </Box>
      </Box>
    </Layout>
  );
};

export default MainWraperTherapyPatient;
