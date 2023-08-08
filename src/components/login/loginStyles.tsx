import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@mui/styles";
import { Theme } from "@mui/system";
import { getCurrentURL } from "../../utility/helper";
const url = getCurrentURL();
export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    gridContainer: {
      height: "100vh",
      "& .leftColumnGrid": {
        backgroundImage: `url(${url}/v2/images/loginSideImg.png)`,
        backgroundRepeat: "no-repeat",
        backgroundColor: theme.palette.grey[50],
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      "& .rightColumnGrid": {
        "& .formBox": {
          "& .form": {
            [theme.breakpoints.down("md")]: {
              width: "80%",
            },
            [theme.breakpoints.up("md")]: {
              width: "50%",
            },
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        },
        "& .loginButton": { marginTop: 20, marginBottom: 10 },
      },
    },
  };
});
