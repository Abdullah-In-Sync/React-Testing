import { Box, Stack } from "@mui/material";
import { Form } from "formik";
import * as React from "react";
import { useRef } from "react";
import CommonButton from "../../../common/Buttons/CommonButton";
import AddCategoryQuestion from "./AddCategoryQuestion";
import { useStyles } from "./addUpdateCategoryQuestionStyles";

const AddUpdateCategoryQuestionForm: React.FC<any> = (formikProps) => {
  const { isSubmitting, onCancel } = formikProps;
  const questionFieldscRef = useRef(null);
  const styles = useStyles();

  return (
    <Stack className={styles.categoryQuestionsWrapper}>
      <Form>
        <Box className="row1 crow">
          <CommonButton
            onClick={() => questionFieldscRef.current.onAddQuesionBox()}
            data-testid="addAssessmentSubmit"
            variant="outlined"
          >
            Add Question
          </CommonButton>
        </Box>
        <Box className="row2 crow">
          <AddCategoryQuestion
            formikProps={formikProps}
            ref={questionFieldscRef}
          />
        </Box>

        <Box className="row3 crow">
          <CommonButton
            disabled={isSubmitting}
            type="submit"
            data-testid="submitAddQuestion"
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
      </Form>
    </Stack>
  );
};

export default AddUpdateCategoryQuestionForm;
