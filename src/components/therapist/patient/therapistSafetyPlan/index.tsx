import React from "react";
import TherapistSafetyPlanList from "./TherapistSafetyPlan";
import FilterForTherapist from "./FilterForTherapist";

interface ViewProps {
  safetyPlanList?: any;
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

const TherapistSafetyPlanComponent: React.FC<ViewProps> = ({
  safetyPlanList,
  searchInputValue,
  onChangeSearchInput,
  selectFilterOptions,
  onChangeFilterDropdown,
}) => {
  return (
    <>
      <FilterForTherapist
        searchInputValue={searchInputValue}
        onChangeSearchInput={onChangeSearchInput}
        selectFilterOptions={selectFilterOptions}
        onChangeFilterDropdown={onChangeFilterDropdown}
      />
      <TherapistSafetyPlanList safetyPlanList={safetyPlanList} />
    </>
  );
};

export default TherapistSafetyPlanComponent;
