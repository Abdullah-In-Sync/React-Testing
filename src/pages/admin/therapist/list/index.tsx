import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";

import ContentHeader from "../../../../components/common/ContentHeader";
import Loader from "../../../../components/common/Loader";
import Layout from "../../../../components/layout";

import { useRouter } from "next/router";
import TherapistListComponent from "../../../../components/admin/therapist/list/List";
import {
  GET_ADMIN_THERAPIST_LIST,
  DELETE_THERAPIST_BY_ID,
  UPDATE_THERAPIST_BY_ID,
} from "../../../../graphql/Therapist/graphql";
import { TherapistListData } from "../../../../graphql/Therapist/types";
import { useSnackbar } from "notistack";
import { ConfirmElement } from "../../../../components/common/ConfirmWrapper";
import { blockUnblockText } from "../../../../lib/constants";
// DELETE_THERAPIST_BY_ID
const TherapistListPage: NextPage = () => {
  const router = useRouter();
  const confirmRef = useRef<ConfirmElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [tableCurentPage, setTableCurrentPage] = useState(0);
  const rowsLimit = 10;
  const [searchInputValue, setSearchInputValue] = useState();
  const [paginationTokenList, setPaginationToken] = useState([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [reachEnd, setReachEnd] = useState<boolean>(false);
  const [deleteTherapist] = useMutation(DELETE_THERAPIST_BY_ID);
  const [updateTherapist] = useMutation(UPDATE_THERAPIST_BY_ID);

  const [
    getAdminTherapistList,
    {
      loading: loadingTherapistList,
      data: { getTherapistList: { therapistlist: listData = [] } = {} } = {},
      refetch: refetchTherapistList,
    },
  ] = useLazyQuery<TherapistListData>(GET_ADMIN_THERAPIST_LIST, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    getAdminTherapistList({
      variables: { name: "", paginationtoken: "", limit: rowsLimit },
      onCompleted: (data) => {
        addPaginationToken(data);
        setLoader(false);
      },
    });
  }, []);

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

  /* istanbul ignore next */
  const onPageChange = (_?: any, newPage?: number) => {
    const searchText =
      searchInputValue && searchInputValue !== ""
        ? { name: searchInputValue }
        : { name: "" };
    const tempNewPage = paginationTokenList[newPage - 1];
    if (tempNewPage)
      getAdminTherapistList({
        variables: {
          limit: rowsLimit,
          paginationtoken: tempNewPage,
          ...searchText,
        },
        onCompleted: (data) => {
          if (!reachEnd) addPaginationToken(data);

          setLoader(false);
          setTableCurrentPage(newPage);
        },
      });
    else if (newPage === 0) {
      getAdminTherapistList({
        variables: {
          limit: rowsLimit,
          paginationtoken: "",
          ...searchText,
        },
        onCompleted: () => {
          setLoader(false);
          setTableCurrentPage(0);
        },
      });
    }
  };

  const onChangeSearchInput = (e) => {
    setPaginationToken([]);
    setTableCurrentPage(0);
    setSearchInputValue(() => {
      getAdminTherapistList({
        variables: {
          limit: rowsLimit,
          name: e.target.value,
          paginationtoken: "",
        },
        onCompleted: (data) => {
          addPaginationToken(data);
        },
      });
      return e.target.value;
    });
  };

  const addPaginationToken = (data) => {
    const { getTherapistList: { pagination = undefined } = {} } = data;
    if (
      pagination != null &&
      pagination &&
      !paginationTokenList.includes(pagination)
    ) {
      setPaginationToken([...paginationTokenList, ...[pagination]]);
    } else {
      setReachEnd(true);
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
    const { user_id, pressedIconButton, therapist_id, therapist_status } =
      value;
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
          onPageChange={onPageChange}
          totalData={
            paginationTokenList.length > tableCurentPage
              ? (tableCurentPage + 2) * rowsLimit
              : (tableCurentPage + 1) * rowsLimit
          }
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
