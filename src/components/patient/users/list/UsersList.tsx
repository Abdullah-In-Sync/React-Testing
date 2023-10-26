import { Stack } from "@mui/material";
import React from "react";
import CommonTable from "../../../common/CommonTable";
import ConfirmWrapper from "../../../common/ConfirmWrapper";
import { useStyles } from "../usersStyles";
import therapistData from "./data";
import Filter from "../filter/Filter";
import {
  GetCustomUsersList,
  GetRolesbyAccessbilityEntity,
} from "../../../../graphql/userRole/types";

interface ViewProps {
  pageActionButtonClick?: (value) => void;
  confirmRef?: any;
  searchInputValue?: string;
  onChangeSearchInput?: (e) => void;
  onChangeFilterDropdown?: (e) => void;
  selectFilterOptions?: any;
  onPressSideButton?: () => void;
  usersListData?: GetCustomUsersList;
  onPageChange?: (event, newPage) => void;
  onSelectPageDropdown?: (event) => void;
  tableCurentPage?: number;
  rowsLimit?: number;
  roles?: GetRolesbyAccessbilityEntity[];
  loadingCustomUsersList?: boolean;
}

const PatientUsersComponent: React.FC<ViewProps> = ({
  usersListData,
  pageActionButtonClick,
  confirmRef = null,
  searchInputValue,
  onChangeSearchInput,
  selectFilterOptions,
  onChangeFilterDropdown,
  onPressSideButton,
  onPageChange,
  tableCurentPage,
  rowsLimit,
  roles,
  loadingCustomUsersList,
}) => {
  const styles = useStyles();
  return (
    <ConfirmWrapper ref={confirmRef}>
      <Stack className={styles.tableWrapper}>
        <Filter
          searchInputValue={searchInputValue}
          onChangeSearchInput={onChangeSearchInput}
          selectFilterOptions={selectFilterOptions}
          onChangeFilterDropdown={onChangeFilterDropdown}
          roles={roles}
          onPressSideButton={onPressSideButton}
        />
        <CommonTable
          data={{
            list: usersListData?.data,
            total: usersListData?.total,
          }}
          pageActionButtonClick={pageActionButtonClick}
          actionButton={[
            {
              id: "edit",
              icon: require("@mui/icons-material/Edit").default,
            },
            {
              id: "delete",
              icon: require("@mui/icons-material/DeleteSharp").default,
            },
          ]}
          headerData={therapistData}
          onPageChange={onPageChange}
          tableCurentPage={tableCurentPage}
          rowsLimit={rowsLimit}
          loading={loadingCustomUsersList}
        />
      </Stack>
    </ConfirmWrapper>
  );
};

export default PatientUsersComponent;
