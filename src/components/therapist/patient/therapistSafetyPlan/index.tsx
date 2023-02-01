import { FormikProps } from "formik";
import React from "react";
import FilterForTherapist from "./FilterForTherapist";
import TherapistSafetyPlanList from "./TherapistSafetyPlan";
import { InitialFormValues } from "./types";

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
  submitForm?: (
    formData: InitialFormValues,
    formikHelper: FormikProps<InitialFormValues>
  ) => void;
  closeModal?: () => void;
  onPressCancel?: () => void;
  onPressCreatePlan?: (e?: any, v?: any) => void;
  onPressSharePlan?: (v) => void;
}

const TherapistSafetyPlanComponent: React.FC<ViewProps> = ({
  safetyPlanList,
  searchInputValue,
  onChangeSearchInput,
  selectFilterOptions,
  onChangeFilterDropdown,
  onPressCreatePlan,
  onPressSharePlan,
}) => {
  return (
    <>
      <FilterForTherapist
        searchInputValue={searchInputValue}
        onChangeSearchInput={onChangeSearchInput}
        selectFilterOptions={selectFilterOptions}
        onChangeFilterDropdown={onChangeFilterDropdown}
        onPressCreatePlan={onPressCreatePlan}
      />
      <TherapistSafetyPlanList
        safetyPlanList={safetyPlanList}
        onPressEditPlan={onPressCreatePlan}
        onPressSharePlan={onPressSharePlan}
      />
    </>
  );
};

export default TherapistSafetyPlanComponent;
