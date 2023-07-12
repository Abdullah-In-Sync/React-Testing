import React, { FormEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Typography,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  GET_AGENDA_BY_DISORDER_AND_MODEL_DATA,
  GET_CATEGORY_BY_MODELID_DATA,
  GET_DISORDER_DATA_BY_ORG_ID,
  GET_MODEL_BY_DISORDERID_DATA,
} from "../../../graphql/query/common";
import {
  GET_UPLOAD_RESOURCE_URL,
  GET_UPLOAD_LOGO_URL,
} from "../../../graphql/query/resource";
import { useSnackbar } from "notistack";
import TextFieldComponent from "../../common/TextField/TextFieldComponent";
import SingleSelectComponent from "../../common/SelectBox/SingleSelect/SingleSelectComponent";
import UploadButtonComponent from "../../common/UploadButton/UploadButtonComponent";
import { getUpdatedFileName, uploadToS3 } from "../../../lib/helpers/s3";
import CheckBoxLabelComponent from "../../common/CheckBoxs/CheckBoxLabel/CheckBoxLabelComponent";
import SureModal from "./SureModal";
import { addResourceFormField } from "../../../utility/types/resource_types";
import { GET_ORG_DATA } from "../../../graphql/query";
import { useAppContext } from "../../../contexts/AuthContext";
import MultiSelectComponent from "../../common/SelectBox/MultiSelect/MutiSelectComponent";
import ContentHeader from "../../common/ContentHeader";
import ConfirmationModal from "../../common/ConfirmationModal";

const defaultFormValue = {
  resource_name: "",
  resource_type: 0,
  disorder_id: "",
  org_id: "",
  model_id: "",
  category_id: "",
  resource_desc: "",
  resource_instruction: "",
  resource_references: "",
  resource_avail_onlyme: 0,
  resource_avail_therapist: 0,
  agenda_id: "",
  file_name: "invalid.pdf",
  uploadFile: null,
  uploadFileURL: "",
  formulation_avail_for: "",
};

type propTypes = {
  resourceType: "add" | "create";
  onSubmit?: any;
  setLoader: any;
  formulationSubmit?: any;
};

export default function AddForm(props: propTypes) {
  const {
    user: { user_type: userType, therapist_data: { org_id: orgId = "" } = {} },
  } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();
  const [formFields, setFormFields] = useState<addResourceFormField>({
    ...defaultFormValue,
    org_id: orgId,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmSubmission, setConfirmSubmission] = useState<boolean>(false);
  const [checkCompleteCheckBox, setCheckCompleteCheckbox] = useState<any>();
  const [isConfirm, setIsConfirm] = useState(false);

  console.log("Koca: checkCompleteCheckBox ", checkCompleteCheckBox);

  const resourceTypeOptions = [
    { id: 1, value: "Info Sheets" },
    { id: 2, value: "Work Sheets" },
    { id: 3, value: "Audio File" },
    { id: 4, value: "Video File" },
  ];

  const { data: uploadResourceURL } = useQuery(GET_UPLOAD_RESOURCE_URL, {
    variables: {
      fileName: formFields.file_name,
    },
  });

  const { data: uploadFormulationURL } = useQuery(GET_UPLOAD_LOGO_URL, {
    variables: {
      fileName: formFields && formFields.file_name,
      imageFolder: "formulation",
    },
  });

  const [getOrgData, { data: orgData }] = useLazyQuery(GET_ORG_DATA, {
    onCompleted: () => {
      /* istanbul ignore next */
      props.setLoader(false);
    },
  });

  const [getDisorderByOrgId, { data: disorderData }] = useLazyQuery(
    GET_DISORDER_DATA_BY_ORG_ID,
    {
      onCompleted: () => {
        /* istanbul ignore next */
        props.setLoader(false);
      },
    }
  );

  const [getModelByDisorderId, { data: modelData }] = useLazyQuery(
    GET_MODEL_BY_DISORDERID_DATA,
    {
      onCompleted: () => {
        /* istanbul ignore next */
        props.setLoader(false);
      },
    }
  );

  const [getCategoryByModelId, { data: categoryData }] = useLazyQuery(
    GET_CATEGORY_BY_MODELID_DATA,
    {
      onCompleted: () => {
        /* istanbul ignore next */
        props.setLoader(false);
      },
    }
  );

  const [getAgendaByDisorderModelId, { data: agendaData }] = useLazyQuery(
    GET_AGENDA_BY_DISORDER_AND_MODEL_DATA,
    {
      onCompleted: () => {
        /* istanbul ignore next */
        props.setLoader(false);
      },
    }
  );

  useEffect(() => {
    /* istanbul ignore next */
    props.setLoader(true);
    if (userType == "admin") {
      getOrgData();
    }
  }, []);

  useEffect(() => {
    if (formFields.org_id) {
      props.setLoader(true);
      setFormFields((oldValues) => ({
        ...oldValues,
        disorder_id: "",
        model_id: "",
        category_id: "",
        agenda_id: "",
      }));
      getDisorderByOrgId({
        variables: { orgId: formFields.org_id },
      });
    }
  }, [formFields.org_id]);

  useEffect(() => {
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

  /* istanbul ignore next */
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
    setFormFields((oldValues) => ({
      ...oldValues,
      [name]: Math.abs(oldValues[name] - 1),
    }));
  };

  const setFormulationCheckbox = () => {
    setCheckCompleteCheckbox(1);
  };

  const fileOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    /* istanbul ignore next */
    const fileObj = event.target.files && event.target.files[0];
    const { fileName } = getUpdatedFileName(event.target.files[0]);
    props.setLoader(true);
    /* istanbul ignore next */
    if (!fileName) {
      return;
    }
    /* istanbul ignore next */
    setSelectedFile(fileObj);
    setFormFields((oldValues) => ({ ...oldValues, ["file_name"]: fileName }));
    props.setLoader(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    /* istanbul ignore next */
    e.preventDefault();
    /* istanbul ignore next */
    if (!selectedFile?.name) {
      enqueueSnackbar("Please select a file", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return;
    }
    /* istanbul ignore next */
    if (
      !formFields.resource_avail_onlyme &&
      !formFields.resource_avail_therapist &&
      !formFields.formulation_avail_for
    ) {
      /* istanbul ignore next */
      enqueueSnackbar("Please select availability of resource", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return;
    }
    /* istanbul ignore next */

    if (checkCompleteCheckBox === 1) {
      setIsConfirm(true);
    } else {
      setModalOpen(true);
    }
    /* istanbul ignore next */
    if (!confirmSubmission) return;
  };

  /* istanbul ignore next */
  // const uploadFile: any = async () => {
  //   /* istanbul ignore next */
  //   try {
  //     /* istanbul ignore next */
  //     props.setLoader(true);

  //     if (
  //       uploadResourceURL &&
  //       uploadResourceURL?.getUploadResourceUrl &&
  //       uploadResourceURL?.getUploadResourceUrl.resource_upload
  //     ) {
  //       const uploadStatus = await uploadToS3(
  //         selectedFile,
  //         uploadResourceURL.getUploadResourceUrl.resource_upload
  //       );
  //       /* istanbul ignore else */
  //       if (uploadStatus) {
  //         props.onSubmit(formFields);
  //       } else {
  //         enqueueSnackbar("There is an error with file upload!", {
  //           variant: "error",
  //           autoHideDuration: 2000,
  //         });
  //       }
  //       /* istanbul ignore next */
  //       props.setLoader(false);
  //     } else {
  //       /* istanbul ignore next */
  //       props.setLoader(false);
  //       /* istanbul ignore next */
  //       enqueueSnackbar("Please select file!", {
  //         variant: "error",
  //         autoHideDuration: 2000,
  //       });
  //     }
  //   } catch (e) {
  //     /* istanbul ignore next */
  //     props.setLoader(false);
  //     enqueueSnackbar("Please fill the all fields", {
  //       variant: "error",
  //       autoHideDuration: 2000,
  //     });
  //   }
  // };

  const uploadFileToS3 = async (
    selectedFile,
    uploadUrl,
    props,
    formFields,
    successCallback
  ) => {
    try {
      props.setLoader(true);

      if (uploadUrl) {
        const uploadStatus = await uploadToS3(selectedFile, uploadUrl);
        if (uploadStatus) {
          successCallback(formFields);
        } else {
          enqueueSnackbar("There is an error with file upload!", {
            variant: "error",
            autoHideDuration: 2000,
          });
        }
      } else {
        enqueueSnackbar("Please select file!", {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    } catch (e) {
      enqueueSnackbar("Please fill all the fields", {
        variant: "error",
        autoHideDuration: 2000,
      });
    } finally {
      props.setLoader(false);
    }
  };

  const uploadFile = async () => {
    await uploadFileToS3(
      selectedFile,
      uploadResourceURL?.getUploadResourceUrl?.resource_upload,
      props,
      formFields,
      props.onSubmit
    );
  };

  const uploadFileFormulation = async () => {
    await uploadFileToS3(
      selectedFile,
      uploadFormulationURL?.getFileUploadUrl?.upload_file_url,
      props,
      formFields,
      props.formulationSubmit
    );
  };

  const clearIsConfirmCancel = () => {
    /* istanbul ignore next */
    setIsConfirm(false);
  };

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    const value = parseInt(event.target.value);

    setFormFields((prevFormFields) => ({
      ...prevFormFields,
      formulation_avail_for: checked
        ? [...prevFormFields.formulation_avail_for, value]
        : prevFormFields.formulation_avail_for.filter((v) => v !== value),
    }));
  };

  const csvDecode = (csvString) => (csvString ? csvString.split(",") : []);
  const handleChange = (event) => {
    const value = event.target.value as string[];

    if (value[value.length - 1] === "all") {
      const updatedSelected = [
        "all",
        // eslint-disable-next-line no-unsafe-optional-chaining
        ...orgData?.getOrganizationData?.map((org) => org._id),
      ];

      setFormFields((oldValues) => ({
        ...oldValues,
        org_id: updatedSelected.join(","),
      }));
      return;
    } else if (
      value.length === orgData?.getOrganizationData?.length &&
      value?.indexOf("all") === -1
    ) {
      setFormFields((oldValues) => ({
        ...oldValues,
        org_id: "",
      }));
    } else {
      setFormFields({
        ...formFields,
        org_id: [...value].filter((v) => v != "all").join(","),
      });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} data-testid="resource-add-form">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <ContentHeader title="Add Resource" />
          </Grid>

          <Grid item>
            <FormControl data-testid="complete_checkbox">
              <FormGroup aria-label="position">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    onChange={setFormulationCheckbox}
                    checked={checkCompleteCheckBox === 1 ? true : false}
                    data-testid="formulation_checkbox"
                    label={
                      <Grid>
                        <Typography
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          Formulation
                        </Typography>
                      </Grid>
                    }
                  />
                </FormGroup>
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>

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
            {checkCompleteCheckBox !== 1 ? (
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
            ) : null}

            {userType == "admin" ? (
              <Grid item xs={4}>
                <MultiSelectComponent
                  fullWidth
                  required={true}
                  onChange={handleChange}
                  id="resourceOrgSelect"
                  labelId="resourceOrg"
                  name="org_id"
                  label="Select Organization"
                  options={[
                    ...[{ _id: "all", name: "Select All" }],
                    ...((orgData && orgData?.getOrganizationData) || []),
                  ]}
                  mappingKeys={["_id", "name"]}
                  size="small"
                  className="form-control-bg multiSelect"
                  extraProps={{ "data-testid": "mainOrganizationSelect" }}
                  multiSelect={csvDecode(formFields?.org_id)}
                  value={csvDecode(formFields?.org_id)}
                />
              </Grid>
            ) : (
              <Grid item xs={4}></Grid>
            )}
          </Grid>

          {checkCompleteCheckBox !== 1 ? (
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
                  options={
                    (disorderData && disorderData.getDisorderByOrgId) || []
                  }
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
          ) : null}

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

          {checkCompleteCheckBox !== 1 ? (
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
          ) : null}

          <Grid container spacing={2} marginBottom={5}>
            {checkCompleteCheckBox !== 1 ? (
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
            ) : (
              <Typography style={{ paddingTop: "25px", paddingLeft: "20px" }}>
                Uplodad Formulation :
              </Typography>
            )}

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

          {checkCompleteCheckBox == 1 ? (
            <Box>
              <FormLabel required={true} sx={{ mr: 1 }}>
                Select the Availability of Resource:
              </FormLabel>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      formFields.formulation_avail_for?.includes(1) || false
                    }
                    onChange={handleCheckboxChange}
                    name="allTherapists"
                    value={1}
                  />
                }
                label="All Therapists"
              />
              <FormControlLabel
                data-testid="resource_avail_onlyme"
                control={
                  <Checkbox
                    checked={
                      formFields.formulation_avail_for?.includes(2) || false
                    }
                    onChange={handleCheckboxChange}
                    name="onlyMe"
                    value={2}
                  />
                }
                label="Only me"
              />
            </Box>
          ) : (
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
                        name="resource_avail_therapist"
                        onChange={setCheckBox}
                        label="All Therapists"
                        placement="end"
                        inputProps={{
                          "data-testid": "resource_avail_therapist",
                        }}
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
                    </FormGroup>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          )}
          <SureModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            setConfirmSubmission={setConfirmSubmission}
          >
            <Typography
              sx={{
                fontWeight: "600",
                textAlign: "center",
                fontSize: "27px",
              }}
            >
              Are you sure want to add this resource?
            </Typography>
            <Box marginTop="20px" display="flex" justifyContent="end">
              <Button
                variant="contained"
                color="inherit"
                size="small"
                data-testid="addResourceModalCancelButton"
                onClick={() => {
                  /* istanbul ignore next */
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
                  /* istanbul ignore next */
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
                style={{
                  paddingRight: "40px",
                  paddingLeft: "40px",
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>

      {isConfirm && (
        <ConfirmationModal
          label="Are you sure you want to add this formulation?"
          onCancel={clearIsConfirmCancel}
          onConfirm={() => {
            /* istanbul ignore next */
            uploadFileFormulation();
          }}
        />
      )}
    </>
  );
}
