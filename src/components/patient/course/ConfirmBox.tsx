import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Button, Stack, Typography } from "@mui/material";
import * as React from "react";

interface ViewProps {
  handleOk?: () => void;
}

const ConfirmBox: React.FC<ViewProps> = ({ handleOk }) => {
  return (
    <Stack className="confirmBox">
      <Box className="confirmBoxFirst">
        <ErrorOutlineIcon />
      </Box>
      <Box className="confirmBoxSecond">
        <Typography>
          Before continuing, you must accept the Terms of Use. Please select
          Continue to be directed to the Terms of Use page
        </Typography>
      </Box>
      <Box className="confirmBoxThird">
        <Button
          variant="contained"
          sx={{ marginLeft: "5px" }}
          size="small"
          data-testid="OkButton"
          onClick={handleOk}
        >
          Ok
        </Button>
      </Box>
    </Stack>
  );
};

export default ConfirmBox;
