import { Button, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "../style";

type propTypes = {
  patientAssessmentList: any;
};

const PatientAssessmentList = (props: propTypes) => {
  const styles = useStyles();
  /* istanbul ignore next */
  const assessmentData =
    props?.patientAssessmentList?.patientAssessmentList.data;

  return (
    <>
      {assessmentData?.map((data) => (
        <Button
          className={styles.listBlueBar}
          variant="contained"
          data-testid="assessment_name"
          href={`/patient/assessment/clinicalAssessment/${data._id}`}
        >
          <Typography
            style={{
              color: "white",
              display: "flex",
              padding: "20px",
              fontWeight: "700",
              fontSize: "16px",
            }}
          >
            {data.name}
          </Typography>
        </Button>
      ))}
    </>
  );
};

export default PatientAssessmentList;
