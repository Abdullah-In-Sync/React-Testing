import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
  filterWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",

    "& .myhelp-select-control": {
      // minWidth: 300,
      // flex: 1,
      // width: "100%",
      [theme.breakpoints.down("lg")]: {
        // flexDirection: "column",
        flexDirection: "column",
        marginBottom: 10,
        width: "100%",
        // "& .multiSelect": {
        //   maxWidth: 900,
        // },
      },
      [theme.breakpoints.up("md")]: {
        // flexDirection: "column",
        // marginBottom: 10,
        minWidth: 300,
        padding: "0px 5px",
      },
    },
    "& .filterDropdownInput": {
      display: "flex",
      // flexWrap: "wrap",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
      },
      [theme.breakpoints.up("md")]: {
        flexWrap: "wrap",
      },
      flex: 1,
      "& .MuiBox-root": {
        [theme.breakpoints.up("md")]: {
          paddingRight: 5,
        },
      },
    },
    "& .form-control-bg": {
      background: "unset",
    },

    "& .MuiBox-root": {
      [theme.breakpoints.down("lg")]: {
        width: "100%",
      },

      "& button": {
        width: "100%",
      },
    },
  },
  root: {
    "& .MuiTableCell-head": {
      color: "white",
      backgroundColor: theme.palette.primary.main,
      padding: "25px 0px",
    },
  },
}));
