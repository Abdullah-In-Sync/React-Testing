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
      maxWidth: "759px",
      minWidth: "342px",
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
    },

    labelWrapper: {
      fontFamily: "Montserrat",
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: "20px",
      marginLeft: "20px",
    },

    labelTitle: {
      letterSpacing: "0em",
      textAlign: "left",
      marginTop: "39px",
    },

    labelDescription: {
      marginTop: "20px",
      marginBottom: "12px",
    },

    resLabel: {
      marginTop: "20px",
    },

    titleTypo: {
      padding: "10px 6px 5px 12px",
      margin: "12px 20px 0px 20px",
      minHeight: "58px",
      fontWeight: 700,
      fontSize: "14px",
    },

    desTypo: {
      padding: "10px 5px 5px 10px",
      margin: "12px 20px 0px 20px",
      minHeight: "80px",
      fontWeight: 500,
      fontSize: "12px",
    },

    resTextarea: {
      color: "#25282B",
      border: "1px solid #25282B4D",
      padding: "5px",
      minHeight: "54px",
      minWidth: "335px",
      resize: "none",
      margin: "12px 20px 0px 20px",
      borderRadius: "4px",
      outline: "none",
    },

    mobilePopupResArea: {
      minWidth: "304px",
    },
    webPopupResArea: {
      minWidth: "719px",
    },

    buttonStyle: {
      padding: "6px 1px 6px 1px",
      color: mainTheme.palette.primary.contrastText,
      width: "93px",
      height: "36px",
      background: mainTheme.palette.primary.main,
      borderRadius: "4px",
    },
    buttonMobile: {
      margin: "13px 124.5px 18px 124.5px",
    },
    buttonWebStyle: {
      margin: "19px 333px 24px",
    },
  };
});
