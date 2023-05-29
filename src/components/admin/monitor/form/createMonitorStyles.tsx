import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@mui/system";
import { useTheme } from "@mui/styles";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    emojisWrapperBox: {
      "& .active": {
        background: "#FFF3D3",
      },
      paddingTop: 10,
      color: theme.palette.secondary.main,
      "& label": {
        alignItems: "center",
        display: "flex",
      },
      "& .emojisWrapper": {
        display: "flex",
        flex: 1,
        flexWrap: "wrap",
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
          "& p": {
            color: "black",
          },
          "& .editEmojiButtonWrapper": {
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
    formViewWrapper: {
      "& .backButtonWrapper": {
        marginBottom: 30,
        textAlign: "center",
        padding: "10px 0px",
      },
      "& label": {
        color: "#6BA08E",
        fontWeight: 500,
      },
      "& .fieldsBoxWrapperFirst": {
        "& > div:first-child": {
          flex: 3,
          "& .MuiBox-root": {
            border: "1px solid #ccc",
            borderRadius: 5,
          },
        },
        "& > div:nth-child(2)": {
          flex: 1,
          "& .MuiBox-root": {
            border: "1px solid #ccc",
            borderRadius: 5,
          },
        },
        "& .MuiBox-root": {
          // paddingBottom: "1rem",
          padding: 10,
        },
        flex: 1,

        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: 5,
        marginBottom: 10,

        [theme.breakpoints.up("md")]: {
          display: "flex",
        },
      },
      "& .fieldsBoxWrapperSecond": {
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        "& > div:first-child": {
          "& .MuiBox-root": {
            border: "1px solid #ccc",
            minHeight: 70,
            borderRadius: 5,
            padding: 10,
          },
        },
      },
      "& .questionListWrapper": {
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        "& .questionWrapper": {
          borderBottom: `1px solid ${theme.palette.secondary.main}`,
          marginBottom: 10,
          "& > div:first-child": {
            border: "1px solid #ccc",
            minHeight: 70,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          },
          "& > div:nth-child(2)": {
            width: 150,
            border: "1px solid #ccc",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          },
          "& .listWrapper": {
            border: "1px solid #ccc",
            display: "flex",
            flexWrap: "wrap",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            "& .MuiBox-root": {
              border: "1px solid #ccc",
              margin: 3,
              maxWidth: "calc(100% - 6px)",
              borderRadius: 16,
              whiteSpace: "nowrap",
              padding: 3,
              "& span": {
                overflow: "hidden",
                textOverflow: "ellipsis",
                paddingLeft: 12,
                paddingRight: 12,
                whiteSpace: "nowrap",
              },
            },
          },
        },
        "& label": {
          color: "#6BA08E",
          marginBottom: 5,
          display: "inline-block",
        },
      },
    },
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

        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: 5,
        marginBottom: 10,

        [theme.breakpoints.up("md")]: {
          display: "flex",
        },
      },

      "& .fieldsBoxWrapperSecond": {
        padding: 10,
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: 5,
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
