import { Box } from "@material-ui/core";
import React, { ForwardedRef } from "react";
import {
  AdminTherapyDataEntity,
  GetAdminDisorderList,
} from "../../../../graphql/disorder/types";
import CommonButton from "../../../common/Buttons/CommonButton";
import CommonTable from "../../../common/CommonTable";
import ContentHeader from "../../../common/ContentHeader";
import monitorHeaderData from "./data";
import Filter from "./categoryFilter/CategoryFilter";
import InfoModal, {
  ConfirmInfoElement,
} from "../../../common/CustomModal/InfoModal";
import { useStyles } from "./categoryStyles";
import AddCategory from "./addCategory/AddCategory";
import ConfirmWrapper, { ConfirmElement } from "../../../common/ConfirmWrapper";
import { GetAdminCategoryList } from "../../../../graphql/category/types";

interface ViewProps {
  disorderListData?: GetAdminDisorderList;
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
  loadingCategoryList?: boolean;
  onPressSideButton?: () => void;
  therapyListData?: AdminTherapyDataEntity[];
  infoModalRef?: ForwardedRef<ConfirmInfoElement>;
  confirmRef?: ForwardedRef<ConfirmElement>;
  modelListData?: any;
  categoryListData?: GetAdminCategoryList;
}

const CategoryComponent: React.FC<ViewProps> = ({
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
  loadingCategoryList,
  onPressSideButton,
  therapyListData,
  infoModalRef,
  confirmRef,
  modelListData,
  categoryListData,
  disorderListData,
}) => {
  const styles = useStyles();
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
          <ContentHeader title="Category" />
          <CommonButton
            data-testid="addCatetoryButton"
            variant="contained"
            onClick={onPressSideButton}
            size="small"
          >
            Add Category
          </CommonButton>
        </Box>
        <Filter
          searchInputValue={searchInputValue}
          onChangeSearchInput={onChangeSearchInput}
          modelList={modelListData?.data}
          disorderList={disorderListData?.data}
          organizationList={organizationList}
          selectFilterOptions={selectFilterOptions}
          onChangeFilterDropdown={onChangeFilterDropdown}
          therapyListData={therapyListData}
          disorderListData={disorderListData}
        />
        <CommonTable
          data={{
            list: categoryListData?.data,
            total: categoryListData?.total,
          }}
          pageActionButtonClick={pageActionButtonClick}
          onPageChange={onPageChange}
          onSelectPageDropdown={onSelectPageDropdown}
          tableCurentPage={tableCurentPage}
          rowsLimit={rowsLimit}
          loading={loadingCategoryList}
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
        <InfoModal
          ref={infoModalRef}
          maxWidth="sm"
          className={styles.addCategoryModalWrapper}
        >
          <AddCategory />
        </InfoModal>
      </ConfirmWrapper>
    </>
  );
};

export default CategoryComponent;
