import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "../patientAssessmentStyles";

const TherapistPatientAssessmentList: React.FC<any> = ({
  risksListData = [],
}) => {
  const styles = useStyles();
  const assessmentList = () => {
    return risksListData.map((item, index) => {
      const { name: title } = item;
      return (
        <Stack
          className={styles.listTitleWrapper}
          key={`assessment_list_item_${index}`}
        >
          <Box>
            <Typography>{title}</Typography>
          </Box>
          <Box>
            <ChevronRightIcon />
          </Box>
        </Stack>
      );
    });
  };

  return <>{assessmentList()}</>;
};

export default TherapistPatientAssessmentList;
