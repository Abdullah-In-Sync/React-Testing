import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@mui/system";
import { useTheme } from "@mui/styles";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    monitorsListMain: {
      "& h5": {
        color: theme.palette.primary.main,
      },
    },
    completeListWrapper: {
      "& h5": {
        color: theme.palette.primary.main,
      },
      padding: "20px 10px",
      color: theme.palette.custom.contrastText,
      "& .questionBoxWrapper": {
        "& .emojisBox": {
          cursor: "pointer",
        },
        "& .questionBox": {
          padding: 10,
          border: `1px solid #ccc`,
          borderRadius: 5,
          // color: `#3f4040b0`,
          "& p": {
            fontWeight: 500,
          },
        },
      },
      "& .emojListWrapper": {
        margin: 0,
      },
      "& .emojListWrapper li": {
        padding: "10px 50px",
        cursor: "pointer",
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: 10,
        margin: 5,
        color: theme.palette.custom.contrastText,
        textAlign: "center",
      },
      "& .emojListWrapper li p": {
        color: "#6c757d",
        fontSize: "0.8rem",
        fontWeight: 600,
      },
      "& .emojListWrapper .active": {
        background: theme.palette.primary.main,
      },
      "& .emojListWrapper li img": {
        background: "#fff",
      },
      "& .questionBoxWrapper:first-child": {
        "& .answerBox": {
          "& div:first-child": {
            padding: 0,
          },
        },
      },
      "& .answerBoxWrapper": {
        padding: "7px 10px 15px 0px",
        "& .emojisBox": {
          margin: "0px 5px !important",
        },
      },
      "& .listAnswerBoxWrapper": {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      },
      "& .listAnswerBoxWrapper .MuiBox-root": {
        color: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`,
        padding: "5px",
        borderRadius: 5,
        cursor: "pointer",
        minWidth: 70,
        minHeight: 37,
        marginRight: 10,
        alignItems: "center",
        display: "flex",
        [theme.breakpoints.down("md")]: {
          marginBottom: 5,
        },
      },
      "& .listAnswerBoxWrapper .active": {
        background: theme.palette.primary.main,
        color: "#fff",
      },
      "& .radio-buttons": {
        flexDirection: "row",
        "& label": {
          marginLeft: "unset",
          border: "1px solid #ccc",
          borderRadius: 5,
          paddingRight: 10,
        },
      },
      "& .hoursInputBoxWrapper input": {
        background: "#dadada52",
        border: "1px solid #dadada52",
        color: "#3f4040b0",
        marginBottom: "5px",
        height: 34,
        padding: "6px 12px",
        fontSize: 14,
        lineHeight: 1.42857143,
        borderRadius: 4,
        transition: "border-color ease-in-out .15s,box-shadow ease-in-out .15s",
        width: "30%",
      },
      "& .hoursInputBoxWrapper input:focus-visible": {
        outline: "unset",
      },
      "& .bottomButtonsWrapper": {
        flexDirection: "row",
        justifyContent: "center",
        padding: "20px 0px",
      },
      "& .bottomButtonsWrapper .MuiBox-root": {
        padding: "0px 10px",
      },
    },
    completeWrapper: {
      // padding: "16px 0px",
      "& > div:first-child": {
        borderColor: `${theme.palette.secondary.main} !important`,
        border: "1px solid",
        borderRadius: 10,
        minHeight: "70vh",
        "& header": {
          borderRadius: 7,
          boxShadow: "unset",
        },
        "& .header-box": {
          border: "unset",
        },
      },
    },
  };
});
