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
  questions,
}) => {
  const [isPatientResponse, setIsPatientResponse] = useState(false);
  const { values, isSubmitting } = formikProps;
  const { planId } = values;
  const questionFieldscRef = useRef(null);
  const styles = useStyles();

  const inputViewBox = ({ title, subTitle, description }: any) => {
    return (
      <Stack className="descriptionBoxWrapper">
        <label>{title}</label>
        {subTitle && <Typography pl={1.7} pb={0.7}>{`${subTitle}`}</Typography>}
        <Box>
          <Typography>{description}</Typography>
        </Box>
      </Stack>
    );
  };

  const paitentResponse = () => {
    if (!questions) return null;

    return questions.map(
      (
        item: {
          patient_answer?: string;
          safety_additional_details?: string;
          safety_ques?: string;
        },
        i
      ) => {
        const { patient_answer, safety_additional_details, safety_ques } = item;
        if (!isPatientResponse && patient_answer) setIsPatientResponse(true);

        return (
          patient_answer && (
            <Stack className={styles.resouceDetailBoxWrapper}>
              <Stack className="inputsWrapper">
                {inputViewBox({
                  title: `${i + 1}. ${safety_ques}`,
                  subTitle: safety_additional_details,
                  description: patient_answer,
                })}
              </Stack>
            </Stack>
          )
        );
      }
    );
  };

  const handleAddQuestion = () => {
    questionFieldscRef.current.onAddQuesionBox();
  };

  return (
    <Stack className={styles.formWrapper}>
      <Form className={!isEditable ? "disbledFields" : ""}>
        <Box className="fieldsBoxWrapperFirst">
          {isEditable && !isPatientResponse && (
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
          {paitentResponse()}
        </Box>
        <AddQuestionsBox
          isEditable={isEditable && !isPatientResponse}
          formikProps={formikProps}
          handleDeleteQuestion={handleDeleteQuestion}
          ref={questionFieldscRef}
        />
        {isEditable && !isPatientResponse && (
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
