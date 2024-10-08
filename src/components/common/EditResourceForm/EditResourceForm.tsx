import React, { FormEvent, useEffect, useRef, useState } from "react";
import useLayoutEffect from "../hooks/use-isomorphic-layout-effect";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Typography,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import { useLazyQuery } from "@apollo/client";
import {
  GET_AGENDA_BY_DISORDER_AND_MODEL_DATA,
  GET_CATEGORY_BY_MODELID_DATA,
  GET_DISORDER_DATA_BY_ORG_ID,
  GET_MODEL_BY_DISORDERID_DATA,
} from "../../../graphql/query/common";
import {
  GET_RESOURCE_DETAIL,
  GET_UPLOAD_RESOURCE_URL,
} from "../../../graphql/query/resource";
import { useSnackbar } from "notistack";
import TextFieldComponent from "../../common/TextField/TextFieldComponent";
import SingleSelectComponent from "../../common/SelectBox/SingleSelect/SingleSelectComponent";
import UploadButtonComponent from "../../common/UploadButton/UploadButtonComponent";
import { getUpdatedFileName, uploadToS3 } from "../../../lib/helpers/s3";
import CheckBoxLabelComponent from "../../common/CheckBoxs/CheckBoxLabel/CheckBoxLabelComponent";
import { editResourceFormField } from "../../../utility/types/resource_types";
import SureModal from "../../admin/resource/SureModal";
import Link from "@mui/material/Link";
import Loader from "../Loader";
import TemplateTable from "../../templateTable";
import { SelectTemplateModal } from "../CreateResource/selectTemplateModal";
import {
  TableDimensionFormData,
  TableDimensionModal,
} from "../CreateResource/tableDimensionModal";
import { AddButton } from "../Buttons";
import { TemplateFormData } from "../../templateTable/table.model";
import { useAppContext } from "../../../contexts/AuthContext";
import { GET_ORG_DATA } from "../../../graphql/query";
import TemplateArrow from "../../templateArrow";

const defaultFormValue = {
  _id: "",
  resource_name: "",
  resource_type: 2,
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
  file_name: "",
  uploadFile: null,
  uploadFileURL: "",
  disorder_detail: "",
  model_detail: "",
  resource_url: null,
  download_resource_url: "",
};

/* istanbul ignore next */
type propTypes = {
  resourceType: "edit" | "update";
  onSubmit?: any;
  setLoader: any;
};

export default function EditForm(props: propTypes) {
  const {
    user: { user_type: userType, therapist_data: { org_id: orgId = "" } = {} },
  } = useAppContext();
  const router = useRouter();
  const id = router?.query.id as string;
  const { enqueueSnackbar } = useSnackbar();

  const [formFields, setFormFields] = useState<editResourceFormField>({
    ...defaultFormValue,
    org_id: orgId,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmSubmission, setConfirmSubmission] = useState<boolean>(false);
  //useState for prefilled input data
  const preSignedURL = useRef<string>(null);
  const [resId, setResId] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [templateModal, setTemplateModal] = useState<boolean>(false);
  const [dimensionModal, setDimensionModal] = useState<boolean>(false);
  const [selectedComponentType, setSelectedComponentType] = useState({
    type: null,
    initialData: undefined,
    info: undefined,
  });

  const resourceTypeOptions = [
    { id: 1, value: "Info Sheets" },
    { id: 2, value: "Work Sheets" },
    { id: 3, value: "Audio File" },
    { id: 4, value: "Video File" },
  ];

  /* istanbul ignore next */
  const [getOrgData, { data: orgData }] = useLazyQuery(GET_ORG_DATA, {
    onCompleted: () => {
      props.setLoader(false);
    },
  });

  const [getDisorderByOrgId, { data: disorderData }] = useLazyQuery(
    GET_DISORDER_DATA_BY_ORG_ID,
    {
      onCompleted: () => {
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

  /* istanbul ignore next */
  const [getPreSignedURL] = useLazyQuery(GET_UPLOAD_RESOURCE_URL, {
    onCompleted: (data) => {
      props.setLoader(false);
      if (
        data &&
        data?.getUploadResourceUrl &&
        data?.getUploadResourceUrl.resource_upload
      ) {
        handleFileChange(
          formFields?.uploadFile,
          data.getUploadResourceUrl.resource_upload
        );
      }
    },
  });

  //FOR PREFILLED INPUT
  const [
    getResourceData,
    { loading: resourceLoading, data: resourceData, refetch },
  ] = useLazyQuery(GET_RESOURCE_DETAIL, {
    onCompleted: (data) => {
      /* istanbul ignore next */
      if (data!.getResourceById?.data) {
        setResId(data!.getResourceById["data"][0]?._id);
      } else if (data!.getResourceById?.data == null) {
        setLoader(false);
      }
    },
  });

  const onTemplateSelect = (values: any) => {
    /* istanbul ignore else*/
    if (values.component_name == "TemplateTable") {
      setTemplateModal(false);
      setDimensionModal(true);
      setSelectedComponentType({ ...selectedComponentType, info: values });
    }
    /* istanbul ignore else*/
    if (values.component_name == "ArrowTemplate") {
      setTemplateModal(false);
      setSelectedComponentType({
        ...selectedComponentType,
        type: values.component_name,
        info: values,
      });
    }
  };

  const onGenerateTable = (values: TableDimensionFormData) => {
    const initialData: TemplateFormData = { rows: [] };

    /* istanbul ignore next */
    for (let j = 0; j < values.rows; j++) {
      initialData.rows.push({
        height: "200px",
        cells: Array.from({ length: values.cols }, () => ({
          type: "",
          width: "600px",
        })),
      });
    }

    /* istanbul ignore next */
    setSelectedComponentType({
      ...selectedComponentType,
      type: "TemplateTable",
      initialData: initialData,
    });

    setDimensionModal(false);
  };

  /* istanbul ignore next */
  const onTemplateSave = (value) => {
    setFormFields({
      ...formFields,
      template_data: JSON.stringify(value),
      template_id: selectedComponentType?.info?._id,
    });
    setModalOpen(true);
  };

  /* istanbul ignore next */
  const onTemplateCancel = () => {
    setSelectedComponentType({
      type: "",
      initialData: {},
      info: null,
    });
    setFormFields({
      ...formFields,
      template_data: "",
      template_id: "",
    });
  };

  const onSaveArrowTemplate = (arrowTemplateData: string) => {
    /* istanbul ignore next */
    setFormFields({
      ...formFields,
      template_data: arrowTemplateData,
      template_id: selectedComponentType?.info?._id,
    });
    setModalOpen(true);
  };

  useEffect(() => {
    props.setLoader(true);
    /* istanbul ignore next */
    if (userType == "admin") {
      getOrgData();
    }
  }, []);

  const onPreview = (values) => {
    /* istanbul ignore next */
    sessionStorage.setItem(
      resourceData?.getResourceById["data"][0]?._id,
      JSON.stringify({ data: values, name: formFields.resource_name })
    );
    /* istanbul ignore next */
    window.open(
      `/template/preview/${resourceData?.getResourceById["data"][0]?._id}`,
      "_blank"
    );
  };

  useLayoutEffect(() => {
    return () => {
      refetch();
    };
  }, []);

  useEffect(() => {
    /* istanbul ignore next */
    if (!resourceLoading && resourceData) {
      setLoader(false);
      if (resourceData?.getResourceById["data"][0]?.resource_issmartdraw == 1) {
        setSelectedComponentType({
          info: resourceData?.getResourceById["data"][0]?.template_detail,
          type: resourceData?.getResourceById["data"][0]?.template_detail
            ?.component_name,
          initialData: JSON.parse(
            resourceData?.getResourceById["data"][0]?.template_data
          ),
        });
      }
    }
  }, [resId]);

  useEffect(() => {
    /* istanbul ignore next */
    setLoader(true);
    getResourceData({
      variables: { resourceId: id },
    });
    setLoader(false);
  }, []);

  // add resource data to the state
  useEffect(() => {
    const data = resourceData?.getResourceById["data"][0];
    /* istanbul ignore next */
    if (data) {
      setFormFields(data);
    }
  }, [resourceData]);

  useEffect(() => {
    /* istanbul ignore next */
    const orgId =
      formFields.org_id === undefined
        ? resourceData?.getResourceById["data"][0]?.org_id
        : formFields.org_id;
    /* istanbul ignore next */
    if (orgId) {
      setFormFields((oldValues) => ({
        ...oldValues,
        org_id: orgId,
        model_id: "",
        disorder_id: "",
        category_id: "",
      }));
      getDisorderByOrgId({
        variables: { orgId },
      });
    }
  }, [formFields?.org_id]);

  useEffect(() => {
    /* istanbul ignore next */
    const disorderId =
      formFields.disorder_id === undefined
        ? resourceData?.getResourceById["data"][0]?.disorder_detail._id
        : formFields.disorder_id;
    /* istanbul ignore next */
    if (disorderId) {
      setFormFields((oldValues) => ({
        ...oldValues,
        disorder_id: disorderId,
        category_id: "",
      }));
      getModelByDisorderId({
        variables: { disorderId },
      });
    }
  }, [formFields?.disorder_id]);

  useEffect(() => {
    /* istanbul ignore next */
    const disorderId =
      formFields.disorder_id === undefined
        ? resourceData?.getResourceById["data"][0]?.disorder_detail._id
        : formFields.disorder_id;
    /* istanbul ignore else */
    const modelId =
      formFields.model_id === undefined
        ? resourceData?.getResourceById["data"][0]?.model_detail._id
        : formFields.model_id;
    /* istanbul ignore next */
    if (disorderId && modelId) {
      setFormFields((oldValues) => ({
        ...oldValues,
        model_id: modelId,
      }));
      getCategoryByModelId({
        variables: { modelId },
      });
      getAgendaByDisorderModelId({
        variables: {
          disorderId,
          modelId,
        },
      });
    }
  }, [formFields?.disorder_id, formFields?.model_id]);

  useEffect(() => {
    /* istanbul ignore next */
    const categoryId =
      formFields.category_id === undefined
        ? resourceData?.getResourceById["data"][0]?.category_id._id
        : formFields.category_id;
    const modelId =
      formFields.model_id === undefined
        ? resourceData?.getResourceById["data"][0]?.model_detail._id
        : formFields.model_id;
    /* istanbul ignore next */
    if (modelId && categoryId) {
      setFormFields((oldValues) => ({
        ...oldValues,
        category_id: categoryId,
      }));
    }
  }, [formFields?.model_id, formFields?.category_id]);

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

  const fileOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0];
    /* istanbul ignore next */
    if (!fileObj) {
      return;
    }
    const { fileName } = getUpdatedFileName(event.target.files[0]);
    // try {
    props.setLoader(true);
    formFields.uploadFile = fileObj;
    formFields.file_name = fileName;
    setSelectedFile(fileObj);
    setFormFields((oldValues) => ({ ...oldValues, ["uploadFile"]: fileObj }));
    setFormFields((oldValues) => ({ ...oldValues, ["file_name"]: fileName }));

    getPreSignedURL({
      variables: { fileName: fileName },
    });
    props.setLoader(false);
  };

  /* istanbul ignore next */
  const handleFileChange = (fileObj: File, url: string) => {
    setSelectedFile(fileObj);
    /* istanbul ignore next */
    preSignedURL.current = url;
  };

  /* istanbul ignore next */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* istanbul ignore next */
    if (
      !formFields?.resource_avail_onlyme &&
      !formFields?.resource_avail_therapist
    ) {
      enqueueSnackbar("Please select availability of resource", {
        variant: "error",
      });
      return;
    }
    /* istanbul ignore else*/
    if (resourceData?.getResourceById["data"][0]?.resource_issmartdraw == 1) {
      setTemplateModal(true);
    } else {
      setModalOpen(true);
    }
    /* istanbul ignore next */
    if (!confirmSubmission) return;
  };

  const uploadFile = async () => {
    /* istanbul ignore next */
    try {
      props.setLoader(true);
      /* istanbul ignore next */
      if (preSignedURL.current && formFields?.resource_issmartdraw != "1") {
        const uploadStatus = await uploadToS3(
          /* istanbul ignore next */
          selectedFile,
          preSignedURL.current
        );
        /* istanbul ignore next */
        if (uploadStatus) {
          props.onSubmit(formFields);
        } else {
          enqueueSnackbar("There is an error with file upload!", {
            variant: "error",
          });
        }
        /* istanbul ignore next */
        props.setLoader(false);
      } else {
        props.onSubmit(formFields);
        props.setLoader(false);
      }
    } catch (e) {
      /* istanbul ignore next */
      props.setLoader(false);
    }
  };

  return (
    <>
      <Loader visible={loader} />

      <Box
        sx={{ flexGrow: 1, border: "1px solid #cecece" }}
        p={5}
        borderRadius="7px"
      >
        <>
          <form onSubmit={handleSubmit} data-testid="resource-edit-form">
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
              {userType == "admin" ? (
                <Grid item xs={4}>
                  <SingleSelectComponent
                    fullWidth={true}
                    required={true}
                    id="resourceOrgSelect"
                    labelId="resourceOrg"
                    name="org_id"
                    value={formFields?.org_id}
                    label="Select Organization"
                    onChange={set2}
                    inputProps={{ "data-testid": "org_id" }}
                    options={(orgData && orgData?.getOrganizationData) || []}
                    mappingKeys={["_id", "name"]}
                    size="small"
                    className="form-control-bg"
                    disabled={true}
                  />
                </Grid>
              ) : (
                <Grid item xs={4}></Grid>
              )}
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
                  inputProps={{ "data-testid": "agenda_id" }}
                  options={
                    (agendaData && agendaData.getAgendaByDisorderAndModel) || []
                  }
                  mappingKeys={["_id", "agenda_name"]}
                  size="small"
                  className="form-control-bg"
                />
              </Grid>
              {resourceData?.getResourceById?.data != null &&
              resourceData?.getResourceById["data"][0]?.resource_issmartdraw !=
                1 ? (
                <Grid item xs={7}>
                  Upload Resource :{" "}
                  <Link
                    data-testid="edit-upload-file"
                    href={resourceData?.getResourceById["data"][0].resource_url}
                    underline="none"
                    target="_blank"
                  >
                    {
                      resourceData?.getResourceById["data"][0]
                        ?.resource_filename
                    }
                  </Link>
                </Grid>
              ) : (
                ""
              )}
              {resourceData?.getResourceById["data"][0]?.resource_issmartdraw !=
                1 && (
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
              )}
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
                        name="resource_avail_therapist"
                        onChange={setCheckBox}
                        label="All Therapists"
                        placement="end"
                        inputProps={{
                          "data-testid": "resource_avail_therapist",
                        }}
                        checked={formFields?.resource_avail_therapist}
                        size="small"
                      />
                      <CheckBoxLabelComponent
                        value="1"
                        name="resource_avail_onlyme"
                        onChange={setCheckBox}
                        label="Only Me"
                        placement="end"
                        inputProps={{
                          "data-testid": "resource_avail_onlyme",
                        }}
                        checked={formFields?.resource_avail_onlyme}
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
              <Typography
                sx={{
                  fontWeight: "600",
                  textAlign: "center",
                  fontSize: "27px",
                }}
              >
                Are you sure want to edit this resource?
              </Typography>
              <Box marginTop="20px" display="flex" justifyContent="end">
                <Button
                  variant="contained"
                  color="inherit"
                  size="small"
                  data-testid="editResourceModalCancelButton"
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
                  data-testid="editResourceModalConfirmButton"
                  onClick={() => {
                    setModalOpen(false);
                    uploadFile();
                  }}
                >
                  Confirm
                </Button>
              </Box>
            </SureModal>
            {resourceData?.getResourceById["data"][0]?.resource_issmartdraw !=
              1 && (
              <Grid container spacing={2} marginBottom={5}>
                <Grid item xs={12} textAlign="center">
                  <Button
                    data-testid="editResourceSubmitButton"
                    variant="contained"
                    type="submit"
                  >
                    Save Edit
                  </Button>
                </Grid>
              </Grid>
            )}
            {resourceData?.getResourceById["data"][0]?.resource_issmartdraw ==
              1 && (
              <Grid container spacing={2} marginBottom={5}>
                <Grid item xs={12} textAlign="center">
                  <AddButton
                    data-testid="selectTemplateButton"
                    variant="contained"
                    type="submit"
                    label="SELECT TEMPLATE*"
                  />
                </Grid>
              </Grid>
            )}
          </form>
        </>
        {templateModal && (
          <SelectTemplateModal
            isOpen={templateModal}
            setConfirmSubmission={setConfirmSubmission}
            onSubmit={onTemplateSelect}
            onModalClose={setTemplateModal}
          />
        )}
        {dimensionModal && (
          <TableDimensionModal
            isOpen={dimensionModal}
            setConfirmSubmission={setConfirmSubmission}
            onSubmit={(values) =>
              /* istanbul ignore next */ onGenerateTable(values)
            }
            onModalClose={setDimensionModal}
          />
        )}
        {selectedComponentType?.info != null && (
          <Box style={{ margin: "32px 0px 40px 0px" }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Montserrat",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "24px",
              }}
              color={"primary.main"}
            >
              {selectedComponentType?.info?.name}
            </Typography>
          </Box>
        )}
        {selectedComponentType.type == "TemplateTable" && (
          <TemplateTable
            initialData={selectedComponentType.initialData}
            mode="edit"
            onSubmit={onTemplateSave}
            onCancel={onTemplateCancel}
            onPreview={onPreview}
          />
        )}
        {selectedComponentType.type == "ArrowTemplate" && (
          <TemplateArrow
            nodesData={selectedComponentType.initialData.nodes}
            edgesData={selectedComponentType.initialData.edges}
            onSubmit={onSaveArrowTemplate}
            onCancel={onTemplateCancel}
            userType="fullAccess"
          />
        )}
      </Box>
    </>
  );
}
