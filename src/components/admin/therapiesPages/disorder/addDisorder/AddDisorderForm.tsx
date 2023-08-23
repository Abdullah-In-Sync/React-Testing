import { Box, Stack } from "@mui/material";
import { Form } from "formik";
import * as React from "react";
import CommonButton from "../../../../common/Buttons/CommonButton";
import FormikSelectDropdown from "../../../../common/FormikFields/FormikSelectDropdown";
import FormikTextField from "../../../../common/FormikFields/FormikTextField";

const AddDisorderForm: React.FC<any> = ({
  isSubmitting,
  therapyListData = [],
}) => {
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
          <Box mb={1}>
            <FormikSelectDropdown
              id="therapySelect"
              labelId="therapySelect"
              name="therapy_id"
              label="Select Therapy*"
              options={therapyListData}
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
              Add
            </CommonButton>
          </Box>
        </Box>
      </Form>
    </Stack>
  );
};

export default AddDisorderForm;
