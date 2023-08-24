import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";
import {
  ADD_ADMIN_DISORDER,
  GET_ADMIN_DISORDER_LIST,
  GET_ADMIN_THERAPY_LIST,
  UPDATE_ADMIN_DISORDER,
} from "../../../../graphql/disorder/graphql";
import {
  AdminDisorderData,
  AdminTherapyData,
} from "../../../../graphql/disorder/types";
import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
import { ConfirmElement } from "../../../common/ConfirmWrapper";
import { ConfirmInfoElement } from "../../../common/CustomModal/InfoModal";
import Loader from "../../../common/Loader";
import DisorderComponent from "./Disorder";

const DisorderPage: NextPage = () => {
  const [tableCurentPage, setTableCurrentPage] = useState(0);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const [loader, setLoader] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [addAdminDisorder] = useMutation(ADD_ADMIN_DISORDER);
  const [updateAdminDisorder] = useMutation(UPDATE_ADMIN_DISORDER);
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

  const onAddDisorderSubmit = async (formFields, callback) => {
    setLoader(true);
    try {
      await addAdminDisorder({
        variables: formFields,
        onCompleted: () => {
          /* istanbul ignore next */
          refetchDisorderData();
          /* istanbul ignore next */
          enqueueSnackbar("Disorder added successfully!", {
            variant: "success",
          });
          /* istanbul ignore next */
          callback();
          /* istanbul ignore next */
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

  const onUpdateDisorderSubmit = async (formFields, callback) => {
    setLoader(true);
    try {
      await updateAdminDisorder({
        variables: formFields,
        onCompleted: () => {
          /* istanbul ignore next */
          refetchDisorderData();
          /* istanbul ignore next */
          enqueueSnackbar("Disorder deleted successfully!", {
            variant: "success",
          });
          /* istanbul ignore next */
          callback();
          /* istanbul ignore next */
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
        headerTitleText: "Add Disorder",
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

  const handleTableActions = (v) => {
    const { pressedIconButton, _id: disorder_id } = v;
    if (pressedIconButton === "delete")
      return confirmRef.current.openConfirm({
        confirmFunction: () =>
          onUpdateDisorderSubmit(
            { disorder_id, update_disorder: { disorder_status: 0 } },
            () => confirmRef.current.close()
          ),
        description:
          "Associated Model and Categories will also get deleted. Would you like to proceed?",
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
        pageActionButtonClick={handleTableActions}
        onPressSideButton={onPressSideButton}
        therapyListData={therapyListData}
        infoModalRef={infoModalRef}
        confirmRef={confirmRef}
      />
    </>
  );
};

export default DisorderPage;
