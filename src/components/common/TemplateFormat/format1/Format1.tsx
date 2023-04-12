import { Stack } from "@mui/material";
import { FormikProps } from "formik";
import { useRef } from "react";
import ConfirmWrapper, { ConfirmElement } from "../ConfirmWrapper";
import { useStyles } from "../templateFormatStyles";
import * as templateTypes from "../types";
import ChooseScoreSection from "./ChooseScoreSection";
import DescriptionSection from "./DescriptionSection";
import IntroSection from "./IntroSection";
import QuestionsSection from "./QuestionsSection";
import WsasSection from "./WsasSection";

type propTypes = {
  formikProps: FormikProps<templateTypes.TemplateDataFormat1>;
  confirmRef?: any
};

export default function Format1({ formikProps, confirmRef }: propTypes) {
  const styles = useStyles();
  const { values, setFieldValue } = formikProps;
  // const confirmRef = useRef<ConfirmElement>(null);
  const { templateData } = values;

  const removeQuestion = (callback, i) => {
    const questions = [...templateData.questions];
    questions.splice(i, 1);
    setFieldValue("templateData.questions", questions);
    callback();
  };

  const handleDeleteQuestion = (i) => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => removeQuestion(callback, i),
      description: "Are you sure you want to delete the question?",
    });
  };

  return (
      <Stack className={styles.templateFromat1Wrapper}>
        <IntroSection formikProps={formikProps} />
        <ChooseScoreSection formikProps={formikProps} />
        <QuestionsSection
          formikProps={formikProps}
          handleDeleteQuestion={handleDeleteQuestion}
        />
        <WsasSection />
        <DescriptionSection formikProps={formikProps} />
      </Stack>
  );
}
