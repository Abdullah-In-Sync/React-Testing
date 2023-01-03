import VisibilityIcon from "@mui/icons-material/Visibility";
import { AppBar, Box, Fab, Toolbar, Typography } from "@mui/material";
import * as React from "react";

import { useStyles } from "./CardWithHeaderStyles";

type propTypes = {
  label: string;
  children: React.ReactNode;
  onClickView?: () => void;
  simpleHeader?: boolean;
};

const CardWithHeader = (props: propTypes) => {
  const styles = useStyles();
  const { onClickView, label, children, simpleHeader } = props || {};
  return (
    <div
      className={
        simpleHeader ? styles.simpleHeaderAppBar : styles.boxWithHeader
      }
    >
      <AppBar color="secondary" position="static">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="div">
            {label}
          </Typography>
          {onClickView && (
            <Fab
              aria-label="add"
              sx={{
                position: "absolute",
                right: 0,
                width: "3em",
                height: "3em",
              }}
              data-testid="eyeIconButton"
              onClick={onClickView}
            >
              <VisibilityIcon />
            </Fab>
          )}
        </Toolbar>
      </AppBar>
      <Box>{children && children}</Box>
    </div>
  );
};

export default CardWithHeader;
