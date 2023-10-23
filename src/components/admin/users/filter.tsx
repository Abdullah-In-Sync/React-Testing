import { Box, Button, Stack } from "@mui/material";
import * as React from "react";
import SearchInput from "../../common/SearchInput";
import SingleSelectComponent from "../../common/SelectBox/SingleSelect/SingleSelectComponent";
import { useStyles } from "../safetyPlan/safetyPlanStyles";

interface ViewProps {
  searchInputValue?: string;
  handleClearSearchInput?: () => void;
  onChangeSearchInput?: (e) => void;
  organizationList?: any;
  onChangeFilterDropdown?: (e) => void;
  selectFilterOptions?: any;
}

export const rolesFilter = [
  {
    id: "all",
    value: "All",
  },
  {
    id: "sub admin",
    value: "Sub Admin",
  },
  {
    id: "hospital admin",
    value: "Hospital Admin",
  },
];

const UsersFilter: React.FC<ViewProps> = ({
  searchInputValue,
  handleClearSearchInput,
  onChangeSearchInput,
  organizationList,
  selectFilterOptions = {},
  onChangeFilterDropdown,
}) => {
  const styles = useStyles();
  //   const router = useRouter();
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
              name="role"
              showDefaultSelectOption={false}
              value={selectFilterOptions["role"] || "all"}
              label="Roles*"
              onChange={onChangeFilterDropdown}
              options={rolesFilter}
              mappingKeys={["id", "value"]}
              size="small"
              className="form-control-bg"
              extraProps={{ "data-testid": "roleSelect" }}
            />
            <SingleSelectComponent
              id="organizationSelect"
              labelId="organizationSelect"
              name="orgId"
              value={selectFilterOptions["orgId"] || "all"}
              label="Organisation*"
              onChange={onChangeFilterDropdown}
              options={[...[{ _id: "all", name: "All" }], ...organizationList]}
              mappingKeys={["_id", "name"]}
              size="small"
              className="form-control-bg"
              showDefaultSelectOption={false}
              extraProps={{ "data-testid": "organizationSelect" }}
            />
          </Box>
          <Box>
            <Button data-testid="addUserRoleButton" variant="contained">
              Add User
            </Button>
          </Box>
        </Stack>
      </Stack>
    );
  };

  return <Box className="actionsWrapper">{userRoleButtons()}</Box>;
};

export default UsersFilter;
