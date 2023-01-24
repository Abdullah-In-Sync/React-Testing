import { Stack } from "@mui/material";
import { ErrorMessage, useField } from "formik";
import TextFieldComponent from "../TextField/TextFieldComponent";

const ResponseTextArea = (props) => {
  const [field, touched] = useField(props);

  return (
    <Stack>
      <TextFieldComponent
        {...field}
        {...props}
        extraProps={{
          spellCheck: "false",
          error: touched.touched && touched.error,
        }}
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
