/* istanbul ignore file */
import React from "react";
import { Grid } from "@mui/material";
import Modal from "../../common/Modal";
import { Box } from "@mui/system";

const RelapseInfoModal = (props) => {
  const { modalOpen, setModalOpen, modalView, shouldCloseOnBackgroundClick } =
    props;

  return (
    <div>
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalView={modalView}
        testid="sureModal"
        {...{ shouldCloseOnBackgroundClick }}
      >
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
      </Modal>
    </div>
  );
};

export default RelapseInfoModal;
