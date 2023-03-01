import { Box, Card, CardContent, Fab, Stack } from "@mui/material";
import { FieldArray, FormikProps } from "formik";
import React, { forwardRef, useImperativeHandle } from "react";
import FormikSelectDropdown from "../FormikFields/FormikSelectDropdown";
import FormikTextField from "../FormikFields/FormikTextField";
import { useStyles } from "./addQuestionsBoxStyles";
import DeleteSharp from "@mui/icons-material/DeleteSharp";
import { useSnackbar } from "notistack";
import AutoCompleteList from "./AutoCompleteList";

type Props = React.PropsWithChildren<{
  formikProps: FormikProps<{
    questions: {
      questionId?: string;
      question?: string;
      description?: string;
      questionType?: string;
      questionOption?: string;
    }[];
  }>;
  isEditable?: boolean;
  handleDeleteQuestion: (v) => void;
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

const AddQuestionsBox = (
  { formikProps, isEditable, handleDeleteQuestion }: Props,
  ref
) => {
  const styles = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { values, setFieldValue } = formikProps;
  useImperativeHandle(ref, () => ({
    onAddQuesionBox() {
      if (values.questions.length < 10) {
        const questions = [...values.questions];
        questions.push({ question: "", description: "", questionType: "" });
        setFieldValue("questions", questions);
      } else {
        enqueueSnackbar("Adding more than 10 questions is not allowed.", {
          variant: "info",
        });
      }
    },
  }));

  const removeBox = (i) => {
    const questions = [...values.questions];
    questions.splice(i, 1);
    setFieldValue("questions", questions);
  };
  //onDeleteQuestion={onDeleteQuestion}
  const onClickDelete = ({ i, questionId }) => {
    if (handleDeleteQuestion && questionId)
      handleDeleteQuestion({
        questionId,
        callback: () => {
          removeBox(i);
        },
      });
    else removeBox(i);
  };

  const deleteButton = ({ i, questionId }) => {
    return (
      <Fab
        key={`deleteIconButton_${i}`}
        aria-label={`deleteIconButton_${i}`}
        data-testid={`iconButtonQuestion_${i}`}
        onClick={() => onClickDelete({ i, questionId })}
      >
        <DeleteSharp />
      </Fab>
    );
  };

  const onChangeQuestionType = (e, i, questionOption) => {
    const value = e.target.value;
    if (value == "1" && questionOption)
      setFieldValue(`questions.${i}.questionOption`, "");
    setFieldValue(`questions.${i}.questionType`, value);
  };

  const questionBox = ({ i }) => {
    const { questions = [] } = values;
    const { questionType, questionOption, questionId } = questions[i] || {};
    return (
      <Card key={`questionCard_${i}`} className="questionCard">
        <CardContent>
          {isEditable && (
            <Box className="deleteButtonWrapper">
              {deleteButton({ i, questionId })}
            </Box>
          )}
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
              />
            </Box>
            <Box>
              <Box className="selectChooseAnswerTypeWrapper">
                <FormikSelectDropdown
                  onChange={(e) => onChangeQuestionType(e, i, questionOption)}
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
              {questionType == "2" && (
                <Box className="autoCompleteWrapper">
                  <AutoCompleteList i={i} formikProps={formikProps} />
                </Box>
              )}
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
