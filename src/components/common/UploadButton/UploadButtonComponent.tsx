import React from "react";
import { Button, FormLabel } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

type propsType = {
  variant?: "contained" | "text" | "outlined";
  name: string;
  accept?: "image/*" | "*";
  multiple?: boolean;
  onChange: any;
  inputProps?: any;
  extraProps?: any;
  fileName?: string;
};

export default function UploadButtonComponent(props: propsType) {
  return (
    <>
      <Button
        variant={props.variant}
        component="label"
        startIcon={<SendIcon />}
      >
        Upload
        <input
          hidden
          name={props.name}
          {...props.inputProps}
          accept={props.accept}
          multiple={props.multiple}
          onChange={props.onChange}
          type="file"
        />
      </Button>
      <FormLabel component="legend" sx={{ pl: 2 }}>
        {props.fileName}
      </FormLabel>
    </>
  );
}
