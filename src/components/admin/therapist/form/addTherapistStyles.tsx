import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    formWrapper: {
      padding: 15,
      border: `1px solid ${theme.palette.secondary.main}`,
      borderRadius: 7,
      "& .fieldsBoxWrapperFirst": {
        "& .radioErrorMessgeWrapper": {
          position: "relative",
          "& .invalid-input-message": {
            position: "absolute",
            top: 40,
          },
        },
        "& .accToggleWrapper": {
          textAlign: "center",
          "& .accLabel": {
            display: "inline-block",
            marginRight: 10,
          },
        },
        "& .chooseFileWrapper": {
          "& legend": {
            display: "contents",
          },
          "& .uploadButtonLabel": {
            display: "block",
            marginBottom: 5,
          },
          "& .MuiButton-contained": {
            background: "#ccc",
            color: "black",
            borderColor: "#ccc",
            marginRight: 10,
          },
        },
        "& .radioFieldsWrapper": {
          "& .radioLabel": {
            marginRight: 10,
            display: "inline-block",
          },
          display: "flex",
          alignItems: "center",
          "& .radio-buttons": {
            flexDirection: "row !important",
          },
        },
        "& > div:first-child": {
          flex: 1,
        },
        "& > div:nth-child(2)": {
          flex: 1,
        },
        "& > div:nth-child(3)": {
          flex: 1,
        },
        "& .MuiBox-root": {
          //   // paddingBottom: "1rem",
          padding: 7,
        },
        flex: 1,

        // border: `1px solid ${theme.palette.secondary.main}`,
        // borderRadius: 5,
        marginBottom: 10,

        [theme.breakpoints.up("md")]: {
          display: "flex",
        },
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
          [theme.breakpoints.down("md")]: {
            width: "100%",
            marginBottom: 10,
          },
          [theme.breakpoints.up("md")]: {
            padding: "0px 10px",
          },
        },

        "& .MuiBox-root button": {
          [theme.breakpoints.down("sm")]: {
            width: "100%",
          },
          [theme.breakpoints.down("md")]: {
            width: "100%",
          },
          [theme.breakpoints.up("md")]: {
            width: "10em",
          },
          // [theme.breakpoints.down("md")]: {},
          // [theme.breakpoints.up("lg")]: {
          //   width: "10em",
          // },
        },
      },
    },
  };
});
