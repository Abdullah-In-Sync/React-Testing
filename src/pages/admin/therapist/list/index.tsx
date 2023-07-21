import { useLazyQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

import ContentHeader from "../../../../components/common/ContentHeader";
import Loader from "../../../../components/common/Loader";
import Layout from "../../../../components/layout";

import { useRouter } from "next/router";
import TherapistListComponent from "../../../../components/admin/therapist/list/List";
import { GET_ADMIN_THERAPIST_LIST } from "../../../../graphql/Therapist/graphql";

const TherapistListPage: NextPage = () => {
  const router = useRouter();
  const initialPageNo = 1;
  const [tableCurentPage, setTableCurrentPage] = useState(0);
  const rowsLimit = 10;
  const [searchInputValue, setSearchInputValue] = useState();
  const [paginationTokenList, setPaginationToken] = useState([]);
  const [loader, setLoader] = useState<boolean>(true);

  const [
    getAdminTherapistList,
    {
      loading: loadingTherapistList,
      data: { getTherapistList: { therapistlist: listData = [] } = {} } = {},
    },
  ] = useLazyQuery(GET_ADMIN_THERAPIST_LIST, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    getAdminTherapistList({
      variables: { name: "", paginationtoken: "", limit: rowsLimit },
      onCompleted: (data) => {
        addPaginationToken(data);
      },
    });
  }, []);

  /* istanbul ignore next */
  const onPageChange = (event?: any, newPage?: number) => {
    const searchText =
      searchInputValue && searchInputValue !== ""
        ? { name: searchInputValue }
        : { name: "" };
    const tempNewPage = paginationTokenList[newPage - 1];
    getAdminTherapistList({
      variables: {
        limit: rowsLimit,
        paginationtoken: tempNewPage,
        ...searchText,
      },
      onCompleted: (data) => {
        addPaginationToken(data);
        setLoader(false);
        setTableCurrentPage(newPage);
      },
    });
  };

  const onChangeSearchInput = (e) => {
    setPaginationToken([]);
    setTableCurrentPage(0);
    setSearchInputValue(() => {
      getAdminTherapistList({
        variables: {
          limit: rowsLimit,
          name: e.target.value,
          pageNo: initialPageNo,
        },
        onCompleted: (data) => {
          addPaginationToken(data);
        },
      });
      return e.target.value;
    });
  };

  const addPaginationToken = (data) => {
    const { getTherapistList: { pagination = undefined } = {} } = data;
    if (pagination && !paginationTokenList.includes(pagination))
      setPaginationToken([...paginationTokenList, ...[pagination]]);
  };

  const onPressSideButton = () => {
    router.push(`/admin/therapist/add`);
  };

  /* istanbul ignore next */
  const handleActionButtonClick = () => {
    //action button
  };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Therapist" />
        <TherapistListComponent
          listData={listData}
          onPageChange={onPageChange}
          totalData={
            listData.length === 9
              ? (tableCurentPage + 2) * rowsLimit
              : tableCurentPage * rowsLimit
          }
          tableCurentPage={tableCurentPage}
          rowsLimit={rowsLimit}
          searchInputValue={searchInputValue}
          onChangeSearchInput={onChangeSearchInput}
          loadingTherapistList={loadingTherapistList}
          pageActionButtonClick={handleActionButtonClick}
          onPressSideButton={onPressSideButton}
        />
      </Layout>
    </>
  );
};
export default TherapistListPage;
