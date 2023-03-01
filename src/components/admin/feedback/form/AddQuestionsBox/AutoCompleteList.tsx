/* istanbul ignore file */
import * as React from "react";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Field, FormikProps } from "formik";
import { FeedbackQuestion } from "../types";
type Props = React.PropsWithChildren<{
  i?: number;
  formikProps: FormikProps<{
    questions: FeedbackQuestion[];
  }>;
}>;
const AutoCompleteList = ({ i, formikProps }: Props) => {
  const [initialOptions, setInitialOptions] = React.useState();
  const {
    values: { questions = [] } = {},
    setFieldValue,
    errors,
    touched,
  } = formikProps;
  const { answer_options: answerOptions } = questions[i] || {};
  const { questions: questionsError = {} } = errors || {};
  React.useEffect(() => {
    if (!initialOptions) setInitialOptions(csvDecode(answerOptions));
  }, []);
  const csvDecode = (csvString) => {
    return csvString ? csvString.split(",") : [];
  };
  return (
    initialOptions && (
      <Stack>
        <Autocomplete
          multiple
          freeSolo
          id={`questions.${i}.answer_options`}
          options={[]}
          defaultValue={initialOptions}
          onChange={(_, newValue) =>
            setFieldValue(`questions.${i}.answer_options`, newValue.join(","))
          }
          renderInput={(params) => (
            <Field
              {...params}
              component={TextField}
              label="List options"
              placeholder="Add option"
              error={
                touched.questions && Boolean(questionsError[i]?.answer_options)
              }
              helperText={questionsError[i]?.answer_options}
            />
          )}
        />
      </Stack>
    )
  );
};

export default AutoCompleteList;
