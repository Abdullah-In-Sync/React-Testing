import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
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
});
