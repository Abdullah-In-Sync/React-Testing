import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Button, Stack, Typography } from "@mui/material";
import * as React from "react";
import { CommonModal } from "../CustomModal/CommonModal";
import { useStyles } from "./confirmStyles";

interface ViewProps {
  handleOk?: () => void;
  infoMessage?: string;
  confirmModalRef?: any;
}

const ConfirmBoxModal: React.FC<ViewProps> = ({
  handleOk,
  infoMessage,
  confirmModalRef,
}) => {
  // const modalRef = useRef<ModalElement>(null);
  const styles = useStyles();

  const closeModal = () => {
    confirmModalRef.current?.close();
  };
  return (
    <CommonModal ref={confirmModalRef} maxWidth="xs" className={styles.modalC}>
      <Stack className="confirmBox">
        <Box className="confirmBoxFirst">
          <ErrorOutlineIcon />
        </Box>
        <Box className="confirmBoxSecond">
          <Typography>{infoMessage}</Typography>
        </Box>
        <Box className="confirmBoxThird">
          <Button
            variant="contained"
            sx={{ marginLeft: "5px" }}
            size="small"
            data-testid="OkButton"
            onClick={handleOk ? handleOk : closeModal}
          >
            Ok
          </Button>
        </Box>
      </Stack>
    </CommonModal>
  );
};

export default ConfirmBoxModal;
