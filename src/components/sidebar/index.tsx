import { useContext } from "react";
import Scrollbar from "../common/Scrollbar";
import { SidebarContext } from "../../contexts/SidebarContext";

import { Box, Drawer, styled, Divider, useTheme } from "@mui/material";

import SidebarMenu from "./SidebarMenu";
// import Logo from 'src/components/LogoSign';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width:  240px;
        min-width:  240px;
        color: ${theme.palette.custom.light};
        position: relative;
        z-index: 7;
        height: 100%;
        padding-bottom: 68px;
`
);

function SideBar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();

  return (
    <>
      <SidebarWrapper
        sx={{
          display: {
            xs: "none",
            lg: "inline-block",
          },
          position: "fixed",
          left: 0,
          top: 0,
          background: theme.palette.primary.main,
          // theme.palette.mode === 'dark'
          //   ? alpha(lighten(theme.header.background, 0.1), 0.5)
          //   : darken(theme.colors.alpha.black[100], 0.5),
          // boxShadow:
          //   theme.palette.mode === 'dark' ? theme.sidebar.boxShadow : 'none'
        }}
      >
        <Scrollbar>
          <Box mt={3}>
            <Box
              mx={2}
              sx={{
                width: 52,
                height: 15,
              }}
            >
              {/* <Logo /> */}
            </Box>
          </Box>
          <Divider
            sx={{
              mt: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.palette.custom.light,
            }}
          />
          <SidebarMenu />
        </Scrollbar>
      </SidebarWrapper>

      {/* Small Screen */}
      <Drawer
        // sx={{
        //   boxShadow: `${theme.sidebar.boxShadow}`
        // }}
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            background: theme.palette.primary.main,
            // theme.palette.mode === 'dark'
            //   ? theme.colors.alpha.white[100]
            //   : darken(theme.colors.alpha.black[100], 0.5)
          }}
        >
          <Scrollbar>
            <Box mt={3}>
              <Box
                mx={2}
                sx={{
                  width: 52,
                  height: 10,
                }}
              >
                {/* <Logo /> */}
              </Box>
            </Box>
            <Divider
              sx={{
                mt: theme.spacing(3),
                mx: theme.spacing(2),
                background: theme.palette.primary.main[10],
              }}
            />
            <SidebarMenu />
          </Scrollbar>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default SideBar;
