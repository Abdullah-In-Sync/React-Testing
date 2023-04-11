import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
  formWrapper: {
    padding: "1.7rem 0 0 0",
    "& .bottomActionButtonsWrapper": {
      display: "flex",
      flexWrap: "wrap",
      flex: "1",
      justifyContent: "center",
      padding: "10px 0px",

      "& .cancelButton": {
        background: theme?.palette?.secondary.main,
      },
    },
    "& .fieldsBoxWrapperFirst": {
      "& .MuiBox-root": {
        marginBottom: "0.7rem",
      },
    },
  },
}));
