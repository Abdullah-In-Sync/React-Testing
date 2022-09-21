import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Box, Button, FormControl, FormLabel, Grid } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import { useLazyQuery, useMutation } from "@apollo/client";
import Router from "next/router";
import { superadmin_routes } from "../../../utility/navItems";
import {
  GET_AGENDA_BY_DISORDER_AND_MODEL_DATA,
  GET_CATEGORY_BY_MODELID_DATA,
  GET_DISORDER_DATA,
  GET_MODEL_BY_DISORDERID_DATA,
} from "../../../graphql/query/common";
import { GET_UPLOAD_RESOURCE_URL } from "../../../graphql/query/resource";
import { useSnackbar } from "notistack";
import { ADMIN_CREATE_RESOURCE } from "../../../graphql/mutation/resource";
import Loader from "../../common/Loader";
import TextFieldComponent from "../../common/TextField/TextFieldComponent";
import SingleSelectComponent from "../../common/SelectBox/SingleSelect/SingleSelectComponent";
import UploadButtonComponent from "../../common/UploadButton/UploadButtonComponent";
import { getUpdatedFileName, uploadToS3 } from "../../../lib/helpers/s3";
import CheckBoxLabelComponent from "../../common/CheckBoxs/CheckBoxLabel/CheckBoxLabelComponent";
import SureModal from "./SureModal";

type resourceFormField = {
  resource_name: string;
  resource_type: string;
  disorder_id: string;
  model_id: string;
  category_id: string;
  resource_desc: string;
  resource_instruction: string;
  resource_references: string;
  agenda_id: string;
  // resource_session_no: string;
  file_name: string;
  resource_avail_admin: number;
  resource_avail_therapist: number;
  resource_avail_onlyme: number;
  resource_avail_all: number;
};

const defaultFormValue = {
  resource_name: "",
  resource_type: "",
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
  // resource_session_no: "",
  file_name: "",
};

export default function addForm() {
  const { enqueueSnackbar } = useSnackbar();
  const [formFields, setFormFields] =
    useState<resourceFormField>(defaultFormValue);
  const [loader, setLoader] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmSubmission, setConfirmSubmission] = useState<boolean>(false);
  const preSignedURL = useRef<string>(null);
  const resourceTypeOptions = [
    { id: "1", value: "Info Sheets" },
    { id: "2", value: "Work Sheets" },
    { id: "3", value: "Audio File" },
    { id: "4", value: "Video File" },
  ];

  const [getDisorderData, { loading: disorderLoading, data: disorderData }] =
    useLazyQuery(GET_DISORDER_DATA);

  const [getModelByDisorderId, { loading: modelLoading, data: modelData }] =
    useLazyQuery(GET_MODEL_BY_DISORDERID_DATA);

  const [
    getCategoryByModelId,
    { loading: categoryLoading, data: categoryData },
  ] = useLazyQuery(GET_CATEGORY_BY_MODELID_DATA);

  const [
    getAgendaByDisorderModelId,
    { loading: agendaLoading, data: agendaData },
  ] = useLazyQuery(GET_AGENDA_BY_DISORDER_AND_MODEL_DATA);

  const [getPreSignedURL, { loading: preSignedLoading, data: preSignedData }] =
    useLazyQuery(GET_UPLOAD_RESOURCE_URL);

  const [createResource] = useMutation(ADMIN_CREATE_RESOURCE);

  useEffect(() => {
    setLoader(true);
    getDisorderData();
  }, []);

  useEffect(() => {
    if (formFields.disorder_id) {
      setLoader(true);
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
    if (formFields.model_id) {
      setLoader(true);
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

  useEffect(() => {
    /* istanbul ignore else */
    if (
      !disorderLoading &&
      !modelLoading &&
      !categoryLoading &&
      !agendaLoading &&
      !preSignedLoading
    ) {
      setLoader(false);
    }
  }, [disorderData, modelData, categoryData, agendaData, preSignedData]);

  const set2 = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setFormFields((oldValues) => ({ ...oldValues, [fieldName]: value }));
    // if (fieldName === "agenda_id") {
    //   debugger;
    //   const index = agendaData.getAgendaByDisorderAndModel.findIndex(
    //     (p) => p._id == value
    //   );
    //   const session = agendaData.getAgendaByDisorderAndModel[index].session;
    //   setFormFields((oldValues) => ({
    //     ...oldValues,
    //     resource_session_no: session,
    //   }));
    // }
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

  const fileOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    const { fileName } = getUpdatedFileName(event.target.files[0]);
    try {
      const { data: preSignedData }: any = await getPreSignedURL({
        variables: { fileName: fileName },
      });
      if (
        preSignedData &&
        preSignedData?.getUploadResourceUrl &&
        preSignedData?.getUploadResourceUrl.resource_upload
      ) {
        handleFileChange(
          fileObj,
          fileName,
          preSignedData.getUploadResourceUrl.resource_upload
        );
      }
    } catch (error) {
      enqueueSnackbar("There is an error with file upload!", {
        variant: "error",
      });
      setLoader(false);
    }
  };

  const handleFileChange = (fileObj: File, fileName: string, url: string) => {
    setSelectedFile(fileObj);
    formFields.file_name = fileName;
    preSignedURL.current = url;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile?.name) {
      enqueueSnackbar("Please select a file", {
        variant: "error",
      });
      return;
    }

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
    if (!confirmSubmission) return;
  };

  const uploadFile = async () => {
    try {
      if (getPreSignedURL) {
        setLoader(true);
        const uploadStatus = await uploadToS3(
          selectedFile,
          preSignedURL.current
        );

        if (uploadStatus) {
          createResource({
            variables: {
              disorderId: formFields.disorder_id,
              modelId: formFields.model_id,
              resourceAvailAdmin: formFields.resource_avail_admin,
              resourceAvailAll: formFields.resource_avail_all,
              resourceAvailOnlyme: formFields.resource_avail_onlyme,
              resourceAvailTherapist: formFields.resource_avail_therapist,
              resourceFilename: formFields.file_name,
              resourceName: formFields.resource_name,
              resourceType: formFields.resource_type,
              agendaId: formFields.agenda_id,
              categoryId: formFields.category_id,
              orgId: "",
              resourceDesc: formFields.resource_desc,
              resourceInstruction: formFields.resource_instruction,
              resourceIsformualation: "0",
              resourceIssmartdraw: "0",
              resourceReferences: formFields.resource_references,
              resourceStatus: 1,
              userType: "admin",
              // resource_session_no: formFields.resource_session_no,
            },
            onCompleted: (data) => {
              if (data && data.createResource && data.createResource._id) {
                enqueueSnackbar("Resource added successfully", {
                  variant: "success",
                });
                Router.push(superadmin_routes[2].path);
              }
            },
          });
        } else {
          enqueueSnackbar("There is an error with file upload!", {
            variant: "error",
          });
        }
        setLoader(false);
      } else {
        setLoader(false);
        enqueueSnackbar("Please select file!", { variant: "error" });
      }
    } catch (e) {
      setLoader(false);
      enqueueSnackbar("Please fill the all fields", { variant: "error" });
    }
  };

  return (
    <>
      <Loader visible={loader} />
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
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
}
