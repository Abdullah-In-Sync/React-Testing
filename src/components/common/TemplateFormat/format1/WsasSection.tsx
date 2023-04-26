import { Box, Paper, Typography } from "@mui/material";
import * as React from "react";

import { FormikProps } from "formik";
import * as templateTypes from "../types";

interface ViewProps {
  formikProps: FormikProps<templateTypes.TemplateDataFormat1>;
}

const WsasSection: React.FC<ViewProps> = ({ formikProps }) => {
  const { values } = formikProps;
  const { templateData: { totalScore = 0 } } = values;
  
  return (
    <Box  className="cSection">
      <Box className="wsasSection">
        <Box>
          <Typography>Total WSAS Score</Typography>
        </Box>
        <Box>
          <Paper elevation={0}>
            <Typography>{totalScore}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box></Box>
    </Box>
  );
};

export default WsasSection;
