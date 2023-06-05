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
  title: string;
  description: string;
  response: any;
}

const ArrowTemplatePopup: React.FC<ArrowTemplatePopupProps> = ({
  isOpen,
  onClose,
  submitResponse,
  title,
  description,
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
      <Box data-testid={"responsePopup"} className={styles.modelBox}>
        <Box onClick={onClose} className={styles.childBox}>
          <Image
            alt="My Help"
            src="/images/cross.png"
            height="14.24"
            width="14.24"
          />
        </Box>
        <Typography className={`${styles.labelTitle} ${styles.labelWrapper}`}>
          Title
        </Typography>
        <Typography className={`${styles.titleTypo} ${styles.textWrapper}`}>
          {title}
        </Typography>
        <Typography
          className={`${styles.labelDescription} ${styles.labelWrapper}`}
        >
          Description
        </Typography>
        <Typography className={`${styles.desTypo} ${styles.textWrapper}`}>
          {description}
        </Typography>
        <Typography className={`${styles.resLabel} ${styles.labelWrapper}`}>
          Response*
        </Typography>
        <TextareaAutosize
          data-testid={"responsePopupInput"}
          value={responseInput}
          onChange={(e) => onChangeInput(e)}
          className={styles.resTextarea}
        />
        <Button
          data-testid={"responsePopupSubmitBtn"}
          variant="contained"
          type="submit"
          onClick={onSubmit}
          className={styles.buttonStyle}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};
export default ArrowTemplatePopup;
