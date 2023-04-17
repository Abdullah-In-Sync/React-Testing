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
      "& .planType": {
        textTransform: "capitalize",
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
      fontWeight: 400,
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
  root: {
    "& .MuiTableCell-head": {
      color: "white",
      backgroundColor: theme.palette.primary.main,
      padding: "25px 0px",
    },
  },
}));
