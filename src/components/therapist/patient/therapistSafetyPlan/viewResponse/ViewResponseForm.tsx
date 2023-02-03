import { Box, Button, Stack, Typography } from "@mui/material";
import { Form } from "formik";
import React, { useRef } from "react";
import AddQuestionsBox from "../../../../common/AddQuestionsBox";
import { useStyles } from "./viewResponseStyles";
// import { InitialFormValues } from "./types";

interface ViewProps {
  formikProps: any;
  onPressCancel?: () => void;
  handleDeleteQuestion?: (v) => void;
  isEditable?: boolean;
  planDescription?: string;
}

const CommonForm: React.FC<ViewProps> = ({
  onPressCancel,
  formikProps,
  handleDeleteQuestion,
  isEditable,
  planDescription,
}) => {
  const { values, isSubmitting } = formikProps;
  const { planId } = values;
  const questionFieldscRef = useRef(null);
  const styles = useStyles();

  const inputViewBox = ({ title, description }: any) => {
    return (
      <Stack className="descriptionBoxWrapper">
        <label>{title}</label>
        <Box>
          <Typography>{description}</Typography>
        </Box>
      </Stack>
    );
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
                  title: "Plan Description",
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
        />
        {isEditable && (
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
