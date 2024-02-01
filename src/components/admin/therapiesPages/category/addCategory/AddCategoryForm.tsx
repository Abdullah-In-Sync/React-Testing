import { Box, Stack } from "@mui/material";
import { Form } from "formik";
import * as React from "react";
import CommonButton from "../../../../common/Buttons/CommonButton";
import FormikSelectDropdown from "../../../../common/FormikFields/FormikSelectDropdown";
import FormikTextField from "../../../../common/FormikFields/FormikTextField";

const AddDisorderForm: React.FC<any> = ({
  values,
  isSubmitting,
  saveButtonText,
  organizationList,
  disorderListData,
  modelListData,
}) => {
  const { org_id, disorder_id } = values;
  const { data: disorderData = [] } = disorderListData || {};
  const { data: modelData = [] } = modelListData || {};

  const modifyDisorderData = disorderData.filter((item) => {
    const { organization_settings } = item;
    if (org_id && organization_settings.length > 0) {
      return org_id === organization_settings[0]?._id;
    }
    return true;
  });

  const modifyModelData = modelData.filter((item) => {
    const { disorder_id: itemDisorderId } = item;
    if (disorder_id && itemDisorderId) {
      return disorder_id === itemDisorderId;
    }
    return true;
  });

  return (
    <Stack className={"addCategoryFormWrapper"}>
      <Form>
        <Box className="row1 crow">
          <Box mb={2}>
            <FormikSelectDropdown
              id="orgSelect"
              labelId="orgSelect"
              name="org_id"
              label="Select Organisation*"
              options={organizationList || []}
              mappingKeys={["_id", "name"]}
              size="small"
              className="form-control-bg"
              showDefaultSelectOption={false}
              extraProps={{ "data-testid": "orgFormSelect" }}
              disabled={saveButtonText === "Update"}
            />
          </Box>
          <Box mb={2}>
            <FormikSelectDropdown
              id="disorderSelect"
              labelId="disorderSelect"
              name="disorder_id"
              label="Select Disorder*"
              options={modifyDisorderData}
              mappingKeys={["_id", "disorder_name"]}
              size="small"
              className="form-control-bg"
              showDefaultSelectOption={false}
              extraProps={{ "data-testid": "disorderFormSelect" }}
            />
          </Box>
          <Box mb={2}>
            <FormikSelectDropdown
              id="modelSelect"
              labelId="modelSelect"
              name="model_id"
              label="Select Modal*"
              options={modifyModelData}
              mappingKeys={["_id", "model_name"]}
              size="small"
              className="form-control-bg"
              showDefaultSelectOption={false}
              extraProps={{ "data-testid": "modelFormSelect" }}
            />
          </Box>
          <Box mb={1}>
            <FormikTextField
              name="category_name"
              id="category_name"
              label="Category name*"
              fullWidth={true}
              inputProps={{ "data-testid": "categoryFormName" }}
              variant="outlined"
              className="form-control-bg"
              size="small"
              placeholder="Category name*"
            />
          </Box>
        </Box>
        <Box className="row2 crow">
          <Box>
            <CommonButton
              disabled={isSubmitting}
              type="submit"
              data-testid="addCategorySubmit"
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
