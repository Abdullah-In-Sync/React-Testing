import ArrowBackAlt from "@mui/icons-material/ArrowBack";
import { Box, Stack } from "@mui/material";
import React from "react";
import CommonButton from "../../../common/Buttons/CommonButton";
import { useStyles } from "./createMonitorStyles";
import { monitorQuestionTypeLabel } from "../../../../lib/constants";
import { csvDecode } from "../../../../utility/helper";
import EmojiListBox from "./EmojiListBox";

type ViewProps = any;

const ViewForm: React.FC<ViewProps> = ({ values, handleBackClick }) => {
  const { name, organizationName, questions } = values;
  // const {   isSubmitting, setFieldValue } = formikProps;
  const styles = useStyles();

  const listOptionNameList = (questionOptions) => {
    return questionOptions.map((value) => {
      return (
        <Box>
          <span>{value}</span>
        </Box>
      );
    });
  };

  const questionsList = () => {
    return questions.map(({ question, questionType, questionOption }) => {
      return (
        questionType !== "emoji" && (
          <Box className="questionWrapper">
            <Box>{question}</Box>
            <Box>{monitorQuestionTypeLabel[questionType]}</Box>
            {questionType === "list" && (
              <Box className="listWrapper">
                {listOptionNameList(csvDecode(questionOption))}
              </Box>
            )}
          </Box>
        )
      );
    });
  };

  return (
    <>
      <Stack className={styles.formViewWrapper}>
        <Box className="fieldsBoxWrapperFirst">
          <Box>
            <label>Monitor Name*</label>
            <Box>{name}</Box>
          </Box>
          <Box>
            <label>Organisation*</label>
            <Box>{organizationName}</Box>
          </Box>
        </Box>
        <Box className="fieldsBoxWrapperSecond">
          <Box>
            <label>Monitor question*</label>
            <Box>{questions[0]["question"]}</Box>
          </Box>
          <EmojiListBox question={questions[0]} />
        </Box>
        <Box className="questionListWrapper">
          <label>Add Question</label>
          {questionsList()}
        </Box>
        <Box className="backButtonWrapper">
          <CommonButton
            data-testid="backButton"
            variant="contained"
            onClick={handleBackClick}
            size="small"
            startIcon={<ArrowBackAlt />}
          >
            Back
          </CommonButton>
        </Box>
      </Stack>
    </>
  );
};

export default ViewForm;
