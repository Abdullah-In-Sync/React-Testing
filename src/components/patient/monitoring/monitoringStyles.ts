import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
  monitoringMain: {
    padding: "10px 0px",
    "& .headerWrapper": {
      flexDirection: "row",
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0px 10px",
    },
    "& .rangeDatePickerWrapper": {
      padding: 15,
    },
    "& .dateRangeToWrapper": {
      padding: 15,
    },
    "& .goButtonWrapper": {
      padding: "0px 10px",
    },
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
  viewResponseWrapper: {
    "& .emojiPieChartWrapper": {
      padding: "10px",
      alignItems: "center",

      "& .MuiBox-root": {
        // height: 300
      },
      "& .emojisBox": {
        marginBottom: 10,
        display: "flex",
        justifyContent: "center",
        width: "70%",
        background: "#e4faff",
        "& .vImgIconWraper": {
          width: 80,
          "& .vImgIcon": {
            width: 25,
          },
          "& p": {
            color: "black",
            textAlign: "center",
            fontSize: "0.7rem",
          },
          "& img": {
            padding: "0px 20px !important",
          },
        },
      },
      "& .pieChart": {
        width: "25%",
        display: "flex",
        justifyContent: "center",
      },
    },
    "& .emojiLineChartWrapper": {
      padding: "10px",
      "& .emojisLineChart": {
        display: "flex",
        position: "relative",
        "& ul": {
          // margin: "0px 0px -10px 0px"

          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          /* top: -30px; */
          bottom: 0,
          padding: "10px 0px",
        },
      },
      alignItems: "center",

      "& .MuiBox-root": {
        // height: 300
      },
    },
    "& .yesNoChartWrapper": {
      padding: "10px",
      alignItems: "center",

      "& .MuiBox-root": {
        // height: 300
      },
    },
    "& .hoursChartWrapper": {
      padding: "10px",
      alignItems: "center",

      "& .MuiBox-root": {},
    },

    "& .vImgIcon": {
      width: 25,
    },
    "& .csvSectionWrapper": {
      "& p": {
        color: "black",
        fontWeight: "bold",
        fontSize: 14,
      },
      "& .headerAdditionalQues": {
        color: theme.palette.secondary.main,
        fontSize: 18,
      },
      "& .queMain": {
        padding: "12px",
      },
      "& .ansWrapper": {
        padding: "10px",
      },
      "& .completedOnText": {
        color: theme.palette.secondary.main,
        textAlign: "right",
        fontWeight: 400,
      },
    },
  },
}));
