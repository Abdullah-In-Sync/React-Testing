import { Box, Stack } from "@mui/material";
import * as React from "react";
import SearchInput from "../../../../common/SearchInput";
import SingleSelectComponent from "../../../../common/SelectBox/SingleSelect/SingleSelectComponent";
import { useStyles } from "./modelFilterStyles";
import {
  GET_DISORDER_LIST_BY_THERAPY_ID,
  GET_THERAPIST_LIST_BY_ORG_ID,
} from "../../../../../graphql/mutation/admin";
import { useLazyQuery } from "@apollo/client";

interface ViewProps {
  searchInputValue?: string;
  handleClearSearchInput?: () => void;
  onChangeSearchInput?: (e) => void;
  /* istanbul ignore next */
  organizationList?: any;
  onChangeFilterDropdown?: (e) => void;
  /* istanbul ignore next */
  selectFilterOptions?: any;
}

const Filter: React.FC<ViewProps> = ({
  searchInputValue,
  handleClearSearchInput,
  onChangeSearchInput,
  organizationList,
  selectFilterOptions = {},
  onChangeFilterDropdown,
}) => {
  const styles = useStyles();

  const filterRow = () => {
    const [orgId, setOrgId] = React.useState();
    const [therapyId, setTherapyId] = React.useState();
    const [
      getTherapistList,
      /* istanbul ignore next */
      { data: { getTherapyListByOrgId: therapistDropdownData = [] } = {} },
    ] = useLazyQuery(GET_THERAPIST_LIST_BY_ORG_ID, {
      fetchPolicy: "cache-and-network",
    });

    const [
      getDisordorList,
      /* istanbul ignore next */
      { data: { getDisorderByTherapyId: disorderDropdownData = [] } = {} },
    ] = useLazyQuery(GET_DISORDER_LIST_BY_THERAPY_ID, {
      fetchPolicy: "cache-and-network",
    });
    /* istanbul ignore next */
    const onChange = (e) => {
      /* istanbul ignore next */
      if (e.target.name == "orgId") {
        /* istanbul ignore next */
        setOrgId(e.target.value);
      }
      /* istanbul ignore next */
      if (e.target.name == "therapyId") {
        /* istanbul ignore next */
        setTherapyId(e.target.value);
      }
      /* istanbul ignore next */
      onChangeFilterDropdown(e);
    };
    React.useEffect(() => {
      /* istanbul ignore next */
      if (orgId) {
        /* istanbul ignore next */
        getTherapistList({
          variables: {
            orgId,
          },
        });
      }
    }, [orgId]);

    React.useEffect(() => {
      /* istanbul ignore next */
      if (therapyId) {
        /* istanbul ignore next */
        getDisordorList({
          variables: {
            therapyId,
          },
        });
      }
    }, [therapyId]);
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
              label="Select Organization*"
              /* istanbul ignore next */
              onChange={onChange}
              /* istanbul ignore next */
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
            value={selectFilterOptions["therapyId"]}
            label="Select Therapy"
            /* istanbul ignore next */
            onChange={onChange}
            /* istanbul ignore next */
            options={[
              ...[{ _id: "all", therapy_name: "All" }],
              ...therapistDropdownData,
            ]}
            mappingKeys={["_id", "therapy_name"]}
            size="small"
            className="form-control-bg"
            showDefaultSelectOption={false}
            extraProps={{ "data-testid": "therapySelect" }}
          />
          <SingleSelectComponent
            id="disorderSelect"
            labelId="disorderSelect"
            name="disorderId"
            value={selectFilterOptions["therapyId"]}
            label="Select Disorder*"
            /* istanbul ignore next */
            onChange={onChangeFilterDropdown}
            /* istanbul ignore next */
            options={[
              ...[{ _id: "all", disorder_name: "All" }],
              ...disorderDropdownData,
            ]}
            mappingKeys={["_id", "disorder_name"]}
            size="small"
            className="form-control-bg"
            showDefaultSelectOption={false}
            extraProps={{ "data-testid": "disorderSelect" }}
          />
        </Box>
      </Stack>
    );
  };

  return <Box className="actionsWrapper">{filterRow()}</Box>;
};

export default Filter;
