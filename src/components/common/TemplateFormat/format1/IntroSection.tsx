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
  isResponse?: boolean;
  handleDelete?: () => void;
}

const IntroSection: React.FC<ViewProps> = ({
  formikProps,
  isView,
  isResponse,
  handleDelete,
}) => {
  const { values, errors, touched } = formikProps;
  const { templateData } = values;

  if (templateData.intro === undefined) return null;
  else
    return (
      <Box
        className={`introSection commonFieldWrapper cSection ${
          isResponse ? "disabledElement" : ""
        }`}
      >
        <Paper
          elevation={0}
          sx={{ p: "2px 4px", display: "flex", border: "1px solid #ccc" }}
        >
          <Box className="inputBox">
            <FormikTextField
              name={`templateData.intro`}
              id={`templateData.intro`}
              placeholder={"Please type here"}
              fullWidth
              multiline
              hideError
            />
          </Box>
          {!isView && !isResponse && (
            <DeleteButton
              i={"intro"}
              data-testId={"introDelete"}
              onDelete={handleDelete}
            />
          )}
        </Paper>
        {touched.templateData && errors.templateData && (
          <ErrorMessage errorMsg={errors.templateData.intro} />
        )}
      </Box>
    );
};

export default IntroSection;
