import { TextareaAutosize } from "@mui/material";
import { ErrorMessage, useField } from "formik";
import { useStyles } from "./homeworkStyles";

const ResponseTextArea = (props) => {
  const styles = useStyles();
  const [field] = useField(props);
  return (
    <div className={styles.responseInputWrapper}>
      <label className={styles.label} htmlFor={props.name}>
        {props.label}
      </label>
      <TextareaAutosize
        minRows={props.rows}
        {...field}
        {...props}
        data-testid={props.id}
      />
      <ErrorMessage
        name={`response`}
        component="div"
        className="invalid-feedback"
      />
    </div>
  );
};

export default ResponseTextArea;
