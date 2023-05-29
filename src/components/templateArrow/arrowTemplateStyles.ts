import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  nodeStyle: {
    border: "1px solid #3ABAD3",
    padding: "14px",
    background: "white",
    width: "100%",
    height: "100%",
    borderRadius: "5px",
  },

  deleteIconStyle: {
    position: "absolute",
    right: "-20px",
    top: "-4px",
    cursor: "pointer",
    zIndex: 1000,
  },

  textAreaTitleStyle: {
    whiteSpace: "normal",
    border: "1px solid #3ABAD3",
    borderRadius: "4px",
    color: "#3ABAD3",
    fontFamily: "Montserrat",
    fontSize: "14px",
    fontWeight: 700,
    lineHeight: "15px",
    letterSpacing: "0em",
    textAlign: "left",
    padding: "10px 10px 10px 10px",
    marginRight: "unset",
    resize: "none",
    outline: "none",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "&::-webkit-input-placeholder": {
      color: "#3ABAD3",
    },
    "&:-moz-placeholder": {
      color: "#3ABAD3",
    },
    "&::-moz-placeholder": {
      color: "#3ABAD3",
    },
    "&::-ms-input-placeholder": {
      color: "#3ABAD3",
    },
    "&::placeholder": {
      color: "#3ABAD3",
    },
  },

  textAreaDescriptionStyle: {
    whiteSpace: "normal",
    border: "1px solid #3ABAD3",
    borderRadius: "4px",
    fontFamily: "Montserrat",
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "13px",
    letterSpacing: "0em",
    textAlign: "left",
    color: "#3ABAD3",
    padding: "10px 10px 10px 10px",
    marginRight: "unset",
    resize: "none",
    outline: "none",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "&::-webkit-input-placeholder": {
      color: "#3ABAD3",
    },
    "&:-moz-placeholder": {
      color: "#3ABAD3",
    },
    "&::-moz-placeholder": {
      color: "#3ABAD3",
    },
    "&::-ms-input-placeholder": {
      color: "#3ABAD3",
    },
    "&::placeholder": {
      color: "#3ABAD3",
    },
  },

  responseStyle: {
    border: "1px solid #25282B",
    borderRadius: "4px",
    resize: "none",
    fontFamily: "Montserrat",
    fontSize: "12px",
    fontWeight: 500,
    padding: "4px",
    outline: "none",
  },
});
