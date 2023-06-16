import DeleteSharp from "@mui/icons-material/DeleteSharp";
import { Box, Card, CardContent, IconButton, Stack } from "@mui/material";
import { FieldArray, FormikProps } from "formik";
import React, { forwardRef, useImperativeHandle, useRef } from "react";

import ConfirmBoxModal from "../../../common/ConfirmBoxModal";
import { ModalElement } from "../../../common/CustomModal/CommonModal";
import FormikTextField from "../../../common/FormikFields/FormikTextField";
import { useStyles } from "./addUpdateCategoryQuestionStyles";

type Props = React.PropsWithChildren<{
  formikProps: FormikProps<{
    questions: {
      question_id?: string;
      question?: string;
    }[];
  }>;
  handleDeleteQuestion?: (v) => void;
  initialQuestionObj?: any;
}>;

const AddCategoryQuestion = (
  {
    formikProps,
    handleDeleteQuestion,
    initialQuestionObj = {
      data: { question: "" },
    },
  }: Props,
  ref
) => {
  const styles = useStyles();

  const { values, setFieldValue } = formikProps;
  const confirmModalRef = useRef<ModalElement>(null);
  const { data: dataObj = {} } = initialQuestionObj;
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

  const onClickDelete = ({ i, questionId }) => {
    if (handleDeleteQuestion && questionId)
      handleDeleteQuestion({
        questionId,
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

  const questionBox = ({ i }: any) => {
    const { questions = [] } = values;
    const { question_id: questionId } = questions[i] || {};

    return (
      <Card key={`questionCard_${i}`} className={`questionCard`}>
        <CardContent>
          <Box className="deleteButtonWrapper">
            {deleteButton({ i, questionId })}
          </Box>
          <Box key={i} className={`questionBoxWrapper`}>
            <Box>
              <FormikTextField
                name={`questions.${i}.question`}
                id={`questions.${i}.question`}
                label={`Write question here`}
                fullWidth={true}
                inputProps={{
                  "data-testid": `questions.${i}.question`,
                }}
                variant="outlined"
                multiline
                rows="3"
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
        <ConfirmBoxModal
          infoMessage="You cannot add more than 15 questions. Please delete a question to add a new question"
          confirmModalRef={confirmModalRef}
        />
      </Stack>
    );
  };
  return questionsFields();
};

export default forwardRef(AddCategoryQuestion);
