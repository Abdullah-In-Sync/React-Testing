import React from "react";
import CommonTable from "../../common/CommonTable";
import SearchFilter from "../../common/searchFilter";
import therapistData from "./data";
import { checkUserType } from "../../../utility/helper";

interface ViewProps {
  listData?: any;
  loadingTherapistList?: boolean;
  totalData?: any;
  pageActionButtonClick?: (value) => void;
  onPageChange?: (event, newPage) => void;
  onSelectPageDropdown?: (event) => void;
  tableCurentPage?: number;
  rowsLimit?: number;
  searchInputValue?: string;
  onChangeSearchInput?: (e) => void;
  organizationList?: object[];
  onChangeFilterDropdown?: (e) => void;
  selectFilterOptions?: any;
  loadingMonitorList?: boolean;
  onPressSideButton?: () => void;
}

const TherapistPatientListComponent: React.FC<ViewProps> = ({
  listData = [],
  loadingTherapistList,
  totalData,
  pageActionButtonClick,
  onPageChange,
  tableCurentPage,
  rowsLimit,
  searchInputValue,
  onChangeSearchInput,
  onPressSideButton,
}) => {
  const { userType } = checkUserType();
  const isCustom = userType === "custom";
  return (
    <>
      <SearchFilter
        searchInputValue={searchInputValue}
        onChangeSearchInput={onChangeSearchInput}
        sideButtonLabel={"Add Patient"}
        onPressSideButton={!isCustom && onPressSideButton}
      />

      <CommonTable
        data={{ list: listData, total: totalData }}
        pageActionButtonClick={pageActionButtonClick}
        onPageChange={onPageChange}
        actionButton={[
          {
            id: "view",
            icon: require("@mui/icons-material/Visibility").default,
          },
          // {
          //   id: "edit",
          //   icon: require("@mui/icons-material/Edit").default,
          // },
          !isCustom && {
            id: "delete",
            icon: require("@mui/icons-material/DeleteSharp").default,
          },
        ]}
        tableCurentPage={tableCurentPage}
        rowsLimit={rowsLimit}
        loading={loadingTherapistList}
        headerData={therapistData.therapistListHeader}
      />
    </>
  );
};

export default TherapistPatientListComponent;
