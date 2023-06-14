import { Box } from "@material-ui/core";
import { Stack } from "@mui/material";
import { FormikProps } from "formik";
import React, { ForwardedRef } from "react";
import {
  AdminAssessmentViewQsEntity,
  AdminViewAssessment,
} from "../../../../graphql/assessment/types";
import CommonButton from "../../../common/Buttons/CommonButton";
import ConfirmWrapper, { ConfirmElement } from "../../../common/ConfirmWrapper";
import ContentHeader from "../../../common/ContentHeader";
import InfoModal, {
  ConfirmInfoElement,
} from "../../../common/CustomModal/InfoModal";
import AddCategory from "../addCategory/AddCategory";
import { InitialQuesionsFormValues } from "../addUpdateCategoryQuestion/AddUpdateCategoryQuestion";
import ViewAssessmentList from "./ViewAssessmentList";
import { useStyles } from "./viewAssessmentStyles";

const ViewAssessment: React.FC<ViewAssessmentProps> = ({
  data = {},
  infoModalRef,
  onPressAddCategory,
  confirmRef,
  assessmentLoading,
  actionButtonClick,
  onAssessmentCategoryQuestionSubmit,
  handleToggleContent,
  assessmentQuestionsViewData,
}) => {
  const styles = useStyles();
  return (
    <ConfirmWrapper ref={confirmRef}>
      <Stack className={styles.viewWrapper}>
        <Stack className="row1">
          <Box className="col1">
            <ContentHeader title="Clinical Assessment" />
          </Box>
          <Box className="col2">
            <CommonButton
              data-testid="addCategory"
              variant="contained"
              onClick={onPressAddCategory}
              size="small"
            >
              Add Category
            </CommonButton>
          </Box>
        </Stack>
        <Stack className="row2">
          <ViewAssessmentList
            data={data}
            assessmentLoading={assessmentLoading}
            actionButtonClick={actionButtonClick}
            onAssessmentCategoryQuestionSubmit={
              onAssessmentCategoryQuestionSubmit
            }
            handleToggleContent={handleToggleContent}
            assessmentQuestionsViewData={assessmentQuestionsViewData}
            confirmRef={confirmRef}
          />
        </Stack>
      </Stack>

      <InfoModal
        ref={infoModalRef}
        maxWidth="sm"
        className={styles.addMonitorModalWrapper}
        headerTitleText="Add Category"
      >
        <AddCategory />
      </InfoModal>
    </ConfirmWrapper>
  );
};

export default ViewAssessment;

export interface ViewAssessmentProps {
  data?: AdminViewAssessment | { [key: string]: unknown };
  handleBackClick?: () => void;
  actionButtonClick?: (v) => void;
  infoModalRef?: ForwardedRef<ConfirmInfoElement>;
  onPressAddCategory?: () => void;
  confirmRef?: ForwardedRef<ConfirmElement>;
  assessmentLoading?: boolean;
  handleToggleContent?: any;
  assessmentQuestionsViewData?: AdminAssessmentViewQsEntity[];
  onAssessmentCategoryQuestionSubmit?: (
    formData: InitialQuesionsFormValues,
    formikHelper: FormikProps<InitialQuesionsFormValues>,
    value
  ) => void | any;
}
