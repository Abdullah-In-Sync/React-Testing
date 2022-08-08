import { useContext } from "react";
import { Box, Drawer, styled, Divider, useTheme } from "@mui/material";
import Scrollbar from "../common/Scrollbar";
import { SidebarContext } from "../../contexts/SidebarContext";
import SidebarMenu from "./SidebarMenu";

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width:  240px;
        min-width:  240px;
        color: ${theme.palette.custom.light};
        position: relative;
        z-index: 7;
        height: 100%;
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
          zIndex: "auto",
          left: 0,
          top: 0,
          background: theme.palette.primary.main,
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
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            background: theme.palette.primary.main,
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
