import { Box, Stack } from "@mui/material";
import { Form } from "formik";
import * as React from "react";
import CommonButton from "../../../../../common/Buttons/CommonButton";
import { useStyles } from "../../patientAssessmentStyles";
import AddCategoryQuestion from "./AssessmentQuestion";
const UpdateQuestionResponseForm: React.FC<any> = (formikProps) => {
  const {
    isSubmitting,
    onCancel,
    values,
    handleDeleteQuestion,
    categoryId,
    isAssessmentEdit,
  } = formikProps;
  const styles = useStyles();
  const { questions } = values;
  return (
    <Stack className={styles.categoryQuestionsWrapper}>
      <Form>
        <Box className="row2 crow">
          <AddCategoryQuestion
            formikProps={formikProps}
            handleDeleteQuestion={handleDeleteQuestion}
            categoryId={categoryId}
            isEdit={!isAssessmentEdit}
          />
        </Box>

        {
          /* istanbul ignore next */
          isAssessmentEdit && questions.length > 0 && (
            <Box className="row3 crow">
              <CommonButton
                disabled={isSubmitting}
                type="submit"
                data-testid={`submitQuestion_${categoryId}`}
                variant="contained"
              >
                Save
              </CommonButton>
              <CommonButton
                disabled={isSubmitting}
                data-testid="cancelAddQuestion"
                variant="contained"
                color="secondary"
                onClick={onCancel}
              >
                Cancel
              </CommonButton>
            </Box>
          )
        }
      </Form>
    </Stack>
  );
};

export default UpdateQuestionResponseForm;
