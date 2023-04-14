import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  boxWithHeader: {
    "& header": {
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
    "& .header-box": {
      padding: 2,
      border: `1px solid #ccc`,
      borderRadius: "0px 0px 10px 10px",
    },
    "& .active-border": {
      padding: 2,
      border: "1px solid",
    },
    "& .headerText": {
      fontWeight: 600,
    },
  },
  simpleHeaderAppBar: {
    color: "#fff",
    padding: "0px 10px",
    "& header": {
      color: "#fff",
      padding: "0px 10px",
      borderRadius: 0,
    },
    "& .header-box": {
      padding: 2,
    },
    "& .MuiToolbar-root": {
      justifyContent: "flex-start",
    },
    "& .MuiTypography-root": {
      marginRight: 2,
    },
    "& .headerText": {
      fontWeight: 600,
    },
  },
}));
