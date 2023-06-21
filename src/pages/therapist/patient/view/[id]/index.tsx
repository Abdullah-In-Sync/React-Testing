import { useLazyQuery } from "@apollo/client";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loader from "../../../../../components/common/Loader";
import { GET_PATIENTTHERAPY_DATA } from "../../../../../graphql/query/common";
import Layout from "../../../../../components/layout";
import { Link } from "../../../../../lib/helpers/common";

import TherapyMainComponent from "./therapy";
import { useRouter } from "next/router";
import TabsGeneratorTherapistPatient from "../../../../../components/common/TabsGenerator/TabsGeneratorTherapistPatient";
import TherapyPersonalInfoTabs from "./personalInfo/personalInfoTabs";
import TherapistAssessmentMain from "./assessment";

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
  const patId = router?.query.id as string;

  /* istanbul ignore next */
  const [getPatientTherapyData, { data: patientTherapryData }] = useLazyQuery(
    GET_PATIENTTHERAPY_DATA,
    {
      onCompleted: (data) => {
        /* istanbul ignore next */
        if (data!.getPatientTherapy) {
          const pttherapyId = data!.getPatientTherapy[0]._id;
          /* istanbul ignore next */
          if (pttherapyId) {
            setTherapy(pttherapyId);
          }
        }
        /* istanbul ignore next */
        setLoader(false);
      },
    }
  );

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

  const onTherapyChange = (event: SelectChangeEvent) => {
    /* istanbul ignore next */
    setTherapy(event.target.value);
  };

  /* istanbul ignore next */
  const tabs2 = [
    {
      label: "Personal Info",
      value: "personal-info",
      component: <TherapyPersonalInfoTabs />,
      // redirectUrl: Link + `/therapist/patient/view/${patId}?tab=peronalinfo`,
    },
    {
      label: "Assessment",
      value: "assessment",
      component: <TherapistAssessmentMain />,
      // redirectUrl: Link + `/therapist/patient/view/${patId}?tab=assessment`,
    },
    {
      label: "Therapy",
      value: "therapy",
      component: <TherapyMainComponent setTherapy={therapy} />,
    },
    {
      label: "Notes",
      value: "notes",
      //  component: <Agreement />,
      redirectUrl: Link + `/therapist/patient/view/${patId}?tab=notes`,
    },
    {
      label: "Appointments",
      value: "appointments",
      //  component: <Agreement />,
      redirectUrl: Link + `/therapist/patient/view/${patId}?tab=appointments`,
    },
    {
      label: "To-Do",
      value: "to-do",
      //  component: <Agreement />,
      redirectUrl: Link + `/therapist/patient/view/${patId}?tab=to_do`,
    },
    {
      label: "Files",
      value: "files",
      //  component: <Agreement />,
      redirectUrl: Link + `/therapist/patient/view/${patId}?tab=files`,
    },
    {
      label: "Communications",
      value: "communications",
      //  component: <Agreement />,
      redirectUrl: Link + `/therapist/patient/view/${patId}?tab=communications`,
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
            <Grid item xs={4}>
              <FormControl
                sx={{ mt: 3, minWidth: 120, maxWidth: "100%" }}
                size="small"
              >
                <InputLabel id="lblSelectTherapy" style={{ color: "#fff" }}>
                  Select Therapy
                </InputLabel>
                <Select
                  labelId="lblSelectTherapy"
                  id="selectTherapy"
                  inputProps={{ "data-testid": "selectTherapy" }}
                  value={therapy}
                  autoWidth
                  label="Select Therapy"
                  onChange={onTherapyChange}
                  sx={{
                    ".MuiSelect-icon": {
                      color: "white",
                    },
                    ".MuiSelect-outlined": {
                      color: "white",
                    },
                  }}
                >
                  {patientTherapryData &&
                    patientTherapryData.getPatientTherapy &&
                    patientTherapryData.getPatientTherapy.map((v: any) => {
                      /* istanbul ignore next */
                      return (
                        /* istanbul ignore next */
                        <MenuItem key={"therapy" + v._id} value={v._id}>
                          {v.therapy_detail.therapy_name}/
                          {v.disorder_detail.disorder_name}/
                          {v.model_detail.model_name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Box data-testid="patientViewMenu" style={{ paddingTop: "20px" }}>
            <TabsGeneratorTherapistPatient
              tabsList={tabs2}
              activeTabs="therapy"
            />
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default MainWraperTherapyPatient;
