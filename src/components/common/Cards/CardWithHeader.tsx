import VisibilityIcon from "@mui/icons-material/Visibility";
import { AppBar, Box, Fab, Toolbar, Typography } from "@mui/material";
import * as React from "react";

import { useStyles } from "./CardWithHeaderStyles";

type propTypes = {
  label: string;
  children: React.ReactNode;
  onClickView?: () => void;
  simpleHeader?: boolean;
  activeBoxBorder?: boolean;
  rightComponent?: any;
  mode?: string;
};

const CardWithHeader = (props: propTypes) => {
  const styles = useStyles();
  const {
    onClickView,
    label,
    children = null,
    simpleHeader,
    activeBoxBorder,
    rightComponent,
    mode,
  } = props || {};
  return (
    <div
      className={
        simpleHeader ? styles.simpleHeaderAppBar : styles.boxWithHeader
      }
    >
      <AppBar color="secondary" position="static">
        <Toolbar disableGutters>
          <Typography noWrap component="div" className="headerText">
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
          {rightComponent && rightComponent()}
        </Toolbar>
      </AppBar>
      <Box
        className={
          mode == "arrowView"
            ? ""
            : activeBoxBorder
            ? `header-box active-border`
            : "header-box"
        }
      >
        {children}
      </Box>
    </div>
  );
};

export default CardWithHeader;
