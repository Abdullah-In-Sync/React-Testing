import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  wrapper: {
    marginBottom: "10px",
    borderRadius: "10px",
    border: "1px solid rgb(107 160 142)",
  },
  tileHeader: {
    backgroundColor: "#6ba08e",
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: 700,
    padding: "12px 20px",
    borderRadius: "7px",
    lineHeight: "20px",
  },
  iconButton: {
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
  },
  contentWrapper: {
    padding: "15px",
  },
  scoreDiv: {
    fontSize: "20px",
    border: "1px solid #6a9e8c",
    padding: "10px",
    color: "#6a9e8c",
    marginBottom: "15px",
    fontWeight: "bold",
    borderRadius: "7px",
    textAlign: "center",
  },
  actionButton: {
    backgroundColor: "#d8ecf0",
    color: "#3cacbf",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "5px",
    paddingBottom: "5px",
    fontSize: "14px",
    fontWeight: "bold",
    minWidth: "150px",
    borderRadius: "4px",
    textTransform: "initial",
    "&:hover": {
      backgroundColor: "#d8ecf0",
    },
  },
  questionTable: {
    padding: "20px 10px",
    "& th > span": {
      fontSize: "14px",
      fontWeight: 700,
      lineHeight: "20px",
      "& :hover": {
        color: "#000",
      },
    },
    "& th": {
      textAlign: "center",
    },
    "& td": {
      textAlign: "center",
      fontSize: "14px",
      fontWeight: 600,
    },
    "& th > span:hover": {
      color: "#fff",
    },
    "& table": {
      border: "1px solid #6ec9db !important",
      transition: "0.5s",
      backgroundColor: "#fff",
      // borderRadius: "7px !important",
      borderCollapse: "separate",
      width: "100% !important",
    },
    "& .MuiTableBody-root": {
      borderTop: "unset !important",
      textAlign: " center !important",
      verticalAlign: "middle",
      height: "32px !important",
      borderBottom: "1px solid #6ec9db",
      background: "#ecfcff",
    },
  },
  showSelected: {
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "12px",
    verticalAlign: "middle",
    padding: "6px 10px",
  },
  scoreTableTitle: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#6ec9db",
  },
  infoText: {
    textRendering: "optimizeLegibility",
    "-webkit-font-smoothing": "antialiased",
    fontSize: "14px",
    lineHeight: "1.42857143",
    color: "#30373e",
    fontWeight: 500,
  },
  radioHeading: {
    fontSize: "14px",
    fontWeight: 600,
  },
  chartWrapper: {
    padding: "10px",
    border: "2px solid #d5d8da",
    borderRadius: "5px",
  },
  smallRadioButton: {
    margin: 0,
    "& svg": {
      width: "34px",
      height: "34px",
    },
  },
  scoreTable: {
    "&  td": {
      fontSize: "14px",
    },
    "&  th > span": {
      fontSize: "14px",
    },
  },
  viewResponseButton: {
    backgroundColor: "#6ec9db",
    color: "#fff",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "5px",
    paddingBottom: "5px",
    fontSize: "14px",
    fontWeight: "bold",
    minWidth: "150px",
    borderRadius: "4px",
    textTransform: "initial",
    "&:hover": {
      backgroundColor: "#6ec9db",
    },
  },

  accordionWrapper: {
    "& .actionButton": {
      backgroundColor: "#d8ecf0",
      color: "#3cacbf",
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingTop: "5px",
      paddingBottom: "5px",
      fontSize: "14px",
      fontWeight: "bold",
      minWidth: "150px",
      borderRadius: "4px",
      textTransform: "initial",
      "&:hover": {
        backgroundColor: "#d8ecf0",
      },
    },
    "& .actionWrapper": {
      display: "flex",
      "& div": {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        padding: "0px 10px",
        width: "100%",
      },
    },
  },
});
