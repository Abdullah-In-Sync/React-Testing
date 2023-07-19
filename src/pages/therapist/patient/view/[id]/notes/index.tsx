import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import Loader from "../../../../../../components/common/Loader";
import ContentHeader from "../../../../../../components/common/ContentHeader";
import { GET_PATIENTSESSION_DATA } from "../../../../../../graphql/query/patient";
import { Box, Typography } from "@mui/material";
import { Accordion } from "../../../../../../components/common/Accordion";

type propTypes = {
  setTherapy: any;
};

export default function TherapistNotesList(props: propTypes) {
  const [loader, setLoader] = useState<boolean>(true);

  const [getPatientSessionData, { data: patientSessionData }] = useLazyQuery(
    GET_PATIENTSESSION_DATA,
    {
      onCompleted: () => {
        setLoader(false);
      },
    }
  );
  console.log("Koca: patientSessionData ", patientSessionData);

  useEffect(() => {
    console.debug("Get session data variable", {
      pttherapyId: props.setTherapy,
      patientId: sessionStorage.getItem("patient_id"),
    });
    getPatientSessionData({
      variables: {
        pttherapyId: props.setTherapy,
        patientId: sessionStorage.getItem("patient_id"),
      },
    });
  }, [props.setTherapy]);

  // Take refrence from
  // Patient safetyPlan src/components/patient/therapyPages/safetyPlan/index.tsx
  // Therapist homework src/components/therapist/patient/TherapsitHomework/index.tsx
  return (
    <>
      {/* <Layout> */}
      <Loader visible={loader} />
      <ContentHeader title="Notes" />
      <Box marginBottom={"20px"}>
        {
          /* istanbul ignore next */
          !loader &&
          patientSessionData?.getPatientSessionList &&
          patientSessionData?.getPatientSessionList.length > 0
            ? patientSessionData?.getPatientSessionList.map((v) => {
                return (
                  <Accordion
                    key={`according-${v.ptsession_no}`}
                    title={`Session ${v.ptsession_no}`}
                    marginBottom={"20px !important"}
                    detail={() => {
                      return <Typography>Work in progress</Typography>;
                    }}
                  />
                );
              })
            : patientSessionData?.getPatientSessionList?.length == 0 && (
                <Box display={"flex"} justifyContent="center">
                  <Typography>No data found!</Typography>
                </Box>
              )
        }
      </Box>
    </>
  );
}
