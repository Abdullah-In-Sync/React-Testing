import { Box, Button, Stack } from "@mui/material";
import * as React from "react";
import SearchInput from "../../../common/SearchInput";
import SingleSelectComponent from "../../../common/SelectBox/SingleSelect/SingleSelectComponent";
import { useStyles } from "../../../admin/safetyPlan/safetyPlanStyles";
import { planTypesFilter as planTypes } from "../../../../lib/constants";
import { checkPrivilageAccess } from "../../../../utility/helper";

interface ViewProps {
  searchInputValue?: string;
  handleClearSearchInput?: () => void;
  onChangeSearchInput?: (e) => void;
  onPressCreatePlan?: () => void;
  onPressAddPlan?: () => void;
  onChangeFilterDropdown?: (e) => void;
  selectFilterOptions?: any;
  isSafetyPlan?: boolean;
}

const FilterForRelapseTherapist: React.FC<ViewProps> = ({
  searchInputValue,
  handleClearSearchInput,
  onChangeSearchInput,
  selectFilterOptions = {},
  onChangeFilterDropdown,
  onPressCreatePlan,
  onPressAddPlan,
  isSafetyPlan,
}) => {
  const styles = useStyles();
  const isPlanCreate =
    (isSafetyPlan && checkPrivilageAccess("Safety Plan", "Create")) ||
    (!isSafetyPlan && checkPrivilageAccess("Relapse", "Create"));
  const isPlanAdd =
    (isSafetyPlan && checkPrivilageAccess("Safety Plan", "Add")) ||
    (!isSafetyPlan && checkPrivilageAccess("Relapse", "Add"));
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            {isPlanCreate && (
              <Box style={{ paddingRight: "20px" }}>
                <Button
                  data-testid="createPlanButton"
                  variant="contained"
                  onClick={onPressCreatePlan}
                  style={{ textTransform: "none" }}
                >
                  Create Plan
                </Button>
              </Box>
            )}

            {isPlanAdd && (
              <Box>
                <Button
                  data-testid="addPlanButton"
                  variant="contained"
                  style={{ paddingRight: "20px", textTransform: "none" }}
                  onClick={onPressAddPlan}
                >
                  Add Plan
                </Button>
              </Box>
            )}
          </Box>
        </Stack>
      </Stack>
    );
  };

  return <Box>{iconButtons()}</Box>;
};

export default FilterForRelapseTherapist;

// checkPrivilageAccess("Safety Plan", "Create")
