import { useLazyQuery } from "@apollo/client";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import SafetyPlanComponent from "../../../components/admin/safetyPlan";
import ContentHeader from "../../../components/common/ContentHeader";
import Loader from "../../../components/common/Loader";
import Layout from "../../../components/layout";
import { GET_ADMIN_AGENDA_LIST } from "../../../graphql/agenda/graphql";
import { useRouter } from "next/router";

const AgendaPage: NextPage = () => {
  const initialPageNo = 1;
  const router = useRouter();
  const [tableCurentPage, setTableCurrentPage] = useState(0);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [searchInputValue, setSearchInputValue] = useState();
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const [loader, setLoader] = useState<boolean>(true);
  const [listData, setListData] = useState({ data: [], total: 0 });

  useEffect(() => {
    getAdminAgendaList({
      variables: { limit: rowsLimit, pageNo: initialPageNo },
    });
  }, []);

  const [getAdminAgendaList, { loading: loadingAgendaList }] = useLazyQuery(
    GET_ADMIN_AGENDA_LIST,
    {
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        if (data.getAdminAgendaList?.agendalist) {
          let newData = data.getAdminAgendaList?.agendalist.map((a) => {
            return {
              _id: a._id,
              display_order: a.display_order,
              session_id: a.session_id,
              created_date: a.agenda_detail[0]?.created_date,
              agenda_id: a.agenda_detail[0]?._id,
              therapy_name: a.therapy_detail[0]?.therapy_name,
              agenda_name: a.agenda_detail[0]?.agenda_name,
            };
          });
          newData = newData.sort((a, b) => {
            const dateA = new Date(a.created_date).getTime();
            const dateB = new Date(b.created_date).getTime();
            return dateB - dateA;
          });
          setListData({
            data: newData,
            total: data.getAdminAgendaList?.total,
          });
        }
        /* istanbul ignore next */
        setLoader(false);
      },
    }
  );

  console.log("Koca: loadingAgendaList ", loadingAgendaList);

  const onPageChange = (event?: any, newPage?: number) => {
    /* istanbul ignore next */
    const searchText =
      searchInputValue && searchInputValue !== ""
        ? { searchText: searchInputValue }
        : {};
    /* istanbul ignore next */
    getAdminAgendaList({
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
    getAdminAgendaList({
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
      getAdminAgendaList({
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
    getAdminAgendaList({
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
    const { pressedIconButton, agenda_id } = value;

    if (pressedIconButton === "edit") {
      router.push(`/admin/agenda/edit/${agenda_id}/`);
    }
  };

  return (
    <>
      <Layout boxStyle={{ height: "100vh" }}>
        <Loader visible={loader} />
        <ContentHeader title="Agenda" />
        <SafetyPlanComponent
          safetyPlanList={listData}
          onPageChange={onPageChange}
          onSelectPageDropdown={onSelectPageDropdown}
          tableCurentPage={tableCurentPage}
          rowsLimit={rowsLimit}
          searchInputValue={searchInputValue}
          onChangeSearchInput={onChangeSearchInput}
          organizationList={[]}
          selectFilterOptions={selectFilterOptions}
          onChangeFilterDropdown={onChangeFilterDropdown}
          loadingSafetyPlanList={loadingAgendaList}
          pageActionButtonClick={handleActionButtonClick}
          isAgenda={true}
        />
      </Layout>
    </>
  );
};
export default AgendaPage;
