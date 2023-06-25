import { Box } from "@material-ui/core";
import { Stack } from "@mui/material";
import React, { ForwardedRef } from "react";
import CommonButton from "../../../../common/Buttons/CommonButton";
import { ConfirmElement } from "../../../../common/ConfirmWrapper";
import ContentHeader from "../../../../common/ContentHeader";
import { useStyles } from "../patientAssessmentStyles";
import ClinicalAssessmentList from "./ClinicalAssessmentList";
import { CategoryEntity } from "../../../../../graphql/assessment/types";

const ClinicalAssessment: React.FC<ClinicalAssessmentProps> = ({
  handleToggleContent,
  categoryListData,
  onPressBack,
  onPressSummaryView,
  actionButtonClick,
  therapistViewAssessmentLoading,
}) => {
  const styles = useStyles();
  return (
    <>
      <Stack className={styles.clinicalAssessmentWrapper}>
        <Stack className="row1">
          <Box className="col1">
            <ContentHeader title="Clinical Assessment" />
            <CommonButton
              data-testid="baackBtn"
              variant="contained"
              onClick={onPressBack}
              size="small"
            >
              Back
            </CommonButton>
          </Box>
          <Box className="col2">
            <CommonButton
              data-testid="summaryViewBtn"
              variant="contained"
              onClick={onPressSummaryView}
              size="small"
            >
              Summary View
            </CommonButton>
          </Box>
        </Stack>
        <Stack className="row2">
          <ClinicalAssessmentList
            categoryListData={categoryListData}
            handleToggleContent={handleToggleContent}
            actionButtonClick={actionButtonClick}
            therapistViewAssessmentLoading={therapistViewAssessmentLoading}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default ClinicalAssessment;

export interface ClinicalAssessmentProps {
  categoryListData?: CategoryEntity[];
  handleBackClick?: () => void;
  actionButtonClick?: (v?: any) => void;
  confirmRef?: ForwardedRef<ConfirmElement>;
  handleToggleContent?: any;
  onPressBack?: () => void;
  onPressSummaryView?: () => void;
  therapistViewAssessmentLoading?: boolean;
}
