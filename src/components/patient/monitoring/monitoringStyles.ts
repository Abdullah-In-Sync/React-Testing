import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
  monitoringMain: {
    padding: "10px 0px",
  },
  accordion: {
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "15px !important",
    "& h6": {
      color: theme.palette.custom.light,
    },
  },
  accordionSummary: {
    borderRadius: "10px",
    background: theme.palette.secondary.main,
  },
  accordionDetails: {},
  saveButtonWrapper: {
    textAlign: "center",
    padding: "10px 0px",
  },
  accordionAddIcon: {
    color: theme.palette.custom.light,
  },
  attachIcon: {
    fontSize: "1.5em",
  },
  emptyText: {
    color: theme.palette.primary.main,
    textAlign: "center",
  },
  toolsButton: {
    marginRight: 10,
    backgroundColor: "#d8ecf0",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#d8ecf0",
    },
  },
  listTitleWrapper: {
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: 7,
    textAlign: "center",
    padding: 10,
    margin: "10px 0px 10px 0px",
    "& p": {
      color: theme.palette.secondary.main,
      fontWeight: "bold",
    },
  },
  listButtonsWrapper: {
    flexDirection: "row",
  },
  completeListWrapper: {
    padding: "20px 10px",
    color: theme.palette.custom.contrastText,
    "& .questionBoxWrapper": {
      "& .questionBox": {
        padding: 10,
        background: "#dadada52",
        border: `1px solid #dadada52`,
        borderRadius: 7,
        color: `#3f4040b0`,
        "&. p": {
          fontSize: "1.2rem",
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
    "& .answerBoxWrapper": {
      padding: "7px 10px 15px 10px",
    },
    "& .listAnswerBoxWrapper": {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    "& .listAnswerBoxWrapper .MuiBox-root": {
      color: theme.palette.primary.main,
      border: `1px solid ${theme.palette.primary.main}`,
      padding: "5px 20px",
      borderRadius: 7,
      cursor: "pointer",
      flex: 1,
      margin: "5px 5px",
    },
    "& .listAnswerBoxWrapper .active": {
      background: theme.palette.primary.main,
      color: "#fff",
    },
    "& .radio-buttons": {
      flexDirection: "row",
      "& .radio-buttons label": {
        margin: "0px 10px",
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
    padding: "16px 0px",
  },
}));
