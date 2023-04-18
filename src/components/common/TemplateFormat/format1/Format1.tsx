import { Stack, Box } from "@mui/material";
import { FormikProps } from "formik";
import { useStyles } from "../templateFormatStyles";
import * as templateTypes from "../types";
import ChooseScoreSection from "./ChooseScoreSection";
import DescriptionSection from "./DescriptionSection";
import IntroSection from "./IntroSection";
import QuestionsSection from "./QuestionsSection";
import WsasSection from "./WsasSection";

type propTypes = {
  formikProps: FormikProps<templateTypes.TemplateDataFormat1>;
  confirmRef?: any;
  isView?: boolean;
  deleteQuestion?: (v) => void;
};

export default function Format1({
  formikProps,
  confirmRef,
  isView,
  deleteQuestion,
}: propTypes) {
  const styles = useStyles();
  const { values, setFieldValue } = formikProps;
  const { templateData } = values;

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
        <IntroSection formikProps={formikProps} isView={isView} />
        <ChooseScoreSection formikProps={formikProps} isView={isView} />
        <QuestionsSection
          formikProps={formikProps}
          handleDeleteQuestion={handleDeleteQuestion}
          isView={isView}
        />
        <WsasSection />
        <DescriptionSection formikProps={formikProps} isView={isView} />
      </Stack>
    </Box>
  );
}
