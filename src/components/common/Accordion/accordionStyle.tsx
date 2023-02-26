import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  wrapper: {
    marginBottom: "10px",
    borderRadius: "10px",
    border: "1px solid rgba(37, 40, 43, 0.1)",
  },
  tileHeader: {
    backgroundColor: "#6ba08e",
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: 700,
    padding: "12px 20px",
    borderRadius: "7px",
    lineHeight: "20px",
    fontSize: "14px",
  },
  iconButton: {
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
  },
  contentWrapper: {
    padding: "15px",
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
  showSelected: {
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "12px",
    verticalAlign: "middle",
    padding: "6px 10px",
  },
  infoText: {
    textRendering: "optimizeLegibility",
    "-webkit-font-smoothing": "antialiased",
    fontSize: "14px",
    lineHeight: "1.42857143",
    color: "#30373e",
    fontWeight: 500,
  },
});
