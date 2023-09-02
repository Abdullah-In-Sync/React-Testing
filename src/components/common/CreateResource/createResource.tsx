/* eslint-disable no-unsafe-optional-chaining */
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Box, FormControl, FormLabel, Grid, Typography } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_AGENDA_BY_DISORDER_AND_MODEL_DATA,
  GET_CATEGORY_BY_MODELID_DATA,
  GET_DISORDER_DATA_BY_ORG_ID,
  GET_MODEL_BY_DISORDERID_DATA,
} from "../../../graphql/query/common";
import { useSnackbar } from "notistack";
import TextFieldComponent from "../../common/TextField/TextFieldComponent";
import SingleSelectComponent from "../../common/SelectBox/SingleSelect/SingleSelectComponent";
import CheckBoxLabelComponent from "../../common/CheckBoxs/CheckBoxLabel/CheckBoxLabelComponent";
import { AddButton } from "../Buttons";
import { SelectTemplateModal } from "./selectTemplateModal";
import {
  TableDimensionFormData,
  TableDimensionModal,
} from "./tableDimensionModal";
import { TemplateFormData } from "../../templateTable/table.model";
import TemplateTable from "../../templateTable";
import { FormikProps } from "formik";
import {
  CREATE_RESOURCE,
  CREATE_FORMULATION,
} from "../../../graphql/mutation/resource";
import { SuccessModal } from "../SuccessModal";
import { useRouter } from "next/router";
import { useAppContext } from "../../../contexts/AuthContext";
import { GET_ORG_DATA } from "../../../graphql/query";
import { IS_ADMIN, shareResourceAvailability } from "../../../lib/constants";
import TemplateArrow from "../../templateArrow";
import ContentHeader from "../ContentHeader";
import ConfirmationModal from "../ConfirmationModal";
import MultiSelectComponent from "../SelectBox/MultiSelect/MutiSelectComponent";
import InfoModal, { ConfirmInfoElement } from "../CustomModal/InfoModal";
import InfoMessageView from "../InfoMessageView";

type propTypes = {
  onSubmit?: any;
  setLoader: any;
};

interface CreateResourceInput {
  categoryId?: string;
  agendaId?: string;
  disorderId: string;
  modelId?: string;
  orgId?: string;
  resourceAvailOnlyme: string;
  resourceAvailTherapist: string;
  resourceDesc?: string;
  resourceFilename: string;
  resourceInstruction?: string;
  resourceIsformualation?: string;
  resourceIssmartdraw?: string;
  resourceName: string;
  resourceReferences?: string;
  resourceType: number;
  templateData?: string;
  templateId?: string;
  formulation?: number;
}

export default function CreateResource(props: propTypes) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const {
    user: { user_type: userType, therapist_data: { org_id: orgId = "" } = {} },
  } = useAppContext();
  const initialState = {
    disorderId: "",
    modelId: "",
    resourceAvailOnlyme: "0",
    resourceAvailTherapist: "0",
    resourceFilename: "",
    resourceName: "",
    resourceType: null,
    agendaId: "",
    categoryId: "",
    orgId: userType == "therapist" ? orgId : "",
    resourceIssmartdraw: "1",
    templateData: "",
    templateId: "",
    resourceDesc: "",
    resourceInstruction: "",
    resourceIsformualation: "",
    resourceReferences: "",
    formulation: 0,
  };
  const [formFields, setFormFields] =
    useState<CreateResourceInput>(initialState);
  const [confirmSubmission, setConfirmSubmission] = useState<boolean>(false);
  //useState for prefilled input data
  const [templateModal, setTemplateModal] = useState<boolean>(false);
  const [dimensionModal, setDimensionModal] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const infoModalRef = useRef<ConfirmInfoElement>(null);
  const [createFormulation] = useMutation(CREATE_FORMULATION);

  const [isConfirm, setIsConfirm] = useState<any>({
    status: false,
    message: "",
    storedFunction: null,
  });

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

  const [createResource] = useMutation(CREATE_RESOURCE, {
    /* istanbul ignore next */
    onCompleted: (data) => {
      /* istanbul ignore next */
      props.setLoader(false);
      /* istanbul ignore next */
      const {
        /* istanbul ignore next */
        createResource: { duplicateNames },
        /* istanbul ignore next */
      } = data;
      /* istanbul ignore next */
      if (duplicateNames != null) {
        /* istanbul ignore next */
        infoModalRef.current.openConfirm({
          data: {
            duplicateNames,
            message:
              "This Resource already exists in the following organisations! ",
          },
        });
      } else {
        /* istanbul ignore next */
        setSuccessModal(true);
      }
    },
  });

  const createFormulationSubmit = async (formFields) => {
    props.setLoader(true);
    try {
      await createFormulation({
        variables: formFields,
        onCompleted: (data) => {
          const {
            createFormulation: { result, duplicateNames },
          } = data;
          /* istanbul ignore next */
          if (result) {
            enqueueSnackbar("Formulation has been created successfully.", {
              variant: "success",
            });
            /* istanbul ignore next */
            if (userType == "therapist")
              router.push(`/${userType}/formulation/`);
            /* istanbul ignore next */ else
              router.push(`/${userType}/resource/?tab=formulation`);
            /* istanbul ignore next */
          } else if (duplicateNames) {
            /* istanbul ignore next */
            enqueueSnackbar("This formulation already exists!", {
              variant: "error",
            });
          }
          props.setLoader(false);
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      props.setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
    }
  };

  const [getModelByDisorderId, { data: modelData }] = useLazyQuery(
    GET_MODEL_BY_DISORDERID_DATA,
    {
      onCompleted: () => {
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
      onCompleted: () => {
        /* istanbul ignore next */
        props.setLoader(false);
      },
    }
  );

  const csvDecode = (csvString) => (csvString ? csvString.split(",") : []);

  useEffect(() => {
    /* istanbul ignore next */
    props.setLoader(true);
    /* istanbul ignore next */
    if (userType == IS_ADMIN) {
      getOrgData();
    }
  }, []);

  useEffect(() => {
    if (formFields.orgId) {
      props.setLoader(true);
      setFormFields((oldValues) => ({
        ...oldValues,
        disorder_id: "",
        model_id: "",
        category_id: "",
        agenda_id: "",
      }));
      /* istanbul ignore next */
      getDisorderByOrgId({
        /* istanbul ignore next */
        variables: { orgId: formFields?.orgId?.split(",")?.[0] },
      });
    }
  }, [formFields.orgId]);

  useEffect(() => {
    if (formFields.disorderId) {
      props.setLoader(true);
      setFormFields((oldValues) => ({
        ...oldValues,
        modelId: "",
        categoryId: "",
        agendaId: "",
      }));
      getModelByDisorderId({
        variables: { disorderId: formFields.disorderId },
      });
    }
  }, [formFields.disorderId]);

  useEffect(() => {
    if (formFields.modelId) {
      props.setLoader(true);
      setFormFields((oldValues) => ({
        ...oldValues,
        categoryId: "",
        agendaId: "",
      }));
      getCategoryByModelId({
        variables: { modelId: formFields.modelId },
      });

      getAgendaByDisorderModelId({
        variables: {
          disorderId: formFields.disorderId,
          modelId: formFields.modelId,
        },
      });
    }
  }, [formFields.modelId]);

  useEffect(() => {
    props.setLoader(true);
  }, []);

  const set2 = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setFormFields((oldValues) => ({ ...oldValues, [fieldName]: value }));
  };

  const setCheckBox = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | any>
  ) => {
    const name = e.target.name;

    if (name === "formulation") {
      /* istanbul ignore next */
      setFormFields(() => ({
        ...initialState,
        ...{
          formulation: !e.target.checked ? 0 : 1,
        },
      }));
      setTemplateModal(false);
      setSelectedComponentType({
        type: null,
        initialData: undefined,
        info: undefined,
      });
    } else
      setFormFields((oldValues) => ({
        ...oldValues,
        [name]: Math.abs(oldValues[name] - 1),
      }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    /* istanbul ignore next */
    e.preventDefault();
    /* istanbul ignore next */
    if (
      formFields?.resourceAvailOnlyme == "0" &&
      formFields?.resourceAvailTherapist == "0"
    ) {
      enqueueSnackbar("Please select availability of resource", {
        variant: "error",
      });
      return;
    }
    /* istanbul ignore next */
    setTemplateModal(true);
    /* istanbul ignore next */
    if (!confirmSubmission) return;
  };

  const scrollDown = () => {
    window.scroll(0, 1040);
  };

  const onTemplateSelect = (values: any) => {
    /* istanbul ignore next */
    if (values.component_name == "TemplateTable") {
      setTemplateModal(false);
      setDimensionModal(true);
      setSelectedComponentType({ ...selectedComponentType, info: values });
    }

    /* istanbul ignore next */
    if (values.component_name == "ArrowTemplate") {
      setTemplateModal(false);
      setSelectedComponentType({
        ...selectedComponentType,
        type: values.component_name,
        info: values,
      });
      /* istanbul ignore next */
      setTimeout(() => {
        scrollDown();
      }, 500);
    }
  };
  /* istanbul ignore next */
  const saveResource = (data) => {
    if (formFields?.formulation) {
      const {
        resourceAvailOnlyme,
        resourceAvailTherapist,
        resourceName,
        orgId,
        templateData,
        templateId,
        resourceDesc,
        resourceInstruction,
      } = data;

      if (
        !resourceName ||
        (resourceAvailTherapist != 1 && resourceAvailOnlyme != 1)
      ) {
        enqueueSnackbar("Availability of resource and name is mandatory.", {
          variant: "error",
        });
        return;
      }

      const formulationAvailFor = [];
      if (resourceAvailTherapist == 1)
        formulationAvailFor.push(shareResourceAvailability.allTherapist);
      if (resourceAvailOnlyme == 1)
        formulationAvailFor.push(shareResourceAvailability.onlyMe);

      const tempD = {
        resourceName,
        formulationType: formFields?.formulation,
        orgId,
        resourceDesc,
        resourceInstruction,
        formulationAvailFor: JSON.stringify(formulationAvailFor),
        templateData,
        templateId,
      };

      return setIsConfirm({
        status: true,
        message: "Are you sure you want to create this formulation?",
        storedFunction: () => createFormulationSubmit(tempD),
      });
    } else
      createResource({
        variables: data,
      });
  };

  /* istanbul ignore next */
  const onGenerateTable = (values: TableDimensionFormData) => {
    const initialData: TemplateFormData = { rows: [] };

    for (let j = 0; j < values.rows; j++) {
      initialData.rows.push({
        height: "200px",
        cells: Array.from({ length: values.cols }, () => ({
          type: "",
          width: "600px",
        })),
      });
    }

    setSelectedComponentType({
      ...selectedComponentType,
      type: "TemplateTable",
      initialData: initialData,
    });

    setDimensionModal(false);
    setTimeout(() => {
      scrollDown();
    }, 500);
  };

  const onTemplateSave = (
    value: TemplateFormData,
    formikHelper: FormikProps<TemplateFormData>
  ) => {
    /* istanbul ignore next */
    saveResource({
      ...formFields,
      templateData: JSON.stringify(value),
      templateId: selectedComponentType?.info?._id,
    });
    /* istanbul ignore next */
    formikHelper.setSubmitting(false);
  };
  /* istanbul ignore next */
  const onTemplateCancel = () => {
    setSelectedComponentType({
      ...selectedComponentType,
      type: "",
      initialData: {},
      info: null,
    });
  };
  /* istanbul ignore next */
  const onPreview = (values) => {
    sessionStorage.setItem(
      "create",
      JSON.stringify({ data: values, name: formFields.resourceName })
    );
    window.open("/template/preview/create", "_blank");
  };
  /* istanbul ignore next */
  const onSaveArrowTemplate = (arrowTemplateData: string) => {
    saveResource({
      ...formFields,
      templateData: arrowTemplateData,
      templateId: selectedComponentType?.info?._id,
    });
    /* istanbul ignore next */
  };
  /* istanbul ignore next */
  const onConfirmSubmit = () => {
    isConfirm.storedFunction();
    setIsConfirm({ status: false, storedFunction: null });
  };
  /* istanbul ignore next */
  const clearIsConfirm = () => {
    setIsConfirm({ status: false, storedFunction: null });
  };

  const handleChange = (event) => {
    const value = event.target.value as string[];
    /* istanbul ignore next */
    if (value[value.length - 1] === "all") {
      /* istanbul ignore next */
      const updatedSelected = [
        "all",
        /* istanbul ignore next */
        ...orgData?.getOrganizationData?.map((org) => org._id),
      ];
      /* istanbul ignore next */
      setFormFields((oldValues) => ({
        ...oldValues,
        orgId: updatedSelected.join(","),
      }));
      /* istanbul ignore next */
      return;
      /* istanbul ignore next */
    } else if (
      /* istanbul ignore next */
      value.length === orgData?.getOrganizationData?.length &&
      value?.indexOf("all") === -1
    ) {
      /* istanbul ignore next */
      setFormFields((oldValues) => ({
        ...oldValues,
        orgId: "",
      }));
    } else {
      setFormFields({
        ...formFields,
        orgId: [...value].filter((v) => v != "all").join(","),
      });
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <ContentHeader title="Create Resource" />
        <CheckBoxLabelComponent
          value="1"
          name="formulation"
          onChange={setCheckBox}
          label="Formulation"
          placement="end"
          inputProps={{
            "data-testid": "formulationCheckbox",
          }}
          /* istanbul ignore next */
          checked={formFields?.formulation}
          size="small"
        />
      </Box>
      <form onSubmit={handleSubmit} data-testid="resource-crate-form">
        <Box
          sx={{ flexGrow: 1, border: "1px solid #cecece" }}
          p={5}
          borderRadius="7px"
        >
          <Grid container spacing={2} marginBottom={5}>
            <Grid item xs={4}>
              <TextFieldComponent
                required={true}
                name="resourceName"
                id="resourceName"
                label="Name"
                /* istanbul ignore next */
                value={formFields?.resourceName}
                onChange={set2}
                fullWidth={true}
                inputProps={{ "data-testid": "resourceName" }}
                variant="outlined"
                className="form-control-bg"
                size="small"
              />
            </Grid>
            {/* istanbul ignore next */}
            {!formFields?.formulation && (
              <Grid item xs={4}>
                <SingleSelectComponent
                  fullWidth={true}
                  required={true}
                  id="resourceTypeSelect"
                  labelId="resourceType"
                  name="resourceType"
                  /* istanbul ignore next */
                  value={formFields?.resourceType}
                  label="Select Resource Type"
                  onChange={set2}
                  inputProps={{ "data-testid": "resourceType" }}
                  options={resourceTypeOptions}
                  mappingKeys={["id", "value"]}
                  size="small"
                  className="form-control-bg"
                />
              </Grid>
            )}
            {userType == IS_ADMIN ? (
              <Grid item xs={4}>
                <MultiSelectComponent
                  fullWidth
                  inputProps={{ "data-testid": "org_id" }}
                  onChange={handleChange}
                  id="organizationSelect"
                  labelId="organizationSelect"
                  name="orgId"
                  label="Select Organization"
                  options={[
                    ...[{ _id: "all", name: "Select All" }],
                    ...((orgData && orgData.getOrganizationData) || []),
                  ]}
                  mappingKeys={["_id", "name"]}
                  size="small"
                  className="form-control-bg multiSelect"
                  extraProps={{ "data-testid": "mainOrganizationSelect" }}
                  /* istanbul ignore next */
                  multiSelect={csvDecode(formFields?.orgId)}
                  /* istanbul ignore next */
                  value={csvDecode(formFields?.orgId)}
                />
              </Grid>
            ) : (
              <Grid item xs={4}></Grid>
            )}
          </Grid>

          {!formFields?.formulation && (
            <Grid container spacing={2} marginBottom={5}>
              <Grid item xs={4}>
                <SingleSelectComponent
                  fullWidth={true}
                  required={true}
                  id="resourceDisorderSelect"
                  labelId="resourceDisorder"
                  name="disorderId"
                  /* istanbul ignore next */
                  value={formFields?.disorderId}
                  label="Select Disorder"
                  onChange={set2}
                  inputProps={{ "data-testid": "disorderId" }}
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
                  name="modelId"
                  value={formFields?.modelId}
                  label="Select Model"
                  onChange={set2}
                  inputProps={{ "data-testid": "modelId" }}
                  options={(modelData && modelData.getModelByDisorderId) || []}
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
                  name="categoryId"
                  /* istanbul ignore next */
                  value={formFields?.categoryId}
                  label="Select Category (Optional)"
                  onChange={set2}
                  inputProps={{ "data-testid": "categoryId" }}
                  options={
                    /* istanbul ignore next */
                    (categoryData && categoryData.getCategoryByModelId) || []
                  }
                  mappingKeys={["_id", "category_name"]}
                  size="small"
                  className="form-control-bg"
                />
              </Grid>
            </Grid>
          )}

          <Grid container spacing={2} marginBottom={5}>
            <Grid item xs={12}>
              <TextFieldComponent
                name="resourceDesc"
                id="descrption"
                label="Description"
                /* istanbul ignore next */
                value={formFields?.resourceDesc}
                multiline
                rows={4}
                onChange={set2}
                inputProps={{ "data-testid": "resourceDesc" }}
                fullWidth={true}
                className="form-control-bg"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} marginBottom={5}>
            <Grid item xs={12}>
              <TextFieldComponent
                name="resourceInstruction"
                id="instructions"
                label="Instructions"
                /* istanbul ignore next */
                value={formFields?.resourceInstruction}
                multiline
                rows={4}
                onChange={set2}
                inputProps={{ "data-testid": "resourceInstruction" }}
                fullWidth={true}
                className="form-control-bg"
              />
            </Grid>
          </Grid>
          {/* istanbul ignore next */}
          {!formFields?.formulation && (
            <Grid container spacing={2} marginBottom={5}>
              <Grid item xs={12}>
                <TextFieldComponent
                  name="resourceReferences"
                  id="references"
                  label="References"
                  /* istanbul ignore next */
                  value={formFields?.resourceReferences}
                  multiline
                  rows={4}
                  onChange={set2}
                  inputProps={{ "data-testid": "resourceReferences" }}
                  fullWidth={true}
                  className="form-control-bg"
                />
              </Grid>
            </Grid>
          )}
          {/* istanbul ignore next */}
          {!formFields?.formulation && (
            <Grid container spacing={2} marginBottom={5}>
              <Grid item xs={3}>
                <SingleSelectComponent
                  fullWidth={true}
                  id="agendaSelect"
                  labelId="agenda"
                  name="agendaId"
                  /* istanbul ignore next */
                  value={formFields?.agendaId}
                  label="Suggested Agenda"
                  onChange={set2}
                  inputProps={{ "data-testid": "agendaId" }}
                  options={
                    /* istanbul ignore next */
                    (agendaData && agendaData.getAgendaByDisorderAndModel) || []
                  }
                  mappingKeys={["_id", "agenda_name"]}
                  size="small"
                  className="form-control-bg"
                />
              </Grid>
            </Grid>
          )}

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
                      name="resourceAvailTherapist"
                      onChange={setCheckBox}
                      label="All Therapists"
                      placement="end"
                      inputProps={{
                        "data-testid": "resourceAvailTherapist",
                      }}
                      /* istanbul ignore next */
                      checked={formFields?.resourceAvailTherapist}
                      size="small"
                    />
                    <CheckBoxLabelComponent
                      value="1"
                      name="resourceAvailOnlyme"
                      onChange={setCheckBox}
                      label="Only Me"
                      placement="end"
                      inputProps={{
                        "data-testid": "resourceAvailOnlyme",
                      }}
                      /* istanbul ignore next */
                      checked={formFields?.resourceAvailOnlyme}
                      size="small"
                    />
                  </FormGroup>
                </FormControl>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} marginBottom={5}>
            <Grid item xs={12} textAlign="center">
              <AddButton
                data-testid="selectTemplateButton"
                variant="contained"
                type="submit"
                label="SELECT TEMPLATE"
              />
            </Grid>
          </Grid>
        </Box>
      </form>
      {
        /* istanbul ignore else */
        templateModal && (
          <SelectTemplateModal
            isOpen={templateModal}
            setConfirmSubmission={setConfirmSubmission}
            onSubmit={onTemplateSelect}
            onModalClose={setTemplateModal}
          />
        )
      }
      {dimensionModal && (
        /* istanbul ignore next */
        <TableDimensionModal
          isOpen={dimensionModal}
          setConfirmSubmission={setConfirmSubmission}
          onSubmit={(values) => onGenerateTable(values)}
          onModalClose={setDimensionModal}
        />
      )}
      {/* istanbul ignore next */}
      {selectedComponentType?.info != null && (
        <Box style={{ margin: "32px 0px 40px 0px" }}>
          <Typography
            variant="h5"
            sx={{
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
      {/* istanbul ignore next */}
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
          onSubmit={onSaveArrowTemplate}
          onCancel={onTemplateCancel}
          userType="fullAccess"
        />
      )}
      {successModal && (
        /* istanbul ignore next */
        <SuccessModal
          isOpen={successModal}
          description="Your resource has been created successfully."
          title="Success"
          onOk={() => {
            /* istanbul ignore next */
            router.push(`/${userType}/resource/`);
          }}
        />
      )}

      {isConfirm.status && (
        <ConfirmationModal
          label={isConfirm.message}
          onCancel={clearIsConfirm}
          onConfirm={onConfirmSubmit}
        />
      )}
      <InfoModal ref={infoModalRef}>
        <InfoMessageView />
      </InfoModal>
    </>
  );
}
