import { FormControlLabel, Radio } from "@mui/material";
import { ErrorMessage, useField } from "formik";

const RadioButton = (props) => {
  const { label, value } = props;
  const [field] = useField(props);
  return (
    <>
      <FormControlLabel
        value={value}
        control={<Radio />}
        label={label}
        {...field}
        {...props}
        data-testid={props["data-testid"] || props.id}
      />
      <ErrorMessage
        name={`response`}
        component="div"
        className="invalid-feedback"
      />
    </>
  );
};

export default RadioButton;
