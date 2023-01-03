import { Box, Button, Typography } from "@mui/material";
import React from "react";
import SureModal from "../../admin/resource/SureModal";

interface ViewProps {
  label: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ViewProps> = ({
  onCancel,
  onConfirm,
  label,
}) => {
  return (
    <div data-testid="openFileUpload">
      <>
        <SureModal modalOpen={true}>
          <Typography
            sx={{
              fontWeight: "600",
              textAlign: "center",
              fontSize: "27px",
            }}
          >
            {label}
          </Typography>
          <Box marginTop="20px" display="flex" justifyContent="end">
            <Button
              variant="contained"
              color="inherit"
              size="small"
              data-testid="cancelButton"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              color="error"
              variant="contained"
              sx={{ marginLeft: "5px" }}
              size="small"
              data-testid="confirmButton"
              onClick={onConfirm}
            >
              Confirm
            </Button>
          </Box>
        </SureModal>
      </>
    </div>
  );
};
export default ConfirmationModal;
