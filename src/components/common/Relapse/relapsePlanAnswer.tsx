import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { FC } from "react";
import FormikTextField from "../FormikFields/FormikTextField";
import { ErrorMessage, FormikProps } from "formik";
import {
  GetPatientRelapsePlan,
  RelapseQuestionsEntity,
} from "../../../graphql/Relapse/types";

type Props = {
  question: RelapseQuestionsEntity;
  index: number;
  formikHelper: FormikProps<GetPatientRelapsePlan>;
};

export const RelapsePlanAnswer: FC<Props> = ({
  question,
  index,
  formikHelper,
}) => {
  const OnRadioSelect = (value: string) =>
    formikHelper.setFieldValue(`questions.${index}.patient_answer`, value);

  return (
    <Box>
      {question?.relapse_ques_type == "1" ? (
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
        <FormControl
          style={{
            width: "100%",
          }}
        >
          <Typography>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              className="radio-buttons"
              name="row-radio-buttons-group"
              value={question?.patient_answer}
              row
            >
              <Grid spacing={1} container>
                {(
                  (question?.relapse_ques_typeoption?.split(",") ||
                    []) as Array<any>
                ).map((option: string, index: number) => (
                  <Grid
                    item
                    xs={10}
                    sm={5}
                    md={option.length > 15 ? 6 : 2}
                    key={index}
                  >
                    <FormControlLabel
                      key={`answerType_${index}`}
                      data-testid={`answer_${index}`}
                      value={option}
                      control={<Radio size="small" />}
                      label={option}
                      onClick={() => OnRadioSelect(option)}
                      sx={{
                        fontSize: "15px",
                        color: "#3f4040b0 !important",
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </Typography>

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
