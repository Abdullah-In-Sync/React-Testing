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

  const onUpdateDisorderSubmit = async (
    formFields,
    callback,
    successMessage
  ) => {
    setLoader(true);
    try {
      await updateAdminDisorder({
        variables: formFields,
        onCompleted: (data) => {
          if (data) {
            refetchDisorderData();
            enqueueSnackbar(
              successMessage || "Disorder deleted successfully!",
              {
                variant: "success",
              }
            );
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
      description: "Are you sure you want to add this disorder?",
      setSubmitting,
    });
  };

  const submitUpdateDisorderForm = (v, { setSubmitting, disorder_id }) => {
    confirmRef.current.openConfirm({
      confirmFunction: () =>
        onUpdateDisorderSubmit(
          { disorder_id, update_disorder: v },
          submitCallback,
          "Disorder updated successfully!"
        ),
      description: "Are you sure you want to update this disorder?",
      setSubmitting,
    });
  };

  const handleTableActions = (v) => {
    const {
      pressedIconButton,
      disorder_name,
      therapy_detail,
      _id: disorder_id,
    } = v;
    const therapy_id = therapy_detail[0]?._id;
    if (pressedIconButton === "delete")
      return confirmRef.current.openConfirm({
        confirmFunction: () =>
          onUpdateDisorderSubmit(
            { disorder_id, update_disorder: { disorder_status: 0 } },
            () => confirmRef.current.close(),
            undefined
          ),
        description:
          "Associated model and categories will also get deleted. Would you like to proceed?",
      });
    else if (pressedIconButton === "edit")
      infoModalRef.current.openConfirm({
        data: {
          value: { disorder_name, therapy_id },
          disorder_id,
          therapyListData,
          onSubmit: (v, formikProps) =>
            submitUpdateDisorderForm(v, { ...formikProps, disorder_id }),
          headerTitleText: "Edit Disorder",
        },
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
