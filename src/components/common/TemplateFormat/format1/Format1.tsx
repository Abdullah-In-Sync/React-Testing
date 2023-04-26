import { Stack, Box } from "@mui/material";
import { FormikProps } from "formik";
import { useStyles } from "../templateFormatStyles";
import * as templateTypes from "../types";
import ChooseScoreSection from "./ChooseScoreSection";
import DescriptionSection from "./DescriptionSection";
import IntroSection from "./IntroSection";
import QuestionsSection from "./QuestionsSection";
import WsasSection from "./WsasSection";
import { useEffect } from "react";
import { ModalRefs } from "../../../admin/measures/form/types";

type propTypes = {
  formikProps: FormikProps<templateTypes.TemplateDataFormat1>;
  isView?: boolean;
  isResponse?: boolean;
  deleteQuestion?: (v) => void;
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

  useEffect(() => {
    setFieldValue(`templateData.totalScore`, allAnsColSum());
  }, [templateData.questions])

  const allAnsColSum = () => {
    const { questions } = templateData;
    let totalScore = 0;
    questions.forEach((item) => {
      const { answer } = item
      totalScore += answer;
      
    })
    return totalScore
  }

  const removeQuestion = (callback, { i }) => {
    const questions = [...templateData.questions];
    questions.splice(i, 1);
    setFieldValue("templateData.questions", questions);
    callback();
  };

  const handleDeleteQuestion = (value) => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) =>
        deleteQuestion
          ? deleteQuestion({
              callback: () => removeQuestion(callback, value),
              ...value,
            })
          : removeQuestion(callback, value),
      description: "Are you sure you want to delete the question?",
    });
  };

  return (
    <Box className={styles.root}>
      <Stack className="templateFromat1Wrapper commonBorder">
        <IntroSection formikProps={formikProps} isView={isView} isResponse={isResponse}/>
        <ChooseScoreSection formikProps={formikProps} isView={isView} isResponse={isResponse}/>
        <QuestionsSection
          formikProps={formikProps}
          handleDeleteQuestion={handleDeleteQuestion}
          isView={isView}
          isResponse={isResponse}
        />
        <WsasSection formikProps={formikProps}/>
        <DescriptionSection formikProps={formikProps} isView={isView} isResponse={isResponse}/>
      </Stack>
    </Box>
  );
}
