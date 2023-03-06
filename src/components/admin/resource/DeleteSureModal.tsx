import React from "react";
import { Grid, Typography } from "@mui/material";
import Modal from "../../common/Modal";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box } from "@mui/system";

const DeleteSureModal = (props) => {
  const {
    modalOpen,
    setModalOpen,
    title = "Are you sure want to delete this resource?",
    description,
  } = props;
  return (
    <div>
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        testid="DeletesureModal"
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
                  width: "100px",
                  height: "100px",
                  color: "#f8bb86",
                  fontWeight: "light",
                  marginBottom: "10px",
                }}
              />
              <Typography
                sx={{
                  fontWeight: "600",
                  textAlign: "center",
                  fontSize: "27px",
                }}
              >
                {title}
              </Typography>
              <Typography>{description}</Typography>
            </Box>
            {props.children}
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default DeleteSureModal;
