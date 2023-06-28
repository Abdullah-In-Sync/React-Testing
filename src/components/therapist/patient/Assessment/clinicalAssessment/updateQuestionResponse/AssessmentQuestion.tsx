import DeleteSharp from "@mui/icons-material/DeleteSharp";
import { Box, Card, CardContent, IconButton, Stack } from "@mui/material";
import { FieldArray, FormikProps } from "formik";
import React from "react";

import { Typography } from "@material-ui/core";
import FormikTextField from "../../../../../common/FormikFields/FormikTextField";
import { useStyles } from "../../patientAssessmentStyles";

type Props = React.PropsWithChildren<{
  formikProps: FormikProps<{
    questions: {
      question_id?: string;
      question?: string;
    }[];
  }>;
  handleDeleteQuestion?: (v) => void;
  categoryId?: string;
}>;

const AddCategoryQuestion = ({ formikProps, handleDeleteQuestion, categoryId }: Props) => {
  const styles = useStyles();

  const { values, setFieldValue } = formikProps;

  const removeBox = (i) => {
    const questions = [...values.questions];
    questions.splice(i, 1);
    setFieldValue("questions", questions);
  };

  const onClickDelete = ({ i, questionId }) => {
    if (handleDeleteQuestion && questionId)
      handleDeleteQuestion({
        questionId,
        categoryId,
        callback: () => {
          removeBox(i);
        },
        formFields: values,
        i,
      });
    else removeBox(i);
  };

  const deleteButton = ({ i, questionId }) => {
    return (
      <IconButton
        size="small"
        key={`deleteIconButton_${i}`}
        aria-label={`deleteIconButton_${i}`}
        data-testid={`iconButtonQuestion_${i}`}
        onClick={() => onClickDelete({ i, questionId })}
      >
        <DeleteSharp />
      </IconButton>
    );
  };

  const questionBox = ({ i, item: { question } }: any) => {
    console.log("vlaues", values)
    const { questions = [] } = values;
    const { question_id: questionId } = questions[i] || {};
    return (
      <Card key={`questionCard_${i}`} className={`questionCard`}>
        <CardContent>
          <Box className="deleteButtonWrapper">{deleteButton({ i, questionId })}</Box>
          <Box key={i} className={`questionBoxWrapper`}>
            <Box className="quesBox">
              <Typography>{question}</Typography>
            </Box>
            <Box>
              <FormikTextField
                name={`questions.${i}.answer`}
                id={`questions.${i}.answer`}
                fullWidth={true}
                inputProps={{
                  "data-testid": `questions.${i}.answer`,
                }}
                placeholder="Patient response"
                variant="outlined"
                multiline
                rows="2"
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  const questionsFields = () => {
    return (
      <Stack className={styles.questionsFieldsWrapper}>
        <FieldArray name="questions">
          {() =>
            values.questions.map((item, i) => {
              return questionBox({ i, item });
            })
          }
        </FieldArray>
      </Stack>
    );
  };
  return questionsFields();
};

export default AddCategoryQuestion;
