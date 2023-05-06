import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@mui/system";
import { useTheme } from "@mui/styles";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    tablePaper: {
      "& .tableContainer": {},
      padding: 10,
      "& table": {
        width: "100%",
        height: "100%",
        overflowY: "scroll",
      },
      "& table td p": {
        fontWeight: 600,
        fontSize: "14px",
      },
      "& table th p": {
        fontWeight: "bold",
        fontSize: "14px",
      },
      "& .actionsWrapper": {
        position: "relative",
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
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
  };
});
