import React from "react";
import * as safetyPlanInterface from "../../../graphql/SafetyPlan/types";
import Filter from "../../common/Filter";
import CommonTable from "../../common/CommonTable";

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
  selectFilterOptions?: any;
  loadingSafetyPlanList?: boolean;
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
      <CommonTable
        data={{list: safetyPlanList.data, total: safetyPlanList.total}}
        pageActionButtonClick={pageActionButtonClick}
        onPageChange={onPageChange}
        onSelectPageDropdown={onChangeFilterDropdown}
        tableCurentPage={tableCurentPage}
        rowsLimit={rowsLimit}
        loading={loadingSafetyPlanList}
        headerData={[
          {
            id: "sNo",
            label: "S. No.",
          },
          {
            id: "planName",
            label: "Plan Name",
          },
          {
            id: "planType",
            label: "Plan Type",
          },
          {
            id: "Organisation",
            label: "Organisation",
          },
          {
            id: "actions",
            label: "Actions",
          },
        ]}
      />
    </>
  );
};

export default SafetyPlanComponent;
