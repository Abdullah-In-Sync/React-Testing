import * as React from "react";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Field, FormikProps } from "formik";
type Props = React.PropsWithChildren<{
  i?: number;
  formikProps: FormikProps<{
    questions: {
      questionOption?: string;
    }[];
  }>;
}>;
const AutoCompleteList = ({ i, formikProps }: Props) => {
  const [initialOptions, setInitialOptions] = React.useState();
  const {
    values: { questions = [] } = {},
    setFieldValue,
    errors,
    touched,
    handleBlur,
  } = formikProps;
  const { questionOption } = questions[i] || {};
  const { questions: questionsError = {} } = errors || {};
  React.useEffect(() => {
    if (!initialOptions) setInitialOptions(csvDecode(questionOption));
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
          componentName={`questions.${i}.questionOption`}
          id={`questions.${i}.questionOption`}
          options={[]}
          defaultValue={initialOptions}
          onBlur={handleBlur}
          onChange={(_, newValue) =>
            setFieldValue(`questions.${i}.questionOption`, newValue.join(","))
          }
          renderInput={(params) => (
            <Field
              {...params}
              component={TextField}
              label="List options"
              placeholder="Add option"
              name={`questions.${i}.questionOption`}
              onBlur={handleBlur}
              error={
                touched?.questions?.[i]?.questionOption &&
                Boolean(questionsError[i]?.questionOption)
              }
              helperText={
                touched?.questions?.[i]?.questionOption &&
                questionsError[i]?.questionOption
              }
            />
          )}
        />
      </Stack>
    )
  );
};

export default AutoCompleteList;
