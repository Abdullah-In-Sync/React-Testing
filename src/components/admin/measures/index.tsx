import React from "react";
import * as measuresInterface from "../../../graphql/Measure/types";
import Filter from "../../common/Filter";
import CommonTable from "../../common/CommonTable";
import measuresData from "./data";

interface ViewProps {
  measuresList?: measuresInterface.AdminMeasuresList | null;
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
  loadingMeasuresList?: boolean;
  onPressSideButton?: () => void;
}

const MeasuresComponent: React.FC<ViewProps> = ({
  measuresList,
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
  loadingMeasuresList,
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
        sideButtonLabel={"Create Measures"}
        onPressSideButton={onPressSideButton}
        hidePlanType
      />
      <CommonTable
        data={{ list: measuresList.data, total: measuresList.total }}
        pageActionButtonClick={pageActionButtonClick}
        onPageChange={onPageChange}
        onSelectPageDropdown={onSelectPageDropdown}
        tableCurentPage={tableCurentPage}
        rowsLimit={rowsLimit}
        loading={loadingMeasuresList}
        headerData={measuresData.measuresListHeader}
      />
    </>
  );
};

export default MeasuresComponent;
