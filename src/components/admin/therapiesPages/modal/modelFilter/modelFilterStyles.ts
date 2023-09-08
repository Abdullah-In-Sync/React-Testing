import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    filterWrapper: {
      flexDirection: "row",
      flexWrap: "wrap",
      "& .myhelp-select-control": {
        [theme.breakpoints.down("lg")]: {
          flexDirection: "column",
          marginBottom: 10,
          width: "100%",
        },
        [theme.breakpoints.up("md")]: {
          minWidth: 300,
          padding: "0px 5px",
        },
      },
      "& .filterDropdownInput": {
        display: "flex",
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
  };
});
