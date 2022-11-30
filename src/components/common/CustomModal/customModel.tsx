import React from "react";
import { Grid } from "@mui/material";
import Modal from "../../common/Modal";
import { Box } from "@mui/system";

const CustomModal = (props) => {
  const { modalOpen, setModalOpen } = props;
  return (
    <div>
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        testid="sureModal"
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
