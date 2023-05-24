import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import Loader from "../../../../../../../components/common/Loader";
import { Box, Button, Typography } from "@mui/material";
import { useStyles } from "./style";
import { GET_THERAPIST_PATIENT_MONITOR_LIST } from "../../../../../../../graphql/SafetyPlan/graphql";

const TherapyPatientMonitorList: any = () => {
  const classes = useStyles();
  const patientId = sessionStorage.getItem("patient_id");
  const [loader, setLoader] = useState<boolean>(true);

  const [getTherapistPatientMonitorList, { data: monitorListData }] =
    useLazyQuery(GET_THERAPIST_PATIENT_MONITOR_LIST, {
      fetchPolicy: "network-only",
      onCompleted: () => {
        setLoader(false);
      },
    });

  useEffect(() => {
    getTherapistPatientMonitorList({
      variables: { patient_id: patientId },
    });
  }, []);

  return (
    <>
      <Loader visible={loader} />
      <Box className={classes.addMonitorButtonBox}>
        <Button
          className={classes.addMonitorButtonStyle}
          data-testid="addResourceSubmitButton"
          variant="contained"
          //   onClick={onPressCreateMonitorButton}
        >
          Add Monitor
        </Button>
      </Box>
      {monitorListData?.therapistMonitorList?.map((data) => (
        <Box className={classes.customBox}>
          <Typography
            data-testid="patientMonitorName"
            className={classes.typography}
          >
            {data.name}
          </Typography>
          <Box style={{ marginLeft: "auto", padding: "20px" }}>
            <Button
              data-testid="viewResponseButton"
              className={classes.viewResponseButton}
              variant="outlined"
            >
              View Response
            </Button>
            <Button
              data-testid="completeButton"
              className={classes.completeButton}
              variant="outlined"
            >
              Complete
            </Button>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default TherapyPatientMonitorList;
