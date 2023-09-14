import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@mui/system";
import { useTheme } from "@mui/styles";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    settingMain: {
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
          lineHeight: 1,
        },
      },
      "& .secondSection": {
        "& .therapyTabsWrapper": {
          paddingTop: 10,
          paddingBottom: 10,
          "& [role*=tabpanel]": {
            padding: "10px 0px",
          },
        },
      },
    },
  };
});
