import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => {
  return {
    monitorsListMain: {
      "& .addMonitorWrapper": {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 10,
      },
    },
  };
});
