import { Stack } from "@mui/material";
import { FormikProps } from "formik";
import { useRef } from "react";

import ConfirmWrapper, { ConfirmElement } from "../ConfirmWrapper";
import { useStyles } from "../templateFormatStyles";
import * as templateTypes from "../types";
import OptionsSection from "./OptionsSection";
import QuestionsSection from "./QuestionsSections";

type propTypes = {
  formikProps: FormikProps<templateTypes.TemplateDataFormat2>;
};

export default function Format1({ formikProps }: propTypes) {
  const styles = useStyles();
  const { values, setFieldValue } = formikProps;
  const { templateData } = values;

  const confirmRef = useRef<ConfirmElement>(null);

  const handleDeleteQuestion = (i) => {
    confirmRef.current.openConfrim({
      confirmFunction: (callback) => removeQuestion(callback, i),
      description: `Are you sure you want to delete the Measure?`,
    });
  };

  const removeQuestion = (callback, i) => {
    const questionsBodyRows = [...templateData.questions.bodyRows];
    questionsBodyRows.splice(i, 1);
    setFieldValue("templateData.questions.bodyRows", questionsBodyRows);
    callback();
  };

  const handleDeleteOption = (i) => {
    confirmRef.current.openConfrim({
      confirmFunction: (callback) => removeOption(callback, i),
      description: `Are you sure you want to delete the Measure?`,
    });
  };

  const removeOption = (callback, i) => {
    const optionsRows = [...templateData.optionsQuestions];
    optionsRows.splice(i, 1);
    setFieldValue("templateData.optionsQuestions", optionsRows);
    callback();
  };

  return (
    <ConfirmWrapper ref={confirmRef}>
      <Stack className={styles.templateFromat2Wrapper}>
        <QuestionsSection
          formikProps={formikProps}
          handleDeleteQuestion={handleDeleteQuestion}
        />
        <OptionsSection
          formikProps={formikProps}
          handleDeleteOption={handleDeleteOption}
        />
      </Stack>
    </ConfirmWrapper>
  );
}
