import { Box, Paper, Typography } from "@mui/material";
import * as React from "react";

const WsasSection: React.FC = () => {
  return (
    <Box className="cSection">
      <Box className="wsasSection">
        <Box>
          <Typography>Total WSAS Score</Typography>
        </Box>
        <Box>
          <Paper elevation={0}>
            <Typography>0</Typography>
          </Paper>
        </Box>
      </Box>
      <Box></Box>
    </Box>
  );
};

export default WsasSection;
