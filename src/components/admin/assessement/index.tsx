import React from "react";
import * as monitorInterface from "../../../graphql/Monitor/types";
import Filter from "../../common/Filter";
import CommonTable from "../../common/CommonTable";
import monitorHeaderData from "./data";

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

const AssessmentComponent: React.FC<ViewProps> = ({
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
        sideButtonLabel={"Create Assessment"}
        onPressSideButton={onPressSideButton}
        hidePlanType
      />
      <CommonTable
        data={{ list: monitorList.data, total: monitorList.total }}
        pageActionButtonClick={pageActionButtonClick}
        onPageChange={onPageChange}
        onSelectPageDropdown={onSelectPageDropdown}
        tableCurentPage={tableCurentPage}
        rowsLimit={rowsLimit}
        loading={loadingMonitorList}
        headerData={monitorHeaderData.monitorListHeader}
      />
    </>
  );
};

export default AssessmentComponent;
