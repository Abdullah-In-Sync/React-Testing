import { Box, CardContent } from "@mui/material";
import { Form } from "formik";
import React from "react";
import Formats from "../../../common/TemplateFormat";
import { useStyles } from "./createMeasuresStyles";

import { Typography } from "@material-ui/core";
import CardWithHeader from "../../../common/Cards/CardWithHeader";
import { CommonFormProps } from "../form/types";

type ViewProps = CommonFormProps;

const CommonForm: React.FC<ViewProps> = ({ formikProps }) => {
  const { values } = formikProps;
  const { templateId, description, title } = values;
  const FormatTemplate = templateId ? Formats[templateId] : null;
  const styles = useStyles();

  return (
    <Box className={`${styles.viewForm} disbledFields`}>
      <CardWithHeader label={title}>
        <CardContent>
          <Form>
            {description && (
              <Box className="descBox">
                <Typography>{description}</Typography>
              </Box>
            )}
            {FormatTemplate && (
              <FormatTemplate formikProps={formikProps} isView />
            )}
          </Form>
        </CardContent>
      </CardWithHeader>
    </Box>
  );
};

export default CommonForm;
