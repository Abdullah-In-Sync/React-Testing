import { Box, FormControlLabel, Stack } from "@mui/material";
import { ErrorMessage, Form } from "formik";
import * as React from "react";
import { fileOnChange } from "../../../../utility/helper";
import CommonButton from "../../../common/Buttons/CommonButton";
import FormikTextField from "../../../common/FormikFields/FormikTextField";
import { IOSSwitch } from "../../../common/ToggleButton/IosToggleButton";
import UploadButtonComponent from "../../../common/UploadButton/UploadButtonComponent";
const UploadFileForm: React.FC<any> = ({
  values,
  setFieldValue,
  isSubmitting,
  saveButtonText,
  pressedIconButton,
}) => {
  const { file_name = "No file choosen", is_private } = values;

  const accToggle = () => (
    <Box className="accToggleWrapper">
      <label className="accLabel">Set as Private:</label>
      <FormControlLabel
        control={
          <IOSSwitch sx={{ m: 1 }} defaultChecked={Boolean(is_private)} />
        }
        label=""
        onChange={
          /* istanbul ignore next */
          (e: React.ChangeEvent<HTMLInputElement>) =>
            setFieldValue("is_private", Number(e.target?.checked))
        }
        data-testid={`toggleAcc-${saveButtonText}`}
      />
    </Box>
  );

  /* istanbul ignore next */
  const onSelectFileChange = (name, e) => {
    fileOnChange(e, ({ fileName, fileObj }) => {
      setFieldValue(name, fileName);
      setFieldValue(`${name}_file`, fileObj);
    });
  };

  return (
    <Stack>
      <Form>
        <Box className="">
          <Box className="row1 crow">
            <label className="uploadButtonLabel">File Title*:</label>
            <FormikTextField
              name="title"
              id="title"
              fullWidth={true}
              inputProps={{ "data-testid": "title" }}
              variant="outlined"
              className="form-control-bg"
              size="small"
              placeholder="Title"
            />
          </Box>

          <Box className="row2 crow">
            <label className="uploadButtonLabel">Description:</label>
            <FormikTextField
              name="description"
              id="description"
              fullWidth={true}
              inputProps={{ "data-testid": "description" }}
              variant="outlined"
              className="form-control-bg"
              size="small"
              placeholder="Description"
              multiline
              rows="2"
            />
          </Box>

          <Box className="row3 crow">
            <Box className="chooseFileWrapper">
              <label className="uploadButtonLabel">Select file*:</label>
              <UploadButtonComponent
                variant="outlined"
                name="file_name"
                inputProps={{
                  "data-testid": "file_name",
                }}
                onChange={(e) => onSelectFileChange("file_name", e)}
                fileName={file_name}
                buttonText="Choose File"
                hideIcon
              />
              <ErrorMessage
                name={`file_name`}
                component="div"
                className="invalid-input-message"
              />
              <ErrorMessage
                name={`file_name_file`}
                component="div"
                className="invalid-input-message"
              />
            </Box>
            {pressedIconButton !== "edit" && accToggle()}
          </Box>
        </Box>
        {saveButtonText && (
          <Box className="row5 crow">
            <Box>
              <CommonButton
                disabled={isSubmitting}
                type="submit"
                data-testid="formSubmit"
                variant="contained"
              >
                {saveButtonText}
              </CommonButton>
            </Box>
          </Box>
        )}
      </Form>
    </Stack>
  );
};

export default UploadFileForm;
