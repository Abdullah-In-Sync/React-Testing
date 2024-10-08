import { Box, Button, Stack } from "@mui/material";
import * as React from "react";
import { planTypesFilter as planTypes } from "../../../lib/constants";
import SearchInput from "../../common/SearchInput";
import SingleSelectComponent from "../../common/SelectBox/SingleSelect/SingleSelectComponent";
import { useStyles } from "./filterStyles";

interface ViewProps {
  searchInputValue?: string;
  handleClearSearchInput?: () => void;
  onChangeSearchInput?: (e) => void;
  organizationList?: any;
  onChangeFilterDropdown?: (e) => void;
  selectFilterOptions?: any;
  onPressSideButton?: () => void;
  sideButtonLabel?: string;
  hidePlanType?: boolean;
}

const Filter: React.FC<ViewProps> = ({
  searchInputValue,
  handleClearSearchInput,
  onChangeSearchInput,
  organizationList,
  selectFilterOptions = {},
  onChangeFilterDropdown,
  onPressSideButton,
  sideButtonLabel,
  hidePlanType,
}) => {
  const styles = useStyles();
  /* istanbul ignore next */
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
          {!hidePlanType && (
            <SingleSelectComponent
              id="planTypeSelect"
              labelId="planTypeSelect"
              name="planType"
              showDefaultSelectOption={false}
              value={selectFilterOptions["planType"] || "all"}
              label="Select Plan Type"
              onChange={onChangeFilterDropdown}
              options={planTypes}
              mappingKeys={["id", "value"]}
              size="small"
              className="form-control-bg"
              extraProps={{ "data-testid": "planTypeSelect" }}
            />
          )}
        </Box>
        {onPressSideButton && (
          <Box>
            <Button
              data-testid="createPlanButton"
              onClick={onPressSideButton}
              variant="contained"
            >
              {`${sideButtonLabel ? sideButtonLabel : "Create Plan"}`}
            </Button>
          </Box>
        )}
      </Stack>
    );
  };

  return <Box className="actionsWrapper">{filterRow()}</Box>;
};

export default Filter;
