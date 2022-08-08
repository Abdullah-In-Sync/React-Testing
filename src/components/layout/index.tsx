import { FC, ReactNode } from "react";
import { Box, alpha, useTheme } from "@mui/material";

import NavBar from "../navbar";
import SideBar from "../sidebar";
import Footer from "../footer";

const wrapper = {
  backgroundColor: "white",
  borderRadius: "10px",
  padding: "5px 10px",
};

interface SidebarLayoutProps {
  children?: ReactNode;
}

const Layout: FC<SidebarLayoutProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: "100%",
          backgroundColor: "#f3f3f3",
          borderRadius: "10px",
          padding: "5px 10px 5px 0",

          ".MuiPageTitle-wrapper": {
            marginBottom: `${theme.spacing(4)}`,
            boxShadow: `0px 2px 4px -3px ${alpha(
              theme.palette.primary.main,
              0.1
            )}, 0px 5px 12px -4px ${alpha(theme.palette.primary.main, 0.05)}`,
          },
        }}
      >
        <NavBar />
        <SideBar />
        <Box
          sx={{
            position: "relative",
            zIndex: 5,
            display: "block",
            flex: 1,
            pt: 10,
            [theme.breakpoints.up("lg")]: {
              ml: "250px",
            },
          }}
        >
          <Box display="block" style={wrapper}>
            {children}
          </Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default Layout;
