import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
  boxWithHeader: {
    "& .MuiPaper-root": {
      color: "#fff",
      padding: "0px 10px",
      borderRadius: "10px 10px 0px 0px",
    },
    "& .MuiToolbar-root": {
      justifyContent: "center",
    },
    "& .MuiTypography-root": {
      marginRight: 2,
    },
    "& .MuiBox-root": {
      padding: 2,
      border: `1px solid #ccc`,
    },
    "& .active-border": {
      padding: 2,
      border: "1px solid",
      borderColor: theme.palette.secondary.main,
    },
  },
  simpleHeaderAppBar: {
    color: "#fff",
    padding: "0px 10px",
    "& .MuiPaper-root": {
      color: "#fff",
      padding: "0px 10px",
      borderRadius: 0,
    },
    "& .MuiBox-root": {
      padding: 2,
    },
    "& .MuiToolbar-root": {
      justifyContent: "flex-start",
    },
    "& .MuiTypography-root": {
      marginRight: 2,
    },
  },
}));
