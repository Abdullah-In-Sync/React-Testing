import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import {
  ADD_ADMIN_DISORDER,
  GET_ADMIN_DISORDER_LIST,
  GET_ADMIN_THERAPY_LIST,
} from "../../../../graphql/disorder/graphql";
import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
import Loader from "../../../common/Loader";
import DisorderComponent from "./Disorder";
import {
  AdminDisorderData,
  AdminTherapyData,
} from "../../../../graphql/disorder/types";
import { ConfirmInfoElement } from "../../../common/CustomModal/InfoModal";
import { ConfirmElement } from "../../../common/ConfirmWrapper";
import { useSnackbar } from "notistack";

const DisorderPage: NextPage = () => {
  const [tableCurentPage, setTableCurrentPage] = useState(0);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const [loader, setLoader] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [addAdminDisorder] = useMutation(ADD_ADMIN_DISORDER);
  const infoModalRef = useRef<ConfirmInfoElement>(null);
  const confirmRef = useRef<ConfirmElement>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getOrgList();
    getAdminTherapyList();
  }, []);

  useEffect(() => {
    getAdminDisorders({
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
    { data: { getOrganizationData: organizationList = [] } = {} },
  ] = useLazyQuery(GET_ORGANIZATION_LIST, {
    fetchPolicy: "cache-and-network",
    onCompleted: () => {
      setLoader(false);
    },
  });

  const [
    getAdminDisorders,
    {
      loading: loadingDisorderList,
      data: { getAdminDisorderList: listData = undefined } = {},
      refetch: refetchDisorderData,
    },
  ] = useLazyQuery<AdminDisorderData>(GET_ADMIN_DISORDER_LIST, {
    fetchPolicy: "cache-and-network",
    onCompleted: () => {
      setLoader(false);
    },
  });

  const [
    getAdminTherapyList,
    { data: { adminTherapyList: { data: therapyListData = [] } = {} } = {} },
  ] = useLazyQuery<AdminTherapyData>(GET_ADMIN_THERAPY_LIST, {
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

  const onSelectPageDropdown = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsLimit(+event.target.value);
    setTableCurrentPage(0);
  };

  const onChangeFilterDropdown = async (e) => {
    const temp = selectFilterOptions;
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

  const onAddDisorderSubmit = async (formFields, callback) => {
    setLoader(true);
    try {
      await addAdminDisorder({
        variables: formFields,
        onCompleted: (data) => {
          if (data) {
            refetchDisorderData();
            enqueueSnackbar("Disorder added successfully!", {
              variant: "success",
            });
            callback();
          }
          setLoader(false);
        },
      });
    } catch (e) {
      setLoader(false);
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
      callback();
    }
  };

  /* istanbul ignore next */
  const onPressSideButton = () => {
    infoModalRef.current.openConfirm({
      data: {
        therapyListData,
        onSubmit: submitAddDisorderForm,
        headerTitleText: "Edit Category",
      },
    });
  };

  const submitCallback = () => {
    confirmRef.current.close();
    infoModalRef.current.close();
  };

  const submitAddDisorderForm = (v, { setSubmitting }) => {
    confirmRef.current.openConfirm({
      confirmFunction: () => onAddDisorderSubmit(v, submitCallback),
      description: "Are you sure you want to add this Disorder?",
      setSubmitting,
    });
  };

  return (
    <>
      <Loader visible={loader} />
      <DisorderComponent
        disorderList={listData}
        onPageChange={onPageChange}
        onSelectPageDropdown={onSelectPageDropdown}
        tableCurentPage={tableCurentPage}
        rowsLimit={rowsLimit}
        searchInputValue={searchInputValue}
        onChangeSearchInput={onChangeSearchInput}
        organizationList={organizationList}
        selectFilterOptions={selectFilterOptions}
        onChangeFilterDropdown={onChangeFilterDropdown}
        loadingDisorderList={loadingDisorderList}
        pageActionButtonClick={null}
        onPressSideButton={onPressSideButton}
        therapyListData={therapyListData}
        infoModalRef={infoModalRef}
        confirmRef={confirmRef}
      />
    </>
  );
};

export default DisorderPage;
