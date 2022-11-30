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

  const resourceTypeOptions = [
    { id: 1, value: "Info Sheets" },
    { id: 2, value: "Work Sheets" },
    { id: 3, value: "Audio File" },
    { id: 4, value: "Video File" },
  ];
  const columsValue = [
    { id: 1, value: "1" },
    { id: 2, value: "2" },
    { id: 3, value: "3" },
    { id: 4, value: "4" },
    { id: 5, value: "5" },
    { id: 6, value: "6" },
    { id: 7, value: "7" },
    { id: 8, value: "8" },
    { id: 9, value: "9" },
    { id: 10, value: "10" },
  ];

  const rowValue = [
    { id: 1, value: "1" },
    { id: 2, value: "2" },
    { id: 3, value: "3" },
    { id: 4, value: "4" },
    { id: 5, value: "5" },
    { id: 6, value: "6" },
    { id: 7, value: "7" },
    { id: 8, value: "8" },
    { id: 9, value: "9" },
    { id: 10, value: "10" },
    { id: 11, value: "11" },
    { id: 12, value: "12" },
    { id: 13, value: "13" },
    { id: 14, value: "14" },
    { id: 15, value: "15" },
    { id: 16, value: "16" },
    { id: 17, value: "17" },
    { id: 18, value: "18" },
    { id: 19, value: "19" },
    { id: 20, value: "20" },
    { id: 21, value: "21" },
    { id: 22, value: "22" },
    { id: 23, value: "23" },
    { id: 24, value: "24" },
    { id: 25, value: "25" },
    { id: 26, value: "26" },
    { id: 27, value: "27" },
    { id: 28, value: "28" },
    { id: 29, value: "29" },
    { id: 30, value: "30" },
    { id: 31, value: "31" },
    { id: 32, value: "32" },
    { id: 33, value: "33" },
    { id: 34, value: "34" },
    { id: 35, value: "35" },
    { id: 36, value: "36" },
    { id: 37, value: "37" },
    { id: 38, value: "38" },
    { id: 39, value: "39" },
    { id: 40, value: "40" },
    { id: 41, value: "41" },
    { id: 41, value: "41" },
    { id: 43, value: "43" },
    { id: 44, value: "44" },
    { id: 45, value: "45" },
    { id: 46, value: "46" },
    { id: 47, value: "47" },
    { id: 48, value: "48" },
    { id: 49, value: "49" },
    { id: 50, value: "50" },
  ];

  const [getTemplateData, { data: resData }] = useLazyQuery(GET_TEMPLATE_LIST, {
    onCompleted: () => {
      props.setLoader(false);
    },
  });
  console.log("Koca: resData ", resData);

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
    getTemplateData();
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

  const proceedNext = () => {
    setTemplateModal(false);
    setDimensionModal(true);
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

          <CustomModal
            modalOpen={dimensionModal}
            setModalOpen={setDimensionModal}
            setConfirmSubmission={setConfirmSubmission}
          >
            <Grid item xs={12} textAlign="center">
              <Grid container spacing={2} marginBottom={5}>
                <Grid item xs={8} style={{ fontWeight: "bold" }}>
                  Select the number of Rows
                </Grid>
                <Grid item xs={4}>
                  <FormControl sx={{ m: 1 }} variant="standard">
                    <SingleSelectComponent
                      fullWidth={true}
                      id="resourceTypeSelect"
                      labelId="resourceType"
                      name="resource_type"
                      value={"a"}
                      onChange={set2}
                      inputProps={{ "data-testid": "resource_type" }}
                      options={rowValue}
                      mappingKeys={["id", "value"]}
                      size="small"
                      className="form-control-bg"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={8} style={{ fontWeight: "bold" }}>
                  Select the number of Columns
                </Grid>
                <Grid item xs={4}>
                  <FormControl sx={{ m: 1 }} variant="standard">
                    <SingleSelectComponent
                      fullWidth={true}
                      id="resourceTypeSelect"
                      labelId="resourceType"
                      name="resource_type"
                      value={"a"}
                      onChange={set2}
                      inputProps={{ "data-testid": "resource_type" }}
                      options={columsValue}
                      mappingKeys={["id", "value"]}
                      size="small"
                      className="form-control-bg"
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  p: 1,
                  m: 1,
                  bgcolor: "background.paper",
                  borderRadius: 1,
                }}
              >
                <Grid item xs={6} style={{ paddingRight: "50px" }}>
                  <Button
                    data-testid="editTemplateSubmitButton"
                    variant="contained"
                    type="submit"
                    style={{ paddingLeft: "50px", paddingRight: "50px" }}
                  >
                    Proceed
                  </Button>
                </Grid>
                <Grid item xs={6} textAlign="center">
                  <Button
                    data-testid="editTemplateCancelButton"
                    variant="contained"
                    style={{
                      paddingLeft: "50px",
                      paddingRight: "50px",
                      backgroundColor: "#6BA08E",
                    }}
                    onClick={() => router.reload()}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Box>
            </Grid>
          </CustomModal>

          <CustomModal
            modalOpen={templateModal}
            setModalOpen={setTemplateModal}
            setConfirmSubmission={setConfirmSubmission}
          >
            <Grid item xs={12} textAlign="center">
              <div>
                <Typography
                  sx={{
                    color: "#6EC9DB",
                    fontWeight: "600",
                    textAlign: "center",
                    paddingBottom: "30px",
                    fontFamily: "Montserrat",
                    font: "500",
                    fontSize: "16px",
                  }}
                >
                  Select Template
                </Typography>
              </div>
              <Box
                sx={{ flexGrow: 1, border: "1px solid #cecece" }}
                p={5}
                borderRadius="7px"
              >
                <Grid item xs={6}>
                  <Box>
                    <FormGroup aria-label="position">
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label={resData?.listTemplates[0]?.component_name}
                        />
                      </RadioGroup>
                    </FormGroup>
                  </Box>
                </Grid>
              </Box>
              <div style={{ paddingTop: "20px" }}>
                <Button
                  data-testid="addResourceSubmitButton"
                  variant="contained"
                  type="submit"
                  style={{ paddingLeft: "50px", paddingRight: "50px" }}
                  onClick={proceedNext}
                >
                  Proceed
                </Button>
              </div>
            </Grid>
          </CustomModal>

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
    </>
  );
}
