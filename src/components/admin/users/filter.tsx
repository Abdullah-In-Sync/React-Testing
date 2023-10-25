import { Box, Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchInput from "../../common/SearchInput";
import SingleSelectComponent from "../../common/SelectBox/SingleSelect/SingleSelectComponent";
import { useStyles } from "../safetyPlan/safetyPlanStyles";
import { useLazyQuery } from "@apollo/client";
import { GET_ROLES_BY_ACCESSBILITY } from "../../../graphql/customUsers/graphql";

interface ViewProps {
  searchInputValue?: string;
  handleClearSearchInput?: () => void;
  onChangeSearchInput?: (e) => void;
  organizationList?: any;
  onChangeFilterDropdown?: (e) => void;
  selectFilterOptions?: any;
}

const UsersFilter: React.FC<ViewProps> = ({
  searchInputValue,
  handleClearSearchInput,
  onChangeSearchInput,
  organizationList,
  selectFilterOptions = {},
  onChangeFilterDropdown,
}) => {
  const styles = useStyles();
  const [selectedOrg, setSelectedOrg] = useState("");
  useEffect(() => {
    getRolesList({
      variables: { orgId: selectedOrg },
    });
  }, [selectedOrg]);
  const [
    getRolesList,
    { data: { getRolesbyAccessbility: rolesList = [] } = {} },
  ] = useLazyQuery(GET_ROLES_BY_ACCESSBILITY, {
    fetchPolicy: "no-cache",
  });

  /* istanbul ignore next */
  const onChangeOrg = (e) => {
    onChangeFilterDropdown(e);
    /* istanbul ignore next */
    if (e.target.value == "all") {
      setSelectedOrg("");
    } else {
      /* istanbul ignore next */
      setSelectedOrg(e.target.value);
    }
  };
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
              value={selectFilterOptions["roleId"] || "all"}
              label="Roles*"
              onChange={onChangeFilterDropdown}
              options={[...[{ _id: "all", name: "All" }], ...rolesList]}
              mappingKeys={["_id", "name"]}
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
              onChange={onChangeOrg}
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
