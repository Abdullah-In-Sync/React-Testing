import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "./sessionLabelStyles";

interface ViewProps {
  label: string;
}

const SessionBoxLabel: React.FC<ViewProps> = ({ label }) => {
  const styles = useStyles();
  return (
    label && (
      <Box className={styles.content}>
        <Box className="sessionBox">
          <Paper elevation={0}>
            <Typography>{label}</Typography>
          </Paper>
        </Box>
      </Box>
    )
  );
};

export default SessionBoxLabel;
