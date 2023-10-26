import { useLazyQuery, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";

import { ConfirmElement } from "../../../components/common/ConfirmWrapper";
import ContentHeader from "../../../components/common/ContentHeader";
import Loader from "../../../components/common/Loader";
import PatientUsersComponent from "../../../components/patient/users/list/UsersList";
import {
  GET_ROLES_ACCESSBILITY,
  PATIENT_CUSTOM_USER_LIST,
} from "../../../graphql/userRole/graphql";
import Layout from "../../../components/layout";
import {
  CustomUsersListData,
  RolesListData,
} from "../../../graphql/userRole/types";

const PatientUsersListPage: NextPage = () => {
  const initialPageNo = 1;
  const [tableCurentPage, setTableCurrentPage] = useState(0);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [selectFilterOptions, setSelectFilterOptions] = useState({});

  const [page, setPage] = useState(1);
  const confirmRef = useRef<ConfirmElement>(null);

  const { data: { getRolesbyAccessbility: roles = [] } = {} } =
    useQuery<RolesListData>(GET_ROLES_ACCESSBILITY);
  const [
    getCustomUsersList,
    {
      loading: loadingCustomUsersList,
      data: { getCustomUsersList: usersListData = undefined } = {},
    },
  ] = useLazyQuery<CustomUsersListData>(PATIENT_CUSTOM_USER_LIST, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    getCustomUsersList({
      variables: {
        limit: rowsLimit,
        pageNo: page,
        name: searchInputValue,
        ...selectFilterOptions,
      },
    });
  }, []);

  const onPageChange = (_, newPage?: number) => {
    setPage(newPage + 1);
    setTableCurrentPage(newPage);
  };

  const onSelectPageDropdown = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsLimit(+event.target.value);
    setTableCurrentPage(0);
  };

  const onChangeSearchInput = (e) => {
    setSearchInputValue(() => {
      getCustomUsersList({
        variables: {
          limit: rowsLimit,
          name: e.target.value,
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
    const name =
      searchInputValue && searchInputValue !== ""
        ? { name: searchInputValue }
        : {};

    temp[e.target.name] = e.target.value !== "all" ? e.target.value : "";

    getCustomUsersList({
      variables: {
        limit: rowsLimit,
        pageNo: initialPageNo,
        ...name,
        ...temp,
      },
    });
    setTableCurrentPage(0);
    setSelectFilterOptions({ ...temp });
  };

  return (
    <>
      <Layout>
        <Loader visible={!loadingCustomUsersList} />
        <ContentHeader title="User List" />
        <PatientUsersComponent
          usersListData={usersListData}
          onPageChange={onPageChange}
          onSelectPageDropdown={onSelectPageDropdown}
          tableCurentPage={tableCurentPage}
          rowsLimit={rowsLimit}
          searchInputValue={searchInputValue}
          onChangeSearchInput={onChangeSearchInput}
          selectFilterOptions={selectFilterOptions}
          onChangeFilterDropdown={onChangeFilterDropdown}
          pageActionButtonClick={null}
          onPressSideButton={null}
          confirmRef={confirmRef}
          roles={roles}
          loadingCustomUsersList={loadingCustomUsersList}
        />
      </Layout>
    </>
  );
};

export default PatientUsersListPage;
