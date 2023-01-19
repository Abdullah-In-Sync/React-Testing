import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { Box, FormControl, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useMemo, useRef } from "react";

import debounce from "lodash.debounce";

import { useStyles } from "./searchInputStyles";

interface ViewProps {
  inputValue: string;
  handleClearInput: () => void;
  onChangeInput: (v) => void;
}

const TypeSearch: React.FC<ViewProps> = ({
  inputValue = "",
  onChangeInput,
}) => {
  const styles = useStyles();

  const searchInputRef = useRef(null);

  const debouncedChangeHandler = useMemo(
    () => debounce(onChangeInput, 300),
    []
  );

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);

  return (
    <Box className={styles.searchWrapper}>
      <FormControl>
        <TextField
          inputProps={{ "data-testid": "searchInput" }}
          placeholder="Search"
          size="small"
          variant="outlined"
          inputRef={searchInputRef}
          onChange={debouncedChangeHandler}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                style={{ visibility: inputValue != "" ? "visible" : "hidden" }}
                onClick={() => {
                  searchInputRef.current.value = "";
                  onChangeInput({ target: { value: "" } });
                }}
              >
                <ClearIcon />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    </Box>
  );
};

export default TypeSearch;
