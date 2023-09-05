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
  const org_id = selectFilterOptions["orgId"];
  const disorder_id = selectFilterOptions["disorderId"];

  const modifyDisorderData = disorderList.filter((item) => {
    const { organization_settings } = item;
    if (org_id && organization_settings.length > 0) {
      return org_id === organization_settings[0]?._id;
    }
    return true;
  });

  const modifyModelData = modelList.filter((item) => {
    const { disorder_id: itemDisorderId } = item;
    if (disorder_id && itemDisorderId) {
      return disorder_id === itemDisorderId;
    }
    return true;
  });

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
            id="disorderSelect"
            labelId="disorderSelect"
            name="disorderId"
            value={selectFilterOptions["disorderId"] || "all"}
            label="Select Disorder"
            onChange={onChangeFilterDropdown}
            options={[
              ...[{ _id: "all", disorder_name: "All" }],
              ...modifyDisorderData,
            ]}
            mappingKeys={["_id", "disorder_name"]}
            size="small"
            className="form-control-bg"
            showDefaultSelectOption={false}
            extraProps={{ "data-testid": "disorderSelect" }}
          />
          <SingleSelectComponent
            id="modelSelect"
            labelId="modelSelect"
            name="modelId"
            value={selectFilterOptions["modelId"] || "all"}
            label="Select Model"
            onChange={onChangeFilterDropdown}
            options={[
              ...[{ _id: "all", model_name: "All" }],
              ...modifyModelData,
            ]}
            mappingKeys={["_id", "model_name"]}
            size="small"
            className="form-control-bg"
            showDefaultSelectOption={false}
            extraProps={{ "data-testid": "modelSelect" }}
          />
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
