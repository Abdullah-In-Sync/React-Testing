import { Box, Stack, Typography } from "@mui/material";
import { useStyles } from "./messageTextDisplayStyles";

export const MesageTextDisplay = ({ message }) => {
  const styles = useStyles();
  return (
    <Stack className={styles.messageTextWrapper}>
      <Box className="infoMessageBoxWrapper">
        <Typography>{message}</Typography>
      </Box>
    </Stack>
  );
};
