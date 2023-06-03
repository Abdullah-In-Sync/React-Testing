import { Typography } from "@material-ui/core";
import { Box, Button, TextareaAutosize } from "@mui/material";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import React, { useState } from "react";
import { useStyles } from "./arrowTemplatePopupStyles";

interface ArrowTemplatePopupProps {
  isOpen: boolean;
  onClose: any;
  submitResponse: any;
  response: any;
}

const ArrowTemplatePopup: React.FC<ArrowTemplatePopupProps> = ({
  isOpen,
  onClose,
  submitResponse,
  response,
}) => {
  const styles = useStyles();
  const [responseInput, setResponseInput] = useState(response);

  const onChangeInput = (event: any) => {
    setResponseInput(event.target.value);
  };
  const onSubmit = () => {
    submitResponse(responseInput);
    setResponseInput("");
    onClose();
  };
  return (
    <Modal open={isOpen} onClose={onClose} className={styles.modelStyle}>
      <Box className={styles.modelBox}>
        <Box onClick={onClose} className={styles.childBox}>
          <Image
            alt="My Help"
            src="/images/cross.png"
            height="14.24"
            width="14.24"
          />
        </Box>
        <Typography className={styles.labelTitle}>Title</Typography>
        <Typography className={styles.titleTypo}>
          Proper diet you have to follow
        </Typography>
        <Typography className={styles.labelDescription}>Description</Typography>
        <Typography className={styles.desTypo}>
          This will help you to increase your stamina and improve vitality
        </Typography>
        <Typography className={styles.resLabel}>Response*</Typography>
        <TextareaAutosize
          value={responseInput}
          onChange={(e) => onChangeInput(e)}
          className={styles.resTextarea}
        />
        <Button onClick={onSubmit} className={styles.buttonStyle}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};
export default ArrowTemplatePopup;
