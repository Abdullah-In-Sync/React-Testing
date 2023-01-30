import { Box, Button, Stack } from "@mui/material";
import * as React from "react";
import SearchInput from "../../../common/SearchInput";
import SingleSelectComponent from "../../../common/SelectBox/SingleSelect/SingleSelectComponent";
import { useStyles } from "../../../admin/safetyPlan/safetyPlanStyles";

interface ViewProps {
  searchInputValue?: string;
  handleClearSearchInput?: () => void;
  onChangeSearchInput?: (e) => void;

  onChangeFilterDropdown?: (e) => void;
  selectFilterOptions?: any;
}

const planTypes = [
  {
    id: "all",
    value: "All",
  },
  {
    id: "fixed",
    value: "Fixed",
  },
  {
    id: "custom",
    value: "Custom",
  },
];

const FilterForTherapist: React.FC<ViewProps> = ({
  searchInputValue,
  handleClearSearchInput,
  onChangeSearchInput,
  selectFilterOptions = {},
  onChangeFilterDropdown,
}) => {
  const styles = useStyles();
  const iconButtons = () => {
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
          </Box>

          <Box>
            <Button
              data-testid="createPlanButton"
              variant="contained"
              style={{ marginRight: "10px" }}
            >
              Create Plan
            </Button>

            <Button data-testid="createAddPlan" variant="contained">
              Add Plan
            </Button>
          </Box>
        </Stack>
      </Stack>
    );
  };

  return <Box className="actionsWrapper">{iconButtons()}</Box>;
};

export default FilterForTherapist;
