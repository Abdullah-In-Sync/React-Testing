import { Box, Button, Stack } from "@mui/material";
import { Form } from "formik";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useStyles } from "../../../../therapist/patient/therapistSafetyPlan/create/therapistSafetyPlanStyles";
import SingleSelectComponent from "../../../../common/SelectBox/SingleSelect/SingleSelectComponent";
import TextFieldComponent from "../../../../common/TextField/TextFieldComponent";

interface ViewProps {
  buttonClick?: (value) => void;
  onPressSubmit?: () => void;
  organizationList?: any;
  disorderDataList?: any;
  onModalNameChange?: any;
  onChangeOrgId?: any;
  onChangeDisorderId?: any;

  prefilledOrgId?: any;
  prefilledDisordorId?: any;
  prefilledModalName?: any;
}

const FormBox: React.FC<ViewProps> = ({
  onPressSubmit,
  organizationList,
  disorderDataList,
  onModalNameChange,
  onChangeOrgId,
  onChangeDisorderId,

  prefilledOrgId,
  prefilledDisordorId,
  prefilledModalName,
}) => {
  const styles = useStyles();

  const formBox = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [orgId, setOrgId] = useState("");
    const [disorderId, setDisorderId] = useState("");

    const [modalNameValue, setModalNameValue] = useState("");

    const modelNameChange = (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const value = e.target.value;
      setModalNameValue(value);
      onModalNameChange(value);
    };

    const set2 = (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const value = e.target.value;
      console.log("Koca:org value ", value);
      setOrgId(value);
      onChangeOrgId(value);
    };

    const set3 = (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const value = e.target.value;
      console.log("Koca:org value ", value);
      setDisorderId(value);
      onChangeDisorderId(value);
    };

    useEffect(() => {
      if (prefilledOrgId) {
        setOrgId(prefilledOrgId);
        setDisorderId(prefilledDisordorId);
        setModalNameValue(prefilledModalName);
      }
    }, [prefilledOrgId, prefilledDisordorId, prefilledModalName]);

    return (
      <Stack className={styles.formWrapper}>
        <Form>
          <Box style={{ marginBottom: "16px" }}>
            <SingleSelectComponent
              fullWidth={true}
              required={true}
              id="organizationSelect"
              labelId="organization"
              name="org_id"
              value={orgId}
              label="Select Organization"
              onChange={set2}
              inputProps={{ "data-testid": "select_organisation1" }}
              options={(organizationList && organizationList) || []}
              mappingKeys={["_id", "name"]}
              size="small"
              className="form-control-bg"
              disabled={prefilledOrgId}
            />
          </Box>

          <Box style={{ marginBottom: "16px" }}>
            <SingleSelectComponent
              fullWidth={true}
              required={true}
              id="resourceDisorderSelect"
              labelId="resourceDisorder"
              name="disorder_id"
              value={disorderId}
              label="Select Disorder"
              onChange={set3}
              inputProps={{ "data-testid": "disorder_id" }}
              options={
                (disorderDataList && disorderDataList.getDisorderByOrgId) || []
              }
              mappingKeys={["_id", "disorder_name"]}
              size="small"
              className="form-control-bg"
            />
          </Box>

          <Box
            className="fieldsBoxWrapperFirst"
            style={{ marginBottom: "16px" }}
          >
            <Box>
              <TextFieldComponent
                required={true}
                name="therapy_name"
                id="therapy_name"
                label="Modal Name"
                value={modalNameValue}
                onChange={modelNameChange}
                fullWidth={true}
                inputProps={{ "data-testid": "therapy_name" }}
                variant="outlined"
                className="form-control-bg"
                size="small"
              />
            </Box>
          </Box>

          <Box className="bottomActionButtonsWrapper">
            <Box>
              <Button
                data-testid="addSubmitForm"
                variant="contained"
                onClick={() => {
                  /* istanbul ignore next */
                  if (
                    disorderId.length &&
                    orgId.length &&
                    modalNameValue.length
                  ) {
                    onPressSubmit();
                  } else {
                    enqueueSnackbar(
                      "Please select modal name and disordor before submit.",
                      { variant: "error" }
                    );
                  }
                }}
              >
                {prefilledOrgId ? "Update" : "Add"}
              </Button>
            </Box>
          </Box>
        </Form>
      </Stack>
    );
  };

  return <Box className="actionsWrapper">{formBox()}</Box>;
};

export default FormBox;
