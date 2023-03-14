import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
  adminFeedbackViewWrapper: {
    "& .infoMessageBoxWrapper": {
      textAlign: "center",
    },
    "& .sectionsWrapper": {
      padding: "1rem",
    },
    "& .headerSection": {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      "& .MuiBox-root": {
        paddingRight: "1.5rem",
        display: "flex",
        alignItems: "center",
      },
      "& label": {
        paddingRight: 10,
      },
      "& label p": {
        fontWeight: 600,
        fontSize: "1.1em",
      },
    },
    "& .headerSection > *": {
      margin: "0.3em 0",
    },
    "& .instructionSection": {
      "& label p": {
        fontWeight: 800,
        fontSize: "1.2em",
      },
      "& .instructionDescriptionBox": {
        border: "1px solid #ccc",
        padding: 10,
        // minHeight: "7rem",
        borderRadius: 10,
      },
    },
    "& .questionsSection": {
      "& label p": {
        fontWeight: 800,
        fontSize: "1.2em",
        color: theme.palette.primary.main,
      },
      "& .radioAnswerWrapper": {
        display: "flex",
        alignItem: "center",
        flex: 1,
        "& .radio-buttons": {
          flexDirection: "row",
        },
      },
      "& .textAnswerWrapper": {
        border: "1px solid #ccc",
        padding: 10,
        minHeight: "6rem",
        borderRadius: 10,
      },
    },
    "& .csection": {
      paddingBottom: "1.3rem",
    },
    "& .muteText": {
      color: "#ccc",
    },
  },
}));
