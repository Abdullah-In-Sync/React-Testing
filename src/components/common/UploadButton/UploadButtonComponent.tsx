import React from "react";
import { Button, FormLabel } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { FILEEXTENSION } from "../../../lib/constants";
import { useSnackbar } from "notistack";
import { strippedBlob } from "../../../lib/helpers/s3";

type propsType = {
  variant?: "contained" | "text" | "outlined";
  name: string;
  accept?: "image/*" | "*";
  multiple?: boolean;
  onChange: any;
  inputProps?: any;
  extraProps?: any;
  fileName?: string;
  buttonText?: string;
  hideIcon?: boolean;
};

/* istanbul ignore next */
export default function UploadButtonComponent(props: propsType) {
  const { enqueueSnackbar } = useSnackbar();
  const handleOnChange = (e) => {
    const file = e.target.files[0];
    if (!file)
      return enqueueSnackbar("Fail to select file please try again.", {
        variant: "error",
      });
    else if (!FILEEXTENSION.includes(file["type"])) {
      return enqueueSnackbar(
        "You can upload jpg, jpeg, png, gif, mp3, wav, mp4, mov, .pdf, doc, docx file type Only.",
        { variant: "error" }
      );
    }
    strippedBlob(file, async (strippedFile) =>
      props.onChange({ ...e, ...{ target: { files: [strippedFile] } } })
    );
  };

  return (
    <>
      <Button
        variant={props.variant}
        component="label"
        startIcon={!props.hideIcon && <SendIcon />}
      >
        {props.buttonText || "Upload"}
        <input
          hidden
          name={props.name}
          {...props.inputProps}
          accept={props.accept}
          multiple={props.multiple}
          onChange={handleOnChange}
          type="file"
        />
      </Button>
      <FormLabel component="legend" sx={{ pl: 2 }}>
        {props.fileName}
      </FormLabel>
    </>
  );
}
