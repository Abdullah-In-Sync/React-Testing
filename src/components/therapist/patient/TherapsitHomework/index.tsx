import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useLazyQuery } from "@apollo/client";
import Loader from "../../../../components/common/Loader";
import { Accordion } from "../../../../components/common/Accordion";
import { Typography } from "@material-ui/core";
import { GET_PATIENTSESSION_DATA } from "../../../../graphql/query/patient";

const TherapyPatientHomework: any = (props) => {
  const [loader, setLoader] = useState<boolean>(true);

  // Session Queries
  const [getPatientSessionData, { data: patientSessionData }] = useLazyQuery(
    GET_PATIENTSESSION_DATA,
    {
      onCompleted: () => {
        setLoader(false);
      },
    }
  );

  useEffect(() => {
    getPatientSessionData({
      variables: {
        pttherapyId: props.setTherapy,
        patientId: sessionStorage.getItem("patient_id"),
      },
    });
  }, [props.setTherapy]);

  return (
    <>
      <Loader visible={loader} />
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
                    detail={"Details"}
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
};

export default TherapyPatientHomework;
