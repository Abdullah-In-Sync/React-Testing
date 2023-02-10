import { Box, Button, Typography } from "@mui/material";
import React from "react";
import SureModal from "../../admin/resource/SureModal";

interface ViewProps {
  isOpen: boolean;
  title: string;
  onCancel?: () => void;
  onOK?: () => void;
}

const ErrorModel: React.FC<ViewProps> = ({ onOK, onCancel, title, isOpen }) => {
  return (
    <div data-testid="openFileUpload">
      <>
        <SureModal modalOpen={isOpen}>
          <Typography
            sx={{
              fontWeight: "600",
              textAlign: "center",
              fontSize: "27px",
            }}
          >
            {title}
          </Typography>
          <Box marginTop="20px" display="flex" justifyContent="end">
            {onCancel && (
              <Button
                variant="contained"
                color="inherit"
                size="small"
                data-testid="cancelButton"
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
            {onOK && (
              <Button
                color="error"
                variant="contained"
                sx={{ marginLeft: "5px" }}
                size="small"
                data-testid="confirmButton"
                onClick={onOK}
              >
                Ok
              </Button>
            )}
          </Box>
        </SureModal>
      </>
    </div>
  );
};
export default ErrorModel;
