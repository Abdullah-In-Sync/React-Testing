import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const footerStyle = {
  paddin: 2,
  fontSize: "0.9em",
  fontWeight: "bold",
  justifyContent: "flex-end",
  zIndex: 1,
  background: "#6ec9db",
  color: "primary.contrastText",
  width: "100%",
  right: 0,
  bottom: 0,
  position: "fixed",
};

const Footer = () => {
  return (
    <Box sx={footerStyle} data-testid="footerLinks">
      <Grid item md={12}>
        <Grid container pt={0.5}>
          <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
            © {new Date().getFullYear()} MyHelp Ltd. All rights reserved.
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Footer;
