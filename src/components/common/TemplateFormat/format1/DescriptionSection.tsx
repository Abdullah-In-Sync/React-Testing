import { Box, Paper } from "@mui/material";
import { FormikProps } from "formik";
import * as React from "react";
import FormikTextField from "../../FormikFields/FormikTextField";
import DeleteButton from "../DeleteButton";
import ErrorMessage from "../ErrorMessage";
import * as templateTypes from "../types";

interface ViewProps {
  formikProps: FormikProps<templateTypes.TemplateDataFormat1>;
  isView?: boolean;
}

const DescriptionSection: React.FC<ViewProps> = ({ formikProps, isView }) => {
  const { values, resetForm, errors, touched } = formikProps;
  const { templateData } = values;

  if (templateData.description === undefined) return null;
  else
    return (
      <Box className="descriptionSection commonFieldWrapper cSection">
        <Paper
          elevation={0}
          sx={{ p: "2px 4px", display: "flex", border: "1px solid #ccc" }}
        >
          <Box className="inputBox">
            <FormikTextField
              name={`templateData.description`}
              id={`templateData.description`}
              placeholder={"Please type here"}
              fullWidth
              multiline
              hideError
            />
          </Box>
          {!isView && (
            <DeleteButton
              i={"templateDataDescription"}
              onDelete={() => {
                delete templateData.description;
                resetForm({
                  values,
                });
              }}
              data-testid={"tempateDataDescription"}
            />
          )}
        </Paper>

        {touched.templateData && errors.templateData && (
          <ErrorMessage errorMsg={errors.templateData.description} />
        )}
      </Box>
    );
};

export default DescriptionSection;
