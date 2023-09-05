import { Box, Button, Typography } from "@mui/material";
import React from "react";
import SureModal from "../../admin/resource/SureModal";
import { makeStyles } from "@mui/styles";

interface ViewProps {
  label: string;
  description?: string;
  onCancel?: () => void;
  onConfirm?: any;
  // onConfirm?: () => void;

  onOk?: () => void;
  mode?: string;
}
const useStyles = makeStyles({
  root: {
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: 1.75,
    textAlign: "center",
    fontFamily: "Montserrat !important",
  },
});

const ConfirmationModal: React.FC<ViewProps> = ({
  onCancel,
  onConfirm,
  label,
  description,
  onOk,
  mode,
}) => {
  const classes = useStyles();
  return (
    <div data-testid="openFileUpload">
      <>
        <SureModal modalOpen={true} mode={mode}>
          <Typography className={classes.root} variant="subtitle1">
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
          {!onOk ? (
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
          ) : (
            <Box marginTop="20px" display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="secondary"
                size="small"
                data-testid="cancelButton"
                onClick={onOk}
              >
                Ok
              </Button>
            </Box>
          )}
        </SureModal>
      </>
    </div>
  );
};
export default ConfirmationModal;
