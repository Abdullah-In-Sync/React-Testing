import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import FormikTextField from "../FormikFields/FormikTextField";
import { useStyles } from "./editableFormikInputStyles";

const EditableFormikInput = (props) => {
  const { name, value } = props;
  const styles = useStyles(props);
  const [isNameFocused, setIsNamedFocused] = useState(false);

  return (
    <Box>
      {!isNameFocused && value ? (
        <Typography
          className={styles.editableInput}
          onClick={() => {
            setIsNamedFocused(true);
          }}
        >
          {value}
        </Typography>
      ) : (
        <>
          <FormikTextField
            autoFocus
            name={name}
            id={name}
            placeholder={"Type"}
            onBlur={() => setIsNamedFocused(false)}
            size="small"
            hideError
            multiline
          />
        </>
      )}
    </Box>
  );
};

export default EditableFormikInput;
