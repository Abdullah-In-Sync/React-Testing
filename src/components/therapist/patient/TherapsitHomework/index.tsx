import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useLazyQuery } from "@apollo/client";
import Loader from "../../../../components/common/Loader";
import { Accordion } from "../../../../components/common/Accordion";
import { Typography } from "@material-ui/core";
import { GET_PATIENTSESSION_DATA } from "../../../../graphql/query/patient";
import HomeworkDetails from "./addHomework";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { useSnackbar } from "notistack";

const TherapyPatientHomework: any = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  let onToggle;
  const [loader, setLoader] = useState<boolean>(true);
  const [isConfirm, setIsConfirm] = useState(false);

  const therapyId = props.setTherapy;

  // Session Queries
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
    getPatientSessionData({
      variables: {
        pttherapyId: props.setTherapy,
        patientId: sessionStorage.getItem("patient_id"),
      },
    });
  }, [props.setTherapy]);

  const cancelFunction = () => {
    setIsConfirm(true);
  };

  const cancelConfirm = () => {
    /* istanbul ignore next */
    onToggle();
    setIsConfirm(false);
    /* istanbul ignore next */
    enqueueSnackbar("Homework cancel successfully", {
      variant: "success",
    });
  };

  const clearIsConfirmCancel = () => {
    /* istanbul ignore next */
    setIsConfirm(false);
  };

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
                    detail={(toggleAccordion) => {
                      onToggle = toggleAccordion;
                      return (
                        <HomeworkDetails
                          sessionNo={v.ptsession_no}
                          sessionId={v._id}
                          therapyId={therapyId}
                          onCancel={cancelFunction}
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
          label="Are you sure you are canceling the task without saving?"
          onCancel={clearIsConfirmCancel}
          onConfirm={cancelConfirm}
        />
      )}
    </>
  );
};

export default TherapyPatientHomework;
