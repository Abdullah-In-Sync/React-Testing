import { Box, Stack } from "@mui/material";
import { Form, FormikProps } from "formik";
import * as React from "react";
import CommonButton from "../../../common/Buttons/CommonButton";
import FormikTextField from "../../../common/FormikFields/FormikTextField";

const AddCategoryForm: React.FC<FormikProps<any>> = ({ isSubmitting }) => {
  return (
    <Stack className={"addCategoryFormWrapper"}>
      <Form>
        <Box className="row1 crow">
          <Box>
            <label>Category Name:</label>
            <FormikTextField
              name="name"
              id="name"
              fullWidth={true}
              inputProps={{ "data-testid": "categoryName" }}
              variant="outlined"
              className="form-control-bg"
              size="small"
              placeholder="Please enter category name*"
            />
          </Box>
        </Box>
        <Box className="row2 crow">
          <Box>
            <CommonButton
              disabled={isSubmitting}
              type="submit"
              data-testid="addAssessmentSubmit"
              variant="contained"
            >
              Save
            </CommonButton>
          </Box>
        </Box>
      </Form>
    </Stack>
  );
};

export default AddCategoryForm;
