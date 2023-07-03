/* istanbul ignore file */
import React from "react";
import { TextField } from "@mui/material";

type propTypes = {
  required?: boolean;
  className?: string;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  id: string;
  label?: string;
  name: string;
  value: string;
  onChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  variant?: "standard" | "filled" | "outlined";
  inputProps?: any;
  extraProps?: any;
  padding?: string;
  size?: "small" | "medium";
  disabled?: boolean;
  autoComplete?: string;
  placeholder?: string;
  style?: any;
};

export default function TextFieldComponent(props: propTypes) {
  return (
    <TextField
      style={props.style}
      fullWidth={props.fullWidth}
      className={props.className}
      required={props.required}
      multiline={props.multiline}
      rows={props.rows}
      id={props.id}
      name={props.name}
      label={props.label}
      value={props.value}
      onChange={props.onChange}
      inputProps={props.inputProps}
      {...props.extraProps}
      variant={props.variant}
      size={props.size ?? "medium"}
      disabled={props.disabled}
      autoComplete={props?.autoComplete}
      placeholder={props.placeholder}
    />
  );
}
