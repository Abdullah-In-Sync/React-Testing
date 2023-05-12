import DeleteSharp from "@mui/icons-material/DeleteSharp";
import Edit from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";
import { Box, Card, CardContent, Fab, Stack } from "@mui/material";
import { FieldArray, FormikProps } from "formik";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { defaultQuestionTypes } from "../../../lib/constants";
import { ModalElement } from "../../common/CustomModal/CommonModal";
import ConfirmBoxModal from "../ConfirmBoxModal";
import FormikSelectDropdown from "../FormikFields/FormikSelectDropdown";
import FormikTextField from "../FormikFields/FormikTextField";
import { useStyles } from "./addQuestionsBoxStyles";
import AutoCompleteList from "./AutoCompleteList";
import QuestionResponse from "./QuestionResponse";

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
  questionTypes?: Array<any>;
  handleEditQuestion?: boolean;
  toggleEditView?: (v) => void;
  isEditView?: number;
  initialQuestionObj?: any;
}>;

const AddQuestionsBox = (
  {
    formikProps,
    isEditable,
    handleDeleteQuestion,
    questionTypes = defaultQuestionTypes,
    handleEditQuestion,
    isEditView,
    toggleEditView,
    initialQuestionObj = {
      data: { question: "", description: "", questionType: "" },
    },
  }: Props,
  ref
) => {
  const styles = useStyles();

  const { values, setFieldValue, setFieldTouched } = formikProps;
  const confirmModalRef = useRef<ModalElement>(null);
  const { data: dataObj = {}, question: questionStyle = {} } =
    initialQuestionObj;
  useImperativeHandle(ref, () => ({
    onAddQuesionBox() {
      if (values.questions.length < 15) {
        const questions = [...values.questions];
        questions.push(dataObj);
        setFieldValue("questions", questions);
      } else {
        confirmModalRef.current?.open();
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

  const editButton = ({ i }) => {
    return (
      <Fab
        key={`editIconButton_${i}`}
        aria-label={`editIconButton_${i}`}
        data-testid={`iconEditButtonQuestion_${i}`}
        onClick={() => toggleEditView(i)}
      >
        {isEditView !== i ? <Edit /> : <Visibility />}
      </Fab>
    );
  };

  const onChangeQuestionType = (e, i) => {
    const value = e.target.value;
    setFieldTouched(`questions.${i}.questionOption`, false);
    setFieldValue(`questions.${i}.questionOption`, "");
    setFieldValue(`questions.${i}.questionType`, value);
  };

  const isVisibleDescription = (isEdit, description) => {
    if (isEdit && !description) return false;
    else return true;
  };

  const questionBox = ({ i, item }) => {
    const { questions = [] } = values;
    const { questionType, questionId } = questions[i] || {};
    const isEdit = handleEditQuestion
      ? isEditView !== i + 1 && questionId
      : false;
    return (
      questionType !== "emoji" && (
        <Card key={`questionCard_${i}`} className={`questionCard`}>
          <CardContent>
            {isEditable && (
              <Box className="deleteButtonWrapper">
                {handleEditQuestion && questionId && editButton({ i: i + 1 })}
                {deleteButton({ i, questionId })}
              </Box>
            )}
            <Box
              key={i}
              className={`questionBoxWrapper ${isEdit ? "disbledFields" : ""}`}
            >
              <Box>
                <FormikTextField
                  name={`questions.${i}.question`}
                  id={`questions.${i}.question`}
                  fullWidth={true}
                  inputProps={{ "data-testid": `questions.${i}.question` }}
                  variant="outlined"
                  size="small"
                  {...(isEdit ? {} : { label: "Type question here" })}
                  {...questionStyle}
                />
              </Box>
              {dataObj.description !== undefined && (
                <Box>
                  {isVisibleDescription(isEdit, questions[i].description) && (
                    <FormikTextField
                      name={`questions.${i}.description`}
                      id={`questions.${i}.description`}
                      label={`${
                        isEdit
                          ? "Description"
                          : "Type your question description here"
                      }`}
                      fullWidth={true}
                      inputProps={{
                        "data-testid": `questions.${i}.description`,
                      }}
                      variant="outlined"
                      multiline
                      {...(isEdit ? {} : { rows: 5 })}
                    />
                  )}
                </Box>
              )}
              <Box>
                {handleEditQuestion && questionId && (
                  <QuestionResponse
                    i={i}
                    formikProps={formikProps}
                    item={item}
                    isEditView={isEditView}
                  />
                )}
                {!isEdit && (
                  <Box className="selectChooseAnswerTypeWrapper">
                    <FormikSelectDropdown
                      onChange={(e) => onChangeQuestionType(e, i)}
                      id={`questions.${i}.questionType`}
                      labelId={`questions.${i}.questionType`}
                      name={`questions.${i}.questionType`}
                      showDefaultSelectOption={false}
                      label="Choose answer type*"
                      options={questionTypes}
                      mappingKeys={["id", "value"]}
                      size="small"
                      extraProps={{
                        "data-testid": `questions.${i}.questionType`,
                      }}
                    />
                  </Box>
                )}

                {!isEdit && (questionType == "list" || questionType == "2") && (
                  <Box className="autoCompleteWrapper">
                    <AutoCompleteList i={i} formikProps={formikProps} />
                  </Box>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      )
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
        <ConfirmBoxModal
          infoMessage="You cannot add more than 15 questions. Please delete a question to add a new question"
          confirmModalRef={confirmModalRef}
        />
      </Stack>
    );
  };
  return questionsFields();
};

export default forwardRef(AddQuestionsBox);
