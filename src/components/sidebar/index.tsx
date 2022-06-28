import React ,{useRef} from "react";
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
import { makeStyles } from '@mui/styles';
import { routes } from "../../utility/sideNavItems";

const drawerWidth = 240;
const navTextColor = "white"


const useStyles = makeStyles((theme) => ({
  drawer: {
    backgroundColor: theme.palette.primary.main,
  },
  listItem: {
    paddingTop: "0px",
    paddingBottom: "0px",
    // "&:hover": {
    //   background: "#eeeeee",
    // },
  }
}));


export default function SideBar() {

  const classes = useStyles();
  const navDropDownRef = useRef(null);
  const [open, setOpen] = React.useState(true);

  const handleClick = (e) => {
    if (navDropDownRef.current && navDropDownRef.current.contains(e.target)) {
      return;
    }
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      PaperProps={{
        sx: {
          backgroundColor: 'primary.main',
          color: navTextColor,
        }
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
          {routes.map((val, index) => {
            if (Array.isArray(val)) {
              return (
                <>
                  <ListItemButton onClick={handleClick} style={{ margin: '0px 16px' }} ref={navDropDownRef}>
                    <ListItemIcon style={{ color: navTextColor, minWidth: '32px' }}  >
                      {val[0]?.icon}
                    </ListItemIcon>
                    <ListItemText primary={val[0]?.label} primaryTypographyProps={{ fontSize: 14 }} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  {
                    val?.slice(1)?.map((item, index) => (
                      <ListItem key={item.label} className={classes.listItem}  >
                        <Collapse in={!open} timeout="auto" unmountOnExit anchorEl={navDropDownRef.current}>
                          <List component="div" disablePadding >
                            <ListItemButton sx={{ pl: 4 }}   >
                              <ListItemIcon style={{ color: navTextColor, minWidth: '32px' }}>
                                {item.icon}
                              </ListItemIcon>
                              <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14 }} />
                            </ListItemButton>
                          </List>
                        </Collapse>
                      </ListItem>
                    )
                    )
                  }

                </>
              )
            }
            else {
              return (
                <>
                  <ListItem key={val.label} className={classes.listItem} >
                    <ListItemButton onClick={handleClick}>
                      <ListItemIcon style={{ color: navTextColor, minWidth: '32px' }}  >
                        {val.icon}
                      </ListItemIcon>
                      <ListItemText primary={val.label} primaryTypographyProps={{ fontSize: 14 }} />
                    </ListItemButton>
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
