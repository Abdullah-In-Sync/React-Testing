import { Box, Button, IconButton, Stack } from "@mui/material";
import React, { useRef } from "react";

import EditIcon from "@mui/icons-material/Edit";
import MoodIcon from "@mui/icons-material/Mood";
import { Emoji } from "emoji-picker-react";
import { monitorQuestionTypes } from "../../../../lib/constants";
import AddQuestionsBox from "../../../common/AddQuestionsBox";
import FormikTextField from "../../../common/FormikFields/FormikTextField";

type ViewProps = any;

const AddQuestionSection: React.FC<ViewProps> = ({
  formikProps,
  handleDeleteQuestion,
}) => {
  const questionFieldscRef = useRef(null);

  const emojiBox = () => {
    return (
      <Stack className="emojisBox">
        <Box className="deleteButtonWrapper">
          <IconButton aria-label="delete" size="small">
            <EditIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Box>
          <Emoji unified="1f603" />
        </Box>
      </Stack>
    );
  };

  return (
    <>
      <Box className="fieldsBoxWrapperSecond">
        <Box>
          <FormikTextField
            name={`questions.${0}.question`}
            id="description"
            label="Monitor question*"
            fullWidth={true}
            placeholder="Type question"
            inputProps={{ "data-testid": "description" }}
            variant="outlined"
            className="form-control-bg"
            size="small"
            multiline
            rows={5}
            autoComplete="off"
          />
        </Box>
        <Box className="emojisWrapperBox">
          <label>
            <MoodIcon /> Select Emoji Scale*
          </label>
          <Box className="emojisWrapper">
            {emojiBox()}
            {emojiBox()}
            {emojiBox()}
            {emojiBox()}
            {emojiBox()}
          </Box>
        </Box>
      </Box>
      <Box className="addQuestionSection">
        <Box className="addQuestionButtonWrapper">
          <Button
            onClick={() => questionFieldscRef.current.onAddQuesionBox()}
            data-testid="addNewQuestionBox"
            variant="outlined"
          >
            Add Question
          </Button>
        </Box>

        <AddQuestionsBox
          isEditable={true}
          formikProps={formikProps}
          handleDeleteQuestion={handleDeleteQuestion}
          ref={questionFieldscRef}
          initialQuestionObj={{
            data: { question: "", questionType: "" },
            question: { multiline: true, rows: 4 },
          }}
          questionTypes={monitorQuestionTypes}
        />
      </Box>
    </>
  );
};

export default AddQuestionSection;
