import React, { FormEvent, useEffect, useState } from "react";
import { Box, Button, FormControl, FormLabel, Grid } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  GET_AGENDA_BY_DISORDER_AND_MODEL_DATA,
  GET_CATEGORY_BY_MODELID_DATA,
  GET_DISORDER_DATA,
  GET_MODEL_BY_DISORDERID_DATA,
} from "../../../graphql/query/common";
import { GET_UPLOAD_RESOURCE_URL } from "../../../graphql/query/resource";
import { useSnackbar } from "notistack";
import TextFieldComponent from "../../common/TextField/TextFieldComponent";
import SingleSelectComponent from "../../common/SelectBox/SingleSelect/SingleSelectComponent";
import UploadButtonComponent from "../../common/UploadButton/UploadButtonComponent";
import { getUpdatedFileName, uploadToS3 } from "../../../lib/helpers/s3";
import CheckBoxLabelComponent from "../../common/CheckBoxs/CheckBoxLabel/CheckBoxLabelComponent";
import SureModal from "./SureModal";
import { addResourceFormField } from "../../../utility/types/resource_types";

const defaultFormValue = {
  resource_name: "",
  resource_type: 0,
  disorder_id: "",
  model_id: "",
  category_id: "",
  resource_desc: "",
  resource_instruction: "",
  resource_references: "",
  resource_avail_admin: 0,
  resource_avail_all: 0,
  resource_avail_onlyme: 0,
  resource_avail_therapist: 0,
  agenda_id: "",
  file_name: "",
  uploadFile: null,
  uploadFileURL: "",
};

type propTypes = {
  resourceType: "add" | "create";
  userType: "admin" | "therapist";
  onSubmit?: any;
  setLoader: any;
};

export default function AddForm(props: propTypes) {
  const { enqueueSnackbar } = useSnackbar();
  const [formFields, setFormFields] =
    useState<addResourceFormField>(defaultFormValue);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmSubmission, setConfirmSubmission] = useState<boolean>(false);
  const resourceTypeOptions = [
    { id: 1, value: "Info Sheets" },
    { id: 2, value: "Work Sheets" },
    { id: 3, value: "Audio File" },
    { id: 4, value: "Video File" },
  ];

  const [getDisorderData, { data: disorderData }] = useLazyQuery(
    GET_DISORDER_DATA,
    {
      /* istanbul ignore next */
      onCompleted: () => {
        /* istanbul ignore next */
        props.setLoader(false);
      },
    }
  );

  const [getModelByDisorderId, { data: modelData }] = useLazyQuery(
    GET_MODEL_BY_DISORDERID_DATA,
    {
      /* istanbul ignore next */
      onCompleted: () => {
        /* istanbul ignore next */
        props.setLoader(false);
      },
    }
  );

  const [getCategoryByModelId, { data: categoryData }] = useLazyQuery(
    GET_CATEGORY_BY_MODELID_DATA,
    {
      /* istanbul ignore next */
      onCompleted: () => {
        /* istanbul ignore next */
        props.setLoader(false);
      },
    }
  );

  const [getAgendaByDisorderModelId, { data: agendaData }] = useLazyQuery(
    GET_AGENDA_BY_DISORDER_AND_MODEL_DATA,
    {
      /* istanbul ignore next */
      onCompleted: () => {
        /* istanbul ignore next */
        props.setLoader(false);
      },
    }
  );

  useEffect(() => {
    props.setLoader(true);
    getDisorderData();
  }, []);

  useEffect(() => {
    /* istanbul ignore else */
    if (formFields.disorder_id) {
      props.setLoader(true);
      setFormFields((oldValues) => ({
        ...oldValues,
        model_id: "",
        category_id: "",
        agenda_id: "",
      }));
      getModelByDisorderId({
        variables: { disorderId: formFields.disorder_id },
      });
    }
  }, [formFields.disorder_id]);

  useEffect(() => {
    /* istanbul ignore else */
    if (formFields.model_id) {
      props.setLoader(true);
      setFormFields((oldValues) => ({
        ...oldValues,
        category_id: "",
        agenda_id: "",
      }));
      getCategoryByModelId({
        variables: { modelId: formFields.model_id },
      });

      getAgendaByDisorderModelId({
        variables: {
          disorderId: formFields.disorder_id,
          modelId: formFields.model_id,
        },
      });
    }
  }, [formFields.model_id]);

  const set2 = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setFormFields((oldValues) => ({ ...oldValues, [fieldName]: value }));
  };

  const setCheckBox = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const name = e.target.name;
    if (name === "resource_avail_all") {
      setFormFields((oldValues) => ({
        ...oldValues,
        ["resource_avail_admin"]: Math.abs(oldValues[name] - 1),
        ["resource_avail_onlyme"]: Math.abs(oldValues[name] - 1),
        ["resource_avail_therapist"]: Math.abs(oldValues[name] - 1),
        ["resource_avail_all"]: Math.abs(oldValues[name] - 1),
      }));
    } else {
      setFormFields((oldValues) => ({
        ...oldValues,
        [name]: Math.abs(oldValues[name] - 1),
      }));
    }
  };

  const { data: uploadResourceURL } = useQuery(GET_UPLOAD_RESOURCE_URL, {
    variables: {
      fileName: formFields.file_name,
    },
  });

  const fileOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0];
    const { fileName } = getUpdatedFileName(event.target.files[0]);
    props.setLoader(true);
    /* istanbul ignore else */
    if (!fileName) {
      /* istanbul ignore next */
      return;
    }
    setSelectedFile(fileObj);
    // setFormFields((oldValues) => ({ ...oldValues, ["uploadFile"]: fileObj }));
    setFormFields((oldValues) => ({ ...oldValues, ["file_name"]: fileName }));
    props.setLoader(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* istanbul ignore next */
    if (!selectedFile?.name) {
      enqueueSnackbar("Please select a file", {
        variant: "error",
      });
      return;
    }
    /* istanbul ignore next */
    if (
      !formFields.resource_avail_admin &&
      !formFields.resource_avail_onlyme &&
      !formFields.resource_avail_therapist &&
      !formFields.resource_avail_all
    ) {
      enqueueSnackbar("Please select availability of resource", {
        variant: "error",
      });
      return;
    }
    setModalOpen(true);
    /* istanbul ignore else */
    if (!confirmSubmission) return;
  };

  const uploadFile = async () => {
    try {
      props.setLoader(true);
      if (
        uploadResourceURL &&
        uploadResourceURL?.getUploadResourceUrl &&
        uploadResourceURL?.getUploadResourceUrl.resource_upload
      ) {
        /* istanbul ignore next */
        const uploadStatus = await uploadToS3(
          selectedFile,
          uploadResourceURL.getUploadResourceUrl.resource_upload
        );

        if (uploadStatus) {
          props.onSubmit(formFields);
        } else {
          enqueueSnackbar("There is an error with file upload!", {
            variant: "error",
          });
        }
        props.setLoader(false);
      } else {
        props.setLoader(false);
        enqueueSnackbar("Please select file!", { variant: "error" });
      }
    } catch (e) {
      props.setLoader(false);
      enqueueSnackbar("Please fill the all fields", { variant: "error" });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} data-testid="resource-add-form">
        <Box
          sx={{ flexGrow: 1, border: "1px solid #cecece" }}
          p={5}
          borderRadius="7px"
        >
          <Grid container spacing={2} marginBottom={5}>
            <Grid item xs={4}>
              <TextFieldComponent
                required={true}
                name="resource_name"
                id="resource_name"
                label="Name"
                value={formFields?.resource_name}
                onChange={set2}
                fullWidth={true}
                inputProps={{ "data-testid": "resource_name" }}
                variant="outlined"
                className="form-control-bg"
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <SingleSelectComponent
                fullWidth={true}
                required={true}
                id="resourceTypeSelect"
                labelId="resourceType"
                name="resource_type"
                value={formFields?.resource_type}
                label="Select Resource Type"
                onChange={set2}
                inputProps={{ "data-testid": "resource_type" }}
                options={resourceTypeOptions}
                mappingKeys={["id", "value"]}
                size="small"
                className="form-control-bg"
              />
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>

          <Grid container spacing={2} marginBottom={5}>
            <Grid item xs={4}>
              <SingleSelectComponent
                fullWidth={true}
                required={true}
                id="resourceDisorderSelect"
                labelId="resourceDisorder"
                name="disorder_id"
                value={formFields?.disorder_id}
                label="Select Disorder"
                onChange={set2}
                inputProps={{ "data-testid": "disorder_id" }}
                options={(disorderData && disorderData.getAllDisorder) || []}
                mappingKeys={["_id", "disorder_name"]}
                size="small"
                className="form-control-bg"
              />
            </Grid>
            <Grid item xs={4}>
              <SingleSelectComponent
                fullWidth={true}
                required={true}
                id="modelTypeSelect"
                labelId="modelType"
                name="model_id"
                value={formFields?.model_id}
                label="Select Model"
                onChange={set2}
                inputProps={{ "data-testid": "model_id" }}
                options={(modelData && modelData?.getModelByDisorderId) || []}
                mappingKeys={["_id", "model_name"]}
                size="small"
                className="form-control-bg"
              />
            </Grid>
            <Grid item xs={4}>
              <SingleSelectComponent
                fullWidth={true}
                id="categorySelect"
                labelId="category"
                name="category_id"
                value={formFields?.category_id}
                label="Select Category (Optional)"
                onChange={set2}
                inputProps={{ "data-testid": "category_id" }}
                options={
                  (categoryData && categoryData.getCategoryByModelId) || []
                }
                mappingKeys={["_id", "category_name"]}
                size="small"
                className="form-control-bg"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} marginBottom={5}>
            <Grid item xs={12}>
              <TextFieldComponent
                name="resource_desc"
                id="descrption"
                label="Description"
                value={formFields?.resource_desc}
                multiline
                rows={4}
                onChange={set2}
                inputProps={{ "data-testid": "resource_desc" }}
                fullWidth={true}
                className="form-control-bg"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} marginBottom={5}>
            <Grid item xs={12}>
              <TextFieldComponent
                name="resource_instruction"
                id="instructions"
                label="Instructions"
                value={formFields?.resource_instruction}
                multiline
                rows={4}
                onChange={set2}
                inputProps={{ "data-testid": "resource_instruction" }}
                fullWidth={true}
                className="form-control-bg"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} marginBottom={5}>
            <Grid item xs={12}>
              <TextFieldComponent
                name="resource_references"
                id="references"
                label="References"
                value={formFields?.resource_references}
                multiline
                rows={4}
                onChange={set2}
                inputProps={{ "data-testid": "resource_references" }}
                fullWidth={true}
                className="form-control-bg"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} marginBottom={5}>
            <Grid item xs={3}>
              <SingleSelectComponent
                fullWidth={true}
                id="agendaSelect"
                labelId="agenda"
                name="agenda_id"
                value={formFields?.agenda_id}
                label="Suggested Agenda"
                onChange={set2}
                inputProps={{ "data-testid": "agenda" }}
                options={
                  (agendaData && agendaData.getAgendaByDisorderAndModel) || []
                }
                mappingKeys={["_id", "agenda_name"]}
                size="small"
                className="form-control-bg"
              />
            </Grid>
            <Grid item xs={7}>
              <Box display="flex" alignItems="center">
                <UploadButtonComponent
                  variant="contained"
                  name="RESOURCE_FILENAME"
                  inputProps={{ "data-testid": "resource_file_upload" }}
                  onChange={fileOnChange}
                  fileName={selectedFile?.name}
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} marginBottom={5}>
            <Grid item xs={12}>
              <Box display="flex">
                <FormControl
                  sx={{
                    m: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  variant="standard"
                >
                  <FormLabel required={true} sx={{ mr: 1 }}>
                    Select the Availability of Resource:
                  </FormLabel>
                  <FormGroup aria-label="position" row>
                    <CheckBoxLabelComponent
                      value="1"
                      name="resource_avail_admin"
                      onChange={setCheckBox}
                      label="Admin"
                      placement="end"
                      inputProps={{ "data-testid": "resource_avail_admin" }}
                      checked={formFields.resource_avail_admin}
                      size="small"
                    />
                    <CheckBoxLabelComponent
                      value="1"
                      name="resource_avail_therapist"
                      onChange={setCheckBox}
                      label="All Therapists"
                      placement="end"
                      inputProps={{ "data-testid": "resource_avail_therapist" }}
                      checked={formFields.resource_avail_therapist}
                      size="small"
                    />
                    <CheckBoxLabelComponent
                      value="1"
                      name="resource_avail_onlyme"
                      onChange={setCheckBox}
                      label="Only Me"
                      placement="end"
                      inputProps={{ "data-testid": "resource_avail_onlyme" }}
                      checked={formFields.resource_avail_onlyme}
                      size="small"
                    />
                    <CheckBoxLabelComponent
                      value="1"
                      name="resource_avail_all"
                      onChange={setCheckBox}
                      label="Everyone"
                      placement="end"
                      inputProps={{ "data-testid": "resource_avail_all" }}
                      checked={formFields.resource_avail_all}
                      size="small"
                    />
                  </FormGroup>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <SureModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            setConfirmSubmission={setConfirmSubmission}
          >
            <Box marginTop="20px" display="flex" justifyContent="end">
              <Button
                variant="contained"
                color="inherit"
                size="small"
                data-testid="addResourceModalCancelButton"
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                color="error"
                variant="contained"
                sx={{ marginLeft: "5px" }}
                size="small"
                data-testid="addResourceModalConfirmButton"
                onClick={() => {
                  setModalOpen(false);
                  uploadFile();
                }}
              >
                Confirm
              </Button>
            </Box>
          </SureModal>
          <Grid container spacing={2} marginBottom={5}>
            <Grid item xs={12} textAlign="center">
              <Button
                data-testid="addResourceSubmitButton"
                variant="contained"
                type="submit"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
}
