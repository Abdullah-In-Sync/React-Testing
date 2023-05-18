import { Box, Button } from "@mui/material";
import React, { useRef } from "react";
import { FormikProps } from "formik";
import { monitorQuestionTypes } from "../../../../lib/constants";
import AddQuestionsBox from "../../../common/AddQuestionsBox";
import { ModalElement } from "../../../common/CustomModal/CommonModal";
import EditEmojiModal, {
  EmojisModalElement,
} from "../../../common/EditEmojiModal";
import FormikTextField from "../../../common/FormikFields/FormikTextField";
import EmojiListBox from "./EmojiListBox";
import { InitialFormValues } from "./types";

type ViewProps = {
  formikProps: FormikProps<InitialFormValues>;
  handleDeleteQuestion?: (v) => void;
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
        <EmojiListBox question={questions[0]} upperModalRef={upperModalRef} />
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
          ref={questionFieldscRef}
          initialQuestionObj={{
            data: { question: "", questionType: "" },
            question: { multiline: true, rows: 4 },
          }}
          questionTypes={monitorQuestionTypes}
          handleDeleteQuestion={handleDeleteQuestion}
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
