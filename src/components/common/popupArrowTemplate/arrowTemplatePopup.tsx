import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import React from "react";

interface ArrowTemplatePopupProps {
  isOpen: boolean;
  onClose: any;
}

const ArrowTemplatePopup: React.FC<ArrowTemplatePopupProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Box>
      <Modal open={isOpen} onClose={onClose}>
        <div>ddd</div>
      </Modal>
    </Box>
  );
};
export default ArrowTemplatePopup;
