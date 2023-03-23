import { Box, Button, Stack, Typography } from "@mui/material";
import { Form } from "formik";
import React, { useRef, useState } from "react";
import AddQuestionsBox from "../../../../common/AddQuestionsBox";
import { useStyles } from "./viewResponseStyles";
// import { InitialFormValues } from "./types";

interface ViewProps {
  formikProps: any;
  onPressCancel?: () => void;
  handleDeleteQuestion?: (v) => void;
  isEditable?: boolean;
  planDescription?: string;
  questions?: object[];
}

const CommonForm: React.FC<ViewProps> = ({
  onPressCancel,
  formikProps,
  handleDeleteQuestion,
  isEditable,
  planDescription,
}) => {
  const [isEditView, setIsEditView] = useState();
  const { values, isSubmitting } = formikProps;
  const { planId } = values;
  const questionFieldscRef = useRef(null);
  const styles = useStyles();

  const inputViewBox = ({ label, description }: any) => {
    return (
      <Box className="inputDes">
        <label>
          <Typography>{label}</Typography>
        </label>
        <Box className="desBox">
          <Typography>{description}</Typography>
        </Box>
      </Box>
    );
  };

  const toggleEditView = (i) => {
    if (isEditView != i) setIsEditView(i);
    else setIsEditView(undefined);
  };

  const handleAddQuestion = () => {
    questionFieldscRef.current.onAddQuesionBox();
  };

  return (
    <Stack className={styles.formWrapper}>
      <Form className={!isEditable ? "disbledFields" : ""}>
        <Box className="fieldsBoxWrapperFirst">
          {isEditable && (
            <Box className="fieldBox second">
              <Button
                onClick={handleAddQuestion}
                data-testid={`addNewQuestion_${planId}`}
                variant="outlined"
              >
                Add Question
              </Button>
            </Box>
          )}
          {planDescription && (
            <Stack className={styles.resouceDetailBoxWrapper}>
              <Stack className="inputsWrapper">
                {inputViewBox({
                  label: "Plan Description",
                  description: planDescription,
                })}
              </Stack>
            </Stack>
          )}
        </Box>
        <AddQuestionsBox
          isEditable={isEditable}
          formikProps={formikProps}
          handleDeleteQuestion={handleDeleteQuestion}
          ref={questionFieldscRef}
          handleEditQuestion
          isEditView={isEditView}
          toggleEditView={toggleEditView}
        />
        {isEditable && values.questions.length > 0 && (
          <Box className="bottomActionButtonsWrapper">
            <Box>
              <Button
                type="submit"
                data-testid={`submitForm_${planId}`}
                variant="contained"
                disabled={isSubmitting}
              >
                Save
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                className="cancelButton"
                data-testid={`cancelForm_${planId}`}
                onClick={onPressCancel}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </Form>
    </Stack>
  );
};

export default CommonForm;
