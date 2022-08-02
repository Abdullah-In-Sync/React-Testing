import { useState } from "react";
import {
  TextField,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { FileCopy, Check } from "@mui/icons-material";

const Text = (props) => {
  const { field, values = {} } = props;
  const [copied, setCopied] = useState(false);

  const copyThat = () => {
    setCopied(false);
  };

  return (
    <>
      <TextField
        type={field.type}
        required={field.required || false}
        // error={props.fieldErrors[field.key] ? true : false}
        autoComplete={
          props.mode === "Add" && field.type === "password"
            ? "new-password"
            : props.mode === "Edit"
            ? ""
            : "off"
        }
        key={field.key}
        id={`textfield_${field.key}`}
        label={field.label}
        inputProps={{
          min: 0,
          tabIndex: 1,
          maxLength: field.maxLength,
          ...(field.inputProps || {}),
        }}
        style={field.big && { minWidth: 325 }}
        onChange={(e) =>
          props.onChange(
            field,
            field.type === "number" ? Number(e.target.value) : e.target.value
          )
        }
        value={props.fieldValues[field.key] || field.value || ""}
        defaultValue={values[field.key] || field.value}
        hidden={!field.visible}
        // helperText={props.fieldErrors[field.key] ? props.fieldErrors[field.key] : undefined}
        variant="outlined"
        // onBlur={props.validate(this, field)}
        InputLabelProps={{
          shrink:
            props.fieldValues[field.key] || field.type === "date"
              ? true
              : false,
        }}
        fullWidth
        disabled={field.disabled}
        InputProps={{
          endAdornment: field.copyable ? (
            <InputAdornment style={{ cursor: "pointer" }} position="end">
              <Tooltip
                placement="top"
                title={copied ? "Copied" : "Copy"}
                aria-label="add"
              >
                {copied ? (
                  <Check style={{ color: "#44cd44" }} />
                ) : (
                  <FileCopy color="primary" onClick={copyThat} />
                )}
              </Tooltip>
            </InputAdornment>
          ) : null,
        }}
        className="mb-3"
      />
      {field.info && (
        <span
          style={{
            fontSize: 11,
            display: "block",
            marginTop: "-10px",
            marginLeft: 5,
            marginBottom: 10,
          }}
          dangerouslySetInnerHTML={{ __html: field.info }}
        />
      )}
      <input
        value={props.fieldValues[field.key] || field.value || ""}
        style={{ position: "fixed", top: "-1000px" }}
        id={`textfield_copyable_${field.key}`}
      />
    </>
  );
};

export default Text;
