import React from "react";

import Filter from "../../../common/Filter";
import CommonTable from "../../../common/CommonTable";
import therapistData from "./data";

interface ViewProps {
  listData?: any;
  pageActionButtonClick: (value) => void;
  onPageChange?: (event, newPage) => void;
  tableCurentPage?: number;
  rowsLimit?: number;
  searchInputValue?: string;
  onChangeSearchInput?: (e) => void;
  onChangeFilterDropdown?: (e) => void;
  loadingTherapistList?: boolean;
  onPressSideButton?: () => void;
  totalData?: any;
}

const TherapistListComponent: React.FC<ViewProps> = ({
  listData = [],
  pageActionButtonClick,
  onPageChange,
  tableCurentPage,
  rowsLimit,
  searchInputValue,
  onChangeSearchInput,
  loadingTherapistList,
  onPressSideButton,
  totalData,
}) => {
  return (
    <>
      <Filter
        searchInputValue={searchInputValue}
        onChangeSearchInput={onChangeSearchInput}
        sideButtonLabel={"Add Therapist"}
        onPressSideButton={onPressSideButton}
        hidePlanType
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
          {
            id: "edit",
            icon: require("@mui/icons-material/Edit").default,
          },
          {
            id: "delete",
            icon: require("@mui/icons-material/DeleteSharp").default,
          },
          {
            id: "block",
            icon: require("@mui/icons-material/Block").default,
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

export default TherapistListComponent;
