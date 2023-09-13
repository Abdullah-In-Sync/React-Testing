import React, { FormEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { useLazyQuery } from "@apollo/client";
import { addAdminAgendaFormField } from "../../../../utility/types/resource_types";
import {
  GET_DISORDER_DATA_BY_ORG_ID,
  GET_MODEL_BY_DISORDERID_DATA,
} from "../../../../graphql/query/common";
import TextFieldComponent from "../../../common/TextField/TextFieldComponent";
import SingleSelectComponent from "../../../common/SelectBox/SingleSelect/SingleSelectComponent";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
import { GET_THERAPIST_LIST_BY_ORG_ID } from "../../../../graphql/mutation/admin";

const defaultFormValue = {
  _id: "",
  agenda_name: "",
  org_id: "",
  therapy_id: "",
  disorder_id: "",
  model_id: "",
  session: "1",
  display_order: "",
};

type propTypes = {
  onSubmit?: any;
  adminAgendaData?: any;
  setLoader?: any;
};

export default function AdminAddAgendaForm(props: propTypes) {
  const [formFields, setFormFields] = useState<addAdminAgendaFormField>({
    ...defaultFormValue,
  });
  const [isConfirmResource, setIsConfirmResource] = useState(false);
  const [isConfirmEditAgenda, setIsConfirmEditAgenda] = useState(false);
  const [selectedSessions, setSelectedSessions] = useState([]);

  const [
    getOrgList,
    { data: { getOrganizationData: organizationList = [] } = {} },
  ] = useLazyQuery(GET_ORGANIZATION_LIST, {
    fetchPolicy: "cache-and-network",
    onCompleted: () => {
      /* istanbul ignore next */
      props.setLoader(false);
    },
  });

  const [getTherapistList, { data: therapistDropdownData }] = useLazyQuery(
    GET_THERAPIST_LIST_BY_ORG_ID,
    {
      onCompleted: () => {
        /* istanbul ignore next */
        props.setLoader(false);
      },
    }
  );

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

  /* istanbul ignore next */
  const prefilledData = props?.adminAgendaData?.getAdminAgendaById[0];

  useEffect(() => {
    /* istanbul ignore next */
    if (prefilledData) {
      setFormFields((prevFormFields) => ({
        ...prevFormFields,
        _id: prefilledData.id,
        agenda_name: prefilledData.agenda_name,
        org_id: prefilledData.org_id,
        therapy_id: prefilledData.therapy_id,
        disorder_id: prefilledData.disorder_id,
        model_id: prefilledData.model_id,
        session: prefilledData.session,
        display_order: prefilledData.agenda_session_detail[0].display_order,
      }));

      /* istanbul ignore next */
      if (prefilledData.session === "Select All") {
        setSelectedSessions(allSessions);
      } else {
        const selectedSessionArray = prefilledData.session
          .split(", ")
          .map((session) => parseInt(session));
        setSelectedSessions(selectedSessionArray);
      }
    }
  }, [prefilledData]);

  useEffect(() => {
    getOrgList();
    /* istanbul ignore next */
    if (formFields.org_id) {
      props.setLoader(true);
      getTherapistList({
        variables: { orgId: formFields.org_id },
      });
    }
  }, [formFields.org_id]);

  useEffect(() => {
    /* istanbul ignore next */
    if (formFields.org_id) {
      props.setLoader(true);
      getDisorderByOrgId({
        variables: { orgId: formFields.org_id },
      });
    }
  }, [formFields.org_id]);

  useEffect(() => {
    /* istanbul ignore next */
    if (formFields.disorder_id) {
      props.setLoader(true);
      getModelByDisorderId({
        variables: { disorderId: formFields.disorder_id },
      });
    }
  }, [formFields.disorder_id]);

  /* istanbul ignore next */
  const set2 = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setFormFields((oldValues) => ({ ...oldValues, [fieldName]: value }));
  };

  /* istanbul ignore next */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (prefilledData) {
      setIsConfirmEditAgenda(true);
    } else {
      setIsConfirmResource(true);
    }

    if (!isConfirmResource) return;
  };

  /* istanbul ignore next */
  const clearIsConfirmCancel = () => {
    setIsConfirmResource(false);
    setIsConfirmEditAgenda(false);
  };

  const allSessions = Array.from({ length: 50 }, (_, i) => i + 1);

  /* istanbul ignore next */
  const handleSelectAll = () => {
    if (selectedSessions.length === allSessions.length) {
      setSelectedSessions([]);
    } else {
      setSelectedSessions(allSessions);
    }
  };

  /* istanbul ignore next */
  const handleSessionSelect = (event) => {
    const { value } = event.target;

    if (value.includes("Select All")) {
      setSelectedSessions(allSessions);

      setFormFields((oldValues) => ({
        ...oldValues,
        session: allSessions.join(", "),
      }));
    } else {
      const filteredValue = value.filter((val) => val !== "Select All");
      setSelectedSessions(filteredValue);

      setFormFields((oldValues) => ({
        ...oldValues,
        session: filteredValue.join(", "),
      }));
    }
  };

  /* istanbul ignore next */
  const addAgendaFunction = async () => {
    props.onSubmit(formFields);
  };

  /* istanbul ignore next */
  const editAgendaFunction = async () => {
    props.onSubmit(formFields);
  };

  return (
    <>
      <form onSubmit={handleSubmit} data-testid="resource-add-form">
        <Box
          sx={{
            flexGrow: 1,
            border: "1px solid #7EBCA7",
            color: "red",
          }}
          p={5}
          borderRadius="7px"
        >
          <Grid container spacing={2} marginBottom={5}>
            <Grid item xs={4}>
              <TextFieldComponent
                required={true}
                name="agenda_name"
                id="agenda_name"
                label="Agenda Name"
                value={formFields?.agenda_name}
                onChange={set2}
                fullWidth={true}
                inputProps={{ "data-testid": "agenda_name" }}
                variant="outlined"
                className="form-control-bg"
                size="small"
              />
            </Grid>

            <Grid item xs={4}>
              <SingleSelectComponent
                fullWidth={true}
                required={true}
                id="organizationSelect"
                labelId="organization"
                name="org_id"
                value={formFields.org_id}
                label="Select Organization"
                onChange={set2}
                inputProps={{ "data-testid": "select_organisation1" }}
                options={organizationList || []}
                mappingKeys={["_id", "name"]}
                size="small"
                className="form-control-bg"
                disabled={prefilledData}
              />
            </Grid>

            <Grid item xs={4}>
              <SingleSelectComponent
                fullWidth={true}
                required={true}
                id="patientGenderSelect"
                labelId="patientGender"
                name="therapy_id"
                value={formFields?.therapy_id}
                label="Select Therapy"
                onChange={set2}
                inputProps={{ "data-testid": "therapy_id" }}
                options={therapistDropdownData?.getTherapyListByOrgId || []}
                mappingKeys={["_id", "therapy_name"]}
                size="small"
                className="form-control-bg"
              />
            </Grid>
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
                options={disorderData?.getDisorderByOrgId || []}
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
                options={modelData?.getModelByDisorderId || []}
                mappingKeys={["_id", "model_name"]}
                size="small"
                className="form-control-bg"
              />
            </Grid>

            <Grid item xs={4}>
              <FormControl
                style={{
                  width: "100%",
                  backgroundColor: "#F8F8F8",
                }}
              >
                <InputLabel size="small" id="multi-select-label">
                  Select Sessions
                </InputLabel>
                <Select
                  label="Select Sessions"
                  labelId="multi-select-label"
                  id="multi-select"
                  multiple
                  size="small"
                  value={selectedSessions}
                  onChange={handleSessionSelect}
                  renderValue={(selected) => {
                    /* istanbul ignore next */
                    if (selected.includes("Select All")) {
                      return "Select All";
                    }
                    /* istanbul ignore next */
                    return selected.join(", ");
                  }}
                >
                  <MenuItem key="Select All" value="Select All">
                    <Checkbox
                      checked={selectedSessions.length === allSessions.length}
                      indeterminate={
                        selectedSessions.length > 0 &&
                        selectedSessions.length < allSessions.length
                      }
                      onChange={handleSelectAll}
                    />
                    <ListItemText primary="Select All" />
                  </MenuItem>
                  {
                    /* istanbul ignore next */
                    allSessions.map((session) => (
                      <MenuItem key={session} value={session}>
                        <Checkbox
                          checked={selectedSessions.includes(session)}
                        />
                        <ListItemText primary={`Session ${session}`} />
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2} marginBottom={5}>
            <Grid item xs={4}>
              <TextFieldComponent
                type="number"
                required={true}
                name="display_order"
                id="display_order"
                label="Display Order"
                value={formFields?.display_order}
                onChange={set2}
                fullWidth={true}
                inputProps={{ "data-testid": "display_order" }}
                variant="outlined"
                className="form-control-bg"
                size="small"
              />
            </Grid>
          </Grid>

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

      {isConfirmResource && (
        <ConfirmationModal
          label="Are you sure want to save this agenda?"
          onCancel={clearIsConfirmCancel}
          onConfirm={() => {
            /* istanbul ignore next */
            addAgendaFunction();
          }}
        />
      )}

      {isConfirmEditAgenda && (
        <ConfirmationModal
          label="Are you sure want to update this agenda?"
          onCancel={clearIsConfirmCancel}
          onConfirm={() => {
            /* istanbul ignore next */
            editAgendaFunction();
          }}
        />
      )}
    </>
  );
}
