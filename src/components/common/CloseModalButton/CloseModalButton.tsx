import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Stack } from "@mui/material";
import React from "react";

interface Props {
  modalRef: any;
}

const CloseModalButton: React.FC<Props> = ({ modalRef }) => {
  return (
    <>
      <Stack>
        <Box textAlign={"right"}>
          <IconButton
            aria-label="close"
            data-testid="modalCrossIcon"
            onClick={() => modalRef.current.close()}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Stack>
    </>
  );
};

export default CloseModalButton;
