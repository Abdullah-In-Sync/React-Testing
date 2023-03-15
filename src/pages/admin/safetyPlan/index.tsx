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
  UPDATE_SAFETY_PLAN,
} from "../../../graphql/SafetyPlan/graphql";
import {
  UpdateSafetyPlanByIDRes,
  UpdateSafetyPlanByIdVars,
} from "../../../graphql/SafetyPlan/types";
import { useRouter } from "next/router";

const SafetyPlanPage: NextPage = () => {
  const router = useRouter();
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

  const [deleteSeftyPlanFn, { loading: deleteSeftyPlanLoading }] = useMutation<
    UpdateSafetyPlanByIDRes,
    UpdateSafetyPlanByIdVars
  >(UPDATE_SAFETY_PLAN, {
    onCompleted: () => {
      /* istanbul ignore next */
      getSafetyPlanList({
        variables: { limit: rowsLimit, pageNo: initialPageNo },
      });
      setShowSuccessModal(true);
    },
  });

  const onPageChange = (event?: any, newPage?: number) => {
    /* istanbul ignore next */
    const searchText =
      searchInputValue && searchInputValue !== ""
        ? { searchText: searchInputValue }
        : {};
    /* istanbul ignore next */
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
    /* istanbul ignore next */
    getSafetyPlanList({
      variables: {
        limit: +event.target.value,
        pageNo: initialPageNo,
        ...searchText,
        ...selectFilterOptions,
      },
    });
    /* istanbul ignore next */
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
    /* istanbul ignore next */
    const searchText =
      searchInputValue && searchInputValue !== ""
        ? { searchText: searchInputValue }
        : {};
    /* istanbul ignore next */
    temp[e.target.name] = e.target.value !== "all" ? e.target.value : "";
    /* istanbul ignore next */
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

  const handleActionButtonClick = (value) => {
    const { pressedIconButton, _id } = value;
    /* istanbul ignore next */
    switch (pressedIconButton) {
      case "edit":
        return router.push(`/admin/safetyPlan/edit/${_id}`);
      case "view":
        return router.push(`/admin/safetyPlan/view/${_id}`);
      case "delete":
        actionClickedId.current = value?._id;
        setDeleteConfirmation(true);
    }
  };

  return (
    <>
      <Layout boxStyle={{ height: "100vh" }}>
        <Loader visible={loader} />
        <ContentHeader title="Safety Plan" />
        <SafetyPlanComponent
          safetyPlanList={listData}
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
          pageActionButtonClick={handleActionButtonClick}
        />
        <DeleteSureModal
          modalOpen={deleteConfirmation}
          setModalOpen={setDeleteConfirmation}
          title={"Are you sure you want to delete the safety plan?"}
        >
          <Box marginTop="20px" display="flex" justifyContent="center">
            <Button
              variant="contained"
              sx={{ marginRight: "10px" }}
              size="small"
              data-testid="approveDeletePlanModalConfirmButton"
              disabled={deleteSeftyPlanLoading}
              onClick={() => {
                setDeleteConfirmation(false);
                deleteSeftyPlan();
              }}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              data-testid="deleteSaftyPlanModalCancelButton"
              onClick={() => {
                /* istanbul ignore next */
                setDeleteConfirmation(false);
              }}
              disabled={deleteSeftyPlanLoading}
            >
              Cancel
            </Button>
          </Box>
        </DeleteSureModal>
        <SuccessModal
          isOpen={showSuccessModal}
          onOk={() =>
            /* istanbul ignore next */
            setShowSuccessModal(false)
          }
          description={"Your plan has been deleted successfully."}
          title={"Successful"}
        />
      </Layout>
    </>
  );
};
export default SafetyPlanPage;
