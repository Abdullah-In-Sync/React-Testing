import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import Modal from "../../common/Modal";
import { Box } from "@mui/system";
import {useStyles} from "./editableFormikInputStyles"
import FormikTextField from "../FormikFields/FormikTextField";
import { ErrorMessage } from "formik";

const EditableFormikInput = (props) => {
  const {
    name, 
    value
  } = props;

  const styles = useStyles(props);

//   const [inputValue, setInpuValue] = React.useState(value);
  const [isNameFocused, setIsNamedFocused] = React.useState(false);

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
            placeholder={
              "Type"
            }
            onBlur={event => setIsNamedFocused(false)}
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
