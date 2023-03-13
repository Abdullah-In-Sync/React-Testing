import React from "react";
import { Grid } from "@mui/material";
import Modal from "../../common/Modal";
import { Box } from "@mui/system";

const CustomModal = (props) => {
  const {
    modalOpen,
    setModalOpen,
    shouldCloseOnBackgroundClick,
    closeOnEscape,
  } = props;

  return (
    <div>
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        testid="sureModal"
        {...{ shouldCloseOnBackgroundClick, closeOnEscape }}
      >
        <Grid container>
          <Grid item md={12}>
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              justifyContent="center"
              width="100%"
            ></Box>
            {props.children}
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default CustomModal;
