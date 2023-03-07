import React from "react";
import * as safetyPlanInterface from "../../../graphql/SafetyPlan/types";
import RelapseFilter from "./RelapseFilter";
import RelapsePlanTable from "./RelapsePlanTable";

interface ViewProps {
  safetyPlanList?: safetyPlanInterface.GetSafetyPlanList | null;
  // pageActionButtonClick: (value) => void;
  onPageChange?: (event, newPage) => void;
  onSelectPageDropdown?: (event) => void;
  tableCurentPage?: number;
  rowsLimit?: number;
  searchInputValue?: string;
  onChangeSearchInput?: (e) => void;
  organizationList?: object[];
  onChangeFilterDropdown?: (e) => void;
  selectFilterOptions?: any;
  loadingSafetyPlanList?: boolean;
}

const RelapsePlanComponent: React.FC<ViewProps> = ({
  safetyPlanList,
  // pageActionButtonClick,
  onPageChange,
  onSelectPageDropdown,
  tableCurentPage,
  rowsLimit,
  searchInputValue,
  onChangeSearchInput,
  organizationList,
  selectFilterOptions,
  onChangeFilterDropdown,
  loadingSafetyPlanList,
}) => {
  return (
    <>
      <RelapseFilter
        searchInputValue={searchInputValue}
        onChangeSearchInput={onChangeSearchInput}
        organizationList={organizationList}
        selectFilterOptions={selectFilterOptions}
        onChangeFilterDropdown={onChangeFilterDropdown}
      />
      <RelapsePlanTable
        safetyPlanList={safetyPlanList}
        // pageActionButtonClick={pageActionButtonClick}
        onPageChange={onPageChange}
        onSelectPageDropdown={onSelectPageDropdown}
        tableCurentPage={tableCurentPage}
        rowsLimit={rowsLimit}
        loadingSafetyPlanList={loadingSafetyPlanList}
      />
    </>
  );
};

export default RelapsePlanComponent;
