import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => {
  return {
    messageTextWrapper: {
      "& .infoMessageBoxWrapper": {
        textAlign: "center",
      },
    },
  };
});
