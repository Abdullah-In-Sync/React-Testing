import React, { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

type propTypes = {
  required?: boolean;
  className?: string;
  id?: string;
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputProps?: any;
  extraProps?: any;
  placement?: "start" | "end" | "top" | "bottom";
  checked: number | boolean;
  size?: "small" | "medium";
};

export default function CheckBoxLabelComponent(props: propTypes) {
  return (
    <FormControlLabel
      value={props.value}
      className={props.className}
      name={props.name}
      control={
        <Checkbox
          onChange={props.onChange}
          inputProps={props.inputProps}
          required={props.required}
          {...props.extraProps}
          checked={props.checked}
          size={props.size ?? "medium"}
        />
      }
      label={props.label}
      labelPlacement={props.placement}
    />
  );
}
