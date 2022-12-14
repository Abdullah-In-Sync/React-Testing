import * as React from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AppBar, Container, Toolbar, Typography, Box, Fab } from "@mui/material";

import styles from "./CardWithHeader.module.css";

type propTypes = {
  label: string;
  children: React.ReactNode;
  onClickView?: ()=>void
};

const CardWithHeader = (props: propTypes) => {
  const { onClickView, label, children } =  props || {}
  return (
    <div className={styles.boxWithHeader}>
      <AppBar color="secondary" position="static" className={styles.appBar} >
          <Toolbar disableGutters style={{ justifyContent: "center" }}>
            <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
              {label}
            </Typography>
            {onClickView && <Fab aria-label="add" sx={{ position: 'absolute', right: 0, width: '3em', height: '3em' }} onClick={onClickView}>
              <VisibilityIcon />
            </Fab>}
          </Toolbar>
      </AppBar>
      <Box border={1} borderColor="#ccc" sx={{ p: 2 }}>
        {children}
      </Box>
    </div>
  );
};

export default CardWithHeader;
