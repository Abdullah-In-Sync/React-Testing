import { useLazyQuery, useMutation } from "@apollo/client";
import { Box, Button } from "@mui/material";
import type { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import DeleteSureModal from "../../../components/admin/resource/DeleteSureModal";
import SafetyPlanComponent from "../../../components/admin/safetyPlan";
import ContentHeader from "../../../components/common/ContentHeader";
import Loader from "../../../components/common/Loader";
import { SuccessModal } from "../../../components/common/SuccessModal";
import Layout from "../../../components/layout";
import { GET_ORGANIZATION_LIST } from "../../../graphql/query/organization";
import {
  GET_SAFETY_PLAN_LIST,
  UPDATE_SAFETY_PLAN_BY_ID,
} from "../../../graphql/SafetyPlan/graphql";
import {
  UpdateSafetyPlanByIDRes,
  UpdateSafetyPlanByIdVars,
} from "../../../graphql/SafetyPlan/types";

const SafetyPlanPage: NextPage = () => {
  const initialPageNo = 1;
  const [tableCurentPage, setTableCurrentPage] = useState(0);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [searchInputValue, setSearchInputValue] = useState();
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const [loader, setLoader] = useState<boolean>(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const actionClickedId = useRef();

  useEffect(() => {
    getOrgList();
    getSafetyPlanList({
      variables: { limit: rowsLimit, pageNo: initialPageNo },
    });
  }, []);

  const [
    getOrgList,
    { data: { getOrganizationData: organizationList = [] } = {} },
  ] = useLazyQuery(GET_ORGANIZATION_LIST, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  const [
    getSafetyPlanList,
    {
      loading: loadingSafetyPlanList,
      data: { getSafetyPlanList: listData = {} } = {},
    },
  ] = useLazyQuery(GET_SAFETY_PLAN_LIST, {
    fetchPolicy: "no-cache",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  const [
    deleteSeftyPlanFn,
    {
      loading: deleteSeftyPlanLoading,
      data: { updateSafetyPlanById: deletedPlan = {} } = {},
    },
  ] = useMutation<UpdateSafetyPlanByIDRes, UpdateSafetyPlanByIdVars>(
    UPDATE_SAFETY_PLAN_BY_ID,
    {
      onCompleted: () => {
        /* istanbul ignore next */
        getSafetyPlanList({
          variables: { limit: rowsLimit, pageNo: initialPageNo },
        });
        setShowSuccessModal(true);
      },
    }
  );

  const onPageChange = (event?: any, newPage?: number) => {
    /* istanbul ignore next */
    const searchText =
      searchInputValue && searchInputValue !== ""
        ? { searchText: searchInputValue }
        : {};
    getSafetyPlanList({
      variables: {
        limit: rowsLimit,
        pageNo: newPage + 1,
        ...searchText,
        ...selectFilterOptions,
      },
    });
    /* istanbul ignore next */
    setTableCurrentPage(newPage);
  };

  const onSelectPageDropdown = (event: React.ChangeEvent<HTMLInputElement>) => {
    /* istanbul ignore next */
    const searchText =
      searchInputValue && searchInputValue !== ""
        ? { searchText: searchInputValue }
        : {};
    getSafetyPlanList({
      variables: {
        limit: +event.target.value,
        pageNo: initialPageNo,
        ...searchText,
        ...selectFilterOptions,
      },
    });
    setRowsLimit(+event.target.value);
    /* istanbul ignore next */
    setTableCurrentPage(0);
  };

  const onChangeSearchInput = (e) => {
    setSearchInputValue(() => {
      getSafetyPlanList({
        variables: {
          limit: rowsLimit,
          searchText: e.target.value,
          pageNo: initialPageNo,
          ...selectFilterOptions,
        },
      });
      setTableCurrentPage(0);
      return e.target.value;
    });
  };

  const onChangeFilterDropdown = (e) => {
    const temp = selectFilterOptions;
    const searchText =
      searchInputValue && searchInputValue !== ""
        ? { searchText: searchInputValue }
        : {};

    temp[e.target.name] = e.target.value !== "all" ? e.target.value : "";
    getSafetyPlanList({
      variables: {
        limit: rowsLimit,
        pageNo: initialPageNo,
        ...searchText,
        ...temp,
      },
    });
    /* istanbul ignore next */
    setTableCurrentPage(0);
    setSelectFilterOptions({ ...temp });
  };

  const onRowActionButtonClick = (value) => {
    if (value?.pressedIconButton == "delete") {
      actionClickedId.current = value?._id;
      setDeleteConfirmation(true);
    }
  };

  const deleteSeftyPlan = () => {
    deleteSeftyPlanFn({
      variables: {
        planId: actionClickedId.current,
        updatePlan: {
          status: 0,
        },
      },
    });
  };

  return (
    <>
      <Layout boxStyle={{ height: "100vh" }}>
        <Loader visible={loader} />
        <ContentHeader title="Safety Plan" />
        <SafetyPlanComponent
          safetyPlanList={listData}
          pageActionButtonClick={onRowActionButtonClick}
          onPageChange={onPageChange}
          onSelectPageDropdown={onSelectPageDropdown}
          tableCurentPage={tableCurentPage}
          rowsLimit={rowsLimit}
          searchInputValue={searchInputValue}
          onChangeSearchInput={onChangeSearchInput}
          organizationList={organizationList}
          selectFilterOptions={selectFilterOptions}
          onChangeFilterDropdown={onChangeFilterDropdown}
          loadingSafetyPlanList={loadingSafetyPlanList}
        />
        <DeleteSureModal
          modalOpen={deleteConfirmation}
          setModalOpen={setDeleteConfirmation}
          title={"Your want to Delete safety plan"}
        >
          <Box marginTop="20px" display="flex" justifyContent="end">
            <Button
              variant="contained"
              color="inherit"
              size="small"
              data-testid="deleteResourceModalCancelButton"
              onClick={() => {
                setDeleteConfirmation(false);
              }}
              disabled={deleteSeftyPlanLoading}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              sx={{ marginLeft: "5px" }}
              size="small"
              data-testid="deleteResourceModalConfirmButton"
              disabled={false}
              disabled={deleteSeftyPlanLoading}
              onClick={() => {
                setDeleteConfirmation(false);
                deleteSeftyPlan();
              }}
            >
              Confirm
            </Button>
          </Box>
        </DeleteSureModal>
        <SuccessModal
          isOpen={showSuccessModal}
          onOk={() => setShowSuccessModal(false)}
          description={"Your plan has been deleted successfully."}
          title={"Successfull"}
        />
      </Layout>
    </>
  );
};
export default SafetyPlanPage;
