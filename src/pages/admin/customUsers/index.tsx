/* eslint-disable @typescript-eslint/no-empty-function */
import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SafetyPlanComponent from "../../../components/admin/safetyPlan";
import ContentHeader from "../../../components/common/ContentHeader";
import Loader from "../../../components/common/Loader";
import Layout from "../../../components/layout";
import { GET_ORGANIZATION_LIST } from "../../../graphql/query/organization";
import { GET_CUSTOM_USERS_LIST } from "../../../graphql/customUsers/graphql";
import { UsersData } from "../../../graphql/customUsers/types";
import {
  CommonModal,
  ModalElement,
} from "../../../components/common/CustomModal/CommonModal";
import AddUserMain from "../../../components/therapist/therapistUser/addUser/AddUser";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import {
  ADD_THERAPIST_ADD_USER,
  GET_ROLE_LIST,
} from "../../../graphql/customerUsers/graphql";
import { therapistAddUser } from "../../../utility/types/resource_types";
import { useSnackbar } from "notistack";

const defaultFormValue = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  select_role: "",
  org_id: "",
};

const CustomUserListPage: NextPage = () => {
  const initialPageNo = 1;
  const { enqueueSnackbar } = useSnackbar();
  const [tableCurrentPage, setTableCurrentPage] = useState(0);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [searchInputValue, setSearchInputValue] = useState();
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const [loader, setLoader] = useState<boolean>(true);
  const [listData, setListData] = useState({ data: [], total: 0 });
  const modalRefAddUser = useRef<ModalElement>(null);
  const [isConfirmAddUser, setIsConfirmAddUser] = useState(false);
  const [selectOrg, setSelectOrg] = useState("");

  const [searchKey, setSearchKey] = useState("");
  const [formFields, setFormFields] = useState<therapistAddUser>({
    ...defaultFormValue,
  });

  const [addTherapistUser] = useMutation(ADD_THERAPIST_ADD_USER);

  /* istanbul ignore next */
  const handleOpenAddUserModal = useCallback(
    () => modalRefAddUser.current?.open(),
    []
  );

  /* istanbul ignore next */
  const handleCloseAddUserModal = useCallback(() => {
    modalRefAddUser.current?.close();
  }, []);

  useEffect(() => {
    getOrgList();
    getCustomUserList({
      variables: { limit: rowsLimit, pageNo: initialPageNo },
    });
  }, []);

  useEffect(() => {
    if (selectOrg !== "") {
      getRoleList({
        variables: {
          org_id: selectOrg,
        },
      });
    }
  }, [selectOrg]);

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

  const [getCustomUserList, { loading: loadingCustomerUsersList, refetch }] =
    useLazyQuery<UsersData>(GET_CUSTOM_USERS_LIST, {
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        /* istanbul ignore next */
        if (data.getCustomUsersList?.data) {
          /* istanbul ignore next */
          const newData = data.getCustomUsersList?.data.map((a) => {
            return {
              _id: a._id,
              first_name: a.first_name,
              last_name: a.last_name,
              role: a.role_detail?.name,
              organisation: a.role_detail?.organization_name,
            };
          });
          /* istanbul ignore next */
          setListData({
            data: newData,
            total: data.getCustomUsersList.total,
          });
        }
        /* istanbul ignore next */
        setLoader(false);
      },
    });

  const [getRoleList, { data: roleListData }] = useLazyQuery(GET_ROLE_LIST, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  const handleAddUser = async () => {
    try {
      await addTherapistUser({
        variables: {
          first_name: formFields.first_name,
          last_name: formFields.last_name,
          email: formFields.email,
          role_id: formFields.select_role,
          org_id: formFields.org_id,
          phone_no: formFields.phone,
        },
        onCompleted: (data) => {
          /* istanbul ignore next */
          if (data?.addCustomUser?.result) {
            enqueueSnackbar("User added Successfully!", { variant: "success" });
          } else {
            enqueueSnackbar(
              data?.addCustomUser?.message || "There is something wrong.",
              { variant: "error" }
            );
          }
          setIsConfirmAddUser(false);
          refetch();
        },
      });
      /* istanbul ignore next */
      handleCloseAddUserModal();
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("There is something wrong.", { variant: "error" });
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
    getCustomUserList({
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
    getCustomUserList({
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
    getCustomUserList({
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
    getCustomUserList({
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

  /* istanbul ignore next */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleActionButtonClick = (value) => {};

  const clearIsConfirmCancel = () => {
    setIsConfirmAddUser(false);
  };

  const setOrg = (id: string) => {
    setSelectOrg(id);
  };

  return (
    <Layout boxStyle={{ height: "100vh" }}>
      <Loader visible={loader} />
      <ContentHeader title="User List" />
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
        loadingSafetyPlanList={loadingCustomerUsersList}
        pageActionButtonClick={handleActionButtonClick}
        platForm={"userList"}
        onPressAdd={handleOpenAddUserModal}
      />
      <CommonModal
        ref={modalRefAddUser}
        headerTitleText={"Add User"}
        maxWidth="sm"
      >
        <AddUserMain
          roleListData={roleListData}
          organizationList={organizationList}
          setOrg={setOrg}
          submitForm={(data) => {
            setFormFields(data);
            setIsConfirmAddUser(true);
          }}
        />
      </CommonModal>
      {isConfirmAddUser && (
        <ConfirmationModal
          label="Are you sure you want to add this user?"
          onCancel={clearIsConfirmCancel}
          onConfirm={() => {
            /* istanbul ignore next */
            handleAddUser();
          }}
        />
      )}
    </Layout>
  );
};
export default CustomUserListPage;
