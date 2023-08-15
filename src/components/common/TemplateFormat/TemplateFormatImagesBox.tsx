import { Box, Button, Stack, Typography } from "@mui/material";
import * as React from "react";
import { useStyles } from "./templateFormatStyles";

interface ViewProps {
  handleOk?: () => void;
}

const ConfirmBox: React.FC<ViewProps> = ({ handleOk }) => {
  const styles = useStyles();
  return (
    <Stack className={styles.formatImagesBoxModal}>
      <Box className="imagesWrapper">
        <Box>
          <Box className="headingTextWrapper">
            <Typography>Format 1</Typography>
          </Box>
          <Box className="imageWrapper">
            <img alt="My Help" src="/images/format_1.png" className={"image"} />
          </Box>
        </Box>
        <Box>
          <Box className="headingTextWrapper">
            <Typography className="headingText">Format 2</Typography>
          </Box>
          <Box className="imageWrapper">
            <img alt="My Help" src="/images/format_2.png" className={"image"} />
          </Box>
        </Box>
      </Box>
      <Box className="okButtonWrapper">
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
