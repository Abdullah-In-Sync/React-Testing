import { useLazyQuery } from "@apollo/client";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import MeasuresComponent from "../../../components/admin/measures";
import ContentHeader from "../../../components/common/ContentHeader";
import Loader from "../../../components/common/Loader";
import Layout from "../../../components/layout";
import { GET_ORGANIZATION_LIST } from "../../../graphql/query/organization";
// import {
//   UPDATE_MEASURES_PLAN,
// } from "../../../graphql/Measures/graphql";

import { GET_ADMIN_MEASURES_LIST } from "../../../graphql/Measure/graphql";
// import {
//   UpdateMeasuresByIDRes,
//   UpdateMeasuresByIdVars,
// } from "../../../graphql/Measures/types";
import { useRouter } from "next/router";

const MeasuresListPage: NextPage = () => {
  const router = useRouter();
  const initialPageNo = 1;
  const [tableCurentPage, setTableCurrentPage] = useState(0);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [searchInputValue, setSearchInputValue] = useState();
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    getOrgList();
    getAdminMeasuresList({
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
    getAdminMeasuresList,
    {
      loading: loadingMeasuresList,
      data: { adminMeasuresList: listData = {} } = {},
    },
  ] = useLazyQuery(GET_ADMIN_MEASURES_LIST, {
    fetchPolicy: "no-cache",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  // const [deleteMeasuresFn, { loading: deleteSeftyPlanLoading }] = useMutation<
  //   UpdateSafetyPlanByIDRes,
  //   UpdateSafetyPlanByIdVars
  // >(UPDATE_SAFETY_PLAN, {
  //   onCompleted: () => {
  //     /* istanbul ignore next */
  //     getAdminMeasuresList({
  //       variables: { limit: rowsLimit, pageNo: initialPageNo },
  //     });
  //     setShowSuccessModal(true);
  //   },
  // });

  const onPageChange = (event?: any, newPage?: number) => {
    /* istanbul ignore next */
    const searchText =
      searchInputValue && searchInputValue !== ""
        ? { searchText: searchInputValue }
        : {};
    /* istanbul ignore next */
    getAdminMeasuresList({
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
    alert(event.target.value);
    /* istanbul ignore next */
    const searchText =
      searchInputValue && searchInputValue !== ""
        ? { searchText: searchInputValue }
        : {};
    /* istanbul ignore next */
    getAdminMeasuresList({
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
      getAdminMeasuresList({
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
    getAdminMeasuresList({
      variables: {
        limit: rowsLimit,
        pageNo: initialPageNo,
        ...searchText,
        ...temp,
      },
    });
    setTableCurrentPage(0);
    setSelectFilterOptions({ ...temp });
  };

  // const deleteSeftyPlan = () => {
  //   deleteMeasuresFn({
  //     variables: {
  //       planId: actionClickedId.current,
  //       updatePlan: {
  //         status: 0,
  //       },
  //     },
  //   });
  // };

  /* istanbul ignore next */
  const handleActionButtonClick = () => {
    // const { pressedIconButton, _id } = value;
    /* istanbul ignore next */
    // switch (
    //   pressedIconButton
    //   // case "edit":
    //   //   return router.push(`/admin/measures/edit/${_id}`);
    //   // case "view":
    //   //   return router.push(`/admin/measures/view/${_id}`);
    //   // case "delete":
    //   //   actionClickedId.current = value?._id;
    //   //   setDeleteConfirmation(true);
    // ) {
    // }
  };

  const onPressSideButton = () => {
    router.push(`/admin/measures/create`);
  };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Measures" />
        <MeasuresComponent
          measuresList={listData}
          onPageChange={onPageChange}
          onSelectPageDropdown={onSelectPageDropdown}
          tableCurentPage={tableCurentPage}
          rowsLimit={rowsLimit}
          searchInputValue={searchInputValue}
          onChangeSearchInput={onChangeSearchInput}
          organizationList={organizationList}
          selectFilterOptions={selectFilterOptions}
          onChangeFilterDropdown={onChangeFilterDropdown}
          loadingMeasuresList={loadingMeasuresList}
          pageActionButtonClick={handleActionButtonClick}
          onPressSideButton={onPressSideButton}
        />
      </Layout>
    </>
  );
};
export default MeasuresListPage;
