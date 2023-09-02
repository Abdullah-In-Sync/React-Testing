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
}

const AgendaFilter: React.FC<ViewProps> = ({
  searchInputValue,
  handleClearSearchInput,
  onChangeSearchInput,
  organizationList,
  selectFilterOptions = {},
  onChangeFilterDropdown,
}) => {
  const styles = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
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
            <SingleSelectComponent
              id="SelectTherapy*"
              labelId="SelectTherapy*"
              name="SelectTherapy*"
              showDefaultSelectOption={false}
              value={selectFilterOptions["planType"] || "all"}
              label="Select Therapy*"
              onChange={onChangeFilterDropdown}
              options={[]}
              mappingKeys={["id", "value"]}
              size="small"
              className="form-control-bg"
              extraProps={{ "data-testid": "therapySelect" }}
            />
            <SingleSelectComponent
              id="SelectSession"
              labelId="SelectSession"
              name="SelectSession"
              showDefaultSelectOption={false}
              value={selectFilterOptions["planType"] || "all"}
              label="Select Session*"
              onChange={onChangeFilterDropdown}
              options={[]}
              mappingKeys={["id", "value"]}
              size="small"
              className="form-control-bg"
              extraProps={{ "data-testid": "agendaSessionSelect" }}
            />
          </Box>
          <Box>
            <Button
              data-testid="createAgendaButton"
              onClick={onPressCreateButton}
              variant="contained"
            >
              Add Agenda
            </Button>
          </Box>
        </Stack>
      </Stack>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onPressCreateButton = () => {};

  return <Box className="actionsWrapper">{iconButtons()}</Box>;
};

export default AgendaFilter;
