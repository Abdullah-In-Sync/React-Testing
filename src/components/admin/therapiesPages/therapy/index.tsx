import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
import {
  ADMIN_ADD_THERAPY,
  ADMIN_DELETE_THERAPY,
  GET_ADMIN_THERAPIES_LIST,
} from "../../../../graphql/assessment/graphql";
import Loader from "../../../common/Loader";
import TherapiesComponent from "./therapyComponent";
import ContentHeader from "../../../common/ContentHeader";
import {
  CommonModal,
  ModalElement,
} from "../../../common/CustomModal/CommonModal";
import AddTherapyForm from "./add/AddTherapy";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { useSnackbar } from "notistack";

const TherapiesListPage: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const modalRefAddPlan = useRef<ModalElement>(null);
  const [tableCurentPage, setTableCurrentPage] = useState(0);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const [loader, setLoader] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [isConfirmCompleteTask, setIsConfirmCompleteTask] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);

  const [getName, setGetName] = useState("");
  const [getOrgId, setGetOrgId] = useState([]);
  const [deleteTherapyId, setDeleteTherapy] = useState("");

  const [addTherapy] = useMutation(ADMIN_ADD_THERAPY);
  const [deleteTherapy] = useMutation(ADMIN_DELETE_THERAPY);

  useEffect(() => {
    getAdminTherapiesList({
      variables: {
        limit: rowsLimit,
        pageNo: page,
        therapy_name: searchInputValue,
        ...selectFilterOptions,
      },
    });
  }, [rowsLimit, selectFilterOptions, searchInputValue, page]);

  useEffect(() => {
    getOrgList();
  }, []);

  const [
    getOrgList,
    { data: { getOrganizationData: organizationList = [] } = {} },
  ] = useLazyQuery(GET_ORGANIZATION_LIST, {
    fetchPolicy: "cache-and-network",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  const [
    getAdminTherapiesList,
    {
      loading: loadingTherapiesList,
      data: { adminTherapyList: listData = {} } = {},
      refetch,
    },
  ] = useLazyQuery(GET_ADMIN_THERAPIES_LIST, {
    fetchPolicy: "cache-and-network",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  /* istanbul ignore next */
  const onPageChange = (event?: any, newPage?: number) => {
    setPage(newPage + 1);
    setTableCurrentPage(newPage);
  };

  /* istanbul ignore next */
  const onSelectPageDropdown = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsLimit(+event.target.value);
    setTableCurrentPage(0);
  };

  /* istanbul ignore next */
  const onChangeFilterDropdown = async (e) => {
    const temp = selectFilterOptions;
    console.log("Koca: In selectFilterOptions ", selectFilterOptions);
    temp[e.target.name] = e.target.value !== "all" ? e.target.value : "";
    setSelectFilterOptions({ ...temp });
    setTableCurrentPage(0);
    setPage(1);
  };

  /* istanbul ignore next */
  const onChangeSearchInput = (e) => {
    setSearchInputValue(e.target.value);
    setTableCurrentPage(0);
    setPage(1);
  };

  const handleOpenAddTherapyModal = useCallback(
    /* istanbul ignore next */
    () => modalRefAddPlan.current?.open(),
    []
  );

  const handleCloseAddTherapyModal = useCallback(() => {
    /* istanbul ignore next */
    modalRefAddPlan.current?.close();
  }, []);

  const handleAddTherapy = async () => {
    try {
      await addTherapy({
        variables: {
          therapy_name: getName,
          org_id: getOrgId.join(","),
        },
        onCompleted: () => {
          handleCloseAddTherapyModal();
          setIsConfirmCompleteTask(false);
          refetch();
          enqueueSnackbar("Therapy added successfully!", {
            variant: "success",
          });
        },
      });

      // refetch();
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("There is something wrong.", { variant: "error" });
    }
  };

  const handleDeleteTherapy = async () => {
    try {
      await deleteTherapy({
        variables: {
          therapy_id: deleteTherapyId,
          update: {
            therapy_status: 0,
          },
        },
        onCompleted: () => {
          setIsConfirmDelete(false);
          refetch();
          enqueueSnackbar("Therapy deleted successfully!", {
            variant: "success",
          });
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("There is something wrong.", { variant: "error" });
    }
  };

  /* istanbul ignore next */
  const clearIsConfirmCancel = () => {
    setIsConfirmCompleteTask(false);
    setIsConfirmDelete(false);
  };

  /* istanbul ignore next */
  const receiveName = (value) => {
    setGetName(value);
  };

  /* istanbul ignore next */
  const receiveId = (value) => {
    setGetOrgId(value);
  };

  /* istanbul ignore next */
  const handleActionButtonClick = (value) => {
    const { pressedIconButton } = value;

    if (pressedIconButton === "delete") {
      setDeleteTherapy(value._id);
      setIsConfirmDelete(true);
    }
  };

  return (
    <>
      <Loader visible={loader} />
      <ContentHeader title="Therapy" />
      <TherapiesComponent
        monitorList={listData}
        onPageChange={onPageChange}
        onSelectPageDropdown={onSelectPageDropdown}
        tableCurentPage={tableCurentPage}
        rowsLimit={rowsLimit}
        searchInputValue={searchInputValue}
        onChangeSearchInput={onChangeSearchInput}
        organizationList={organizationList}
        selectFilterOptions={selectFilterOptions}
        onChangeFilterDropdown={onChangeFilterDropdown}
        loadingMonitorList={loadingTherapiesList}
        pageActionButtonClick={handleActionButtonClick}
        onPressSideButton={handleOpenAddTherapyModal}
      />

      <CommonModal
        ref={modalRefAddPlan}
        headerTitleText={"Add Therapy"}
        maxWidth="sm"
      >
        <AddTherapyForm
          onPressSubmit={() => setIsConfirmCompleteTask(true)}
          organizationList={organizationList}
          receiveOrgId={receiveId}
          receiveName={receiveName}
        />
      </CommonModal>

      {isConfirmCompleteTask && (
        <ConfirmationModal
          label="Are you sure you want to add this therapy?"
          onCancel={clearIsConfirmCancel}
          onConfirm={handleAddTherapy}
        />
      )}

      {isConfirmDelete && (
        <ConfirmationModal
          label="Associated disorder, model and categories will also get deleted. Would you like to proceed?"
          onCancel={clearIsConfirmCancel}
          onConfirm={handleDeleteTherapy}
        />
      )}
    </>
  );
};
export default TherapiesListPage;
