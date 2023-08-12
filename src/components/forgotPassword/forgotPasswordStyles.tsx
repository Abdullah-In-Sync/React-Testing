import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles(() => {
  return {
    forgotScreenStack: {
      "& .backIcon": {
        fontSize: 15,
        color: "#25282B",
        marginRight: 5,
      },
      "& .backLinkWrapper": {
        position: "relative",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
      },
    },
  };
});
