import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@mui/system";
import { useTheme } from "@mui/styles";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    monitorsListMain: {
      "& .addMonitorWrapper": {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 10,
      },
    },
    formWrapper: {
      padding: "20px 0 0 0",
      "& .bottomActionButtonsWrapper": {
        display: "flex",
        flexWrap: "wrap",
        flex: "1",
        justifyContent: "center",
        padding: "10px 0px",

        "& .cancelButton": {
          background: theme.palette.secondary.main,
        },
      },
      "& .fieldsBoxWrapperFirst": {
        "& .MuiBox-root": {
          marginBottom: "0.7rem",
        },
      },
    },
  };
});
