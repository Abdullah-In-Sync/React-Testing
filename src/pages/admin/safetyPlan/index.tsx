import { useLazyQuery } from "@apollo/client";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import SafetyPlanComponent from "../../../components/admin/safetyPlan";
import ContentHeader from "../../../components/common/ContentHeader";
import Loader from "../../../components/common/Loader";
import Layout from "../../../components/layout";
import { GET_ORGANIZATION_LIST } from "../../../graphql/query/organization";
import { GET_SAFETY_PLAN_LIST } from "../../../graphql/SafetyPlan/graphql";

const SafetyPlanPage: NextPage = () => {
  const [tableCurentPage, setTableCurrentPage] = useState(0);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [searchInputValue, setSearchInputValue] = useState();
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    getOrgList();
    getSafetyPlanList({
      variables: { limit: rowsLimit, pageNo: tableCurentPage },
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
    fetchPolicy: "network-only",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  const onPageChange = (event?: any, newPage?: number) => {
    /* istanbul ignore next */
    const searchText =
      searchInputValue && searchInputValue !== ""
        ? { searchText: searchInputValue }
        : {};
    getSafetyPlanList({
      variables: {
        limit: rowsLimit,
        pageNo: newPage,
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
        pageNo: 0,
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
          pageNo: 0,
          ...selectFilterOptions,
        },
      });
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
      variables: { limit: rowsLimit, pageNo: 0, ...searchText, ...temp },
    });
    /* istanbul ignore next */
    setSelectFilterOptions({ ...temp });
  };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Safety Plan" />
        <SafetyPlanComponent
          safetyPlanList={listData}
          buttonClick={() => alert("click")}
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
      </Layout>
    </>
  );
};
export default SafetyPlanPage;
