import React from "react";
import * as safetyPlanInterface from "../../../graphql/SafetyPlan/types";
import Filter from "./Filter";
import SafetyPlanTable from "./SafetyPlanTable";

interface ViewProps {
  safetyPlanList?: safetyPlanInterface.GetSafetyPlanList | null;
  buttonClick: (value) => void;
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

const SafetyPlanComponent: React.FC<ViewProps> = ({
  safetyPlanList,
  buttonClick,
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
      <Filter
        searchInputValue={searchInputValue}
        onChangeSearchInput={onChangeSearchInput}
        organizationList={organizationList}
        selectFilterOptions={selectFilterOptions}
        onChangeFilterDropdown={onChangeFilterDropdown}
      />
      <SafetyPlanTable
        safetyPlanList={safetyPlanList}
        buttonClick={buttonClick}
        onPageChange={onPageChange}
        onSelectPageDropdown={onSelectPageDropdown}
        tableCurentPage={tableCurentPage}
        rowsLimit={rowsLimit}
        loadingSafetyPlanList={loadingSafetyPlanList}
      />
    </>
  );
};

export default SafetyPlanComponent;
