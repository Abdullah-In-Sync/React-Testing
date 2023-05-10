/* istanbul ignore file */
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  addGoalButtonBox: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: "10px",
  },
  smallButton: {
    paddingLeft: "20px",
    paddingRight: "20px",
    backgroundColor: "#6EC9DB",
  },
  largeButton: {
    paddingLeft: "30px",
    paddingRight: "30px",
    backgroundColor: "#6EC9DB",
  },
  deleteButton: {
    display: "flex",
    justifyContent: "flex-end",
    paddingBottom: "5px",
    paddingLeft: "5px",
  },
  outerBorder: {
    border: "1px solid #cecece",
    padding: "10px",
    marginTop: "20px",
  },
  datePicker: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "10px",
  },
  textStyle: {
    color: "#6EC9DB",
    fontWeight: 600, // or "bold"
    paddingBottom: "5px",
  },
  sliderBox: {
    border: "1px solid #cecece",
    paddingTop: "10px",
    paddingLeft: "35px",
    paddingRight: "35px",
  },
  saveUpdateButton: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "10px",
    margin: 10,
    borderRadius: 1,
  },
  sucessText: {
    border: "1px solid #cecece",
    padding: "10px",
  },

  patientSideDate: {
    display: "flex",
    flexDirection: "row",
    border: "1px solid ",
    paddingLeft: "10px",
    borderRadius: "5px",
    height: "38px",
  },
});
