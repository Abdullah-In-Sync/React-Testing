import { useLazyQuery } from "@apollo/client";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import SafetyPlanComponent from "../../../components/admin/safetyPlan";
import ContentHeader from "../../../components/common/ContentHeader";
import Loader from "../../../components/common/Loader";
import Layout from "../../../components/layout";
import { GET_ORGANIZATION_LIST } from "../../../graphql/query/organization";
import { GET_CUSTOM_USERS_LIST } from "../../../graphql/customUsers/graphql";
import { UsersData } from "../../../graphql/customUsers/types";

const CustomUserListPage: NextPage = () => {
  const initialPageNo = 1;
  const [tableCurentPage, setTableCurrentPage] = useState(0);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [searchInputValue, setSearchInputValue] = useState();
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const [loader, setLoader] = useState<boolean>(true);
  const [listData, setListData] = useState({ data: [], total: 0 });

  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    getOrgList();
    getCustomUserList({
      variables: { limit: rowsLimit, pageNo: initialPageNo },
    });
  }, []);

  const [
    getOrgList,
    /* istanbul ignore next */
    { data: { getOrganizationData: organizationList = [] } = {} },
  ] = useLazyQuery(GET_ORGANIZATION_LIST, {
    fetchPolicy: "cache-and-network",
    /* istanbul ignore next */
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  const [getCustomUserList, { loading: loadingCustomerUsersList }] =
    useLazyQuery<UsersData>(GET_CUSTOM_USERS_LIST, {
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        /* istanbul ignore next */
        if (data.getCustomUsersList?.data) {
          /* istanbul ignore next */
          const newData = data.getCustomUsersList?.data.map((a) => {
            return {
              _id: a._id,
              first_name: a.first_name,
              last_name: a.last_name,
              role: a.role_detail?.name,
              organisation: a.role_detail?.organization_name,
            };
          });
          /* istanbul ignore next */
          setListData({
            data: newData,
            total: data.getCustomUsersList.total,
          });
        }
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
    getCustomUserList({
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
    getCustomUserList({
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
  useEffect(() => {
    /* istanbul ignore next */
    getCustomUserList({
      /* istanbul ignore next */
      variables: {
        limit: rowsLimit,
        searchText: searchInputValue,
        pageNo: initialPageNo,
        ...selectFilterOptions,
      },
    });
  }, [searchInputValue]);

  /* istanbul ignore next */
  const onChangeSearchInput = (e) => {
    /* istanbul ignore next */
    setSearchInputValue(e.target.value);
    setSearchKey(e.target.value);
    setTableCurrentPage(0);
  };

  /* istanbul ignore next */
  const onChangeFilterDropdown = (e) => {
    const temp = selectFilterOptions;
    /* istanbul ignore next */
    const searchText =
      searchKey && searchKey !== "" ? { searchText: searchKey } : {};
    /* istanbul ignore next */
    temp[e.target.name] = e.target.value !== "all" ? e.target.value : "";
    /* istanbul ignore next */
    getCustomUserList({
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
  const handleActionButtonClick = (value) => {
    /* istanbul ignore next */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { pressedIconButton, _id } = value;
  };

  return (
    <>
      <Layout boxStyle={{ height: "100vh" }}>
        <Loader visible={loader} />
        <ContentHeader title="User List" />
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
          loadingSafetyPlanList={loadingCustomerUsersList}
          pageActionButtonClick={handleActionButtonClick}
          platForm={"userList"}
        />
      </Layout>
    </>
  );
};
export default CustomUserListPage;
