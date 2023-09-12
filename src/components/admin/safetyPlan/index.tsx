import React from "react";
import * as safetyPlanInterface from "../../../graphql/SafetyPlan/types";
import Filter from "./Filter";
import SafetyPlanTable from "./SafetyPlanTable";
import AgendaFilter from "../agenda/Filter";

interface ViewProps {
  safetyPlanList?: safetyPlanInterface.GetSafetyPlanList | null;
  pageActionButtonClick: (value) => void;
  onPageChange?: (event, newPage) => void;
  onSelectPageDropdown?: (event) => void;
  tableCurentPage?: number;
  rowsLimit?: number;
  searchInputValue?: string;
  onChangeSearchInput?: (e) => void;
  organizationList?: object[];
  onChangeFilterDropdown?: (e) => void;
  /* istanbul ignore next */
  selectFilterOptions?: any;
  loadingSafetyPlanList?: boolean;
  isAgenda?: boolean;
}

const SafetyPlanComponent: React.FC<ViewProps> = ({
  safetyPlanList,
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
  loadingSafetyPlanList,
  isAgenda,
}) => {
  return (
    <>
      {isAgenda ? (
        <AgendaFilter
          searchInputValue={searchInputValue}
          onChangeSearchInput={onChangeSearchInput}
          organizationList={organizationList}
          selectFilterOptions={selectFilterOptions}
          onChangeFilterDropdown={onChangeFilterDropdown}
        />
      ) : (
        <Filter
          searchInputValue={searchInputValue}
          onChangeSearchInput={onChangeSearchInput}
          organizationList={organizationList}
          selectFilterOptions={selectFilterOptions}
          onChangeFilterDropdown={onChangeFilterDropdown}
        />
      )}

      <SafetyPlanTable
        safetyPlanList={safetyPlanList}
        pageActionButtonClick={pageActionButtonClick}
        onPageChange={onPageChange}
        onSelectPageDropdown={onSelectPageDropdown}
        tableCurentPage={tableCurentPage}
        rowsLimit={rowsLimit}
        loadingSafetyPlanList={loadingSafetyPlanList}
        isAgenda={isAgenda}
      />
    </>
  );
};

export default SafetyPlanComponent;
