import React, { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";

import { useLazyQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import Loader from "../../../components/common/Loader";
import { Accordion } from "../../../components/common/Accordion";
import { GET_CLIENT_THERAPY_SESSION_LIST } from "../../../graphql/Feedback/graphql";
import {
  GetClientTherapySessionListRes,
  GetClientTherapySessionListVars,
} from "../../../graphql/Feedback/types";
import { AccordionDetail } from "./FormDetails";

type Props = {
  therapyId: string;
};

const ClientFeedback: FC<Props> = ({ therapyId }) => {
  const [loader, setLoader] = useState<boolean>(true);

  // Session Queries
  const [getPatientSessionData, { data: patientSessionData }] = useLazyQuery<
    GetClientTherapySessionListRes,
    GetClientTherapySessionListVars
  >(GET_CLIENT_THERAPY_SESSION_LIST, {
    onCompleted: () => {
      setLoader(false);
    },
  });

  // PatientSessionData
  useEffect(() => {
    /* istanbul ignore next */
    setLoader(true);
    getPatientSessionData({
      variables: {
        pttherapyId: therapyId,
        patientId: sessionStorage.getItem("patient_id"),
      },
    });
  }, [therapyId]);

  const getSessionName = (sessionNo: string) => {
    const rename = {
      after_therapy: "after Therapy",
      before_therapy: "before Therapy",
    };

    return rename[sessionNo] || `Session ${sessionNo}`;
  };

  return (
    <>
      <Loader visible={loader} />
      <Box marginTop={"20px"} marginBottom={"60px"}>
        {!loader &&
          patientSessionData.getClientTherapysessionList &&
          patientSessionData.getClientTherapysessionList.map((v) => {
            return (
              <Accordion
                title={getSessionName(v.session_no)}
                marginBottom={"20px !important"}
                detail={
                  <AccordionDetail
                    sessionNo={v.session_no}
                    therapyId={therapyId}
                  />
                }
              />
            );
          })}
      </Box>
    </>
  );
};

export default ClientFeedback;
