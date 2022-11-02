import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme, IconButton } from "@mui/material";
import { AddButton } from "../Buttons";
import { Transition } from "../Transition/index";

export const FileUploadDialog = ({
  open,
  openConfirmationDialog,
  onChange,
  onClose,
  isSubmit,
  heading,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      data-testid="openFileUploadDialog"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <form
        data-testid="fileInputForm"
        onSubmit={openConfirmationDialog}
        method="post"
      >
        <DialogTitle
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ color: "transparent" }}>A</div>
          <div>{heading}</div>
          <IconButton sx={{ justifySelf: "flex-end" }}>
            <CloseIcon data-testid="closeIcon" onClick={onClose} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ padding: "30px 30px 5px 0" }}
            id="alert-dialog-slide-description"
          >
            Select File :{" "}
            <input
              data-testid="fileInput"
              id="fileId"
              type="file"
              accept=".pdf"
              onChange={onChange}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <AddButton
            color="primary"
            data-testid="saveButton"
            type="submit"
            sx={{
              paddingX: "2px",
              textTransform: "capitalize",
              color: "white",
            }}
            disabled={isSubmit}
            label="Save"
          />
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default FileUploadDialog;
