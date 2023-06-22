/* istanbul ignore file */
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  listBlueBar: {
    width: "100%",
    height: "60px",
    backgroundColor: "#6EC9DB",
    // border: "2px solid #6EC9DB",
    borderRadius: "4px",
    // display: "flex",
    // flex: "none",
    marginBottom: "20px",
    // cursor: "pointer",
    justifyContent: "flex-start",
    paddingLeft: "10px",
  },
  topButton: {
    display: "flex",
    justifyContent: "flex-end",
    paddingBottom: "15px",
  },
  accordianTop: {
    backgroundColor: "#7EBCA7",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  accordianIconButton: {
    color: "white",
  },
  accordianName: {
    color: "white",
    fontWeight: 700,
    fontSize: "16px",
  },
  accordianDetails: {
    backgroundColor: "white",
  },

  // style={{
  //   width: "100%",
  //   height: "60px",
  //   background: "#6EC9DB",
  //   border: "2px solid #6EC9DB",
  //   borderRadius: "4px",
  //   display: "flex",
  //   flex: "none",
  //   marginBottom: "20px",
  //   cursor: "pointer",
  //   justifyContent: "flex-start",
  //   paddingLeft: "10px",
  // }}
});
