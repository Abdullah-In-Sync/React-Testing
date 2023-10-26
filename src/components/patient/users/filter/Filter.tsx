import { Box, Button, Stack } from "@mui/material";
import * as React from "react";
import { useStyles } from "../../../common/Filter/filterStyles";
import SearchInput from "../../../common/SearchInput";
import SingleSelectComponent from "../../../common/SelectBox/SingleSelect/SingleSelectComponent";

interface ViewProps {
  searchInputValue?: string;
  handleClearSearchInput?: () => void;
  onChangeSearchInput?: (e) => void;
  onChangeFilterDropdown?: (e) => void;
  selectFilterOptions?: any;
  roles?: any;
  onPressSideButton?: (e) => void;
}

const UserRoleFilter: React.FC<ViewProps> = ({
  searchInputValue,
  handleClearSearchInput,
  onChangeSearchInput,
  selectFilterOptions = {},
  onChangeFilterDropdown,
  roles = [],
  onPressSideButton,
}) => {
  const styles = useStyles();
  const userRoleButtons = () => {
    return (
      <Stack>
        <Stack className={styles.filterWrapper}>
          <Box className="filterDropdownInput">
            <SearchInput
              inputValue={searchInputValue}
              handleClearInput={handleClearSearchInput}
              onChangeInput={onChangeSearchInput}
            />
            <SingleSelectComponent
              id="selectRole"
              labelId="selectRole"
              name="roleId"
              showDefaultSelectOption={false}
              value={selectFilterOptions["roleId"]}
              label="Roles*"
              onChange={onChangeFilterDropdown}
              options={roles}
              mappingKeys={["_id", "name"]}
              size="small"
              className="form-control-bg"
              extraProps={{ "data-testid": "selectRole" }}
            />
          </Box>
          <Box>
            <Button
              data-testid="addUserRoleButton"
              variant="contained"
              onClick={onPressSideButton}
            >
              Add User
            </Button>
          </Box>
        </Stack>
      </Stack>
    );
  };

  return <Box className="actionsWrapper">{userRoleButtons()}</Box>;
};

export default UserRoleFilter;
