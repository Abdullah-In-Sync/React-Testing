import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 478,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
  "&:focus-visible": {
    outline: "unset",
  },
};

export default function BasicModal(props) {
  const {
    modalOpen,
    setModalOpen,
    shouldCloseOnBackgroundClick = true,
  } = props;

  const handleClose = (event, reason) => {
    // Do not close Modal on background click.
    if (!shouldCloseOnBackgroundClick && reason === "backdropClick") {
      return;
    }

    setModalOpen(false);
  };

  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        data-testid={props.testid}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.heading}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.children}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
