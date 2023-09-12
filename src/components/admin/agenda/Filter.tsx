import { Box, Button, Stack } from "@mui/material";
import * as React from "react";
import SearchInput from "../../common/SearchInput";
import SingleSelectComponent from "../../common/SelectBox/SingleSelect/SingleSelectComponent";
import { useStyles } from "../safetyPlan/safetyPlanStyles";
import { useRouter } from "next/router";
import { GET_THERAPIST_LIST_BY_ORG_ID } from "../../../graphql/mutation/admin";
import { useLazyQuery } from "@apollo/client";

interface ViewProps {
  searchInputValue?: string;
  handleClearSearchInput?: () => void;
  onChangeSearchInput?: (e) => void;
  organizationList?: any;
  onChangeFilterDropdown?: (e) => void;
  /* istanbul ignore next */
  selectFilterOptions?: any;
}

const sessionNumber = [
  ...Array.from({ length: 50 }).map((i, index) => ({
    id: (index + 1).toString(),
    value: `Session ${index + 1}`,
  })),
];

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
  /* istanbul ignore next */

  const iconButtons = () => {
    const [orgId, setOrgId] = React.useState("");
    const [
      getTherapistList,
      /* istanbul ignore next */
      { data: { getTherapyListByOrgId: therapistDropdownData = [] } = {} },
    ] = useLazyQuery(GET_THERAPIST_LIST_BY_ORG_ID, {
      fetchPolicy: "cache-and-network",
    });
    React.useEffect(() => {
      /* istanbul ignore next */
      getTherapistList({
        variables: {
          orgId,
        },
      });
    }, [orgId]);

    /* istanbul ignore next */
    const onChange = (e) => {
      /* istanbul ignore next */
      e.target.value = e.target.value !== "all" ? e.target.value : "";
      /* istanbul ignore next */
      if (e.target.name == "orgId") {
        /* istanbul ignore next */
        setOrgId(e.target.value);
      }
      /* istanbul ignore next */
      onChangeFilterDropdown(e);
    };
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
              onChange={onChange}
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
              name="therapy_id"
              showDefaultSelectOption={false}
              value={selectFilterOptions["therapy_id"] || "all"}
              label="Select Therapy*"
              onChange={onChangeFilterDropdown}
              options={[
                ...[{ _id: "all", therapy_name: "All" }],
                ...therapistDropdownData,
              ]}
              mappingKeys={["_id", "therapy_name"]}
              size="small"
              className="form-control-bg"
              extraProps={{ "data-testid": "therapySelect" }}
            />
            <SingleSelectComponent
              id="SelectSession"
              labelId="SelectSession"
              name="session_id"
              showDefaultSelectOption={false}
              value={selectFilterOptions["session_id"] || "all"}
              label="Select Session*"
              onChange={onChangeFilterDropdown}
              options={[...[{ id: "all", value: "All" }], ...sessionNumber]}
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
  const onPressCreateButton = () => {
    router.push("/admin/agenda/add/");
  };

  return <Box className="actionsWrapper">{iconButtons()}</Box>;
};

export default AgendaFilter;
