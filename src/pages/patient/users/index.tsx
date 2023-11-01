import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";

import { ConfirmElement } from "../../../components/common/ConfirmWrapper";
import ContentHeader from "../../../components/common/ContentHeader";
import Loader from "../../../components/common/Loader";
import PatientUsersComponent from "../../../components/patient/users/list/UsersList";
import {
  ADD_CUSTOM_USER,
  GET_CUSTOM_USER_BY_ID,
  GET_ROLES_ACCESSBILITY,
  PATIENT_CUSTOM_USER_LIST,
  UPDATE_CUSTOM_USER,
} from "../../../graphql/userRole/graphql";
import Layout from "../../../components/layout";
import {
  CustomUsersListData,
  RolesListData,
} from "../../../graphql/userRole/types";
import { ConfirmInfoElement } from "../../../components/common/CustomModal/InfoModal";
import { useSnackbar } from "notistack";
import { useAppContext } from "../../../contexts/AuthContext";

const PatientUsersListPage: NextPage = () => {
  const initialPageNo = 1;
  const [tableCurentPage, setTableCurrentPage] = useState(0);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const infoModalRef = useRef<ConfirmInfoElement>(null);
  const [addCustomUser, { loading: loadingAddCustomUser }] =
    useMutation(ADD_CUSTOM_USER);
  const [updateCustomUser] = useMutation(UPDATE_CUSTOM_USER);
  const [getCustomUserById] = useLazyQuery(GET_CUSTOM_USER_BY_ID, {
    fetchPolicy: "cache-and-network",
  });
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAppContext();
  const org_id = user?.organization_settings?._id;

  const [page, setPage] = useState(1);
  const confirmRef = useRef<ConfirmElement>(null);

  const {
    data: { getRolesbyAccessbility: roles = undefined } = {},
    loading: loadingRolesList,
  } = useQuery<RolesListData>(GET_ROLES_ACCESSBILITY);
  const [
    getCustomUsersList,
    {
      loading: loadingCustomUsersList,
      data: { getCustomUsersList: usersListData = undefined } = {},
      refetch: refetchCustomUserList,
    },
  ] = useLazyQuery<CustomUsersListData>(PATIENT_CUSTOM_USER_LIST, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    getCustomUsersList({
      variables: {
        limit: rowsLimit,
        pageNo: page,
        name: searchInputValue,
        ...selectFilterOptions,
      },
    });
  }, []);

  const onPageChange = (_, newPage?: number) => {
    setPage(newPage + 1);
    setTableCurrentPage(newPage);
  };

  const onSelectPageDropdown = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsLimit(+event.target.value);
    setTableCurrentPage(0);
  };

  const onChangeSearchInput = (e) => {
    setSearchInputValue(() => {
      getCustomUsersList({
        variables: {
          limit: rowsLimit,
          name: e.target.value,
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
    const name =
      searchInputValue && searchInputValue !== ""
        ? { name: searchInputValue }
        : {};

    temp[e.target.name] = e.target.value !== "all" ? e.target.value : "";

    getCustomUsersList({
      variables: {
        limit: rowsLimit,
        pageNo: initialPageNo,
        ...name,
        ...temp,
      },
    });
    setTableCurrentPage(0);
    setSelectFilterOptions({ ...temp });
  };

  const onAddUserSubmit = async (formFields, callback) => {
    try {
      await addCustomUser({
        variables: { ...formFields, ...{ org_id } },
        onCompleted: (data) => {
          const {
            addCustomUser: { message, result },
          } = data;
          if (result) {
            enqueueSnackbar("User added successfully!", {
              variant: "success",
            });
            callback();
          } else if (message) {
            enqueueSnackbar(message, {
              variant: "error",
            });
          }
        },
      });
    } catch (e) {
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
    }
  };

  const onUpdateUserSubmit = async (formFields, callback) => {
    try {
      await updateCustomUser({
        variables: formFields,
        onCompleted: (data) => {
          const {
            updateCustomUserById: { message, result },
          } = data;
          if (result) {
            enqueueSnackbar(message, {
              variant: "success",
            });
            callback();
          } else
            enqueueSnackbar(message, {
              variant: "error",
            });
        },
      });
    } catch (e) {
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
    }
  };

  const onPressSideButton = () => {
    infoModalRef.current.openConfirm({
      data: {
        onSubmit: submitAddUserForm,
        headerTitleText: "Add User",
        roles,
      },
    });
  };

  const submitCallback = () => {
    confirmRef.current.close();
    infoModalRef.current.close();
    refetchCustomUserList();
  };

  const submitAddUserForm = (v, { setSubmitting }) => {
    confirmRef.current.openConfirm({
      confirmFunction: () => onAddUserSubmit(v, submitCallback),
      description: "Are you sure you want to add the user?",
      setSubmitting,
    });
  };

  const submitUpdateUserForm = (v, { setSubmitting }) => {
    confirmRef.current.openConfirm({
      confirmFunction: () =>
        onUpdateUserSubmit(
          {
            custom_user_id: v.custom_user_id,
            update: {
              first_name: v.first_name,
              last_name: v.last_name,
            },
          },
          submitCallback
        ),
      description: "Are you sure you want to update the user?",
      setSubmitting,
    });
  };

  const onClickActionButton = (v) => {
    const {
      first_name,
      last_name,
      role_id,
      _id: custom_user_id,
      pressedIconButton,
    } = v;
    if (pressedIconButton === "edit") {
      let t = false;
      getCustomUserById({
        variables: {
          custom_user_id,
        },
        onCompleted: (data) => {
          const { getCustomUserById: { email = "", phone_no = "" } = {} } =
            data;
          if (!t)
            infoModalRef.current.openConfirm({
              data: {
                onSubmit: (v, formikProps) =>
                  submitUpdateUserForm(
                    { ...v, ...{ custom_user_id } },
                    formikProps
                  ),
                headerTitleText: "Edit User",
                roles,
                value: {
                  first_name,
                  last_name,
                  email,
                  phone_no,
                  role_id,
                },
                isEdit: true,
                buttonText: "Update",
              },
            });
          t = true;
        },
      });
    } else if (pressedIconButton === "delete") {
      confirmRef.current.openConfirm({
        confirmFunction: () =>
          onUpdateUserSubmit(
            {
              custom_user_id,
              update: {
                status: 0,
              },
            },
            submitCallback
          ),
        description: "Are you sure you want to delete the user?",
      });
    }
  };

  return (
    <Layout>
      <Loader
        visible={
          loadingCustomUsersList || loadingRolesList || loadingAddCustomUser
        }
      />
      <ContentHeader title="User List" />
      {!loadingRolesList && roles && (
        <PatientUsersComponent
          usersListData={usersListData}
          onPageChange={onPageChange}
          onSelectPageDropdown={onSelectPageDropdown}
          tableCurentPage={tableCurentPage}
          rowsLimit={rowsLimit}
          searchInputValue={searchInputValue}
          onChangeSearchInput={onChangeSearchInput}
          selectFilterOptions={selectFilterOptions}
          onChangeFilterDropdown={onChangeFilterDropdown}
          pageActionButtonClick={onClickActionButton}
          onPressSideButton={onPressSideButton}
          confirmRef={confirmRef}
          roles={roles}
          loadingCustomUsersList={loadingCustomUsersList}
          infoModalRef={infoModalRef}
        />
      )}
    </Layout>
  );
};

export default PatientUsersListPage;
