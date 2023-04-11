import {
  Box,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
} from "@mui/material";
import { FormikProps } from "formik";
import * as React from "react";
import FormikTextField from "../../FormikFields/FormikTextField";
import DeleteButton from "../DeleteButton";
import ErrorMessage from "../ErrorMessage";
import * as templateTypes from "../types";

interface ViewProps {
  formikProps: FormikProps<templateTypes.TemplateDataFormat2>;
  handleDeleteOption: (value) => void;
}

const OptionsSection: React.FC<ViewProps> = ({
  formikProps,
  handleDeleteOption,
}) => {
  const { values, errors, touched } = formikProps;
  const {
    templateData: { optionsQuestions: optionsQuestionsTouched = [] } = {},
  } = touched;
  const {
    templateData: { optionsQuestions: optionsQuestionsError = [] } = {},
  } = errors;

  const radioOptions = (labels, optionIndex) => {
    return (
      <FormControl
        style={{
          width: "100%",
        }}
      >
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          className="radio-buttons"
          name="radio-buttons-group"
        >
          <Box className="radiosWrapper">
            {labels.map((_, i: number) => (
              <Box className="radioWrapper">
                <Box className="inputBox radioInputBox">
                  <FormikTextField
                    name={`templateData.optionsQuestions.${optionIndex}.labels.${i}.option`}
                    id={`templateData.optionsQuestions.${optionIndex}.labels.${i}.option`}
                    placeholder={"Please type here"}
                    fullWidth
                    multiline
                    hideError
                  />
                </Box>
                <FormControlLabel
                  key={`templateData.optionsQuestions.${optionIndex}.labels.${i}.answer`}
                  data-testid={`templateData.optionsQuestions.${optionIndex}.labels.${i}.answer`}
                  value={`templateData.optionsQuestions.${optionIndex}.labels.${i}.answer`}
                  control={<Radio />}
                  label={""}
                  onClick={() => null}
                />
              </Box>
            ))}
          </Box>
        </RadioGroup>
      </FormControl>
    );
  };

  const textOptions = (labels, optionIndex) => {
    return (
      <FormControl
        style={{
          width: "100%",
        }}
      >
        <Box className="radiosWrapper">
          {labels.map((_, i: number) => (
            <Box className="radioWrapper">
              <Box className="inputBox">
                <FormikTextField
                  name={`templateData.optionsQuestions.${optionIndex}.labels.${i}.option`}
                  id={`templateData.optionsQuestions.${optionIndex}.labels.${i}.option`}
                  placeholder={"Please type here"}
                  fullWidth
                  multiline
                  hideError
                />
              </Box>
            </Box>
          ))}
        </Box>
      </FormControl>
    );
  };

  const options = ({ type, labels }, i) => {
    switch (type) {
      case "radio":
        return radioOptions(labels, i);
      case "text":
        return textOptions(labels, i);
      default:
        return null;
    }
  };
  return (
    <Box className="optionsSection commonFieldWrapper cSection">
      {values.templateData.optionsQuestions.map((item, i) => {
        return (
          <>
            <Paper
              elevation={0}
              sx={{ p: "2px 10px", mt: 2, border: "1px solid #ccc" }}
            >
              <DeleteButton
                i={`templateData.optionsQuestions.${i}.question`}
                data-testId={`templateData.optionsQuestions.${i}.question`}
                onDelete={() => handleDeleteOption(i)}
              />
              <Box className="inputBox">
                <FormikTextField
                  name={`templateData.optionsQuestions.${i}.question`}
                  id={`templateData.optionsQuestions.${i}.question`}
                  placeholder={"Please type here"}
                  fullWidth
                  multiline
                  hideError
                />
              </Box>
              <Box>{options(item, i)}</Box>
            </Paper>
            {optionsQuestionsTouched[i] && optionsQuestionsError[i] && (
              <ErrorMessage errorMsg={"All field required"} />
            )}
          </>
        );
      })}
    </Box>
  );
};

export default OptionsSection;
