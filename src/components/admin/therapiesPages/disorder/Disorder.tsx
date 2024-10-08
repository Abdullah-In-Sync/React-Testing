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
import Filter from "./disorderFilter/DisorderFilter";
import InfoModal, {
  ConfirmInfoElement,
} from "../../../common/CustomModal/InfoModal";
import { useStyles } from "./disorderStyles";
import AddDisorder from "./addDisorder/AddDisorder";
import ConfirmWrapper, { ConfirmElement } from "../../../common/ConfirmWrapper";

interface ViewProps {
  disorderList?: GetAdminDisorderList;
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
  loadingDisorderList?: boolean;
  onPressSideButton?: () => void;
  therapyListData?: AdminTherapyDataEntity[];
  infoModalRef?: ForwardedRef<ConfirmInfoElement>;
  confirmRef?: ForwardedRef<ConfirmElement>;
}

const DisorderComponent: React.FC<ViewProps> = ({
  disorderList,
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
  onPressSideButton,
  therapyListData,
  infoModalRef,
  confirmRef,
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
          <ContentHeader title="Disorder" />
          <CommonButton
            data-testid="addDisorderButton"
            variant="contained"
            onClick={onPressSideButton}
            size="small"
          >
            Add Disorder
          </CommonButton>
        </Box>
        <Filter
          searchInputValue={searchInputValue}
          onChangeSearchInput={onChangeSearchInput}
          organizationList={organizationList}
          selectFilterOptions={selectFilterOptions}
          onChangeFilterDropdown={onChangeFilterDropdown}
          therapyListData={therapyListData}
        />
        <CommonTable
          data={{ list: disorderList?.data, total: disorderList?.total }}
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
        <InfoModal
          ref={infoModalRef}
          maxWidth="sm"
          className={styles.addDisorderModalWrapper}
        >
          <AddDisorder />
        </InfoModal>
      </ConfirmWrapper>
    </>
  );
};

export default DisorderComponent;
