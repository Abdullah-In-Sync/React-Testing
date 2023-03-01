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
          id={`questions.${i}.questionOption`}
          options={[]}
          defaultValue={initialOptions}
          onChange={(_, newValue) =>
            setFieldValue(`questions.${i}.questionOption`, newValue.join(","))
          }
          renderInput={(params) => (
            <Field
              {...params}
              component={TextField}
              label="List options"
              placeholder="Add option"
              error={
                touched.questions && Boolean(questionsError[i]?.questionOption)
              }
              helperText={questionsError[i]?.questionOption}
            />
          )}
        />
      </Stack>
    )
  );
};

export default AutoCompleteList;
