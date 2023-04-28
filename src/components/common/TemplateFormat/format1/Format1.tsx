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
  const { values, setFieldValue, resetForm } = formikProps;
  const { templateData } = values;

  useEffect(() => {
    const setScore = () => {
      setFieldValue(`templateData.totalScore`, allAnsColSum());
    };
    if (isResponse) setScore();
  }, [templateData.questions, isResponse]);

  const allAnsColSum = () => {
    const { questions } = templateData;
    let totalScore = 0;
    questions.forEach((item) => {
      const { answer } = item;
      totalScore += answer;
    });
    return totalScore;
  };

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

  const handleDeleteIntro = () => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => {
        delete templateData.intro;
        resetForm({
          values,
        });
        callback();
      },
      description: `Are you sure you want to delete the description?`,
    });
  };

  const handleDelteDescripton = () => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => {
        delete templateData.description;
        resetForm({
          values,
        });
        callback();
      },
      description: `Are you sure you want to delete the description?`,
    });
  };

  return (
    <Box className={styles.root}>
      <Stack className="templateFromat1Wrapper commonBorder">
        <IntroSection
          formikProps={formikProps}
          isView={isView}
          isResponse={isResponse}
          handleDelete={handleDeleteIntro}
        />
        <ChooseScoreSection
          formikProps={formikProps}
          isView={isView}
          isResponse={isResponse}
        />
        <QuestionsSection
          formikProps={formikProps}
          handleDeleteQuestion={handleDeleteQuestion}
          isView={isView}
          isResponse={isResponse}
        />
        <WsasSection formikProps={formikProps} />
        <DescriptionSection
          formikProps={formikProps}
          isView={isView}
          isResponse={isResponse}
          handleDelete={handleDelteDescripton}
        />
      </Stack>
    </Box>
  );
}
