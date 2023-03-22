/* istanbul ignore file */
import { Box, Card, CardContent, Fab, Stack } from "@mui/material";
import { FieldArray, FormikProps } from "formik";
import React, { forwardRef, useImperativeHandle } from "react";
import FormikSelectDropdown from "../../../../common/FormikFields/FormikSelectDropdown";
import FormikTextField from "../../../../common/FormikFields/FormikTextField";
import { useStyles } from "./addQuestionsBoxStyles";
import DeleteSharp from "@mui/icons-material/DeleteSharp";
import { useSnackbar } from "notistack";
import AutoCompleteList from "./AutoCompleteList";
import { FeedbackQuestion } from "../types";
import { questionTypes } from "../../../../../lib/constants";

type Props = React.PropsWithChildren<{
  formikProps: FormikProps<{
    questions: FeedbackQuestion[];
  }>;
  handleDeleteQuestion: (v) => void;
}>;

const AddQuestionsBox = ({ formikProps, handleDeleteQuestion }: Props, ref) => {
  const styles = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { values, setFieldValue } = formikProps;
  useImperativeHandle(ref, () => ({
    onAddQuesionBox() {
      if (values.questions.length <= 25) {
        const questions = [...values.questions];
        questions.push({ question: "", answer_type: "" });
        setFieldValue("questions", questions);
      } else {
        enqueueSnackbar("You can not add more Questions.", {
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

  const deleteButton = ({ i, questionId = undefined }) => {
    return (
      <Fab
        key={`deleteIconButton_${i}`}
        aria-label={`deleteIconButton_${i}`}
        data-testid={`iconButton_${i}`}
        onClick={() => onClickDelete({ i, questionId })}
      >
        <DeleteSharp />
      </Fab>
    );
  };

  const onChangeAnswerType = (e, i, questionOption) => {
    const value = e.target.value;
    if (value == "1" && questionOption)
      setFieldValue(`questions.${i}.questionOption`, "");
    setFieldValue(`questions.${i}.answer_type`, value);
  };

  const questionBox = ({ i }) => {
    const { questions = [] } = values;
    const { _id = undefined, answer_type } = questions[i] || {};
    return (
      <Card key={`questionCard_${i}`} className="questionCard">
        <CardContent>
          <Box className="deleteButtonWrapper">
            {deleteButton({ i, questionId: _id })}
          </Box>
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
              <Box className="selectChooseAnswerTypeWrapper">
                <FormikSelectDropdown
                  onChange={(e) => onChangeAnswerType(e, i, answer_type)}
                  id={`questions.${i}.answer_type`}
                  labelId={`questions.${i}.answer_type`}
                  name={`questions.${i}.answer_type`}
                  showDefaultSelectOption={false}
                  label="Choose answer type"
                  options={questionTypes}
                  mappingKeys={["id", "value"]}
                  size="small"
                  extraProps={{ "data-testid": `questions.${i}.answer_type` }}
                />
              </Box>
              {answer_type == "list" && (
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
