import { useState, MouseEvent, useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import { SidebarContext } from "../../contexts/SidebarContext";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import { useAppContext } from "../../contexts/AuthContext";

import {
  superadmin_routes,
  patient_routes,
  therapistRoutes,
} from "../../utility/navItems";
import { clearSession, getSessionToken } from "../../utility/storage";

const NavBar = () => {
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [userType, setUserType] = useState<string>("admin");
  const { user: { organization_settings: { logo = null } = {} } = {} } =
    useAppContext();

  useEffect(() => setUserType(Cookies.get("user_type")), []);

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

  const handleDropdownLick = (label) => {
    if (label === "Log Out") clearSession(() => router.replace("/login"));
  };
  return (
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
            {logo && logo != "" ? (
              <img
                src={`/account/openFile?type=logo&file=${logo}`}
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
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
            <Menu
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
              {getRouteByUser(userType).map((setting) => (
                <MenuItem
                  key={setting.label}
                  component={"a"}
                  onClick={() => handleDropdownLick(setting.label)}
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
  );
};
export default NavBar;
