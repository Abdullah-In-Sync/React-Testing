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
    // marginBottom: "10px",
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

  accordianDetailsBorder: {
    border: "2px ",
    borderStyle: "solid",
    borderColor: "#7EBCA7",
    borderRadius: "10px ",
  },

  accordianDetailsQuestionBorder: {
    border: "2px ",
    padding: "10px",
    borderStyle: "solid",
    borderColor: "#7EBCA7",
    borderRadius: "10px ",
    marginBottom: "10px",
  },
  accordianDetailsQuestionBox: {
    backgroundColor: "#f0f0f0",
    color: "#333",
    // padding: "10px",
    borderRadius: "4px",
    fontWeight: "bold",
    marginBottom: "10px",
  },

  accordianDetailsQuestionBoxTypography: {
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "15px",
    // fontWeight: "500",
    fontSize: "14px",
  },

  accordianDetailsSaveCancelButtonBox: {
    display: "flex",
    justifyContent: "center",
    p: 1,
    m: 1,
    bgcolor: "background.paper",
    borderRadius: 1,
  },

  saveButton: {
    backgroundColor: "#6EC9DB",
    textTransform: "none",
    paddingRight: "40px",
    paddingLeft: "40px",
  },

  cancelButton: {
    backgroundColor: "#6BA08E",
    textTransform: "none",
    paddingRight: "30px",
    paddingLeft: "30px",
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
