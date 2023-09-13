import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
import { ConfirmElement } from "../../../common/ConfirmWrapper";
import Loader from "../../../common/Loader";
import ModelComponent from "./modalComponent";
import { GET_ADMIN_MODEL_LIST } from "../../../../graphql/category/graphql";
import { ADMIN_UPDATE_MODEL } from "../../../../graphql/model/graphql";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { useSnackbar } from "notistack";

const ModelListPage: NextPage = () => {
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
    const temp = selectFilterOptions;
    /* istanbul ignore next */
    temp[e.target.name] = e.target.value !== "all" ? e.target.value : "";
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
  const handleTableActions = (v) => {
    /* istanbul ignore next */
    const { pressedIconButton, _id } = v;
    /* istanbul ignore next */
    if (pressedIconButton == "delete") {
      /* istanbul ignore next */
      setSelectedModel(_id);
      /* istanbul ignore next */
      setIsConfirm(true);
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
    </>
  );
};

export default ModelListPage;
