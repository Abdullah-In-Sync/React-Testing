import React, { useEffect, useRef, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import Loader from "../../../../../../components/common/Loader";
import ContentHeader from "../../../../../../components/common/ContentHeader";
import { GET_PATIENTSESSION_DATA } from "../../../../../../graphql/query/patient";
import { Box, Typography } from "@mui/material";
import { Accordion } from "../../../../../../components/common/Accordion";
import ConfirmationModal from "../../../../../../components/common/ConfirmationModal";
import { useSnackbar } from "notistack";
import NotesDetail from "../../../../../../components/therapist/TherapistNotes/NotesDetail";
import { useRouter } from "next/router";

type propTypes = {
  setTherapy: any;
};

export default function TherapistNotesList(props: propTypes) {
  const router = useRouter();
  /* istanbul ignore next */
  const SessionNo = router?.query.SessionNo as string;
  const sessionNumber = parseInt(SessionNo, 10);

  const { enqueueSnackbar } = useSnackbar();
  const therapyId = props.setTherapy;
  const onToggle = useRef<any>();

  const [loader, setLoader] = useState<boolean>(true);
  const [isConfirm, setIsConfirm] = useState(false);

  const [getPatientSessionData, { data: patientSessionData }] = useLazyQuery(
    GET_PATIENTSESSION_DATA,
    {
      onCompleted: () => {
        setLoader(false);
      },
    }
  );

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

  const cancelConfirm = () => {
    /* istanbul ignore next */
    // onToggle?.current && onToggle.current?.(true);
    if (onToggle?.current) {
      onToggle.current(true);
    }

    setIsConfirm(false);
    /* istanbul ignore next */
    enqueueSnackbar("Cancel successfully", {
      variant: "success",
    });
  };

  const cancelFunction = (callBack) => {
    setIsConfirm(true);
    onToggle.current = callBack;
  };

  const clearIsConfirmCancel = () => {
    /* istanbul ignore next */
    setIsConfirm(false);
  };

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
                    defaultIsOpen={v.ptsession_no === sessionNumber}
                    detail={(toggleAccordion) => {
                      return (
                        <NotesDetail
                          sessionNo={v.ptsession_no}
                          sessionId={v._id}
                          therapyId={therapyId}
                          onCancel={cancelFunction}
                          toggleAccordion={toggleAccordion}
                        />
                      );
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

      {isConfirm && (
        <ConfirmationModal
          label="Are you sure you want to cancel without saving?"
          onCancel={clearIsConfirmCancel}
          onConfirm={cancelConfirm}
        />
      )}
    </>
  );
}
