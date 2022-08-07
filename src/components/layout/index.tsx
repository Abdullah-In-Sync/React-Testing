import * as React from "react";
import Box from "@mui/material/Box";

import NavBar from "../navbar";
import SideBar from "../sidebar";
import Footer from "../footer";

const contentStyle = {
  marginTop: 55,
  width: "100vw",
  paddingBottom: 55,
};
const wrapper = {
  backgroundColor: "white",
  borderRadius: "10px",
  margin: "25px 10px",
  padding: "5px 20px",
};

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", backgroundColor: "#F5F5F5" }}>
      <NavBar />
      <SideBar />
      <Box style={contentStyle}>
        <Box style={wrapper}>{children}</Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
