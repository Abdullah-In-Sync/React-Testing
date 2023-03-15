import { FormikProps } from "formik";
import React from "react";
import { InitialFormValues } from "../therapistSafetyPlan/types";
import FilterForRelapseTherapist from "./filterForRelapse";
import TherapistRelapseList from "./RelapsePlanList";

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
  submitQustionForm?: (
    formData: InitialFormValues,
    formikHelper: FormikProps<InitialFormValues>
  ) => void;
  closeModal?: () => void;
  onPressCancel?: () => void;
  onPressCreatePlan?: (e?: any, v?: any) => void;
  onPressSharePlan?: (v) => void;
  onPressAddPlan?: () => void;
  fetchPlanData?: (v) => void;
  planData?: object[];
  handleDeleteQuestion?: (v) => void;
  onPressDeletePlan?: (v) => void;
}

const TherapistRelapsePlanComponent: React.FC<ViewProps> = ({
  safetyPlanList,
  searchInputValue,
  onChangeSearchInput,
  selectFilterOptions,
  onChangeFilterDropdown,
  onPressCreatePlan,
  onPressSharePlan,
  onPressAddPlan,
  submitQustionForm,
  fetchPlanData,
  planData,
  handleDeleteQuestion,
  onPressDeletePlan,
}) => {
  return (
    <>
      <FilterForRelapseTherapist
        searchInputValue={searchInputValue}
        onChangeSearchInput={onChangeSearchInput}
        selectFilterOptions={selectFilterOptions}
        onChangeFilterDropdown={onChangeFilterDropdown}
        onPressCreatePlan={onPressCreatePlan}
        onPressAddPlan={onPressAddPlan}
      />
      <TherapistRelapseList
        submitQustionForm={submitQustionForm}
        safetyPlanList={safetyPlanList}
        onPressEditPlan={onPressCreatePlan}
        onPressSharePlan={onPressSharePlan}
        fetchPlanData={fetchPlanData}
        planData={planData}
        handleDeleteQuestion={handleDeleteQuestion}
        onPressDeletePlan={onPressDeletePlan}
      />
    </>
  );
};

export default TherapistRelapsePlanComponent;
