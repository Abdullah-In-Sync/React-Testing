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
import { Typography } from "@material-ui/core";

interface ViewProps {
  formikProps: FormikProps<templateTypes.TemplateDataFormat2>;
  handleDeleteOption: (value) => void;
  isView?: boolean;
  isResponse?: boolean;
}

const OptionsSection: React.FC<ViewProps> = ({
  formikProps,
  handleDeleteOption,
  isView,
  isResponse
}) => {
  const { values, errors, touched, setFieldValue } = formikProps;
  const { templateData } = values;

  const { optionsQuestions = [] } = templateData;
  const {
    templateData: { optionsQuestions: optionsQuestionsTouched = [] } = {},
  } = touched;
  const {
    templateData: { optionsQuestions: optionsQuestionsError = [] } = {},
  } = errors;

  const onResponse = ({ name, i }) => {
    const { optionsQuestions } = templateData;
    const {labels} = optionsQuestions[0]
    const tempLabels = labels
    tempLabels.forEach((_, optionIndex)=>{
      tempLabels[optionIndex]["answer"] = false
    })
    tempLabels[i]["answer"] = true

    setFieldValue(name, tempLabels);
  }

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
              <Box key={`radioOption_${i}`} className="radioWrapper">
                <Box className={`inputBox radioInputBox ${isResponse?"disbledFields":""}`}>
                  <FormikTextField
                    name={`templateData.optionsQuestions.${optionIndex}.labels.${i}.option`}
                    id={`templateData.optionsQuestions.${optionIndex}.labels.${i}.option`}
                    placeholder={"Please type here"}
                    fullWidth
                    multiline
                    hideError
                  />
                </Box>
                <Box className={`${!isResponse?"disbledFields":""}`}>
                  <FormControlLabel
                    key={`templateData.optionsQuestions.${optionIndex}.labels.${i}.answer`}
                    data-testid={`templateData.optionsQuestions.${optionIndex}.labels.${i}.answer`}
                    value={`templateData.optionsQuestions.${optionIndex}.labels.${i}.answer`}               
                    control={<Radio />}
                    label={""}
                    onClick={(v)=>onResponse({name:`templateData.optionsQuestions.${optionIndex}.labels`, i})}
                  />
                </Box>
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
        className={`${isResponse?"disbledFields":""}`}
      >
        <Box className="radiosWrapper">
          {labels.map((_, i: number) => (
            <Box key={`textOption_${i}`} className="radioWrapper">
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
      {optionsQuestions.map((item, i) => {
        return (
          <Box key={`optionsQuestion_${i}`}>
            <Paper elevation={0} className="optionPaper">
              {(!isView && !isResponse) && (
                <DeleteButton
                  i={`templateData.optionsQuestions.${i}.question`}
                  data-testId={`templateData.optionsQuestions.${i}.question`}
                  onDelete={() => handleDeleteOption(i)}
                />
              )}
              <Box className="inputBox">
              {(!isView && !isResponse) ? <FormikTextField
                  name={`templateData.optionsQuestions.${i}.question`}
                  id={`templateData.optionsQuestions.${i}.question`}
                  placeholder={"Please type here"}
                  fullWidth
                  multiline
                  hideError
                />: <Typography>{item.question}</Typography>}
              </Box>
              <Box className="optionWrapper">{options(item, i)}</Box>
            </Paper>
            {optionsQuestionsTouched[i] && optionsQuestionsError[i] && (
              <ErrorMessage errorMsg={"All field required"} />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default OptionsSection;
