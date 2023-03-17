import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { AdminViewRelapseById } from "../../../../graphql/Relapse/types";
import BreadCrumbsWithBackButton from "../../../common/BreadCrumbsWithBackButton";
import TextFieldComponent from "../../../common/TextField/TextFieldComponent";
import { useStyles } from "./viewRelapsePlanStyles";

interface ViewProps {
  data?: AdminViewRelapseById;
  handleGoBack?: () => void;
  loadingView?: any;
}

const AdminRelapseView: React.FC<ViewProps> = ({
  data,
  handleGoBack,
  loadingView,
}) => {
  const styles = useStyles();
  const {
    organization_name,
    user_type,
    name,
    description,
    questions = [],
  } = data || {};

  const headerSection = () => {
    return (
      <Box className="headerSection csection">
        <Box>
          <label>
            <Typography variant="h6">Organization Name:</Typography>
          </label>
          <Typography variant="h6">{organization_name}</Typography>
        </Box>
        <Box>
          <label>
            <Typography variant="h6">Plan Type:</Typography>
          </label>
          <Typography variant="h6">{user_type}</Typography>
        </Box>
      </Box>
    );
  };

  const instructionSection = () => {
    return (
      <Box className="instructionSection csection">
        <Box>
          <label>
            <Typography>Description</Typography>
          </label>
        </Box>
        <Box className="instructionDescriptionBox">
          <Typography>{description}</Typography>
        </Box>
      </Box>
    );
  };

  const answers = (item) => {
    const {
      relapse_ques_typeoption,
      relapse_ques_type,
      relapse_additional_details,
      answer,
    } = item;
    switch (relapse_ques_type) {
      case "list":
        return booleanAnswerType({
          options: relapse_ques_typeoption
            ? relapse_ques_typeoption
                .replace(/[\]']+/g, "")
                .split(/,+|"[^"]+"/g)
            : [],
          answer,
          detail: relapse_additional_details,
        });
      case "text":
        return textAnswerType({ answer, detail: relapse_additional_details });
      default:
        return null;
    }
  };

  const textAnswerType = ({ answer, detail }) => {
    return (
      <Stack>
        {detail && (
          <Box mb={1} mt={0.7}>
            <TextFieldComponent
              name="relapsePlanView"
              id="relapsePlanView"
              label="Description"
              value={detail}
              onChange={null}
              fullWidth={true}
              variant="outlined"
              multiline
              size="small"
            />
          </Box>
        )}
        <Box className="textAnswerWrapper">
          {answer ? (
            <Typography>{answer}</Typography>
          ) : (
            <Typography className="muteText">
              Patient to add response here...
            </Typography>
          )}
        </Box>
      </Stack>
    );
  };

  const questionsSection = () => {
    return questions.map((item, i) => {
      const { relapse_ques } = item;

      return (
        <Box key={`questionBox_${i}`} className="questionsSection csection">
          <Box>
            <label>
              <Typography>{`${i + 1}. ${relapse_ques}`}</Typography>
            </label>
          </Box>
          <Box className="instructionBox">{answers(item)}</Box>
        </Box>
      );
    });
  };

  const listAnswerType = (data) => {
    const { options = [], answer, row } = data || {};
    return (
      <RadioGroup {...row} className="radio-buttons" defaultValue={answer}>
        {(options as Array<any>).map((option: string, index: number) => (
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

  const booleanAnswerType = (data) => {
    const { detail } = data;
    return (
      <Box className="radioDescWrapper">
        {detail && <Typography>{detail}</Typography>}
        <Box className="radioAnswerWrapper">
          {listAnswerType({ row: true, booleantype: "true", ...data })}
        </Box>
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
          {description && instructionSection()}
          {questionsSection()}
        </Stack>
      );
    else return infoBox("No data found.");
  };

  return (
    <Stack className={styles.adminRelapseViewWrapper}>
      <BreadCrumbsWithBackButton heading={name} backButtonClick={handleGoBack}>
        {viewSection()}
      </BreadCrumbsWithBackButton>
    </Stack>
  );
};

export default AdminRelapseView;
