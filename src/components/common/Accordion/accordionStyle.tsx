import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  wrapper: {
    marginBottom: "10px !important",
    borderRadius: "10px !important",
    border: "1px solid rgb(107 160 142) !important",
  },
  tileHeader: {
    backgroundColor: "#6ba08e !important",
    color: "#fff !important",
    textTransform: "capitalize",
    fontWeight: 700,
    padding: "12px 20px !important",
    borderRadius: "7px !important",
    lineHeight: "20px !important",
  },
  iconButton: {
    color: "#fff !important",
    fontSize: "20px !important",
    cursor: "pointer !important",
  },
  contentWrapper: {
    padding: "15px !important",
  },
  actionButton: {
    backgroundColor: "#d8ecf0 !important",
    color: "#3cacbf !important",
    paddingLeft: "20px !important",
    paddingRight: "20px !important",
    paddingTop: "5px !important",
    paddingBottom: "5px !important",
    fontSize: "14px !important",
    fontWeight: "bold !important",
    minWidth: "150px !important",
    borderRadius: "4px !important",
    textTransform: "initial",
    "&:hover": {
      backgroundColor: "#d8ecf0 !important",
    },
  },
  showSelected: {
    borderRadius: "50% !important",
    cursor: "pointer !important",
    fontSize: "12px !important",
    verticalAlign: "middle !important",
    padding: "6px 10px !important",
  },
  infoText: {
    textRendering: "optimizeLegibility",
    "-webkit-font-smoothing": "antialiased !important",
    fontSize: "14px !important",
    lineHeight: "1.42857143 !important",
    color: "#30373e !important",
    fontWeight: 500,
  },
});
