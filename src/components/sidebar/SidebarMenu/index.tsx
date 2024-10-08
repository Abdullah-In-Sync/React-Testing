import NextLink from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Button, Collapse, List, ListItem, styled } from "@mui/material";

import { useAppContext } from "../../../contexts/AuthContext";
import { SidebarContext } from "../../../contexts/SidebarContext";
import { filterBasedOnPrivilages } from "../../../utility/helper";
import {
  btb_actions_patient_routes,
  patient_routes,
  superadmin_routes,
  therapistRoutes,
} from "../../../utility/sideNavItems";
import { getSessionToken } from "../../../utility/storage";

const listItem = {
  paddingTop: "0px",
  paddingBottom: "0px",
};

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};
    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }
    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(14)};
      color: ${theme.palette.secondary.main} ;
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {
      .MuiListItem-root {
        padding: 1px 0;
        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};
          .MuiBadge-standard {
            background: ${theme.palette.secondary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.secondary.main};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.palette.primary.contrastText};
          text-transform: none;
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 1.2)};
          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(["color"])};
            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }
          .MuiButton-startIcon {
            color: 'white';
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: 'yellow';
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }
          &.active,
          &:hover {
            background-color: ${theme.palette.primary.light};
            color: ${theme.palette.primary.main};
            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.palette.primary.main};
            }
          }
        }
        &.Mui-children {
          flex-direction: column;
          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }
        .MuiCollapse-root {
          width: 100%;
          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }
          .MuiListItem-root {
            padding: 1px 0;
            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};
              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }
              &:before {
                content: ' ';
                background: ${theme.palette.primary.contrastText};
                opacity: 0;
                transition: ${theme.transitions.create([
                  "transform",
                  "opacity",
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }
              &.active,
              &:hover {
                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

const SidebarMenu = () => {
  const { closeSidebar } = useContext(SidebarContext);
  const router = useRouter();
  const currentRoute = router?.pathname;
  const [expanded, setExpanded] = useState({});

  const { user } = useAppContext();

  /* istanbul ignore next */
  const patientLinks = () => {
    if (location.host.includes("actions")) return btb_actions_patient_routes;
    else return patient_routes;
  };

  const userRoute = {
    patient: user ? patientLinks() : [],
    therapist: therapistRoutes,
    admin: superadmin_routes,
  };

  /* istanbul ignore next */
  const getRouteByUser = () => {
    const { userType } = getSessionToken();
    return userType ? userRoute[userType] : [];
  };

  /* istanbul ignore next */
  const handleClick = (e, id) => {
    /* istanbul ignore else */
    setExpanded({
      ...expanded,
      [id]: !expanded[id],
    });
  };

  return (
    <>
      <MenuWrapper data-testid="sideBar">
        <List component="div">
          <SubMenuWrapper>
            <List component="div">
              {getRouteByUser()
                .filter(filterBasedOnPrivilages)
                .map((val, index) => {
                  if (Array.isArray(val)) {
                    /* istanbul ignore next */
                    return (
                      <>
                        <ListItem component="div" key={index} sx={listItem}>
                          <Button
                            key={index}
                            data-testid={"menu_" + val[0]?.key}
                            disableRipple
                            component="a"
                            onClick={(e) => handleClick(e, val[0]?.key)}
                            startIcon={val[0]?.icon}
                            endIcon={
                              /* istanbul ignore next */
                              expanded[val[0]?.key] ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )
                            }
                          >
                            {val[0]?.label}
                          </Button>
                        </ListItem>

                        {val?.slice(1)?.map((item, index) => (
                          <Collapse
                            key={index}
                            in={expanded[val[0]?.key] || false}
                            timeout="auto"
                            unmountOnExit
                          >
                            <ListItem component="div" key={index} sx={listItem}>
                              <NextLink key={index} href={item.path} passHref>
                                <Button
                                  key={index}
                                  data-testid={"menu_" + item.label}
                                  className={
                                    currentRoute === `${item.path}`
                                      ? "active"
                                      : ""
                                  }
                                  disableRipple
                                  component="a"
                                  onClick={closeSidebar}
                                  startIcon={item.icon}
                                >
                                  {item.label}
                                </Button>
                              </NextLink>
                            </ListItem>
                          </Collapse>
                        ))}
                      </>
                    );
                  } else {
                    return (
                      <>
                        <ListItem component="div" key={index} sx={listItem}>
                          <NextLink key={index} href={val.path} passHref>
                            <Button
                              key={index}
                              className={
                                val.path.indexOf(currentRoute) !== -1
                                  ? "active"
                                  : ""
                              }
                              disableRipple
                              component="a"
                              onClick={closeSidebar}
                              startIcon={val.icon}
                            >
                              {val.label}
                            </Button>
                          </NextLink>
                        </ListItem>
                      </>
                    );
                  }
                })}
            </List>
          </SubMenuWrapper>
        </List>
      </MenuWrapper>
    </>
  );
};

export default SidebarMenu;
