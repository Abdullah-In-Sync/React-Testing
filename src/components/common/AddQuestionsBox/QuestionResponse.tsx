import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { FormikProps } from "formik";
import React from "react";
import ResponseTextArea from "../FormikFields/FormikTextField";

type ViewProps = React.PropsWithChildren<{
  formikProps: FormikProps<{
    questions?: {
      questionOption?: string;
    }[];
  }>;
  item?: any;
  i?: number;
  isEditView?: number;
}>;

const QuestionResponse: React.FC<ViewProps> = ({
  i,
  item,
  formikProps,
  isEditView,
}) => {
  console.log({ item });
  const { setFieldValue } = formikProps;

  const {
    patientAnswer: answer,
    questionType,
    questionOption: answerOptions,
  } = item;
  const listAnswerType = ({ row, options }) => {
    return (
      <RadioGroup {...row} className="radio-buttons" defaultValue={answer}>
        {(options as Array<any>).map((option: string, index: number) => (
          <FormControlLabel
            key={`answerType_${index}`}
            data-testid={`answer_${index}`}
            value={option}
            control={<Radio />}
            label={option}
            onClick={() =>
              setFieldValue(`questions.${i}.patientAnswer`, option)
            }
          />
        ))}
      </RadioGroup>
    );
  };

  const booleanAnswerType = (props) => {
    return (
      <Box className="radioAnswerWrapper">
        <label>
          <Typography>Patient Response:</Typography>
        </label>
        <Box className="radios">{listAnswerType({ row: true, ...props })}</Box>
      </Box>
    );
  };

  const textAnswerType = () => {
    return (
      <Box className="textAnswerWrapper">
        <Box>
          <label>
            <Typography>Patient Response</Typography>
          </label>
          <ResponseTextArea
            name={`questions.${i}.patientAnswer`}
            id={`therapy_response_${i + 1}`}
            placeholder={
              isEditView !== i + i ? "Please type response here" : "No response"
            }
            multiline
          />
        </Box>
      </Box>
    );
  };

  const answers = () => {
    switch (questionType) {
      case "2":
        return (
          answerOptions &&
          booleanAnswerType({
            options: answerOptions.replace(/[\]']+/g, "").split(/,+|"[^"]+"/g),
          })
        );
      case "1":
        return textAnswerType();
      default:
        return null;
    }
  };

  return <Stack className="questionResponseSection">{answers()}</Stack>;
};

export default QuestionResponse;
