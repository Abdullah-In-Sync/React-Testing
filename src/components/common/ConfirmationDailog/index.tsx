import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { Box } from "@mui/material";
import { AddButton } from "../Buttons";
import { Transition } from "../Transition/index";

export const ConfirmationDialog = ({
  open,
  closeConfirmationDialog,
  onConfirmation,
  isConfirmButtonClicked,
  title,
}) => {
  return (
    <Dialog
      data-testid="openConfirmationDialog"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        <PriorityHighIcon sx={{ color: "#f8bc86", fontSize: "60px" }} />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Box component="h2" sx={{ color: "#595959" }}>
            {title}
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <AddButton
          onClick={closeConfirmationDialog}
          data-testid="cancelButton"
          //   type="submit"
          sx={{
            paddingX: "5px",
            textTransform: "capitalize",
            color: "black",
            backgroundColor: "#ebeced",
          }}
          label="Cancel"
        />

        <AddButton
          data-testid="confirmButton"
          onClick={onConfirmation}
          disabled={isConfirmButtonClicked}
          sx={{
            paddingX: "2px",
            textTransform: "capitalize",
            color: "#fff",
            backgroundColor: "#f04b46",
          }}
          label="Confirm"
        />
      </DialogActions>
    </Dialog>
  );
};
