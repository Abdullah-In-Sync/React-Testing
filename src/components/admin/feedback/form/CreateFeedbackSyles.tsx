/* istanbul ignore file */
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@mui/system";
import { useTheme } from "@mui/styles";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    formWrapper: {
      "& .fieldsBoxWrapperFirst": {
        "& .MuiBox-root": {
          paddingBottom: "1rem",
        },
      },
      "& .fieldsBoxWrapper": {
        display: "flex",
        [theme.breakpoints.down("sm")]: {},
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          marginBottom: "1rem",
        },
        [theme.breakpoints.up("lg")]: {},
      },

      "& .first": {
        flex: 1,
        "& .MuiBox-root": {
          [theme.breakpoints.down("sm")]: {
            width: "100%",
            marginBottom: 10,
          },
          [theme.breakpoints.up("md")]: {
            flexDirection: "column",
            marginBottom: 10,
            width: "100%",
            "& .multiSelect": {
              maxWidth: 900,
            },
          },
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            marginBottom: 10,
            // width: "50%",
            width: "100%",
            "& .multiSelect": {
              maxWidth: 900,
            },
          },
          [theme.breakpoints.up("lg")]: {
            flex: 1,
            marginRight: "1rem",

            maxWidth: 250,
          },
          [theme.breakpoints.down("lg")]: {
            flex: 1,

            marginRight: "1rem",
            width: "100%",
            "& .multiSelect": {
              width: "100%",
            },
          },
        },
      },
      "& .second": {
        "& .MuiBox-root": {
          flex: 1,
        },
        "& button": {
          height: 38,
        },
        [theme.breakpoints.down("sm")]: {},
        [theme.breakpoints.down("md")]: {
          justifyContent: "flex-end",
        },
        [theme.breakpoints.up("lg")]: {
          flex: 1,
          justifyContent: "flex-end",
        },
      },

      "& .fieldBox": {
        display: "flex",
        flexWrap: "wrap",
        [theme.breakpoints.down("sm")]: {},
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
        },
        [theme.breakpoints.up("lg")]: {},
      },

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
    },
  };
});
