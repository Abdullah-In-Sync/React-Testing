import { Box, Stack } from "@mui/material";
import { FormikProps } from "formik";
import { ModalRefs } from "../../../admin/measures/form/types";
import { useStyles } from "../templateFormatStyles";
import * as templateTypes from "../types";
import OptionsSection from "./OptionsSection";
import QuestionsSection from "./QuestionsSections";

type propTypes = {
  formikProps: FormikProps<templateTypes.TemplateDataFormat2>;
  isView?: boolean;
  deleteQuestion?: (value) => void;
  isResponse?: boolean;
};

export default function Format1({
  formikProps,
  confirmRef,
  isView,
  isResponse,
  deleteQuestion,
}: propTypes & ModalRefs) {
  const styles = useStyles();
  const { values, setFieldValue } = formikProps;
  const { templateData } = values;

  const handleDeleteQuestion = (value) => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) =>
        deleteQuestion
          ? deleteQuestion({
              callback: () => removeQuestion(callback, value),
              ...value,
            })
          : removeQuestion(callback, value),
      description: `Are you sure you want to delete the question?`,
    });
  };

  const removeQuestion = (callback, { i }) => {
    const questionsBodyRows = [...templateData.questions.bodyRows];
    questionsBodyRows.splice(i, 1);
    setFieldValue("templateData.questions.bodyRows", questionsBodyRows);
    callback();
  };

  const handleDeleteOption = (i) => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => removeOption(callback, i),
      description: `Are you sure you want to delete the description?`,
    });
  };

  const removeOption = (callback, i) => {
    const optionsRows = [...templateData.optionsQuestions];
    optionsRows.splice(i, 1);
    setFieldValue("templateData.optionsQuestions", optionsRows);
    callback();
  };

  return (
    <Box className={styles.root}>
      <Stack className="templateFromat2Wrapper commonBorder">
        <QuestionsSection
          formikProps={formikProps}
          handleDeleteQuestion={handleDeleteQuestion}
          isView={isView}
          isResponse={isResponse}
        />
        <OptionsSection
          formikProps={formikProps}
          handleDeleteOption={handleDeleteOption}
          isView={isView}
          isResponse={isResponse}
        />
      </Stack>
    </Box>
  );
}
