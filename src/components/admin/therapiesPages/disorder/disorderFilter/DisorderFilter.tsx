import { Box, Stack } from "@mui/material";
import * as React from "react";
import SearchInput from "../../../../common/SearchInput";
import SingleSelectComponent from "../../../../common/SelectBox/SingleSelect/SingleSelectComponent";
import { useStyles } from "./diorderFilterStyles";

interface ViewProps {
  searchInputValue?: string;
  handleClearSearchInput?: () => void;
  onChangeSearchInput?: (e) => void;
  organizationList?: any;
  onChangeFilterDropdown?: (e) => void;
  selectFilterOptions?: any;
  therapyListData?: any;
}

const Filter: React.FC<ViewProps> = ({
  searchInputValue,
  handleClearSearchInput,
  onChangeSearchInput,
  organizationList,
  selectFilterOptions = {},
  onChangeFilterDropdown,
  therapyListData = [],
}) => {
  const styles = useStyles();
  const org_id = selectFilterOptions["orgId"];

  const therapyDisorderData = therapyListData.filter((item) => {
    const { org_id: therapyOrgId } = item;
    if (org_id && therapyOrgId) {
      return org_id === therapyOrgId;
    }
    return true;
  });

  const filterRow = () => {
    return (
      <Stack className={styles.filterWrapper}>
        <Box className="filterDropdownInput">
          <SearchInput
            inputValue={searchInputValue}
            handleClearInput={handleClearSearchInput}
            onChangeInput={onChangeSearchInput}
          />
          {organizationList && (
            <SingleSelectComponent
              id="organizationSelect"
              labelId="organizationSelect"
              name="orgId"
              value={selectFilterOptions["orgId"] || "all"}
              label="Select Organization"
              onChange={onChangeFilterDropdown}
              options={[...[{ _id: "all", name: "All" }], ...organizationList]}
              mappingKeys={["_id", "name"]}
              size="small"
              className="form-control-bg"
              showDefaultSelectOption={false}
              extraProps={{ "data-testid": "organizationSelect" }}
            />
          )}
          <SingleSelectComponent
            id="therapySelect"
            labelId="therapySelect"
            name="therapyId"
            value={selectFilterOptions["therapyId"] || "all"}
            label="Select Therapy"
            onChange={onChangeFilterDropdown}
            options={[
              ...[{ _id: "all", therapy_name: "All" }],
              ...therapyDisorderData,
            ]}
            mappingKeys={["_id", "therapy_name"]}
            size="small"
            className="form-control-bg"
            showDefaultSelectOption={false}
            extraProps={{ "data-testid": "therapySelect" }}
          />
        </Box>
      </Stack>
    );
  };

  return <Box className="actionsWrapper">{filterRow()}</Box>;
};

export default Filter;
