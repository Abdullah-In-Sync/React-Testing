import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import Loader from "../../../../../../../components/common/Loader";
import { Box, Button, Typography } from "@mui/material";
import { GET_THERAPIST_PATIENT_MONITOR_LIST } from "../../../../../../../graphql/SafetyPlan/graphql";

const TherapyPatientMonitorList: any = () => {
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
      <Box
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <Button
          style={{
            backgroundColor: "#6EC9DB",
            color: "white",
            textTransform: "none",
          }}
          data-testid="addResourceSubmitButton"
          variant="contained"
          //   onClick={onPressCreateMonitorButton}
        >
          Add Monitor
        </Button>
      </Box>
      {monitorListData?.therapistMonitorList?.map((data) => (
        <Box
          style={{
            width: "100%",
            height: "65px",
            background: "#7EBCA7",
            border: "1px solid #7EBCA7",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Typography
            data-testid="patientMonitorName"
            style={{
              textAlign: "center",
              padding: "20px",
              color: "White",
              fontWeight: 700,
            }}
          >
            {data.name}
          </Typography>
          <Box style={{ marginLeft: "auto", padding: "20px" }}>
            <Button
              data-testid="viewResponseButton"
              style={{
                backgroundColor: "white",
                color: "#7EBCA7",
                fontWeight: 700,
                paddingLeft: "20px",
                paddingRight: "20px",
                marginRight: "10px",
              }}
              variant="outlined"
            >
              View Response
            </Button>
            <Button
              data-testid="completeButton"
              style={{
                backgroundColor: "white",
                color: "#7EBCA7",
                fontWeight: 700,
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
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
