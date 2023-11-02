import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import SafetyPlanComponent from "../../../components/admin/safetyPlan";
import ContentHeader from "../../../components/common/ContentHeader";
import Loader from "../../../components/common/Loader";
import Layout from "../../../components/layout";
import { GET_ORGANIZATION_LIST } from "../../../graphql/query/organization";
import {
  GET_USER_ROLE_LIST,
  ADMIN_UPDATE_USER_ROLE,
} from "../../../graphql/userRole/graphql";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import ConfirmationModal from "../../../components/common/ConfirmationModal";

const AccessControlPage: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const initialPageNo = 1;
  const [tableCurrentPage, setTableCurrentPage] = useState(0);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [searchInputValue, setSearchInputValue] = useState();
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const [loader, setLoader] = useState<boolean>(true);
  const [listData, setListData] = useState({ data: [], total: 0 });
  const [isConfirm, setIsConfirm] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [isConfirmBlock, setIsConfirmBlock] = useState(false);
  const [toggleStatus, setToggleStatus] = useState();

  const [searchKey, setSearchKey] = useState("");
  const [updateByRoleId] = useMutation(ADMIN_UPDATE_USER_ROLE);

  useEffect(() => {
    getOrgList();
    getUserRoleList({
      variables: { limit: rowsLimit, pageNo: initialPageNo },
    });
  }, []);

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

  const [getUserRoleList, { loading: loadingUserRoleList, refetch }] =
    useLazyQuery(GET_USER_ROLE_LIST, {
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        /* istanbul ignore next */
        if (data.getUserRoleList?.rolelist) {
          /* istanbul ignore next */
          const newData = data.getUserRoleList.rolelist.map((a) => {
            return {
              _id: a._id,
              userRole: a.name,
              organization: a.organization_name,
              accessibility: a.accessibility,
              status: a.status,
            };
          });
          /* istanbul ignore next */
          setListData({
            data: newData,
            total: data.getUserRoleList.totalcount,
          });
        }
        /* istanbul ignore next */
        setLoader(false);
      },
    });

  const onUpdateUserRoleSubmit = async () => {
    setLoader(true);
    try {
      await updateByRoleId({
        variables: {
          role_id: selectedRoleId,
          updateRole: {
            status: 0,
          },
        },
        onCompleted: (data) => {
          setIsConfirm(false);
          refetch();
          enqueueSnackbar(data.message || "User Role deleted successfully!", {
            variant: "success",
          });
          setLoader(false);
        },
      });
    } catch (e) {
      setIsConfirm(false);
      setLoader(false);
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
    }
  };

  /* istanbul ignore next */
  const onPageChange = (event?: any, newPage?: number) => {
    /* istanbul ignore next */
    const searchText =
      searchInputValue && searchInputValue !== ""
        ? { searchText: searchInputValue }
        : {};
    /* istanbul ignore next */
    getUserRoleList({
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
    getUserRoleList({
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
  useEffect(() => {
    /* istanbul ignore next */
    getUserRoleList({
      /* istanbul ignore next */
      variables: {
        limit: rowsLimit,
        searchText: searchInputValue,
        pageNo: initialPageNo,
        ...selectFilterOptions,
      },
    });
  }, [searchInputValue]);

  /* istanbul ignore next */
  const onChangeSearchInput = (e) => {
    /* istanbul ignore next */
    setSearchInputValue(e.target.value);
    setSearchKey(e.target.value);
    setTableCurrentPage(0);
  };

  /* istanbul ignore next */
  const onChangeFilterDropdown = (e) => {
    const temp = selectFilterOptions;
    /* istanbul ignore next */
    const searchText =
      searchKey && searchKey !== "" ? { searchText: searchKey } : {};
    /* istanbul ignore next */
    temp[e.target.name] = e.target.value !== "all" ? e.target.value : "";
    /* istanbul ignore next */
    getUserRoleList({
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

  const onBlockUnblockUser = async () => {
    setLoader(true);
    try {
      await updateByRoleId({
        variables: {
          role_id: selectedRoleId,
          updateRole: {
            status: toggleStatus,
          },
        },
        onCompleted: (data) => {
          const { result, message } = data.updateAdminRoleById;
          /* istanbul ignore next */
          const variant = result ? "success" : "error";
          enqueueSnackbar(message, { variant });
          setIsConfirmBlock(false);
          refetch();
          setLoader(false);
        },
      });
    } catch (e) {
      setIsConfirmBlock(false);
      setLoader(false);
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
    }
  };

  /* istanbul ignore next */
  const handleActionButtonClick = (value) => {
    /* istanbul ignore next */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { pressedIconButton, status, _id } = value;
    if (pressedIconButton == "delete") {
      setIsConfirm(true);
      setSelectedRoleId(_id);
    }
    if (pressedIconButton == "block") {
      const toggleObj = {
        "1": 0,
        "0": 1,
      };
      setSelectedRoleId(_id);
      setToggleStatus(toggleObj[status]);
      if (status == 1) {
        setIsConfirmBlock(true);
      } else {
        onBlockUnblockUser();
      }
    }
    if (pressedIconButton === "edit")
      router.push(`/admin/userRole/edit/${_id}`);
    else if (pressedIconButton === "view")
      router.push(`/admin/userRole/view/${_id}`);
  };

  return (
    <>
      <Layout boxStyle={{ height: "100vh" }}>
        <Loader visible={loader} />
        <ContentHeader title="Access Control Listing" />
        <SafetyPlanComponent
          safetyPlanList={listData}
          onPageChange={onPageChange}
          onSelectPageDropdown={onSelectPageDropdown}
          tableCurentPage={tableCurrentPage}
          rowsLimit={rowsLimit}
          searchInputValue={searchInputValue}
          onChangeSearchInput={onChangeSearchInput}
          organizationList={organizationList}
          selectFilterOptions={selectFilterOptions}
          onChangeFilterDropdown={onChangeFilterDropdown}
          loadingSafetyPlanList={loadingUserRoleList}
          pageActionButtonClick={handleActionButtonClick}
          platForm={"userRole"}
        />
      </Layout>
      {isConfirm && (
        <ConfirmationModal
          label="Are you sure you want to delete this user role ?"
          description="(Note: no HCP will be able to access MyHelp in the future.)"
          onCancel={() => setIsConfirm(false)}
          onConfirm={onUpdateUserRoleSubmit}
          isWarning={true}
        />
      )}
      {isConfirmBlock && (
        <ConfirmationModal
          label="Are you sure you want to block the user role?"
          description="Note: A blocked user role will not be able to log in."
          onCancel={() => setIsConfirmBlock(false)}
          onConfirm={onBlockUnblockUser}
          isWarning={true}
        />
      )}
    </>
  );
};
export default AccessControlPage;
