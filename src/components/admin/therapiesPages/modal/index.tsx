import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
import { ConfirmElement } from "../../../common/ConfirmWrapper";
import Loader from "../../../common/Loader";
import ModelComponent from "./modalComponent";
import { GET_ADMIN_MODEL_LIST } from "../../../../graphql/category/graphql";
import { ADMIN_UPDATE_MODEL } from "../../../../graphql/model/graphql";
import ConfirmationModal from "../../../common/ConfirmationModal";
import {
  CommonModal,
  ModalElement,
} from "../../../common/CustomModal/CommonModal";

import { useSnackbar } from "notistack";
import { GET_DISORDER_DATA_BY_ORG_ID } from "../../../../graphql/query/common";
import AddModalForm from "./add/AddModal";
import { ADMIN_UPDATE_MODAL } from "../../../../graphql/assessment/graphql";

const ModelListPage: NextPage = () => {
  const modalRefAddPlan = useRef<ModalElement>(null);
  const [tableCurentPage, setTableCurrentPage] = useState(0);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const [loader, setLoader] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const confirmRef = useRef<ConfirmElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedModel, setSelectedModel] = useState();
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [adminUpdateModel] = useMutation(ADMIN_UPDATE_MODEL);

  const [isConfirmCompleteTask, setIsConfirmCompleteTask] = useState(false);
  const [updateModalId, setUpdateModalId] = useState("");
  const [prefilledOrgId, setPrefilledOrgId] = useState("");
  const [prefilledDisordorId, setPrefilledDisordorId] = useState("");
  const [prefilledModalName, setPrefilledModalName] = useState("");
  const [getName, setGetName] = useState("");
  const [getDisordorId, setGetDisordorId] = useState();

  const [updateModal] = useMutation(ADMIN_UPDATE_MODAL);

  /* istanbul ignore next */
  const handleOpenEditModal = useCallback(
    /* istanbul ignore next */
    () => modalRefAddPlan.current?.open(),
    []
  );

  const handleCloseEditModal = useCallback(() => {
    /* istanbul ignore next */
    modalRefAddPlan.current?.close();
  }, []);

  useEffect(() => {
    /* istanbul ignore next */
    getOrgList();
  }, []);

  useEffect(() => {
    getModelList({
      variables: {
        limit: rowsLimit,
        pageNo: page,
        searchText: searchInputValue,
        ...selectFilterOptions,
      },
    });
  }, [rowsLimit, selectFilterOptions, tableCurentPage, searchInputValue, page]);

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

  /* istanbul ignore next */
  const confirmModelDelete = async () => {
    /* istanbul ignore next */
    setLoader(true);
    const variables = {
      model_id: selectedModel,
      update_model: {
        model_status: 0,
      },
    };

    try {
      /* istanbul ignore next */
      await adminUpdateModel({
        variables,
        fetchPolicy: "network-only",
        /* istanbul ignore next */
        onCompleted: () => {
          /* istanbul ignore next */
          setIsConfirm(false);
          /* istanbul ignore next */
          enqueueSnackbar("Model deleted successfully!", {
            variant: "success",
          });
          /* istanbul ignore next */
          refetchModelList();
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      setIsConfirm(false);
      /* istanbul ignore next */
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
    } finally {
      /* istanbul ignore next */
      setLoader(false);
    }
  };
  const [getDisorderByOrgId, { data: disorderDataList }] = useLazyQuery(
    GET_DISORDER_DATA_BY_ORG_ID,
    {
      onCompleted: () => {
        /* istanbul ignore next */
        setLoader(false);
      },
    }
  );

  useEffect(() => {
    /* istanbul ignore next */
    if (prefilledOrgId) {
      /* istanbul ignore next */
      getDisorderByOrgId({
        variables: { orgId: prefilledOrgId },
      });
    }
  }, [prefilledOrgId]);

  const [
    getModelList,
    {
      /* istanbul ignore next */
      data: { getAdminModelList: modelListData = undefined } = {},
      /* istanbul ignore next */
      refetch: refetchModelList,
      loading: loadingModel,
    },
  ] = useLazyQuery(GET_ADMIN_MODEL_LIST, {
    fetchPolicy: "cache-and-network",
    /* istanbul ignore next */
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  /* istanbul ignore next */
  const onPageChange = (event?: any, newPage?: number) => {
    /* istanbul ignore next */
    setPage(newPage + 1);
    /* istanbul ignore next */
    setTableCurrentPage(newPage);
  };

  const onSelectPageDropdown = (event: React.ChangeEvent<HTMLInputElement>) => {
    /* istanbul ignore next */
    setRowsLimit(+event.target.value);
    /* istanbul ignore next */
    setTableCurrentPage(0);
  };

  const onChangeFilterDropdown = async (e) => {
    let temp = selectFilterOptions;
    /* istanbul ignore next */
    temp[e.target.name] = e.target.value !== "all" ? e.target.value : "";
    /* istanbul ignore next */
    if (e.target.name == "orgId") {
      /* istanbul ignore next */
      temp = { orgId: e.target.value };
    }
    /* istanbul ignore next */
    if (e.target.name == "therapyId") {
      /* istanbul ignore next */
      delete temp["disorderId"];
    }
    setSelectFilterOptions({ ...temp });
    setTableCurrentPage(0);
    setPage(1);
  };

  const onChangeSearchInput = (e) => {
    setSearchInputValue(e.target.value);
    setTableCurrentPage(0);
    setPage(1);
  };
  /* istanbul ignore next */
  const clearIsConfirm = () => {
    /* istanbul ignore next */
    setIsConfirm(false);
  };
  /* istanbul ignore next */
  const handleTableActions = (value) => {
    /* istanbul ignore next */
    const { pressedIconButton, _id } = value;
    /* istanbul ignore next */
    if (pressedIconButton == "delete") {
      /* istanbul ignore next */
      setSelectedModel(_id);
      /* istanbul ignore next */
      setIsConfirm(true);
    }

    if (pressedIconButton === "edit") {
      const orgId = value.therapy_detail[0].org_id;
      const disordorId = value.disorder_id;
      const modalName = value.model_name;
      setUpdateModalId(value._id);
      setPrefilledOrgId(orgId);
      setPrefilledDisordorId(disordorId);
      setPrefilledModalName(modalName);

      handleOpenEditModal();
    }
  };

  /* istanbul ignore next */
  const receiveDisordorId = (value) => {
    setGetDisordorId(value);
  };

  /* istanbul ignore next */
  const receiveName = (value) => {
    setGetName(value);
  };

  /* istanbul ignore next */
  const clearIsConfirmCancel = () => {
    /* istanbul ignore next */
    setIsConfirmCompleteTask(false);
  };

  const handleUpdateModal = async () => {
    try {
      await updateModal({
        variables: {
          model_id: updateModalId,
          update_model: {
            model_name: getName,
            disorder_id: getDisordorId,
          },
        },
        onCompleted: () => {
          /* istanbul ignore next */
          handleCloseEditModal();
          /* istanbul ignore next */
          setIsConfirmCompleteTask(false);
          /* istanbul ignore next */
          enqueueSnackbar("Model updated successfully!", {
            variant: "success",
          });
          /* istanbul ignore next */
          refetchModelList();
        },
      });
    } catch (e) {
      console.log(e);
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("There is something wrong.", { variant: "error" });
    }
  };

  return (
    <>
      <Loader visible={loader} />
      <ModelComponent
        modelList={modelListData}
        onPageChange={onPageChange}
        onSelectPageDropdown={onSelectPageDropdown}
        tableCurentPage={tableCurentPage}
        rowsLimit={rowsLimit}
        searchInputValue={searchInputValue}
        onChangeSearchInput={onChangeSearchInput}
        organizationList={organizationList}
        selectFilterOptions={selectFilterOptions}
        onChangeFilterDropdown={onChangeFilterDropdown}
        loadingDisorderList={loadingModel}
        pageActionButtonClick={handleTableActions}
        confirmRef={confirmRef}
        refetchList={refetchModelList}
      />
      {isConfirm && (
        <ConfirmationModal
          label="Associated categories will also get deleted. Would you like to proceed?"
          onCancel={clearIsConfirm}
          onConfirm={confirmModelDelete}
        />
      )}

      <CommonModal
        ref={modalRefAddPlan}
        headerTitleText={"Edit Modal"}
        maxWidth="sm"
      >
        <AddModalForm
          /* istanbul ignore next */
          onPressSubmit={() => setIsConfirmCompleteTask(true)}
          organizationList={organizationList}
          disorderDataList={disorderDataList}
          receiveDisorderId={receiveDisordorId}
          receiveName={receiveName}
          prefilledOrgId={prefilledOrgId}
          prefilledDisordorId={prefilledDisordorId}
          prefilledModalName={prefilledModalName}
        />
      </CommonModal>

      {isConfirmCompleteTask && (
        <ConfirmationModal
          label="Are you sure you want to update this model?"
          onCancel={clearIsConfirmCancel}
          onConfirm={handleUpdateModal}
        />
      )}
    </>
  );
};

export default ModelListPage;
