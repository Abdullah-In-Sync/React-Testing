import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@mui/styles";
import { Theme } from "@mui/system";

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
          minWidth: 150,
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
          [theme.breakpoints.up("xl")]: {
            margin: "0px 5px !important",
          },
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
    viewResponseWrapper: {
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
          padding: 10,
        },
      },
      "& .sectionLabelBox": {
        border: "1px solid #ccc",
        padding: 10,
        marginBottom: 7,
        borderRadius: 5,
        "& p": {
          fontWeight: 600,
        },
      },
      "& .graphChartBox": {
        padding: "15px 20px",
        border: "1px solid #ccc",
        marginBottom: 13,
        borderRadius: 5,
      },
      "& .emojListWrapper": {
        display: "flex",
        margin: 0,
      },

      "& .emojiPieChartWrapper": {
        [theme.breakpoints.up("lg")]: {
          width: "60vw",
        },
        [theme.breakpoints.down("md")]: {
          overflowX: "scroll",
        },
        padding: "10px",
        alignItems: "center",
        "& .MuiBox-root": {
          // height: 300
        },
        "& .emojisBox": {
          marginBottom: 10,
          padding: 10,
          display: "flex",
          justifyContent: "center",
          background: "#FFF3D3",
          "& .vImgIconWraper": {
            // width: 80,
            minWidth: 150,
            textAlign: "center",
            "& .vImgIcon": {
              width: 25,
            },
            "& p": {
              color: "black",
              textAlign: "center",
              fontSize: "0.7rem",
            },
            "& img": {
              margin: "0px 20px !important",
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
        "& .emojisLineChart": {
          display: "flex",
          position: "relative",
          "& ul": {
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            bottom: 10,
            padding: "10px 0px",
          },
        },
        "& .emojListWrapperCenter": {
          display: "flex",
          position: "relative",
          "& ul": {
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            bottom: 10,
            padding: "10px 0px",
            left: -5,
          },
        },
        "& .MuiBox-root": {
          // height: 300
        },
      },
      "& .yesNoChartWrapper": {
        "& .MuiBox-root": {
          // height: 300
        },
      },
      "& .hoursChartWrapper": {
        "& .MuiBox-root": {},
      },

      "& .vImgIcon": {
        // width: 25,
        // flexBasis: 50
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
          // padding: "10px",
        },
        "& .completedOnText": {
          color: theme.palette.secondary.main,
          textAlign: "right",
          fontWeight: 400,
        },
      },
      "& .listWrapper": {
        alignItems: "center",
        "& label": {
          fontSize: 11,
          lineHeight: 1,
        },
        border: "1px solid #ccc",
        display: "flex",
        flexWrap: "wrap",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        "& .colonBox": {
          minWidth: "15px !important",
          maxWidth: "15px !important",
        },
        "& .MuiBox-root": {
          border: "1px solid #ccc",
          margin: 3,
          minWidth: 70,
          maxWidth: "calc(100% - 6px)",
          borderRadius: 5,
          whiteSpace: "nowrap",
          padding: 3,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          "& span": {
            overflow: "hidden",
            textOverflow: "ellipsis",
            paddingLeft: 12,
            paddingRight: 12,
            whiteSpace: "nowrap",
          },
        },
        "& .active": {
          background: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
          color: "#fff",
        },
      },
    },
    topHeaderRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 0px",
    },
  };
});
