import React from "react";
import FilterForAddUserTherapist from "./filterAddUserTherapist";
import CommonTable from "../../../common/CommonTable";
import userHeaderData from "./data";

interface ViewProps {
  userListData?: any;
  searchInputValue?: string;
  onChangeSearchInput?: (e) => void;
  sendSelectedRoleId?: any;
  onPressAddPlan?: () => void;
  roleListData?: any;
  pageActionButtonClick?: (value) => void;
  onPageChange?: (event, newPage) => void;
  onSelectPageDropdown?: (event) => void;
  tableCurentPage?: number;
  rowsLimit?: number;
  loadingMonitorList?: boolean;
}

const TherapistUserListComponent: React.FC<ViewProps> = ({
  userListData,
  searchInputValue,
  onChangeSearchInput,
  sendSelectedRoleId,
  onPressAddPlan,
  roleListData,
  pageActionButtonClick,
  onPageChange,
  onSelectPageDropdown,
  tableCurentPage,
  rowsLimit,
  loadingMonitorList,
}) => {
  return (
    <>
      <FilterForAddUserTherapist
        searchInputValue={searchInputValue}
        onChangeSearchInput={onChangeSearchInput}
        sendSelectedRoleId={sendSelectedRoleId}
        onPressAddPlan={onPressAddPlan}
        roleListData={roleListData}
      />

      <CommonTable
        data={{
          list: userListData,
          total: userListData?.length,
        }}
        pageActionButtonClick={pageActionButtonClick}
        onPageChange={onPageChange}
        onSelectPageDropdown={onSelectPageDropdown}
        tableCurentPage={tableCurentPage}
        rowsLimit={rowsLimit}
        loading={loadingMonitorList}
        actionButton={[
          {
            id: "edit",
            icon: require("@mui/icons-material/Edit").default,
          },
          {
            id: "delete",
            icon: require("@mui/icons-material/DeleteSharp").default,
          },

          {
            id: "person",
            icon: require("@mui/icons-material/Person").default,
          },
        ]}
        headerData={userHeaderData.userListHeader}
      />
    </>
  );
};

export default TherapistUserListComponent;
