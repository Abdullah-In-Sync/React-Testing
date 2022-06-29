import React, { useRef } from "react";
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { withStyles } from '@mui/styles';
import { superadmin_routes } from "../../utility/sideNavItems";

const drawerWidth = 240;
const navTextColor = "white"

const listItem = {
  paddingTop: "0px",
  paddingBottom: "0px"
}

const scrollStyle = {
  overflowY: "auto",
  margin: 0,
  padding: 0,
  listStyle: "none",
  height: "100%",
  '&::-webkit-scrollbar': {
    width: '0.4em'
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,.1)',
    outline: '1px solid slategrey'
  }
}
// MuiListItemIcon-root css-cveggr-MuiListItemIcon-root
const ListButton = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "#6ca08e",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
    "&$selected:hover": {
      backgroundColor: "#6ca08e",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
    "&:hover": {
      backgroundColor: "#6ca08e",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "black"
      }
    }
  },
  selected: {}
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
      [id]: !expanded[id]
    });
  };



  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          backgroundColor: 'primary.main',
          color: navTextColor,
          zIndex:0
        }
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }} style={scrollStyle}>
        <List>
          {superadmin_routes.map((val, index) => {
            if (Array.isArray(val)) {
              return (
                <>
                  <ListItemButton onClick={(e) => handleClick(e, val[0]?.key)} style={{ margin: '0px 16px' }} >
                    <ListItemIcon style={{ color: navTextColor, minWidth: '32px' }}  >
                      {val[0]?.icon}
                    </ListItemIcon>
                    <ListItemText primary={val[0]?.label} primaryTypographyProps={{ fontSize: 14 }} />
                    {expanded[val[0]?.key] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  {
                    val?.slice(1)?.map((item, index) => (
                      <Collapse in={expanded[val[0]?.key] || false} timeout="auto" unmountOnExit >
                        <ListItem key={item.label} style={listItem}  >
                          <NextLink href={item.path} passHref>
                            <ListButton sx={{ pl: 4 }} component="a"
                              onClick={(e) => handleListItemClick(e, item.key)}
                              selected={selectedIndex === item.key}  >
                              <ListItemIcon style={{ color: navTextColor, minWidth: '32px' }}>
                                {item.icon}
                              </ListItemIcon>
                              <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14 }} />
                            </ListButton>
                          </NextLink>
                        </ListItem>
                      </Collapse>

                    )
                    )
                  }

                </>
              )
            }
            else {
              return (
                <>
                  <ListItem key={val.label} style={listItem} >
                    <NextLink href={val.path} passHref>
                      <ListButton onClick={(e) => handleListItemClick(e, val.key)}
                        selected={selectedIndex === val.key} component="a" >
                        <ListItemIcon style={{ color: navTextColor, minWidth: '32px' }}  >
                          {val.icon}
                        </ListItemIcon>
                        <ListItemText primary={val.label} primaryTypographyProps={{ fontSize: 14 }} />
                      </ListButton>
                    </NextLink>
                  </ListItem>
                </>
              )
            }
          }
          )}
        </List>

      </Box>
    </Drawer>
  );
}
