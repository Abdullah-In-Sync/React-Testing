import { Stack } from "@mui/material";
import { ErrorMessage, useField } from "formik";
import TextFieldCustom from "../TextField/TextFieldCustom";

const ResponseTextArea = (props) => {
  const [field, touched] = useField(props);

  return (
    <Stack>
      <TextFieldCustom
        {...field}
        {...props}
        spellCheck="false"
        error={touched.touched && Boolean(touched.error)}
      />
      <ErrorMessage
        name={props.name}
        component="div"
        className="invalid-input-message"
      />
    </Stack>
  );
};

export default ResponseTextArea;
