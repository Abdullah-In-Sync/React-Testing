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
import Loader from "../../../../../../components/common/Loader";
import Layout from "../../../../../../components/layout";
import PatientViewMenu from "../../../../../../components/therapist/patientViewMenu";
import PatientViewTherapyTab from "../../../../../../components/therapist/patientViewTherapyTab";
import { GET_PATIENTTHERAPY_DATA } from "../../../../../../graphql/query/common";

interface Props {
  children: React.ReactNode;
  patientId: string | any;
  loader: boolean;
}

const PageWrapper: React.FC<Props> = ({
  children,
  patientId,
  loader: pLoader,
}) => {
  const [therapy, setTherapy] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(pLoader);
  const [patientData, setPatientData] = useState<{
    patient_id: string;
    patient_name: string;
  }>({ patient_id: "", patient_name: "" });

  const [getPatientTherapyData, { data: patientTherapryData }] = useLazyQuery(
    GET_PATIENTTHERAPY_DATA,
    {
      onCompleted: (data) => {
        /* istanbul ignore else */
        if (data!.getPatientTherapy) {
          const pttherapyId = data!.getPatientTherapy[0]._id;
          /* istanbul ignore else */
          if (pttherapyId) {
            setTherapy(pttherapyId);
          }
        }
        setLoader(false);
      },
    }
  );

  const setDefaultStateExcludingLoader = () => {
    setPatientData({
      patient_id: patientId,
      patient_name: sessionStorage.getItem("patient_name"),
    });
  };

  useEffect(() => {
    setDefaultStateExcludingLoader();
  }, []);

  useEffect(() => {
    setLoader(true);
    getPatientTherapyData({
      variables: { patientId: patientId },
    });
  }, [patientId]);

  const onTherapyChange = (event: SelectChangeEvent) => {
    setTherapy(event.target.value);
  };

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
            <Grid item xs={2} sx={{ textAlign: "center" }}>
              <Image
                alt="Therapist"
                src="/images/user.png"
                width="100"
                height="100"
                style={{ borderRadius: "50%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4" className="text-white tit">
                {patientData.patient_name}
              </Typography>
              {/* <Box className='text-white'>Risk of Suicide</Box> */}
            </Grid>
            <Grid item xs={4}>
              <FormControl sx={{ mt: 3, minWidth: 120 }} size="small">
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
                      return (
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
          <Box>
            <PatientViewMenu activeTab="therapy" patientID={patientId} />
            <PatientViewTherapyTab
              activeTab="resources"
              patientID={patientId}
            />
          </Box>
          <Typography
            variant="h4"
            mt={4}
            mb={2}
            sx={{ fontWeight: "bold" }}
            className="text-blue"
          >
            Resources
          </Typography>
          {children}
        </Box>
      </Layout>
    </>
  );
};

export default PageWrapper;
