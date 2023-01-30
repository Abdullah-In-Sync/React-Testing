import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
  tablePaper: {
    padding: "10px 0px 30px 0px",
    "& table": {
      width: "100%",
      "& .rowMessageWrapper .stackMesage": {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "70vh",
      },
    },
    "& .alertMessage": {
      textAlign: "center",
      width: 300,
    },
    "& .alertMessage .alertHead": {
      fontSize: "2rem",
      color: theme.palette.primary.main,
    },
    "& table td p": {
      fontWeight: 600,
    },
    "& table th p": {
      fontWeight: "bold",
    },
    "& .actionsWrapper": {
      position: "relative",
      zIndex: 1,
    },
    "& .actionsWrapper button": {
      marginRight: 10,
      background: theme.palette.custom.light,
      boxShadow: "unset",
      borderRadius: 5,
      width: 35,
      height: 0,
    },
    "& .actionsWrapper .active": {
      background: theme.palette.primary.main,
    },
    "& .actionsWrapper .active:hover": {
      color: theme.palette.custom.contrastText,
    },
    "& .actionsWrapper button:hover": {
      color: theme.palette.primary.main,
    },
    "& .actionsWrapper button svg": {
      fontSize: "1.2rem",
    },
    "& .MuiTableContainer-root": {
      paddingBottom: 20,
      border: "1px solid",
      borderColor: theme.palette.primary.main,
      borderRadius: 10,
    },
  },
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
