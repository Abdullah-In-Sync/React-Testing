import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import MeasuresComponent from "../../../components/admin/measures";
import ContentHeader from "../../../components/common/ContentHeader";
import Loader from "../../../components/common/Loader";
import Layout from "../../../components/layout";
import { GET_ORGANIZATION_LIST } from "../../../graphql/query/organization";
import {
  ADMIN_UPDATE_MEASURE,
  GET_ADMIN_MEASURES_LIST,
} from "../../../graphql/Measure/graphql";

import {
  UpdateMeasureByIdResponse,
  UpdateMeasureByIdVars,
} from "../../../graphql/Measure/types";
import { useRouter } from "next/router";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { SuccessModal } from "../../../components/common/SuccessModal";
import { useSnackbar } from "notistack";
import MonitorComponent from "../../../components/admin/monitor";

const MonitorListPage: NextPage = () => {
  const router = useRouter();
  const initialPageNo = 1;
  const [tableCurentPage, setTableCurrentPage] = useState(0);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [searchInputValue, setSearchInputValue] = useState();
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const [loader, setLoader] = useState<boolean>(true);
  const { enqueueSnackbar } = useSnackbar();
  const [isConfirm, setIsConfirm] = useState<any>({
    status: false,
    storedFunction: null,
    setSubmitting: null,
    cancelStatus: false,
    confirmObject: {
      description: "",
    },
  });
  const [successModal, setSuccessModal] = useState<any>();
  const [updateMeasure] = useMutation<
    UpdateMeasureByIdResponse,
    UpdateMeasureByIdVars
  >(ADMIN_UPDATE_MEASURE);

  useEffect(() => {
    getOrgList();
    getAdminMeasuresList({
      variables: { limit: rowsLimit, pageNo: tableCurentPage + 1 },
    });
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
    getAdminMeasuresList,
    {
      loading: loadingMeasuresList,
      data: { adminMeasuresList: listData = {} } = {},
    },
  ] = useLazyQuery(GET_ADMIN_MEASURES_LIST, {
    fetchPolicy: "cache-and-network",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  const onPageChange = (event?: any, newPage?: number) => {
    /* istanbul ignore next */
    const searchText =
      searchInputValue && searchInputValue !== ""
        ? { searchText: searchInputValue }
        : {};
    /* istanbul ignore next */
    getAdminMeasuresList({
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
    getAdminMeasuresList({
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
      getAdminMeasuresList({
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
    const searchText =
      searchInputValue && searchInputValue !== ""
        ? { searchText: searchInputValue }
        : {};

    temp[e.target.name] = e.target.value !== "all" ? e.target.value : "";
    getAdminMeasuresList({
      variables: {
        limit: rowsLimit,
        pageNo: initialPageNo,
        ...searchText,
        ...temp,
      },
    });
    setTableCurrentPage(0);
    setSelectFilterOptions({ ...temp });
  };

  const handleDeleteMeasure = async (id, doneCallback) => {
    setLoader(true);
    try {
      await updateMeasure({
        variables: {
          measureId: id,
          update: {
            status: 0,
          },
        },
        onCompleted: () => {
          setSuccessModal({
            description: "Your measure has been deleted successfully.",
          });
          getAdminMeasuresList({
            variables: { limit: rowsLimit, pageNo: tableCurentPage + 1 },
          });
        },
      });
    } catch (e) {
      setLoader(false);
      enqueueSnackbar("Something is wrong", { variant: "error" });
    } finally {
      doneCallback();
      setLoader(false);
    }
  };

  const onPressSideButton = () => {
    router.push(`/admin/measures/create`);
  };

  /* istanbul ignore next */
  const handleActionButtonClick = (value) => {
    const { pressedIconButton, _id } = value;
    switch (pressedIconButton) {
      case "edit":
        return router.push(`/admin/measures/edit/${_id}`);
      case "view":
        return router.push(`/admin/measures/view/${_id}`);
      case "delete":
        return onPressDeleteMeasure(_id);
    }
  };

  const onPressDeleteMeasure = (id) => {
    setIsConfirm({
      status: true,
      confirmObject: {
        description: "Are you sure you want to delete the measure?",
      },
      storedFunction: (callback) => handleDeleteMeasure(id, callback),
    });
  };

  const clearIsConfirm = () => {
    setIsConfirm({
      status: false,
      storedFunction: null,
      setSubmitting: null,
      cancelStatus: false,
    });
  };

  const onConfirmSubmit = () => {
    isConfirm.storedFunction(() => {
      setIsConfirm({
        status: false,
        storedFunction: null,
        setSubmitting: null,
      });
    });
  };

  const handleOk = () => {
    setSuccessModal(undefined);
  };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Monitor" />
        <MonitorComponent
          measuresList={listData}
          onPageChange={onPageChange}
          onSelectPageDropdown={onSelectPageDropdown}
          tableCurentPage={tableCurentPage}
          rowsLimit={rowsLimit}
          searchInputValue={searchInputValue}
          onChangeSearchInput={onChangeSearchInput}
          organizationList={organizationList}
          selectFilterOptions={selectFilterOptions}
          onChangeFilterDropdown={onChangeFilterDropdown}
          loadingMeasuresList={loadingMeasuresList}
          pageActionButtonClick={handleActionButtonClick}
          onPressSideButton={onPressSideButton}
        />
        {isConfirm.status && (
          <ConfirmationModal
            label={isConfirm.confirmObject.description}
            onCancel={clearIsConfirm}
            onConfirm={onConfirmSubmit}
          />
        )}
        {successModal && (
          <SuccessModal
            isOpen={Boolean(successModal)}
            title="Successful"
            description={successModal.description}
            onOk={handleOk}
          />
        )}
      </Layout>
    </>
  );
};
export default MonitorListPage;
