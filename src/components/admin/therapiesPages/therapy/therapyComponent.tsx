import React from "react";
import * as monitorInterface from "../../../../graphql/Monitor/types";

import monitorHeaderData from "./data";
import CommonTable from "../../../common/CommonTable";
import Filter from "../../../common/Filter";

interface ViewProps {
  monitorList?: monitorInterface.AdminMonitorList | null;
  pageActionButtonClick?: (value) => void;
  onPageChange?: (event, newPage) => void;
  onSelectPageDropdown?: (event) => void;
  tableCurentPage?: number;
  rowsLimit?: number;
  searchInputValue?: string;
  onChangeSearchInput?: (e) => void;
  organizationList?: object[];
  onChangeFilterDropdown?: (e) => void;
  selectFilterOptions?: any;
  loadingMonitorList?: boolean;
  onPressSideButton?: () => void;
}

const TherapiesComponent: React.FC<ViewProps> = ({
  monitorList,
  pageActionButtonClick,
  onPageChange,
  onSelectPageDropdown,
  tableCurentPage,
  rowsLimit,
  searchInputValue,
  onChangeSearchInput,
  organizationList,
  selectFilterOptions,
  onChangeFilterDropdown,
  loadingMonitorList,
  onPressSideButton,
}) => {
  return (
    <>
      <Filter
        searchInputValue={searchInputValue}
        onChangeSearchInput={onChangeSearchInput}
        organizationList={organizationList}
        selectFilterOptions={selectFilterOptions}
        onChangeFilterDropdown={onChangeFilterDropdown}
        sideButtonLabel={"Add Therapy"}
        onPressSideButton={onPressSideButton}
        hidePlanType
      />

      <CommonTable
        data={{ list: monitorList.data, total: monitorList.total }}
        pageActionButtonClick={pageActionButtonClick}
        onPageChange={onPageChange}
        onSelectPageDropdown={onSelectPageDropdown}
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
        tableCurentPage={tableCurentPage}
        rowsLimit={rowsLimit}
        loading={loadingMonitorList}
        headerData={monitorHeaderData.monitorListHeader}
      />
    </>
  );
};

export default TherapiesComponent;
