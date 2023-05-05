import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@mui/system";
import { useTheme } from "@mui/styles";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    formBoxWrapper: {
      border: "1px solid",
      borderColor: theme.palette.secondary.main,
      borderRadius: "10px",
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2),
    },
    resouceDetailBoxWrapper: {
      padding: "10px 10px 20px 10px",
      "& .buttonIconWrapper": {
        flexDirection: "row",
        justifyContent: "flex-end",
      },
      "& .inputsWrapper": {},
      "& .descriptionBoxWrapper": {
        padding: 10,
        "& label": {
          color: theme.palette.primary.main,
          fontWeight: "bold",
          fontSize: "1rem",
          paddingBottom: 3,
        },
        "& .MuiBox-root": {
          padding: 10,
          borderRadius: 10,
        },
        "& .MuiBox-root p": {
          fonSize: "0.8rem",
          color: theme.palette.custom.contrastText,
        },
      },
    },
  };
});
