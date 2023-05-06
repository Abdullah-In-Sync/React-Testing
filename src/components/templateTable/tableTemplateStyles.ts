import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  answerTypeWrapper: {
    height: "100%",
  },
  answerInputWrapper: {
    "& input": {
      width: "100%",
      height: "100%",
    },
    "& div": {
      width: "100%",
      height: "100%",
    },
    width: "100%",
    height: "100%",
  },
  viewBoxAnswer: {
    height: "100%",
    padding: 10,
    typography: "body1",
    display: "flex",
    alignItems: "center",
    whiteSpace: "pre-wrap",
  },
  patientView: {
    "& div": {
      pointerEvents: "none",
    },
  },
  tableCellView: {
    overflowX: "auto",
    paddingBottom: "20px",
  },
  yesNoRadioButtonsWrapper: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    "& .radio-buttons": {
      flexDirection: "row",
    },
    // "& .radio-buttons label": {
    //   margin: "0px 10px",
    // },
  },
});
