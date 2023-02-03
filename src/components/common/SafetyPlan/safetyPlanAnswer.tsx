import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { FC } from "react";
import {
  QuestionsEntity,
  ViewSafetyPlanById,
} from "../../../graphql/SafetyPlan/types";
import FormikTextField from "../FormikFields/FormikTextField";
import { ErrorMessage, FormikProps } from "formik";

type Props = {
  question: QuestionsEntity;
  index: number;
  formikHelper: FormikProps<ViewSafetyPlanById>;
};

export const SafetyPlanAnswer: FC<Props> = ({
  question,
  index,
  formikHelper,
}) => {
  const OnRadioSelect = (value: string) =>
    formikHelper.setFieldValue(`questions.${index}.patient_answer`, value);

  return (
    <Box>
      {question?.safety_ques_type == "1" ? (
        <FormikTextField
          name={`questions.${index}.patient_answer`}
          id={`questions.${index}.patient_answer`}
          label="Type your response here"
          fullWidth={true}
          inputProps={{ "data-testid": `questions.${index}.patient_answer` }}
          variant="outlined"
          className="form-control-bg"
          size="small"
          multiline
          rows={4}
        />
      ) : (
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            className="radio-buttons"
            name="radio-buttons-group"
            value={question?.patient_answer}
          >
            {(
              (question?.safety_ques_typeoption?.split(",") || []) as Array<any>
            ).map((option: string, index: number) => (
              <FormControlLabel
                key={`answerType_${index}`}
                data-testid={`answer_${index}`}
                value={option}
                control={<Radio />}
                label={option}
                onClick={() => OnRadioSelect(option)}
              />
            ))}
          </RadioGroup>
          <ErrorMessage
            name={`questions.${index}.patient_answer`}
            component="div"
            className="invalid-input-message"
          />
        </FormControl>
      )}
    </Box>
  );
};
