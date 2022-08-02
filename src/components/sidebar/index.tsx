// 👇️ ts-nocheck ignores all ts errors in the file
// @ts-nocheck
import React, { useRef } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { withStyles } from "@mui/styles";
import { superadmin_routes } from "../../utility/sideNavItems";

const drawerWidth = 240;
const navTextColor = "custom.light";

const listItem = {
  paddingTop: "0px",
  paddingBottom: "0px",
};

// MuiListItemIcon-root css-cveggr-MuiListItemIcon-root
const ListButton = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "#6ca08e",
      color: "custom.light",
      "& .MuiListItemIcon-root": {
        color: "custom.light",
      },
    },
    "&$selected:hover": {
      backgroundColor: "#6ca08e",
      color: "custom.light",
      "& .MuiListItemIcon-root": {
        color: "custom.light",
      },
    },
    "&:hover": {
      backgroundColor: "#6ca08e",
      color: "custom.light",
      "& .MuiListItemIcon-root": {
        color: "custom.light",
      },
    },
  },
  selected: {},
})(ListItemButton);

export default function SideBar() {
  const [expanded, setExpanded] = React.useState({});
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (e, index) => {
    setSelectedIndex(index);
  };
  const handleClick = (e, id) => {
    setExpanded({
      ...expanded,
      [id]: !expanded[id],
    });
  };

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          backgroundColor: "primary.main",
          color: "custom.light",
          zIndex: 0,
        },
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {superadmin_routes.map((val, index) => {
            if (Array.isArray(val)) {
              return (
                <>
                  <ListItemButton
                    onClick={(e) => handleClick(e, val[0]?.key)}
                    sx={{ margin: "0px 16px" }}
                  >
                    <ListItemIcon
                      sx={{ color: "custom.light", minWidth: "32px" }}
                    >
                      {val[0]?.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={val[0]?.label}
                      primaryTypographyProps={{ fontSize: 14 }}
                    />
                    {expanded[val[0]?.key] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  {val?.slice(1)?.map((item, index) => (
                    <Collapse
                      key={val[0]?.key}
                      in={expanded[val[0]?.key] || false}
                      timeout="auto"
                      unmountOnExit
                    >
                      <ListItem key={item.label} sx={listItem}>
                        <NextLink href={item.path} passHref>
                          <ListButton
                            sx={{ pl: 4 }}
                            component="a"
                            onClick={(e) => handleListItemClick(e, item.key)}
                            selected={selectedIndex === item.key}
                          >
                            <ListItemIcon
                              sx={{ color: "custom.light", minWidth: "32px" }}
                            >
                              {item.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={item.label}
                              primaryTypographyProps={{ fontSize: 14 }}
                            />
                          </ListButton>
                        </NextLink>
                      </ListItem>
                    </Collapse>
                  ))}
                </>
              );
            } else {
              return (
                <>
                  <ListItem key={val.label} sx={listItem}>
                    <NextLink href={val.path} passHref>
                      <ListButton
                        onClick={(e) => handleListItemClick(e, val.key)}
                        selected={selectedIndex === val.key}
                        component="a"
                      >
                        <ListItemIcon
                          sx={{ color: "custom.light", minWidth: "32px" }}
                        >
                          {val.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={val.label}
                          primaryTypographyProps={{ fontSize: 14 }}
                        />
                      </ListButton>
                    </NextLink>
                  </ListItem>
                </>
              );
            }
          })}
        </List>
      </Box>
    </Drawer>
  );
}
