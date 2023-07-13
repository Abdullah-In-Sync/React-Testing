import { Typography } from "@material-ui/core";
import { Box, Stack } from "@mui/material";
import React from "react";
import CloseModalButton from "../../../common/CloseModalButton/CloseModalButton";

interface ViewProps {
  data?: {
    description?: string;
    instruction?: string;
  };
  modalRef?: any;
}

const NodeDetail: React.FC<ViewProps> = ({ data = {}, modalRef }) => {
  const { description, instruction } = data;
  return (
    <>
      <CloseModalButton modalRef={modalRef} />
      <Stack>
        <Box className="row">
          <label>
            <Typography>Description</Typography>
          </label>
          <Box className="desTextWrapper">
            <Typography>{description}</Typography>
          </Box>
        </Box>
        <Box className="row">
          <label>
            <Typography>Instruction</Typography>
          </label>
          <Box className="desTextWrapper">
            <Typography>{instruction}</Typography>
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default NodeDetail;
