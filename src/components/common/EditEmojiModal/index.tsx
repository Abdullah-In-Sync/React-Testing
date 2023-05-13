import MoodIcon from "@mui/icons-material/Mood";
import { Box, Stack } from "@mui/material";
import * as React from "react";

import EmojiPicker, {
  Categories,
  Emoji,
  EmojiStyle,
  SkinTonePickerLocation,
  SuggestionMode,
  Theme,
} from "emoji-picker-react";
import { useState } from "react";
import CommonButton from "../Buttons/CommonButton";
import { CommonModal } from "../CustomModal/CommonModal";
import TextFieldCustom from "../TextField/TextFieldCustom";
import { useStyles } from "./editEmojiModalStyles";

interface ViewProps {
  confirmModalRef?: any;
  handleEmojiSave?: (v, i) => void;
}

const EditEmojiModal = React.forwardRef<EmojisModalElement, ViewProps>(
  ({ confirmModalRef, handleEmojiSave }, ref) => {
    const [emojiIndex, setEmojiIndex] = useState();
    const [codeObj, setCodeObj] = useState(undefined);
    const [isOpenEmoji, setIsOpenEmoji] = useState(false);
    const { code, text } = codeObj || {};
    const styles = useStyles();

    React.useImperativeHandle(ref, () => ({
      resetEmoji(data) {
        const { item, i } = data;
        setEmojiIndex(i);
        setCodeObj(item);
        setIsOpenEmoji(false);
        confirmModalRef.current?.open();
      },
    }));

    const handleEmojiPicker = () => {
      setIsOpenEmoji(!isOpenEmoji);
    };

    const handleEmojiClick = (v) => {
      const { unified } = v;
      setCodeObj({ ...codeObj, ...{ code: unified } });
    };

    const emojisBox = () => {
      return (
        <Box className="emojiBox">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            autoFocusSearch={false}
            theme={Theme.AUTO}
            searchDisabled
            skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
            height={200}
            width="100%"
            emojiVersion="0.6"
            lazyLoadEmojis={true}
            previewConfig={{
              showPreview: false,
            }}
            suggestedEmojisMode={SuggestionMode.RECENT}
            skinTonesDisabled
            emojiStyle={EmojiStyle.NATIVE}
            categories={[
              {
                name: "",
                category: Categories.SMILEYS_PEOPLE,
              },
            ]}
          />
        </Box>
      );
    };

    const handleEmojiTextChange = (e) => {
      setCodeObj({ ...codeObj, ...{ text: e.target.value } });
    };

    return (
      <CommonModal
        ref={confirmModalRef}
        maxWidth="sm"
        headerTitleText="Edit Emoji Scale"
      >
        <Stack className={styles.emojisPickerWrapper}>
          <Box>
            <label>Select Emojis*</label>
            <Box className="emojis">
              <Box>{code && <Emoji unified={code} />}</Box>
              <Box
                onClick={handleEmojiPicker}
                data-testid={`emoji-picker-open-${emojiIndex}`}
              >
                <MoodIcon />
              </Box>
            </Box>
          </Box>
          {isOpenEmoji && emojisBox()}
          <Box>
            <label>Edit Caption*</label>
            <TextFieldCustom
              name="caption"
              id="caption"
              label=""
              fullWidth={true}
              inputProps={{ "data-testid": `caption-${emojiIndex}` }}
              variant="outlined"
              className="form-control-bg"
              size="small"
              value={text}
              placeholder="Please type*"
              onChange={handleEmojiTextChange}
              error={text === ""}
            />
          </Box>
          <Box className="saveButtonWrapper">
            <CommonButton
              data-testid={`save-emoji-button-${emojiIndex}`}
              variant="contained"
              size="small"
              onClick={() =>
                text !== "" && handleEmojiSave(codeObj, emojiIndex)
              }
            >
              Save
            </CommonButton>
          </Box>
        </Stack>
      </CommonModal>
    );
  }
);

export default EditEmojiModal;

export type EmojisModalElement = { resetEmoji: (v) => void };
