import { useLazyQuery } from "@apollo/client";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Theme,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loader from "../../../../../components/common/Loader";
import Layout from "../../../../../components/layout";
import { GET_PATIENTTHERAPY_DATA } from "../../../../../graphql/query/common";

import { useTheme } from "@mui/styles";
import { useRouter } from "next/router";
import TabsGeneratorTherapistPatient from "../../../../../components/common/TabsGenerator/TabsGeneratorTherapistPatient";
import TherapistPatientAssessment from "../../../../../components/therapist/patient/Assessment";
import TherapisTherapyList from "../../../therapy";
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
  const theme = useTheme() as Theme;
  const [therapy, setTherapy] = useState<string>("pt_therapy_id");
  const [loader, setLoader] = useState<boolean>(pLoader);

  const [patientData, setPatientData] = useState<{
    patient_id: string;
    patient_name: string;
  }>({ patient_id: "", patient_name: "" });

  const router = useRouter();
  const patId = router?.query.id as string;
  const tab = router?.query?.mainTab as string;
  const tab2 = router?.query?.tab as string;

  // const {
  //   query: { id },
  // } = router;

  /* istanbul ignore next */
  const [getPatientTherapyData, { data: patientTherapryData }] = useLazyQuery(
    GET_PATIENTTHERAPY_DATA,
    {
      onCompleted: (data) => {
        /* istanbul ignore next */
        if (data!.getPatientTherapy) {
          const pttherapyId = data!.getPatientTherapy[0]?._id;
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
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                alignItems: "center",
                "& .MuiOutlinedInput-root": {
                  height: 38,
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& > fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            >
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
