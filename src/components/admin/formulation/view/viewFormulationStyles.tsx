import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    viewFormulationWrapper: {
      "& .infoIconWrapper": {
        "& .infoIcon": {
          color: theme.palette.secondary.contrastText,
        },
        display: "flex",
        position: "absolute",
        right: 0,
        "& svg": {
          fontSize: 30,
        },
      },
    },
    nodeCardDetailModalWrapper: {
      "& .row": {
        marginBottom: 10,
      },
      "& label": {
        fontWeight: 500,
        marginBottom: 3,
        color: theme.palette.secondary.main,
        display: "inline-block",
      },
      "& .desTextWrapper": {
        border: "1px solid #ccc",
        padding: 10,
        borderRadius: 5,
        minHeight: 60,
      },
    },
  };
});
