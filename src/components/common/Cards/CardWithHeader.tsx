import * as React from "react";
import { AppBar, Container, Toolbar, Typography, Box } from "@mui/material";

import styles from "./CardWithHeader.module.css";

type propTypes = {
  label: string;
  children: React.ReactNode;
};

const CardWithHeader = (props: propTypes) => {
  return (
    <div className={styles.boxWithHeader}>
      <AppBar color="secondary" position="static" className={styles.appBar}>
        <Container maxWidth="xl">
          <Toolbar disableGutters style={{ justifyContent: "center" }}>
            <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
              {props?.label}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Box border={1} borderColor="#ccc" sx={{ p: 2 }}>
        {props.children}
      </Box>
    </div>
  );
};

export default CardWithHeader;
