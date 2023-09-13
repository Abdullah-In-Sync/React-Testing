import { Box } from "@material-ui/core";
import React, { ForwardedRef } from "react";
import CommonTable from "../../../common/CommonTable";
import ContentHeader from "../../../common/ContentHeader";
import monitorHeaderData from "./data";
import Filter from "./modelFilter/modelFilter";
import ConfirmWrapper, { ConfirmElement } from "../../../common/ConfirmWrapper";
import AddModal from "./create";

interface ViewProps {
  /* istanbul ignore next */
  modelList?: any;
  pageActionButtonClick?: (value) => void;
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
  loadingDisorderList?: boolean;
  confirmRef?: ForwardedRef<ConfirmElement>;
  refetchList?: () => void;
}

const ModelComponent: React.FC<ViewProps> = ({
  modelList,
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
  loadingDisorderList,
  confirmRef,
  refetchList,
}) => {
  return (
    <>
      <ConfirmWrapper ref={confirmRef}>
        <Box
          display={"flex"}
          alignItems={"center"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
          my={1}
        >
          <ContentHeader title="Modal" />
          <AddModal refetchList={refetchList} />
        </Box>
        <Filter
          searchInputValue={searchInputValue}
          onChangeSearchInput={onChangeSearchInput}
          organizationList={organizationList}
          selectFilterOptions={selectFilterOptions}
          onChangeFilterDropdown={onChangeFilterDropdown}
        />
        <CommonTable
          data={{ list: modelList?.data, total: modelList?.total }}
          pageActionButtonClick={pageActionButtonClick}
          onPageChange={onPageChange}
          onSelectPageDropdown={onSelectPageDropdown}
          tableCurentPage={tableCurentPage}
          rowsLimit={rowsLimit}
          loading={loadingDisorderList}
          headerData={monitorHeaderData.monitorListHeader}
          actionButton={[
            {
              id: "edit",
              icon: require("@mui/icons-material/Edit").default,
            },
            {
              id: "delete",
              icon: require("@mui/icons-material/DeleteSharp").default,
            },
          ]}
        />
      </ConfirmWrapper>
    </>
  );
};

export default ModelComponent;
