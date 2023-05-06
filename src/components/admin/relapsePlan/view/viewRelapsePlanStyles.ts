import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@mui/system";
import { useTheme } from "@mui/styles";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    adminRelapseViewWrapper: {
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
        "& label h6": {
          fontWeight: 600,
        },
      },
      "& .headerSection > *": {
        margin: "0.3em 0",
      },
      "& .instructionSection": {
        "& label p": {
          fontWeight: 800,
          color: theme.palette.primary.main,
        },
        "& .instructionDescriptionBox": {
          border: "1px solid #ccc",
          padding: 10,
          borderRadius: 7,
        },
      },
      "& .questionsSection": {
        "& label p": {
          marginBottom: 5,
          fontWeight: 800,
          color: theme.palette.primary.main,
        },
        "& .radioAnswerWrapper": {
          display: "flex",
          alignItem: "center",
          flex: 1,
        },
        "& .textAnswerWrapper": {
          border: "1px solid #ccc",
          padding: 10,
          minHeight: "6rem",
          borderRadius: 7,
        },
      },
      "& .csection": {
        paddingBottom: "1.3rem",
      },
      "& .muteText": {
        color: "#ccc",
      },
    },
  };
});
