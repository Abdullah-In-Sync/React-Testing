import { FormikProps } from "formik";
import React from "react";
import { TherapistGetAdminRelapseListEntity } from "../../../../graphql/Relapse/types";
import { InitialFormValues } from "../therapistSafetyPlan/types";
import FilterForRelapseTherapist from "./filterForRelapse";
import TherapistRelapseList from "./RelapsePlanList";
import TherapistRelapseAddPlan, {
  InitialFormValues as InitialFormValuesAddRelapse,
} from "./TherapistRelapseAddPlan";

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
  modalRefAddPlan?: any;
  onPressAddRelapsePlan?: (
    formData: InitialFormValuesAddRelapse,
    formikHelper: FormikProps<InitialFormValuesAddRelapse>
  ) => void;
  relapsePlanList?: TherapistGetAdminRelapseListEntity[];
  accordionOpen?: number;
  handleAddIconButton?: (index: number, id: string) => void;
  isSafetyPlan?: boolean;
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
  modalRefAddPlan,
  onPressAddRelapsePlan,
  relapsePlanList,
  accordionOpen,
  handleAddIconButton,
  isSafetyPlan,
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
        isSafetyPlan={isSafetyPlan}
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
        accordionOpen={accordionOpen}
        handleAddIconButton={handleAddIconButton}
        isSafetyPlan={isSafetyPlan}
      />
      <TherapistRelapseAddPlan
        relapsePlanList={relapsePlanList}
        modalRefAddPlan={modalRefAddPlan}
        onPressAddRelapsePlan={onPressAddRelapsePlan}
      />
    </>
  );
};

export default TherapistRelapsePlanComponent;
