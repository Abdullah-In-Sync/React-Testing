/* istanbul ignore file */
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  customBox: {
    width: "100%",
    height: "65px",
    background: "#7EBCA7",
    border: "1px solid #7EBCA7",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  addMonitorButtonBox: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "10px",
  },
  addMonitorButtonStyle: {
    backgroundColor: "#6EC9DB",
    color: "white",
    textTransform: "none",
  },
  typography: {
    textAlign: "center",
    padding: "20px",
    color: "White",
    fontWeight: 700,
  },
  viewResponseButton: {
    backgroundColor: "white",
    color: "#7EBCA7",
    fontWeight: 700,
    paddingLeft: "20px",
    paddingRight: "20px",
    marginRight: "10px",
  },
  completeButton: {
    backgroundColor: "white",
    color: "#7EBCA7",
    fontWeight: 700,
    paddingLeft: "30px",
    paddingRight: "30px",
  },
});
