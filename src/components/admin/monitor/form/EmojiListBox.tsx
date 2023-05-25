import { Box, IconButton, Stack } from "@mui/material";
import React from "react";
import { Typography } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import MoodIcon from "@mui/icons-material/Mood";
import { Emoji } from "emoji-picker-react";
import { useStyles } from "./createMonitorStyles";

type ViewProps = {
  question?: any;
  upperModalRef?: any;
  onClickEmoji?: any;
};

const EmojiListBox: React.FC<ViewProps> = ({
  question,
  upperModalRef,
  onClickEmoji,
}) => {
  const styles = useStyles();
  const emojiBox = () => {
    const { questionOption = [] } = question;
    return (
      Array.isArray(questionOption) &&
      questionOption.map((item, i) => (
        <Stack
          key={`emojiOption_${i}`}
          data-testid={`emojiOption_${i}`}
          className={`emojisBox emojiWrapper_${i} ${
            question.answer === item.text ? "active" : ""
          }`}
          onClick={() => onClickEmoji && onClickEmoji(item)}
        >
          {upperModalRef && (
            <Box className="editEmojiButtonWrapper">
              <IconButton
                aria-label="edit-emoji"
                size="small"
                data-testid={`edit-emoji-${i}`}
                onClick={() => {
                  upperModalRef.current?.resetEmoji({ item, i });
                }}
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
            </Box>
          )}
          <Box>
            <Emoji unified={item.code} />
            <Typography>{item.text}</Typography>
          </Box>
        </Stack>
      ))
    );
  };

  return (
    <>
      <Box className={styles.emojisWrapperBox}>
        {!onClickEmoji && (
          <label>
            <MoodIcon /> Select Emoji Scale*
          </label>
        )}
        <Box className="emojisWrapper">{emojiBox()}</Box>
      </Box>
    </>
  );
};

export default EmojiListBox;
