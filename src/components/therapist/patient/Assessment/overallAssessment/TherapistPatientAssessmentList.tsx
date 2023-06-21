import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "../patientAssessmentStyles";
import CommonButton from "../../../../common/Buttons/CommonButton";
import ContentHeader from "../../../../common/ContentHeader";

const TherapistPatientAssessmentList: React.FC<any> = ({
  assessmentListData = [],
  onClickAddAssessment,
}) => {
  const styles = useStyles();
  const assessmentList = () => {
    return assessmentListData.map((item, index) => {
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

  return (
    <>
      <Stack className={styles.headerWrapper}>
        <Box>
          <ContentHeader title="Assessment" />
        </Box>
        <Box>
          <CommonButton
            className=""
            data-testid="addMonitorBtn"
            variant="contained"
            onClick={onClickAddAssessment}
            size="small"
          >
            Add Assessment
          </CommonButton>
        </Box>
      </Stack>
      {assessmentList()}
    </>
  );
};

export default TherapistPatientAssessmentList;
