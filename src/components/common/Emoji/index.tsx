import { Box } from "@mui/material";
import { Emoji, EmojiStyle } from "emoji-picker-react";
import React from "react";
import { useStyles } from "./emojiStyles";

type ViewProps = {
  unified?: string;
  size?: number;
};

const EmojiListBox: React.FC<ViewProps> = ({ unified, ...rest }) => {
  const styles = useStyles();

  return (
    <Box className={styles.emojisWrapper}>
      <Emoji unified={unified} emojiStyle={EmojiStyle.NATIVE} {...rest} />
    </Box>
  );
};

export default EmojiListBox;
