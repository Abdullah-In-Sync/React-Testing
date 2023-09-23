import { Box, Button, Grid, Stack } from "@mui/material";
import { Form } from "formik"; // Import Form from Formik
import * as React from "react";
import { FormEvent, useState } from "react";
import { useSnackbar } from "notistack";
import { useStyles } from "../../../../therapist/patient/therapistSafetyPlan/create/therapistSafetyPlanStyles";
import TextFieldComponent from "../../../../common/TextField/TextFieldComponent";
import UploadButtonComponent from "../../../../common/UploadButton/UploadButtonComponent";
import { therapistUploadFile } from "../../../../../utility/types/resource_types";
import { getUpdatedFileName, uploadToS3 } from "../../../../../lib/helpers/s3";
import { useQuery } from "@apollo/client";
import { GET_UPLOAD_LOGO_URL } from "../../../../../graphql/query/resource";
import ConfirmationModal from "../../../../common/ConfirmationModal";

const initialState = {
  title: "",
  description: "",
  file_name: "invalid.pdf",
  uploadFile: null,
};

interface ViewProps {
  dataSubmit?: any;
  editMode?: boolean;
  initialValue?: any;
}

const FormBox: React.FC<ViewProps> = ({
  dataSubmit,
  editMode,
  initialValue,
}) => {
  const styles = useStyles();

  const formBox = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isConfirmResource, setIsConfirmResource] = useState(false);
    /* istanbul ignore next */
    const [formFields, setFormFields] = useState<therapistUploadFile>(
      /* istanbul ignore next */
      initialValue ? initialValue : initialState
    );

    const { data: uploadFormulationURL } = useQuery(GET_UPLOAD_LOGO_URL, {
      variables: {
        fileName: formFields && formFields.file_name,
        imageFolder: "patientfiles",
      },
    });

    /* istanbul ignore next */
    const fileOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileObj = event.target.files && event.target.files[0];
      const { fileName } = getUpdatedFileName(event.target.files[0]);

      if (!fileName) {
        return;
      }

      setSelectedFile(fileObj);
      setFormFields((oldValues) => ({ ...oldValues, ["file_name"]: fileName }));
    };

    /* istanbul ignore next */
    const set2 = (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const fieldName = e.target.name;
      const value = e.target.value;

      setFormFields((oldValues) => ({ ...oldValues, [fieldName]: value }));
    };

    /* istanbul ignore next */
    const uploadFileToS3 = async (
      selectedFile,
      uploadUrl,
      formFields,
      successCallback
    ) => {
      /* istanbul ignore next */
      if (selectedFile != null) {
        /* istanbul ignore next */
        await uploadToS3(selectedFile, uploadUrl);
      }
      /* istanbul ignore next */
      successCallback(formFields);
    };

    /* istanbul ignore next */
    const uploadFileFormulation = async () => {
      await uploadFileToS3(
        selectedFile,
        uploadFormulationURL?.getFileUploadUrl?.upload_file_url,
        formFields,
        dataSubmit
      );
    };

    /* istanbul ignore next */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      /* istanbul ignore next */
      if (!editMode && !selectedFile?.name) {
        /* istanbul ignore next */
        enqueueSnackbar("Please select a file", {
          variant: "error",
          autoHideDuration: 2000,
        });
        return;
      }

      setIsConfirmResource(true);

      if (!isConfirmResource) return;
    };

    /* istanbul ignore next */
    const clearIsConfirmCancel = () => {
      setIsConfirmResource(false);
    };

    return (
      <>
        <Stack className={styles.formWrapper}>
          <Form onSubmit={handleSubmit} data-testid="resource-add-form">
            <Grid container spacing={2} marginBottom={2}>
              <Grid item xs={12}>
                <TextFieldComponent
                  required={true}
                  name="title"
                  id="title"
                  label="File Title"
                  value={formFields.title}
                  onChange={set2}
                  fullWidth={true}
                  inputProps={{ "data-testid": "title" }}
                  variant="outlined"
                  className="form-control-bg"
                  size="small"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} marginBottom={2}>
              <Grid item xs={12}>
                <TextFieldComponent
                  name="description"
                  id="descrption"
                  label="Description"
                  value={formFields?.description}
                  multiline
                  rows={4}
                  onChange={set2}
                  inputProps={{ "data-testid": "description" }}
                  fullWidth={true}
                  className="form-control-bg"
                />
              </Grid>
            </Grid>

            <Grid item xs={7}>
              <Box display="flex" alignItems="center">
                <UploadButtonComponent
                  variant="contained"
                  name="RESOURCE_FILENAME"
                  inputProps={{ "data-testid": "resource_file_upload" }}
                  onChange={fileOnChange}
                  /* istanbul ignore next */
                  fileName={
                    /* istanbul ignore next */
                    selectedFile?.name
                      ? /* istanbul ignore next */
                        selectedFile?.name
                      : /* istanbul ignore next */
                        initialValue?.file_name
                  }
                />
              </Box>
            </Grid>

            <Box className="bottomActionButtonsWrapper">
              <Box>
                <Button
                  data-testid="addSubmitForm"
                  variant="contained"
                  type="submit"
                >
                  {/* istanbul ignore next */}
                  {editMode ? "Update" : "Save"}
                </Button>
              </Box>
            </Box>
          </Form>
        </Stack>
        {isConfirmResource && (
          <ConfirmationModal
            label={
              /* istanbul ignore next */
              editMode
                ? /* istanbul ignore next */
                  "Are you sure you want to update the file?"
                : /* istanbul ignore next */
                  "Are you sure want to upload this file?"
            }
            onCancel={clearIsConfirmCancel}
            onConfirm={() => {
              /* istanbul ignore next */
              uploadFileFormulation();
            }}
          />
        )}
      </>
    );
  };

  return <Box className="actionsWrapper">{formBox()}</Box>;
};

export default FormBox;
