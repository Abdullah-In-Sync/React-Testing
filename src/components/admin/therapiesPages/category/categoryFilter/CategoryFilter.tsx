import { Box, Stack } from "@mui/material";
import * as React from "react";
import SearchInput from "../../../../common/SearchInput";
import SingleSelectComponent from "../../../../common/SelectBox/SingleSelect/SingleSelectComponent";
import { useStyles } from "./categoryFilterStyles";

interface ViewProps {
  searchInputValue?: string;
  handleClearSearchInput?: () => void;
  onChangeSearchInput?: (e) => void;
  modelList?: any;
  onChangeFilterDropdown?: (e) => void;
  selectFilterOptions?: any;
  therapyListData?: any;
  disorderListData?: any;
  disorderList?: any;
  organizationList?: any;
}

const Filter: React.FC<ViewProps> = ({
  searchInputValue,
  handleClearSearchInput,
  onChangeSearchInput,
  modelList = [],
  selectFilterOptions = {},
  onChangeFilterDropdown,
  therapyListData = [],
  disorderList = [],
  organizationList = [],
}) => {
  const styles = useStyles();

  const filterRow = () => {
    return (
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
            id="modelSelect"
            labelId="modelSelect"
            name="modelId"
            value={selectFilterOptions["modelId"]}
            label="Select Model"
            onChange={onChangeFilterDropdown}
            options={[...[{ _id: "all", model_name: "All" }], ...modelList]}
            mappingKeys={["_id", "model_name"]}
            size="small"
            className="form-control-bg"
            showDefaultSelectOption={false}
            extraProps={{ "data-testid": "modelSelect" }}
          />
          <SingleSelectComponent
            id="disorderSelect"
            labelId="disorderSelect"
            name="disorderId"
            value={selectFilterOptions["disorderId"]}
            label="Select Disorder"
            onChange={onChangeFilterDropdown}
            options={[
              ...[{ _id: "all", disorder_name: "All" }],
              ...disorderList,
            ]}
            mappingKeys={["_id", "disorder_name"]}
            size="small"
            className="form-control-bg"
            showDefaultSelectOption={false}
            extraProps={{ "data-testid": "disorderSelect" }}
          />
          <SingleSelectComponent
            id="therapySelect"
            labelId="therapySelect"
            name="therapyId"
            value={selectFilterOptions["therapyId"]}
            label="Select Therapy"
            onChange={onChangeFilterDropdown}
            options={[
              ...[{ _id: "all", therapy_name: "All" }],
              ...therapyListData,
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
