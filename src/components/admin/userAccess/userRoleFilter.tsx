import { Box, Button, Stack } from "@mui/material";
import * as React from "react";
import SearchInput from "../../common/SearchInput";
import SingleSelectComponent from "../../common/SelectBox/SingleSelect/SingleSelectComponent";
import { useStyles } from "../safetyPlan/safetyPlanStyles";
import { useRouter } from "next/router";

interface ViewProps {
  searchInputValue?: string;
  handleClearSearchInput?: () => void;
  onChangeSearchInput?: (e) => void;
  organizationList?: any;
  onChangeFilterDropdown?: (e) => void;
  selectFilterOptions?: any;
  onPressAdd?: () => void;
}

export const accessibilityFilter = [
  {
    id: "all",
    value: "All",
  },
  {
    id: "admin",
    value: "Admin",
  },
  {
    id: "therapist",
    value: "Therapist",
  },
  {
    id: "patient",
    value: "Patient",
  },
];

const UserRoleFilter: React.FC<ViewProps> = ({
  searchInputValue,
  handleClearSearchInput,
  onChangeSearchInput,
  organizationList,
  selectFilterOptions = {},
  onChangeFilterDropdown,
}) => {
  const styles = useStyles();
  const router = useRouter();
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
            <SingleSelectComponent
              id="selectAccessibility"
              labelId="selectAccessibility"
              name="accessibility"
              showDefaultSelectOption={false}
              value={selectFilterOptions["accessibility"] || "all"}
              label="Accessibility*"
              onChange={onChangeFilterDropdown}
              options={accessibilityFilter}
              mappingKeys={["id", "value"]}
              size="small"
              className="form-control-bg"
              extraProps={{ "data-testid": "accessibilitySelect" }}
            />
          </Box>
          <Box>
            <Button
              data-testid="addUserRoleButton"
              variant="contained"
              onClick={onPressCreateButton}
            >
              Add User Role
            </Button>
          </Box>
        </Stack>
      </Stack>
    );
  };

  const onPressCreateButton = () => {
    router.push("/admin/userRole/add");
  };

  return <Box className="actionsWrapper">{userRoleButtons()}</Box>;
};

export default UserRoleFilter;
