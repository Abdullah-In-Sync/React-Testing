import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import SafetyPlanComponent from "../../../components/admin/safetyPlan";
import ContentHeader from "../../../components/common/ContentHeader";
import Loader from "../../../components/common/Loader";
import Layout from "../../../components/layout";
import { GET_ADMIN_AGENDA_LIST } from "../../../graphql/agenda/graphql";
import { useRouter } from "next/router";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { ADMIN_UPDATE_AGENDA_BY_ID } from "../../../graphql/mutation/resource";
import { useSnackbar } from "notistack";

const AgendaPage: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const initialPageNo = 1;
  const router = useRouter();
  const [tableCurentPage, setTableCurrentPage] = useState(0);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [searchInputValue, setSearchInputValue] = useState();
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const [loader, setLoader] = useState<boolean>(true);
  const [listData, setListData] = useState({ data: [], total: 0 });
  const [deleteAgendaModal, setDeleteAgendaModal] = useState<boolean>(false);
  const [deleteAgendaId, setDeleteAgendaId] = useState("");

  const [deleteAdminAgenda] = useMutation(ADMIN_UPDATE_AGENDA_BY_ID);

  useEffect(() => {
    getAdminAgendaList({
      variables: { limit: rowsLimit, pageNo: initialPageNo },
    });
  }, []);

  const [getAdminAgendaList, { loading: loadingAgendaList, refetch }] =
    useLazyQuery(GET_ADMIN_AGENDA_LIST, {
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        /* istanbul ignore next */
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
    });

  /* istanbul ignore next */
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

  /* istanbul ignore next */
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

  /* istanbul ignore next */
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

  /* istanbul ignore next */
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

    if (pressedIconButton === "delete") {
      setDeleteAgendaModal(true);
      setDeleteAgendaId(agenda_id);
    }
  };

  /* istanbul ignore next */
  const clearIsConfirmCancel = () => {
    setDeleteAgendaModal(false);
  };

  const deleteAgendaHandler = async () => {
    try {
      deleteAdminAgenda({
        variables: {
          agenda_id: deleteAgendaId,
          updateAgenda: {
            agenda_status: 0,
          },
        },
        onCompleted: () => {
          setDeleteAgendaModal(false);
          /* istanbul ignore next */
          enqueueSnackbar("Agenda deleted successfully!", {
            variant: "success",
            autoHideDuration: 2000,
          });
          /* istanbul ignore next */
          refetch();
        },
      });
      setLoader(false);
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong.", {
        variant: "error",
        autoHideDuration: 2000,
      });
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

      {deleteAgendaModal && (
        <ConfirmationModal
          label="Are you sure, you want to delete this agenda?"
          onCancel={clearIsConfirmCancel}
          onConfirm={deleteAgendaHandler}
        />
      )}
    </>
  );
};
export default AgendaPage;
