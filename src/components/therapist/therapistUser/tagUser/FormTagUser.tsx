import { Box, Button, Grid, Stack } from "@mui/material";
import { Form } from "formik";
import * as React from "react";
import { useStyles } from "../../patient/therapistSafetyPlan/create/therapistSafetyPlanStyles";
import { FormEvent, useState } from "react";
import { therapistTagUser } from "../../../../utility/types/resource_types";
import MultiSelectComponent from "../../../common/SelectBox/MultiSelect/MutiSelectComponent";

const defaultFormValue = {
  org_id: "",
};

interface ViewProps {
  buttonClick?: (value) => void;
  submit?: any;
  patientList?: any;
}

const FormBox: React.FC<ViewProps> = ({ submit, patientList }) => {
  const styles = useStyles();

  const [formFields, setFormFields] = useState<therapistTagUser>({
    ...defaultFormValue,
  });

  const submitFunction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(formFields);
  };

  const csvDecode = (csvString) => (csvString ? csvString.split(",") : []);

  const handleChange = (event) => {
    const value = event.target.value as string[];
    const filteredData = patientList?.getPatientSharedList?.filter(
      (org) => !org?.is_shared
    );

    /* istanbul ignore next */
    if (value[value.length - 1] === "all") {
      const updatedSelected = [
        "all",
        ...(filteredData?.map((org) => org._id) || []),
      ];

      setFormFields((oldValues) => ({
        ...oldValues,
        org_id: updatedSelected.join(","),
      }));
      return;
    } else if (
      value.length === filteredData?.length &&
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

  const transformedListData = patientList?.getPatientSharedList?.map(
    (patient) => ({
      ...patient,
      name: `${patient.patient_firstname}  ${patient.patient_lastname}`,
    })
  );

  const formBox = () => {
    return (
      <Stack className={styles.formWrapper}>
        <Form onSubmit={submitFunction} data-testid="role-add-form">
          <Box className="bottomActionButtonsWrapper">
            <Grid container spacing={2} marginBottom={3}>
              <Grid item xs={12}>
                <MultiSelectComponent
                  fullWidth={true}
                  required={true}
                  onChange={handleChange}
                  id="resourceOrgSelect"
                  labelId="resourceOrg"
                  name="org_id"
                  label="Select Patient"
                  options={[
                    ...[{ _id: "all", name: "Select All" }],
                    /* istanbul ignore next */
                    ...(transformedListData || []),
                  ]}
                  mappingKeys={["_id", "name", "is_shared"]}
                  size="small"
                  className="form-control-bg multiSelect"
                  extraProps={{ "data-testid": "mainOrganizationSelect" }}
                  /* istanbul ignore next */
                  multiSelect={csvDecode(formFields?.org_id)}
                  /* istanbul ignore next */
                  value={csvDecode(formFields?.org_id)}
                />
              </Grid>
            </Grid>
            <Box>
              <Button
                type="submit"
                data-testid="submitForm"
                variant="contained"
              >
                Tag
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
