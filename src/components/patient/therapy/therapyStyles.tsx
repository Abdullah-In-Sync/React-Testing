import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
  therapyMain: {
    "& .firstSection": {
      background: theme.palette.secondary.main,
      borderRadius: "10px 10px 0px 0px",
      padding: 5,
      display: "flex",
      alignItems: "center",
      marginBottom: 10,
      "& .userImageWrapper span": {
        padding: 5,
        verticalAlign: "middle",
      },
      "& .userNameWrapper h6": {
        textTransform: "capitalize",
      },
    },
    "& .secondSection": {
      "& .therapyTabsWrapper": {
        paddingTop: 10,
      },
    },
  },
}));
