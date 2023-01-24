import { Box, Card, CardContent, Fab, Stack } from "@mui/material";
import { FieldArray, FormikProps } from "formik";
import React, { forwardRef, useImperativeHandle } from "react";
import FormikSelectDropdown from "../FormikFields/FormikSelectDropdown";
import FormikTextField from "../FormikFields/FormikTextField";
import { useStyles } from "./addQuestionsBoxStyles";
import DeleteSharp from "@mui/icons-material/DeleteSharp";

type Props = React.PropsWithChildren<{
  formikProps: FormikProps<{
    questions: object[];
  }>;
}>;

const questionTypes = [
  {
    id: "1",
    value: "Text",
  },
  {
    id: "2",
    value: "List",
  },
];

export const AddQuestionsBox = ({ formikProps }: Props, ref) => {
  const styles = useStyles();
  const { values, setFieldValue } = formikProps;
  useImperativeHandle(ref, () => ({
    onAddQuesionBox() {
      // update dynamic form
      const questions = [...values.questions];
      questions.push({ question: "", description: " ", questionType: "" });
      setFieldValue("questions", questions);
    },
  }));

  const onClickDelete = ({ i }) => {
    const questions = [...values.questions];
    questions.splice(i, 1);
    setFieldValue("questions", questions);
  };

  const deleteButton = ({ i }) => {
    return (
      <Fab
        key={`deleteIconButton_${i}`}
        aria-label={`deleteIconButton_${i}}`}
        data-testid={`iconButton_${i}`}
        onClick={() => onClickDelete({ i })}
      >
        <DeleteSharp />
      </Fab>
    );
  };

  const questionBox = ({ i }) => {
    return (
      <Card key={`questionCard_${i}`} className="questionCard">
        <CardContent>
          <Box className="deleteButtonWrapper">{deleteButton({ i })}</Box>

          <Box key={i} className="questionBoxWrapper">
            <Box>
              <FormikTextField
                name={`questions.${i}.question`}
                id={`questions.${i}.question`}
                label="Type question here"
                fullWidth={true}
                inputProps={{ "data-testid": `questions.${i}.question` }}
                variant="outlined"
                size="small"
              />
            </Box>
            <Box>
              <FormikTextField
                name={`questions.${i}.description`}
                id={`questions.${i}.description`}
                label="Type your question description here"
                fullWidth={true}
                inputProps={{ "data-testid": `questions.${i}.description` }}
                variant="outlined"
                multiline
                rows={5}
                autoComplete="off"
              />
            </Box>

            <Box className="selectChooseAnswerTypeWrapper">
              <FormikSelectDropdown
                id={`questions.${i}.questionType`}
                labelId={`questions.${i}.questionType`}
                name={`questions.${i}.questionType`}
                showDefaultSelectOption={false}
                label="Choose answer type"
                options={questionTypes}
                mappingKeys={["id", "value"]}
                size="small"
                extraProps={{ "data-testid": `questions.${i}.questionType` }}
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
              return questionBox({ i });
            })
          }
        </FieldArray>
      </Stack>
    );
  };
  return questionsFields();
};

export default forwardRef(AddQuestionsBox);
