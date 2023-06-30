import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "../patientAssessmentStyles";

const TherapistPatientAssessmentList: React.FC<any> = ({
  assessmentListData = [],
  handleClickAssement,
}) => {
  const styles = useStyles();
  const assessmentList = () => {
    return assessmentListData.map((item, index) => {
      const { name: title } = item;
      return (
        <Stack
          className={styles.listTitleWrapper}
          key={`assessment_list_item_${index}`}
          onClick={() => handleClickAssement(item)}
          data-testid={`assessment_list_item_${index}`}
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
