import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import BreadCrumbsWithBackButton from "../../../common/BreadCrumbsWithBackButton";
import { useStyles } from "./responseFeedbackStyles";
import * as feedbackInterface from "./types";

interface ViewProps {
  data?: feedbackInterface.AdminViewResponseDetailById;
  handleGoBack?: () => void;
  loadingView?: any;
}

const AdminFeedbackResponseComponent: React.FC<ViewProps> = ({
  data,
  handleGoBack,
  loadingView,
}) => {
  const styles = useStyles();
  const {
    organization_name,
    user_type,
    session_no,
    name,
    description,
    questions = [],
    patient_name,
    therapist_name,
    therapy_name,
  } = data || {};

  const headerSection = () => {
    return (
      <Box className="headerSection hcsection">
        <Box>
          <label>
            <Typography>Patient Name:</Typography>
          </label>
          <Typography>{patient_name}</Typography>
        </Box>
        <Box>
          <label>
            <Typography>Session Name:</Typography>
          </label>
          <Typography>{session_no}</Typography>
        </Box>
        <Box>
          <label>
            <Typography>Organization Name:</Typography>
          </label>
          <Typography>{organization_name}</Typography>
        </Box>
        <Box>
          <label>
            <Typography>User Type:</Typography>
          </label>
          <Typography>{user_type}</Typography>
        </Box>
        <Box>
          <label>
            <Typography>Therapist Name:</Typography>
          </label>
          <Typography>{therapist_name}</Typography>
        </Box>
        <Box>
          <label>
            <Typography>Therapy Name:</Typography>
          </label>
          <Typography>{therapy_name}</Typography>
        </Box>
      </Box>
    );
  };

  const instructionSection = () => {
    return (
      <Box className="instructionSection csection">
        <Box>
          <label>
            <Typography>Instruction</Typography>
          </label>
        </Box>
        <Box className="instructionDescriptionBox">
          <Typography>{description}</Typography>
        </Box>
      </Box>
    );
  };

  const answers = (item) => {
    const { answer_options, answer_type, answer } = item;

    switch (answer_type) {
      case "2":
        return booleanAnswerType({
          options: answer_options.replace(/[\]']+/g, "").split(/,+|"[^"]+"/g),
          answer,
        });
      case "list":
        return booleanAnswerType({
          options: answer_options.replace(/[\]']+/g, "").split(/,+|"[^"]+"/g),
          answer,
        });
      case "1":
        return textAnswerType({ answer });
      case "text":
        return textAnswerType({ answer });
      default:
        return null;
    }
  };

  const textAnswerType = ({ answer: { answer } }) => {
    return (
      <Box className="textAnswerWrapper">
        {answer ? (
          <Typography>{answer}</Typography>
        ) : (
          <Typography className="muteText">
            Patient to add response here...
          </Typography>
        )}
      </Box>
    );
  };

  const questionsSection = () => {
    return questions.map((item, i) => {
      const { question } = item;

      return (
        <Box key={`questionBox_${i}`} className="questionsSection csection">
          <Box className="questionBox">
            <label>
              <Typography>{`${i + 1}. ${question}`}</Typography>
            </label>
          </Box>
          <Box className="answerBox">{answers(item)}</Box>
        </Box>
      );
    });
  };

  const ListAnswerType = (props?: any) => {
    const {
      options: answerValues = [],
      answer: { answer },
      row,
    } = props || {};
    return (
      <RadioGroup {...row} className="radio-buttons" defaultValue={answer}>
        {(answerValues as Array<any>).map((option: string, index: number) => (
          <FormControlLabel
            key={`answerType_${index}`}
            data-testid={`answer_${index}`}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    );
  };

  const booleanAnswerType = (props) => {
    return (
      <Box className="radioAnswerWrapper">
        <ListAnswerType row booleantype="true" {...props} />
      </Box>
    );
  };

  const infoBox = (message) => {
    return (
      <Box className="infoMessageBoxWrapper">
        <Typography>{message}</Typography>
      </Box>
    );
  };

  const viewSection = () => {
    if (loadingView) return infoBox("Loading...");
    else if (data)
      return (
        <Stack className="sectionsWrapper disbledFields">
          {headerSection()}
          {instructionSection()}
          {questionsSection()}
        </Stack>
      );
    else return infoBox("No data found.");
  };

  return (
    <Stack className={styles.adminFeedbackViewWrapper}>
      <BreadCrumbsWithBackButton heading={name} backButtonClick={handleGoBack}>
        {viewSection()}
      </BreadCrumbsWithBackButton>
    </Stack>
  );
};

export default AdminFeedbackResponseComponent;
