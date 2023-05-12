import { Box, Button, IconButton, Stack } from "@mui/material";
import React, { useRef } from "react";

import { Typography } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import MoodIcon from "@mui/icons-material/Mood";
import { Emoji } from "emoji-picker-react";
import { monitorQuestionTypes } from "../../../../lib/constants";
import AddQuestionsBox from "../../../common/AddQuestionsBox";
import { ModalElement } from "../../../common/CustomModal/CommonModal";
import FormikTextField from "../../../common/FormikFields/FormikTextField";
import EditEmojiModal, { EmojisModalElement } from "./EditEmojiModal";
import { InitialFormValues } from "./types";
import { FormikProps } from "formik";

type ViewProps = {
  formikProps: FormikProps<InitialFormValues>;
  handleDeleteQuestion: (v) => void;
};

const AddQuestionSection: React.FC<ViewProps> = ({
  formikProps,
  handleDeleteQuestion,
}) => {
  const questionFieldscRef = useRef(null);
  const confirmModalRef = useRef<ModalElement>(null);
  const upperModalRef = useRef<EmojisModalElement>(null);
  const {
    values: { questions = [] },
    setFieldValue,
  } = formikProps;

  const emojiBox = () => {
    const { questionOption = [] } = questions[0];
    return questionOption.map((item, i) => (
      <Stack className="emojisBox">
        <Box className="editEmojiButtonWrapper">
          <IconButton
            aria-label="edit-emoji"
            size="small"
            data-testid={`edit-emoji-${i}`}
            onClick={() => {
              upperModalRef.current?.resetEmoji({ item, i });
            }}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Box>
          <Emoji unified={item.code} />
          <Typography>{item.text}</Typography>
        </Box>
      </Stack>
    ));
  };

  const handleEmojiSave = (value, emojiIndex) => {
    setFieldValue(`questions.${0}.questionOption.${emojiIndex}`, value);
    confirmModalRef.current?.close();
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
          <Box className="emojisWrapper">{emojiBox()}</Box>
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
      <EditEmojiModal
        handleEmojiSave={handleEmojiSave}
        confirmModalRef={confirmModalRef}
        ref={upperModalRef}
      />
    </>
  );
};

export default AddQuestionSection;
