import React from "react";

import Filter from "../../../common/Filter";
import CommonTable from "../../../common/CommonTable";
import therapistData from "./data";
import { TherapistlistEntity } from "../../../../graphql/Therapist/types";
import ConfirmWrapper from "../../../common/ConfirmWrapper";
import { Stack } from "@mui/material";
import { useStyles } from "./listStyles";

interface ViewProps {
  listData?: TherapistlistEntity[];
  pageActionButtonClick: (value) => void;
  onPageChange?: (event, newPage) => void;
  tableCurentPage?: number;
  rowsLimit?: number;
  searchInputValue?: string;
  onChangeSearchInput?: (e) => void;
  onChangeFilterDropdown?: (e) => void;
  loadingTherapistList?: boolean;
  onPressSideButton?: () => void;
  totalData?: number;
  confirmRef?: any;
  onSelectPageDropdown?: any;
}

const TherapistListComponent: React.FC<ViewProps> = ({
  listData,
  pageActionButtonClick,
  onPageChange,
  tableCurentPage,
  rowsLimit,
  searchInputValue,
  onChangeSearchInput,
  loadingTherapistList,
  onPressSideButton,
  totalData,
  confirmRef,
  onSelectPageDropdown,
}) => {
  const styles = useStyles();
  return (
    <ConfirmWrapper ref={confirmRef}>
      <Filter
        searchInputValue={searchInputValue}
        onChangeSearchInput={onChangeSearchInput}
        sideButtonLabel={"Add Therapist"}
        onPressSideButton={onPressSideButton}
        hidePlanType
      />
      <Stack className={styles.tableWrapper}>
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
              isActive: "therapist_status",
            },
          ]}
          tableCurentPage={tableCurentPage}
          rowsLimit={rowsLimit}
          loading={loadingTherapistList}
          headerData={therapistData.therapistListHeader}
          onSelectPageDropdown={onSelectPageDropdown}
        />
      </Stack>
    </ConfirmWrapper>
  );
};

export default TherapistListComponent;
