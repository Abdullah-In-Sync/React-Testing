import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import ContentHeader from "../../../components/common/ContentHeader";
import Loader from "../../../components/common/Loader";
import Layout from "../../../components/layout";
import { GET_ORGANIZATION_LIST } from "../../../graphql/query/organization";
import { UPDATE_RELAPSE_PLAN } from "../../../graphql/Relapse/graphql";
import { GET_RELAPSE_PLAN_LIST } from "../../../graphql/SafetyPlan/graphql";

import { UpdatePlan } from "../../../graphql/Relapse/types";

import RelapsePlanComponent from "../../../components/admin/relapsePlan";
import { SuccessModal } from "../../../components/common/SuccessModal";

const RelapsePlanPage: NextPage = () => {
  const initialPageNo = 1;
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [successModal, setSuccessModal] = useState<any>();
  const [tableCurentPage, setTableCurrentPage] = useState(0);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [searchInputValue, setSearchInputValue] = useState();
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const [loader, setLoader] = useState<boolean>(true);
  const [isConfirm, setIsConfirm] = useState<any>({
    status: false,
    storedFunction: null,
    setSubmitting: null,
    cancelStatus: false,
    confirmObject: {
      description: "",
    },
  });
  const [updateRelapsePlanFn] = useMutation<UpdatePlan>(UPDATE_RELAPSE_PLAN);

  useEffect(() => {
    getOrgList();
    getRelapsePlanList({
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
  console.log("Koca: organizationList ", organizationList);

  const [
    getRelapsePlanList,
    {
      loading: loadingSafetyPlanList,
      data: { adminRelapsePlanList: listData = {} } = {},

      // data: listData,
    },
  ] = useLazyQuery(GET_RELAPSE_PLAN_LIST, {
    fetchPolicy: "no-cache",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  /* istanbul ignore next */
  const onPageChange = (event?: any, newPage?: number) => {
    /* istanbul ignore next */
    const searchText =
      searchInputValue && searchInputValue !== ""
        ? { searchText: searchInputValue }
        : {};
    /* istanbul ignore next */
    getRelapsePlanList({
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

  /* istanbul ignore next */
  const onSelectPageDropdown = (event: React.ChangeEvent<HTMLInputElement>) => {
    /* istanbul ignore next */
    const searchText =
      searchInputValue && searchInputValue !== ""
        ? { searchText: searchInputValue }
        : {};
    /* istanbul ignore next */
    getRelapsePlanList({
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

  /* istanbul ignore next */
  const onChangeSearchInput = (e) => {
    console.debug("Search 2", {
      limit: rowsLimit,
      searchText: e.target.value,
      pageNo: initialPageNo,
      ...selectFilterOptions,
    });
    setSearchInputValue(() => {
      getRelapsePlanList({
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
    getRelapsePlanList({
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

  /* istanbul ignore next */
  // const handleActionButtonClick = (value) => {
  //   //Handler
  // };

  const deleteRelapse = async (planId, doneCallback) => {
    setLoader(true);
    const variables = {
      planId,
      updatePlan: {
        status: 0,
      },
    };
    try {
      await updateRelapsePlanFn({
        variables,
        fetchPolicy: "network-only",
        onCompleted: (data) => {
          if (data) {
            getRelapsePlanList({
              variables: { limit: rowsLimit, pageNo: tableCurentPage + 1 },
            });
            doneCallback();
            setSuccessModal({
              description: "Your plan has been deleted successfully.",
            });
          }
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);

      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
    } finally {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
    }
  };

  const handleDeleteRelapse = (planId) => {
    setIsConfirm({
      status: true,
      confirmObject: {
        description: "Are you sure you want to delete relapse plan?",
      },
      storedFunction: (callback) => deleteRelapse(planId, callback),
    });
  };

  const handleActionButtonClick = (v) => {
    const { pressedIconButton, _id: planId } = v;
    switch (pressedIconButton) {
      case "delete":
        return handleDeleteRelapse(planId);
      case "view":
        return router.push(`/admin/relapsePlan/view/${planId}`);
      default:
        return;
    }
  };

  const clearIsConfirm = () => {
    /* istanbul ignore next */
    setIsConfirm({
      status: false,
      storedFunction: null,
      setSubmitting: null,
      cancelStatus: false,
    });
  };

  const onConfirmSubmit = () => {
    isConfirm.storedFunction(() => {
      setLoader(true);
      clearIsConfirm();
    });
  };

  const handleOk = () => {
    setSuccessModal(undefined);
  };

  return (
    <>
      <Layout boxStyle={{ height: "100vh" }}>
        <Loader visible={loader} />
        <ContentHeader title="Relapse Plan" />
        <RelapsePlanComponent
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
        {isConfirm.status && (
          <ConfirmationModal
            label={isConfirm.confirmObject.description}
            onCancel={clearIsConfirm}
            onConfirm={onConfirmSubmit}
          />
        )}
        {successModal && (
          <SuccessModal
            isOpen={Boolean(successModal)}
            title="Successful"
            description={successModal.description}
            onOk={handleOk}
          />
        )}
      </Layout>
    </>
  );
};
export default RelapsePlanPage;
