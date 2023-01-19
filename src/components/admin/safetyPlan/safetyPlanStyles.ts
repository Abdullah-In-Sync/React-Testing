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
    "& .myhelp-select-control": {
      minWidth: 300,
      // flex: 1,
      padding: "0px 5px",
    },
    "& .filterDropdownInput": {
      display: "flex",
      flex: 1,
      "& .MuiBox-root": {
        paddingRight: 5,
      },
    },
    "& .form-control-bg": {
      background: "unset",
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
