import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  modelStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
  },
  modelBox: {
    width: "759px",
    height: "463px",
    background: "#FFFFFF",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    position: "relative",
  },
  childBox: {
    position: "absolute",
    right: "24.28px",
    top: "24.28px",
    cursor: "pointer",
    zIndex: 1000,
  },

  labelTitle: {
    fontFamily: "Montserrat",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "20px",
    letterSpacing: "0em",
    textAlign: "left",
    marginLeft: "20px",
    marginTop: "39px",
  },

  labelDescription: {
    fontFamily: "Montserrat",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "20px",
    marginLeft: "20px",
    marginTop: "20px",
    marginBottom: "12px",
  },

  resLabel: {
    fontFamily: "Montserrat",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "20px",
    marginLeft: "20px",
    marginTop: "20px",
  },

  titleTypo: {
    border: "1px solid #3ABAD3",
    color: "#3ABAD3",
    borderRadius: "4px",
    padding: "10px 6px 5px 12px",
    margin: "12px 20px 0px 20px",
    minHeight: "58px",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "14px",
    lineHeight: "110%",
  },

  desTypo: {
    border: "1px solid #3ABAD3",
    color: "#3ABAD3",
    borderRadius: "4px",
    padding: "10px 5px 5px 10px",
    margin: "12px 20px 0px 20px",
    minHeight: "80px",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "110%",
  },

  resTextarea: {
    color: "#25282B",
    border: "1px solid #25282B4D",
    padding: "5px",
    minHeight: "54px",
    minWidth: "719px",
    resize: "none",
    margin: "12px 20px 0px 20px",
    borderRadius: "4px",
    outline: "none",
  },

  buttonStyle: {
    padding: "6px 1px 6px 1px",
    color: "#FFFFFF",
    width: "93px",
    height: "36px",
    background: "#6EC9DB",
    borderRadius: "4px",
    margin: "19px 333px 24px",
  },
});
