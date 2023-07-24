import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@mui/system";
import theme from "../../../styles/theme/theme";

export const useStyles = makeStyles(() => {
  const mainTheme = theme({ panel_color: "#3ABAD3" }) as Theme;
  return {
    modelStyle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      outline: "none",
    },

    mobileModelStyle: {
      margin: "0px 19px",
    },
    modelBox: {
      background: mainTheme.palette.primary.contrastText,
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      position: "relative",
      // maxWidth: "759px",
      width: "759px",
    },
    childBox: {
      position: "absolute",
      right: "24.28px",
      top: "24.28px",
      cursor: "pointer",
      zIndex: 1000,
    },

    textWrapper: {
      border: "1px solid",
      color: mainTheme.palette.primary.main,
      borderRadius: "4px",
      fontFamily: "Montserrat",
      fontStyle: "normal",
      lineHeight: "110%",
      minWidth: "335px",
    },

    labelWrapper: {
      fontFamily: "Montserrat",
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: "20px",
      marginLeft: "20px",
    },

    labelDescription: {
      marginTop: "20px",
      marginBottom: "12px",
    },

    desTypo: {
      padding: "10px 5px 5px 10px",
      margin: "12px 20px 0px 20px",
      minHeight: "80px",
      fontWeight: 500,
      fontSize: "12px",
    },
    instTypo: {
      padding: "10px 5px 5px 10px",
      margin: "12px 20px 25px 20px",
      minHeight: "80px",
      fontWeight: 500,
      fontSize: "12px",
    },
  };
});
