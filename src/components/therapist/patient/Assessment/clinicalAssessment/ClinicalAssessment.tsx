import { Box } from "@material-ui/core";
import { Stack } from "@mui/material";
import { FormikProps } from "formik";
import React, { ForwardedRef } from "react";
import CommonButton from "../../../../common/Buttons/CommonButton";
import { ConfirmElement } from "../../../../common/ConfirmWrapper";
import ContentHeader from "../../../../common/ContentHeader";
import { useStyles } from "../patientAssessmentStyles";
import ClinicalAssessmentList from "./ClinicalAssessmentList";
import { InitialQuesionsFormValues } from "./updateQuestionResponse/UpdateQuestionResponse";

export interface ClinicalAssessmentProps {
  categoryListData?: any;
  handleBackClick?: () => void;
  actionButtonClick?: (v?: any) => void;
  confirmRef?: ForwardedRef<ConfirmElement>;
  handleToggleContent?: any;
  onPressBack?: () => void;
  onPressSummaryView?: any;
  therapistViewAssessmentLoading?: boolean;
  onToggleQuestionAccordion?: any;
  handleDeleteQuestion?: (v) => void;
  onSubmitAssessmentResponse?: (
    formData: InitialQuesionsFormValues,
    formikHelper: FormikProps<InitialQuesionsFormValues>,
    value
  ) => void;
}

const ClinicalAssessment: React.FC<ClinicalAssessmentProps> = ({
  categoryListData,
  onPressBack,
  onPressSummaryView,
  actionButtonClick,
  therapistViewAssessmentLoading,
  onToggleQuestionAccordion,
  onSubmitAssessmentResponse,
  confirmRef,
  handleDeleteQuestion,
}) => {
  const styles = useStyles();
  const { name } = categoryListData;

  return (
    <>
      <Stack className={styles.clinicalAssessmentWrapper}>
        <Stack className="row1">
          <Box className="col1">
            {name && <ContentHeader title={name} />}
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
              // onClick={onPressSummaryView(assessmentId)}
              onClick={onPressSummaryView}
              // href={`/patient/assessment/clinicalAssessment`}
              size="small"
            >
              Summary View
            </CommonButton>
          </Box>
        </Stack>
        <Stack className="row2">
          <ClinicalAssessmentList
            handleToggleContent={onToggleQuestionAccordion}
            categoryListData={categoryListData}
            actionButtonClick={actionButtonClick}
            therapistViewAssessmentLoading={therapistViewAssessmentLoading}
            onSubmitAssessmentResponse={onSubmitAssessmentResponse}
            confirmRef={confirmRef}
            handleDeleteQuestion={handleDeleteQuestion}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default ClinicalAssessment;
