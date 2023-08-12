import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as React from "react";
import { useStyles } from "./sideImageLayoutStyles";

const SideImageLayout: React.PropsWithChildren<any> = ({ children }) => {
  const styles = useStyles();

  return (
    <Grid container component="main" className={styles.gridContainer}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className="leftColumnGrid" />
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        component={Paper}
        elevation={6}
        square
        className="rightColumnGrid"
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default SideImageLayout;
