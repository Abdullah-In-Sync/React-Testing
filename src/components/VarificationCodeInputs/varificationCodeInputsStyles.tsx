import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  varificationCodeWrapper: {
    "& input": {
      width: 45,
      height: 45,
      padding: 0,
      fontSize: 24,
      textAlign: "center",
      marginRight: 12,
      textTransform: "uppercase",
      color: "#494949",
      fontFamily:
        "SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial sans-serif",
      border: "1px solid #d6d6d6",
      borderRadius: 4,
      background: "#fff",
      backgroundClip: "padding-box",

      marginBottom: 5,
    },
    "& input:focus-visible": {
      appearance: "none",
      outline: 0,
      border: "1px solid #6ec9db",
      boxShadow: "0 0 0 3px rgb(110 201 219 / 50%)",
    },
    "& p": {
      fontSize: 17,
      lineHeight: 1.47059,
    },

    "& .props": {
      border: "1px solid #d6d6d6",
      padding: "8px 16px",
    },

    "& .options": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    "& .allowed-characters": {
      textAlign: "left",
    },
  },
});
