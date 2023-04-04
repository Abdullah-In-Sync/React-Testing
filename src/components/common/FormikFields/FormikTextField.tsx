import { Stack } from "@mui/material";
import { ErrorMessage, useField } from "formik";
import TextFieldCustom from "../TextField/TextFieldCustom";

const ResponseTextArea = (props) => {
  const { hideError, ...rest } = props;
  const [field, touched] = useField(rest);

  return (
    <Stack>
      <TextFieldCustom
        {...field}
        {...rest}
        spellCheck="false"
        error={touched.touched && Boolean(touched.error)}
      />
      {!hideError && (
        <ErrorMessage
          name={props.name}
          component="div"
          className="invalid-input-message"
        />
      )}
    </Stack>
  );
};

export default ResponseTextArea;
