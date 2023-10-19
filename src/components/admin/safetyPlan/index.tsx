import React from "react";
import * as safetyPlanInterface from "../../../graphql/SafetyPlan/types";
import Filter from "./Filter";
import SafetyPlanTable from "./SafetyPlanTable";
import AgendaFilter from "../agenda/Filter";
import UserRoleFilter from "../userAccess/userRoleFilter";

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
  platForm: string;
}

const platFormComponent = {
  userRole: (props) => <UserRoleFilter {...props} />,
  agenda: (props) => <AgendaFilter {...props} />,
  safetyPlan: (props) => <Filter {...props} />,
};

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
  platForm,
}) => {
  return (
    <>
      {platFormComponent[platForm]?.({
        searchInputValue,
        onChangeSearchInput,
        organizationList,
        selectFilterOptions,
        onChangeFilterDropdown,
      })}

      <SafetyPlanTable
        safetyPlanList={safetyPlanList}
        pageActionButtonClick={pageActionButtonClick}
        onPageChange={onPageChange}
        onSelectPageDropdown={onSelectPageDropdown}
        tableCurentPage={tableCurentPage}
        rowsLimit={rowsLimit}
        loadingSafetyPlanList={loadingSafetyPlanList}
        platForm={platForm}
      />
    </>
  );
};

export default SafetyPlanComponent;
