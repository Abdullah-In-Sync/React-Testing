import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@mui/system";
import { useTheme } from "@mui/styles";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    formWrapper: {
      padding: "1rem 0rem",
      "& .bottomActionButtonsWrapper": {
        display: "flex",
        flexWrap: "wrap",
        flex: "1",
        justifyContent: "center",
        padding: "10px 0px",
        "& .MuiBox-root": {
          [theme.breakpoints.down("sm")]: {
            width: "100%",
            marginBottom: 10,
          },
          [theme.breakpoints.up("md")]: {
            padding: "0px 10px",
          },
        },
        "& .cancelButton": {
          background: theme.palette.secondary.main,
        },
        "& .MuiBox-root button": {
          [theme.breakpoints.down("sm")]: {
            width: "100%",
          },
          [theme.breakpoints.down("md")]: {},
          [theme.breakpoints.up("lg")]: {
            width: "10em",
          },
        },
      },
      "& .fieldsBoxWrapperFirst": {
        "& .fieldBox": {
          background: "red",
          textAlign: "right",
        },
        marginBottom: "1rem",
        "& .MuiBox-root": {
          marginBottom: "1rem",
        },
      },
    },
  };
});
