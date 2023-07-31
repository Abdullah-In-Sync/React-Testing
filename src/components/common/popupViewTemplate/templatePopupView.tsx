import { Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import React from "react";
import { useStyles } from "./templatePopupViewStyles";

interface TemplatePopupViewProps {
  isOpen: boolean;
  onClose: any;
  description: string;
  instruction?: string;
  mode?: string;
}

const TemplatePopupView: React.FC<TemplatePopupViewProps> = ({
  isOpen,
  onClose,
  instruction,
  description,
  mode,
}) => {
  const styles = useStyles();

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className={`${styles.modelStyle} ${
        mode == "mobile" ? styles.mobileModelStyle : ""
      }`}
    >
      <Box data-testid="responsePopup" className={styles.modelBox}>
        <Box onClick={onClose} className={styles.childBox}>
          <Image
            alt="My Help"
            src="/images/cross.png"
            height="14.24"
            width="14.24"
          />
        </Box>
        {description && (
          <>
            <Typography
              className={`${styles.labelDescription} ${styles.labelWrapper}`}
            >
              Description
            </Typography>
            <Typography
              style={{ marginBottom: "20px" }}
              className={`${styles.desTypo} ${styles.textWrapper}`}
            >
              {description}
            </Typography>
          </>
        )}
        {instruction && (
          <>
            <Typography
              className={`${styles.labelDescription} ${styles.labelWrapper}`}
            >
              Instruction
            </Typography>
            <Typography className={`${styles.instTypo} ${styles.textWrapper}`}>
              {instruction}
            </Typography>
          </>
        )}
      </Box>
    </Modal>
  );
};
export default TemplatePopupView;
