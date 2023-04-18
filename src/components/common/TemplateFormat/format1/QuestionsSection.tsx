import { Typography } from "@material-ui/core";
import { Box, Paper } from "@mui/material";
import { FieldArray, FormikProps } from "formik";
import * as React from "react";
import { ModalElement } from "../../../common/CustomModal/CommonModal";
import CommonButton from "../../Buttons/CommonButton";
import ConfirmBoxModal from "../../ConfirmBoxModal";
import FormikSelectDropdown from "../../FormikFields/FormikSelectDropdown";
import FormikTextField from "../../FormikFields/FormikTextField";
import DeleteButton from "../DeleteButton";
import ErrorMessage from "../ErrorMessage";
import * as templateTypes from "../types";
import { uniqueString } from "../../../../utility/helper";

interface ViewProps {
  formikProps: FormikProps<templateTypes.TemplateDataFormat1>;
  handleDeleteQuestion: (value) => void;
  isView?: boolean;
}

const QuestionsSection: React.FC<ViewProps> = ({
  formikProps,
  handleDeleteQuestion,
  isView,
}) => {
  const confirmModalRef = React.useRef<ModalElement>(null);
  const { values, setFieldValue, errors, touched } = formikProps;
  const { templateData } = values;
  const { templateData: { questions: questionsTouched = [] } = {} } = touched;
  const { templateData: { questions: questionsError = [] } = {} } = errors;

  const onAddQuesionBox = () => {
    if (templateData.questions.length < 15) {
      const questions = [...templateData.questions];
      questions.push({ id: uniqueString(), question: "" });
      setFieldValue("templateData.questions", questions);
    } else {
      confirmModalRef.current?.open();
    }
  };

  return (
    <>
      <Box className="questionsSection commonFieldWrapper cSection">
        {!isView && (
          <Box className="addQuestionButtonWrapper">
            <CommonButton
              variant="outlined"
              onClick={onAddQuesionBox}
              data-testid="addQuestionButton"
            >
              Add Question
            </CommonButton>
          </Box>
        )}
        <FieldArray name="questions">
          {() =>
            templateData.questions.map((item, i) => {
              return (
                <Box className="question" key={`question_${i}`}>
                  <Paper
                    className="inputPaper"
                    elevation={0}
                    sx={{
                      p: "2px 4px",
                      display: "flex",
                      border: "1px solid #ccc",
                    }}
                  >
                    <Box className="questionInputWrapper">
                      <Typography>{i + 1}</Typography>

                      <FormikTextField
                        inputProps={{
                          "data-testid": `templateData.questions.${i}.question`,
                        }}
                        name={`templateData.questions.${i}.question`}
                        id={`templateData.questions.${i}.question`}
                        placeholder={"Type your question here"}
                        fullWidth
                        multiline
                        hideError
                      />
                    </Box>

                    <Box>
                      <Box className="inputPaperSecondColumn">
                        <FormikSelectDropdown
                          value="1"
                          name="some"
                          options={[{ id: 1, value: "0" }]}
                          mappingKeys={["id", "value"]}
                          size="small"
                          className="selectOutline"
                          extraProps={{ "data-testid": "dummy" }}
                          disabled
                          fullWidth
                        />
                      </Box>
                      {!isView && (
                        <DeleteButton
                          i={i}
                          data-testid={`deletequestions.${i}.question`}
                          onDelete={() => handleDeleteQuestion({ item, i })}
                        />
                      )}
                    </Box>
                  </Paper>

                  {questionsTouched.length > 0 &&
                    questionsTouched[i] &&
                    questionsError.length > 0 &&
                    questionsError[i] && (
                      <ErrorMessage errorMsg={questionsError[i]["question"]} />
                    )}
                </Box>
              );
            })
          }
        </FieldArray>
      </Box>
      <ConfirmBoxModal
        infoMessage="You cannot add more than 15 questions, Please delete a question to add a new question"
        confirmModalRef={confirmModalRef}
      />
    </>
  );
};

export default QuestionsSection;
