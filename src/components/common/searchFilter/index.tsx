import { Box, Button, Stack } from "@mui/material";
import * as React from "react";
import SearchInput from "../../common/SearchInput";
import { useStyles } from "./searchFilterStyles";

interface ViewProps {
  searchInputValue?: string;
  handleClearSearchInput?: () => void;
  onChangeSearchInput?: (e) => void;
  onPressSideButton?: () => void;
  sideButtonLabel?: string;
}

const SearchFilter: React.FC<ViewProps> = ({
  searchInputValue,
  handleClearSearchInput,
  onChangeSearchInput,
  onPressSideButton,
  sideButtonLabel,
}) => {
  const styles = useStyles();
  const filterRow = () => {
    return (
      <Stack className={styles.filterWrapper}>
        <Box className="filterDropdownInput">
          <SearchInput
            inputValue={searchInputValue}
            handleClearInput={handleClearSearchInput}
            onChangeInput={onChangeSearchInput}
          />
        </Box>
        {onPressSideButton && (
          <Box>
            <Button
              data-testid="createPlanButton"
              onClick={onPressSideButton}
              variant="contained"
            >
              {`${sideButtonLabel ? sideButtonLabel : "Add Patient"}`}
            </Button>
          </Box>
        )}
      </Stack>
    );
  };

  return <Box className="actionsWrapper">{filterRow()}</Box>;
};

export default SearchFilter;
