import AccountCircle from "@mui/icons-material/AccountCircle";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { MouseEvent, useContext, useRef, useState } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";

import { useAppContext } from "../../contexts/AuthContext";

import { useSnackbar } from "notistack";
import { useAuth } from "../../hooks/useAuth";
import {
  patient_routes,
  superadmin_routes,
  therapistRoutes,
} from "../../utility/navItems";
import { getSessionToken } from "../../utility/storage";
import ChangePassword from "../changePassword/ChangePassword";
import { ConfirmInfoElement } from "../common/CustomModal/InfoModal";

const NavBar = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { logout } = useAuth();

  const infoModalRef = useRef<ConfirmInfoElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { orgData: { logo_url } = {} } = useAppContext();

  const userRoute = {
    patient: patient_routes,
    therapist: therapistRoutes,
    admin: superadmin_routes,
  };
  const getRouteByUser = () => {
    const { userType } = getSessionToken();
    return userRoute[userType] || [];
  };

  /* istanbul ignore next */
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  /* istanbul ignore next */
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);

  const onPressChangePassword = () => {
    infoModalRef.current.openConfirm({});
  };

  const handleDropdownCLick = (label) => {
    if (label === "logout")
      return logout(({ status, message }) =>
        enqueueSnackbar(message, {
          variant: status,
        })
      );
    else if (label === "changePassword") return onPressChangePassword();
  };
  return (
    <>
      <AppBar
        data-testid="navBar"
        position="fixed"
        color="inherit"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Container sx={{ maxWidth: "100%" }} maxWidth={false}>
          <Toolbar disableGutters>
            <Box
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {logo_url ? (
                <img
                  src={logo_url}
                  height="40"
                  width="150"
                  alt="logo"
                  loading="lazy"
                />
              ) : (
                <Image
                  alt="My Help"
                  src="/images/logo.png"
                  height="40"
                  width="150"
                />
              )}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenUserMenu}
                  color="inherit"
                  data-testid="accountCircleBtn"
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Menu
                data-testid="menu_dropdown"
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {getRouteByUser().map((setting) => (
                  <MenuItem
                    key={setting.label}
                    component={"a"}
                    data-testid={`btn_${setting.id}`}
                    onClick={() => handleDropdownCLick(setting.id)}
                  >
                    <Typography textAlign="center">{setting.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box
              component="span"
              sx={{
                ml: 2,
                display: { lg: "none", xs: "inline-block" },
              }}
            >
              <Tooltip arrow title="Toggle Menu">
                <IconButton color="primary" onClick={toggleSidebar}>
                  {!sidebarToggle ? (
                    <MenuTwoToneIcon fontSize="small" />
                  ) : (
                    <CloseTwoToneIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <ChangePassword infoModalRef={infoModalRef} />
    </>
  );
};
export default NavBar;
