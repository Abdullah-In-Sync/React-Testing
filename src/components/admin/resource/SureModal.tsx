import React from "react";
import { Grid, useTheme } from "@mui/material";
import Modal from "../../common/Modal";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box } from "@mui/system";

const SureModal = (props) => {
  const theme = useTheme();
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
            >
              <ErrorOutlineIcon
                fontSize="large"
                sx={{
                  fontSize: "80px",
                  color: theme.palette.error.main,
                  marginBottom: "10px",
                }}
              />
            </Box>
            {props.children}
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default SureModal;
