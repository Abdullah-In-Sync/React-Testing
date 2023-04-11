import { Box, Paper } from "@mui/material";
import { FieldArray, FormikProps } from "formik";
import * as React from "react";
import CommonButton from "../../Buttons/CommonButton";
import FormikSelectDropdown from "../../FormikFields/FormikSelectDropdown";
import FormikTextField from "../../FormikFields/FormikTextField";
import DeleteButton from "../DeleteButton";
import ErrorMessage from "../ErrorMessage";
import * as templateTypes from "../types";
import { Typography } from "@material-ui/core";

interface ViewProps {
  formikProps: FormikProps<templateTypes.TemplateDataFormat1>;
  handleDeleteQuestion: (value) => void;
}

const QuestionsSection: React.FC<ViewProps> = ({
  formikProps,
  handleDeleteQuestion,
}) => {
  const { values, setFieldValue, errors, touched } = formikProps;
  const { templateData } = values;
  const { templateData: { questions: questionsTouched = [] } = {} } = touched;
  const { templateData: { questions: questionsError = [] } = {} } = errors;

  const onAddQuesionBox = () => {
    // if (templateData.questions.length < 15) {
    const questions = [...templateData.questions];
    questions.push({ question: "" });
    setFieldValue("templateData.questions", questions);
    // } else {
    //   confirmModalRef.current?.open();
    // }
  };

  return (
    <Box className="questionsSection commonFieldWrapper cSection">
      <Box className="addQuestionButtonWrapper">
        <CommonButton
          variant="outlined"
          onClick={onAddQuesionBox}
          data-testid="addQuestionButton"
        >
          Add Question
        </CommonButton>
      </Box>
      <FieldArray name="questions">
        {() =>
          templateData.questions.map((_, i) => {
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
                    <DeleteButton
                      i={i}
                      data-testid={`deletequestions.${i}.question`}
                      onDelete={() => handleDeleteQuestion(i)}
                    />
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
  );
};

export default QuestionsSection;
