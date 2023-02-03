import { makeStyles } from "@mui/styles";

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
