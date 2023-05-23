import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@mui/system";
import { useTheme } from "@mui/styles";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    monitorsList: {
      "& .infoMessageBoxWrapper": {
        textAlign: "center",
      },
      "& .monitor": {
        display: "flex",
        alignItems: "center",
        flex: 1,
        justifyContent: "space-between",
        background: theme.palette.secondary.main,
        padding: "10px 15px",
        borderRadius: 10,
        "& .cl1": {
          "& p": {
            color: "#fff",
            fontWeight: 600,
          },
        },
        "& .cl2": {
          "& button:first-child": {
            marginRight: 10,
          },
          "& button": {
            color: theme.palette.secondary.main,
            background: "#fff",
            boxShadow: "unset",
          },
        },
      },
    },
  };
});
