import { Box, Button, Typography } from "@mui/material";
import React from "react";
import SureModal from "../../admin/resource/SureModal";

interface ViewProps {
  label: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ViewProps> = ({
  onCancel,
  onConfirm,
  label,
  description,
}) => {
  return (
    <div data-testid="openFileUpload">
      <>
        <SureModal modalOpen={true}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {label}
          </Typography>
          {description && (
            <Typography
              sx={{
                textAlign: "center",
              }}
            >
              {description}
            </Typography>
          )}
          <Box marginTop="20px" display="flex" justifyContent="center">
            <Button
              color="primary"
              variant="contained"
              sx={{ marginRight: "10px" }}
              size="small"
              data-testid="confirmButton"
              onClick={onConfirm}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              data-testid="cancelButton"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Box>
        </SureModal>
      </>
    </div>
  );
};
export default ConfirmationModal;
