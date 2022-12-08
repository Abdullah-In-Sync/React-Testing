import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
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
  GET_DISORDER_DATA,
  GET_MODEL_BY_DISORDERID_DATA,
} from "../../../graphql/query/common";
import { GET_TEMPLATE_LIST } from "../../../graphql/query/resource";
import { useSnackbar } from "notistack";
import TextFieldComponent from "../../common/TextField/TextFieldComponent";
import SingleSelectComponent from "../../common/SelectBox/SingleSelect/SingleSelectComponent";
import CheckBoxLabelComponent from "../../common/CheckBoxs/CheckBoxLabel/CheckBoxLabelComponent";
import { editResourceFormField } from "../../../utility/types/resource_types";
import { AddButton } from "../Buttons";
import CustomModal from "../CustomModal/customModel";
import {
  SelectTemplateModal,
  TemplateListFormData,
} from "./selectTemplateModal";
import {
  TableDimensionFormData,
  TableDimensionModal,
} from "./tableDimensionModal";
import { TemplateFormData } from "../../templateTable/table.model";
import TemplateTable from "../../templateTable";
import ContentHeader from "../ContentHeader";

const defaultFormValue = {
  _id: "",
  resource_name: "",
  resource_type: 2,
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
  disorder_detail: "",
  model_detail: "",
  resource_url: null,
  download_resource_url: "",
};

type propTypes = {
  onSubmit?: any;
  setLoader: any;
};

export default function CreateResource(props: propTypes) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [formFields, setFormFields] =
    useState<editResourceFormField>(defaultFormValue);
  const [confirmSubmission, setConfirmSubmission] = useState<boolean>(false);
  //useState for prefilled input data
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

  const [getDisorderData, { data: disorderData }] = useLazyQuery(
    GET_DISORDER_DATA,
    {
      onCompleted: () => {
        props.setLoader(false);
      },
    }
  );

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
      onCompleted: () => {
        props.setLoader(false);
      },
    }
  );

  const [getAgendaByDisorderModelId, { data: agendaData }] = useLazyQuery(
    GET_AGENDA_BY_DISORDER_AND_MODEL_DATA,
    {
      onCompleted: () => {
        props.setLoader(false);
      },
    }
  );

  useEffect(() => {
    props.setLoader(true);
    getDisorderData();
  }, []);

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* istanbul ignore next */
    if (
      !formFields?.resource_avail_admin &&
      !formFields?.resource_avail_onlyme &&
      !formFields?.resource_avail_therapist &&
      !formFields?.resource_avail_all
    ) {
      enqueueSnackbar("Please select availability of resource", {
        variant: "error",
      });
      return;
    }
    setTemplateModal(true);
    /* istanbul ignore next */
    if (!confirmSubmission) return;
  };

  const onTemplateSelect = (values: any) => {
    console.log(values, "values");
    if (values.component_name == "TemplateTable") {
      setTemplateModal(false);
      setDimensionModal(true);
      setSelectedComponentType({ ...selectedComponentType, info: values });
    }
  };

  const onGenerateTable = (values: TableDimensionFormData) => {
    const initialData: TemplateFormData = { rows: [] };

    for (let j = 0; j < values.rows; j++) {
      initialData.rows.push({
        cells: Array.from({ length: values.cols }, () => ({
          type: "",
        })),
      });
    }

    console.log(initialData, "initialData");

    setSelectedComponentType({
      ...selectedComponentType,
      type: "TemplateTable",
      initialData: initialData,
    });

    setDimensionModal(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} data-testid="resource-edit-form">
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
                inputProps={{ "data-testid": "agenda_id" }}
                options={
                  (agendaData && agendaData.getAgendaByDisorderAndModel) || []
                }
                mappingKeys={["_id", "agenda_name"]}
                size="small"
                className="form-control-bg"
              />
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
                      checked={formFields?.resource_avail_admin}
                      size="small"
                    />
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
                    <CheckBoxLabelComponent
                      value="1"
                      name="resource_avail_all"
                      onChange={setCheckBox}
                      label="Everyone"
                      placement="end"
                      inputProps={{ "data-testid": "resource_avail_all" }}
                      checked={formFields?.resource_avail_all}
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
                data-testid="editResourceSubmitButton"
                variant="contained"
                type="submit"
                label="SELECT TEMPLATE*"
              />
            </Grid>
          </Grid>
        </Box>
      </form>
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
          onSubmit={(values) => onGenerateTable(values)}
          onModalClose={setDimensionModal}
        />
      )}

      {selectedComponentType.type != null && (
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
        />
      )}
    </>
  );
}
