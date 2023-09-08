import { Box, Stack } from "@mui/material";
import { Form } from "formik";
import * as React from "react";
import CommonButton from "../../../../common/Buttons/CommonButton";
import FormikSelectDropdown from "../../../../common/FormikFields/FormikSelectDropdown";
import FormikTextField from "../../../../common/FormikFields/FormikTextField";

const AddDisorderForm: React.FC<any> = ({
  isSubmitting,
  therapyListData = [],
  saveButtonText,
  organizationList = [],
  values,
}) => {
  const { org_id } = values;
  const therapyDisorderData = therapyListData.filter((item) => {
    const { org_id: therapyOrgId } = item;
    if (org_id && therapyOrgId) {
      return org_id === therapyOrgId;
    }
    return true;
  });

  return (
    <Stack className={"addCategoryFormWrapper"}>
      <Form>
        <Box className="row1 crow">
          <Box mb={2}>
            <FormikTextField
              name="disorder_name"
              id="disorder_name"
              label="Disorder name*"
              fullWidth={true}
              inputProps={{ "data-testid": "disorderName" }}
              variant="outlined"
              className="form-control-bg"
              size="small"
              placeholder="Disorder name*"
            />
          </Box>
          <Box mb={2}>
            <FormikSelectDropdown
              id="orgSelect"
              labelId="orgSelect"
              name="org_id"
              label="Select Organisation*"
              options={organizationList}
              mappingKeys={["_id", "name"]}
              size="small"
              className="form-control-bg"
              showDefaultSelectOption={false}
              extraProps={{ "data-testid": "orgFormSelect" }}
              disabled={saveButtonText === "Update"}
            />
          </Box>
          <Box mb={1}>
            <FormikSelectDropdown
              id="therapySelect"
              labelId="therapySelect"
              name="therapy_id"
              label="Select Therapy*"
              options={therapyDisorderData}
              mappingKeys={["_id", "therapy_name"]}
              size="small"
              className="form-control-bg"
              showDefaultSelectOption={false}
              extraProps={{ "data-testid": "therapySelectModal" }}
            />
          </Box>
        </Box>
        <Box className="row2 crow">
          <Box>
            <CommonButton
              disabled={isSubmitting}
              type="submit"
              data-testid="addDisorderSubmit"
              variant="contained"
            >
              {saveButtonText || "Add"}
            </CommonButton>
          </Box>
        </Box>
      </Form>
    </Stack>
  );
};

export default AddDisorderForm;
