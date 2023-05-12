import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@mui/system";
import { useTheme } from "@mui/styles";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    formWrapper: {
      "& .fieldsBoxWrapperFirst": {
        "& > div:first-child": {
          flex: 3,
        },
        "& > div:nth-child(2)": {
          flex: 1,
        },
        "& .MuiBox-root": {
          // paddingBottom: "1rem",
          padding: 10,
        },
        flex: 1,
        display: "flex",
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: 5,

        marginBottom: 10,
      },

      "& .fieldsBoxWrapperSecond": {
        padding: 10,
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: 5,
        "& .emojisWrapperBox": {
          paddingTop: 10,
          color: theme.palette.secondary.main,
          "& label": {
            alignItems: "center",
            display: "flex",
          },
          "& .emojisWrapper": {
            display: "flex",
            flex: 1,
            "& .emojisBox": {
              padding: 20,
              margin: "5px 7px 0px 0px",
              border: "1px solid",
              flex: 1,
              textAlign: "center",
              position: "relative",
              justifyContent: "center",
              borderRadius: 5,
              borderColor: "#ccc",
              [theme.breakpoints.up("md")]: {
                minHeight: 180,
              },
              "& img": {
                width: "unset !important",
                height: "unset !important",
              },
              "& .deleteButtonWrapper": {
                position: "absolute",
                right: 0,
                top: 0,
                padding: 5,
                "& button": {
                  background: theme.palette.primary.main,
                  color: theme.palette.primary.light,
                },
              },
            },
          },
        },
      },
      "& .addQuestionSection": {
        "& .questionCard": {
          borderColor: theme.palette.secondary.main,
        },
        "& .addQuestionButtonWrapper": {
          textAlign: "right",
          paddingTop: 10,
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
        "& .cancelButton": {
          background: theme.palette.secondary.main,
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
