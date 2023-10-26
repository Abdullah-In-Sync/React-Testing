import { Box, Button, Stack } from "@mui/material";
import * as React from "react";
import SearchInput from "../../../common/SearchInput";
import SingleSelectComponent from "../../../common/SelectBox/SingleSelect/SingleSelectComponent";
import { useStyles } from "../../../admin/safetyPlan/safetyPlanStyles";
import { useState } from "react";

interface ViewProps {
  searchInputValue?: string;
  handleClearSearchInput?: () => void;
  onChangeSearchInput?: (e) => void;
  onPressAddPlan?: () => void;
  sendSelectedRoleId?: any;
  roleListData?: any;
}

const FilterForAddUserTherapist: React.FC<ViewProps> = ({
  searchInputValue,
  handleClearSearchInput,
  onChangeSearchInput,
  sendSelectedRoleId,
  onPressAddPlan,
  roleListData,
}) => {
  const styles = useStyles();
  const [selectRoleId, setSelectedRoleId] = useState("");

  const set2 = (newValue) => {
    sendSelectedRoleId(newValue.target.value);
    setSelectedRoleId(newValue.target.value);
  };
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
              id="select_role"
              labelId="select_role"
              name="select_role"
              /* istanbul ignore next */
              value={selectRoleId}
              label="Role"
              onChange={set2}
              inputProps={{ "data-testid": "select_role" }}
              options={
                (roleListData && roleListData.getRolesbyAccessbility) || []
              }
              mappingKeys={["_id", "name"]}
              size="small"
              className="form-control-bg"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Box>
              <Button
                data-testid="addPlanButton"
                variant="contained"
                style={{ paddingRight: "20px", textTransform: "none" }}
                onClick={onPressAddPlan}
              >
                Add User
              </Button>
            </Box>
          </Box>
        </Stack>
      </Stack>
    );
  };

  return <Box>{iconButtons()}</Box>;
};

export default FilterForAddUserTherapist;
