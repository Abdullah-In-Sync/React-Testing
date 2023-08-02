import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";

import ContentHeader from "../../../../components/common/ContentHeader";
import Loader from "../../../../components/common/Loader";
import Layout from "../../../../components/layout";

import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import TherapistListComponent from "../../../../components/admin/therapist/list/List";
import { ConfirmElement } from "../../../../components/common/ConfirmWrapper";
import {
  DELETE_THERAPIST_BY_ID,
  GET_ADMIN_THERAPIST_LIST,
  UPDATE_THERAPIST_BY_ID,
} from "../../../../graphql/Therapist/graphql";
import { blockUnblockText } from "../../../../lib/constants";
import { TherapistListData } from "../../../../graphql/Therapist/types";

const TherapistListPage: NextPage = () => {
  const router = useRouter();
  const confirmRef = useRef<ConfirmElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [tableCurentPage, setTableCurrentPage] = useState(0);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [loader, setLoader] = useState<boolean>(true);
  const [deleteTherapist] = useMutation(DELETE_THERAPIST_BY_ID);
  const [updateTherapist] = useMutation(UPDATE_THERAPIST_BY_ID);

  const [
    getAdminTherapistList,
    {
      loading: loadingTherapistList,
      data: {
        getTherapistList: { therapistlist: listData = [], total = "" } = {},
      } = {},
      refetch: refetchTherapistList,
    },
  ] = useLazyQuery<TherapistListData>(GET_ADMIN_THERAPIST_LIST, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    getAdminTherapistList({
      variables: {
        searchText: "",
        pageNo: tableCurentPage + 1,
        limit: rowsLimit,
      },
      onCompleted: () => {
        setLoader(false);
      },
    });
  }, []);

  /* istanbul ignore next */
  const onPageChange = (event?: any, newPage?: number) => {
    setTableCurrentPage(newPage);
    getAdminTherapistList({
      variables: {
        searchText: searchInputValue,
        pageNo: newPage + 1,
        limit: rowsLimit,
      },
      onCompleted: () => {
        setLoader(false);
      },
    });
  };

  const onChangeSearchInput = (e) => {
    setSearchInputValue(e.target.value);
    getAdminTherapistList({
      variables: { searchText: e.target.value, pageNo: 1, limit: rowsLimit },
      onCompleted: () => {
        setLoader(false);
      },
    });
    setTableCurrentPage(0);
  };

  /* istanbul ignore next */
  const onSelectPageDropdown = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsLimit(+event.target.value);
    getAdminTherapistList({
      variables: {
        searchText: searchInputValue,
        pageNo: 1,
        limit: event.target.value,
      },
      onCompleted: () => {
        setLoader(false);
      },
    });
    setTableCurrentPage(0);
  };

  const deleteApi = async (formFields, doneCallback) => {
    setLoader(true);
    try {
      await deleteTherapist({
        variables: formFields,
        fetchPolicy: "network-only",
        onCompleted: (data) => {
          const { deleteTherapist: { result = undefined } = {} } = data;
          if (result) {
            refetchTherapistList();
            enqueueSnackbar("Therapist deleted successfully!", {
              variant: "success",
            });
          }
        },
      });
    } catch (e) {
      setLoader(false);
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
    } finally {
      setLoader(false);
      doneCallback();
    }
  };

  const blockUnblockApi = async (formFields) => {
    setLoader(true);
    const {
      update: { therapist_status },
    } = formFields;
    try {
      await updateTherapist({
        variables: formFields,
        fetchPolicy: "network-only",
        onCompleted: (data) => {
          const { updateTherapistById: { _id = undefined } = {} } = data;
          if (_id) {
            refetchTherapistList();
            enqueueSnackbar(
              `Therapist ${blockUnblockText[therapist_status]} successfully!`,
              {
                variant: "success",
              }
            );
          }
        },
      });
    } catch (e) {
      setLoader(false);
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
    } finally {
      setLoader(false);
    }
  };

  const onPressSideButton = () => {
    router.push(`/admin/therapist/add`);
  };

  const handleDeletePress = (formFields) => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => deleteApi(formFields, callback),
      description: "Are you sure you want to delete this Therapist?",
    });
  };

  /* istanbul ignore next */
  const handleActionButtonClick = (value) => {
    const {
      user_id,
      pressedIconButton,
      _id: therapist_id,
      therapist_status,
    } = value;
    switch (pressedIconButton) {
      case "edit":
        return router.push(`/admin/therapist/edit/${user_id}`);
      case "view":
        return router.push(`/admin/therapist/view/${user_id}`);
      case "delete":
        return handleDeletePress({ therapist_id });
      case "block":
        return blockUnblockApi({
          user_id,
          update: {
            therapist_status: therapist_status ? 0 : 1,
          },
        });
    }
  };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Therapist" />
        <TherapistListComponent
          listData={listData}
          onSelectPageDropdown={onSelectPageDropdown}
          onPageChange={onPageChange}
          totalData={total}
          tableCurentPage={tableCurentPage}
          rowsLimit={rowsLimit}
          searchInputValue={searchInputValue}
          onChangeSearchInput={onChangeSearchInput}
          loadingTherapistList={loadingTherapistList}
          pageActionButtonClick={handleActionButtonClick}
          onPressSideButton={onPressSideButton}
          confirmRef={confirmRef}
        />
      </Layout>
    </>
  );
};

export default TherapistListPage;
