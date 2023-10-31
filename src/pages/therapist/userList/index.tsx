import React, { useCallback, useEffect, useRef, useState } from "react";
import Layout from "../../../components/layout";
import ContentHeader from "../../../components/common/ContentHeader";
import {
  CommonModal,
  ModalElement,
} from "../../../components/common/CustomModal/CommonModal";
import AddUserMain from "../../../components/therapist/therapistUser/addUser/AddUser";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { therapistAddUser } from "../../../utility/types/resource_types";
import TherapistUserListComponent from "../../../components/therapist/therapistUser/list";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  ADD_THERAPIST_ADD_USER,
  GET_ROLE_LIST,
  GET_THERAPIST_USER_LIST,
  GET_USER_DATA_BY_ID,
  THERAPIST_EDIT_USER,
} from "../../../graphql/customerUsers/graphql";
import { useSnackbar } from "notistack";
import { useAppContext } from "../../../contexts/AuthContext";
import Loader from "../../../components/common/Loader";

const defaultFormValue = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  select_role: "",
};

export default function TherapistUserMain() {
  const { user } = useAppContext();
  /* istanbul ignore next */
  const orgId = user?.therapist_data?.org_id;
  const modalRefAddUser = useRef<ModalElement>(null);
  const modalRefEditUser = useRef<ModalElement>(null);

  const { enqueueSnackbar } = useSnackbar();
  const [rowsLimit, setRowsLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState<boolean>(true);
  const [selectRoleForFilter, setSelectRoleForFilter] = useState("");
  const [editAndDeletId, setEditAndDeletId] = useState("");
  const [isConfirmEditUser, setIsConfirmEditUser] = useState(false);
  const [tableCurentPage, setTableCurrentPage] = useState(0);
  const [isConfirmAddUser, setIsConfirmAddUser] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState();
  const [formFields, setFormFields] = useState<therapistAddUser>({
    ...defaultFormValue,
  });

  const [addTherapistUser] = useMutation(ADD_THERAPIST_ADD_USER);
  const [editTherapistUser] = useMutation(THERAPIST_EDIT_USER);

  /* istanbul ignore next */
  const handleOpenAddUserModal = useCallback(
    () => modalRefAddUser.current?.open(),
    []
  );

  /* istanbul ignore next */
  const handleCloseAddUserModal = useCallback(() => {
    modalRefAddUser.current?.close();
  }, []);

  /* istanbul ignore next */
  const handleOpenEditUserModal = useCallback(
    () => modalRefEditUser.current?.open(),
    []
  );

  /* istanbul ignore next */
  const handleCloseEditUserModal = useCallback(() => {
    modalRefEditUser.current?.close();
  }, []);

  /* istanbul ignore next */
  const clearIsConfirmCancel = () => {
    setIsConfirmAddUser(false);
    setIsConfirmEditUser(false);
  };

  useEffect(() => {
    getSafetyPlanList({
      variables: {
        org_id: orgId,
        limit: rowsLimit,
        page_no: page,
        name: searchInputValue,
        role_id: selectRoleForFilter,
      },
    });
  }, [rowsLimit, selectRoleForFilter, searchInputValue, page, orgId]);

  useEffect(() => {
    getRoleList({
      variables: {
        org_id: orgId,
      },
    });
  }, [orgId]);

  const [
    getSafetyPlanList,
    { loading: loadingSafetyPlanList, data: listData, refetch },
  ] = useLazyQuery(GET_THERAPIST_USER_LIST, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  const transformedListData = listData?.getCustomUsersList?.data.map(
    (role) => ({
      ...role,
      first_name: `${role.first_name} `,
      last_name: `${role.last_name} `,
      role_name: `${role.role_detail.name}`,
    })
  );

  const [getRoleList, { data: roleListData }] = useLazyQuery(GET_ROLE_LIST, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  useEffect(() => {
    getCustomUserById({
      variables: {
        custom_user_id: editAndDeletId,
      },
    });
  }, [editAndDeletId]);

  const [getCustomUserById, { data: prefilledData }] = useLazyQuery(
    GET_USER_DATA_BY_ID,
    {
      fetchPolicy: "network-only",
      onCompleted: () => {
        /* istanbul ignore next */
        setLoader(false);
      },
    }
  );

  /* istanbul ignore next */
  const onChangeSearchInput = (e) => {
    setSearchInputValue(e.target.value);
    setTableCurrentPage(0);
    setPage(1);
  };

  /* istanbul ignore next */
  const onSelectPageDropdown = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsLimit(+event.target.value);
    setTableCurrentPage(0);
  };

  /* istanbul ignore next */
  const onPageChange = (event?: any, newPage?: number) => {
    setPage(newPage + 1);
    setTableCurrentPage(newPage);
  };

  const handleAddUser = async () => {
    try {
      await addTherapistUser({
        variables: {
          first_name: formFields.first_name,
          last_name: formFields.last_name,
          email: formFields.email,
          role_id: formFields.select_role,
          org_id: orgId,
          phone_no: formFields.phone,
        },
        onCompleted: (data) => {
          const { result, message } = data.addCustomUser;
          /* istanbul ignore next */
          const variant = result ? "success" : "error";
          enqueueSnackbar(message, { variant });
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

  const handleEditUser = async () => {
    try {
      await editTherapistUser({
        variables: {
          custom_user_id: editAndDeletId,

          update: {
            first_name: formFields.first_name,
            last_name: formFields.last_name,
          },
        },
        onCompleted: () => {
          /* istanbul ignore next */
          enqueueSnackbar("User edit Successfully!", { variant: "success" });
          setIsConfirmEditUser(false);
          refetch();
        },
      });
      /* istanbul ignore next */
      handleCloseEditUserModal();
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("There is something wrong.", { variant: "error" });
    }
  };

  const roleFilter = (data) => {
    setSelectRoleForFilter(data);
  };

  /* istanbul ignore next */
  const handleActionButtonClick = (value) => {
    const { _id, pressedIconButton } = value;

    if (pressedIconButton === "edit") {
      setEditAndDeletId(_id);
      handleOpenEditUserModal();
    }
  };

  return (
    <Layout>
      <ContentHeader title="User List" />
      <Loader visible={loader} />

      <TherapistUserListComponent
        userListData={transformedListData}
        roleListData={roleListData}
        searchInputValue={searchInputValue}
        onChangeSearchInput={onChangeSearchInput}
        onPressAddPlan={handleOpenAddUserModal}
        onPageChange={onPageChange}
        onSelectPageDropdown={onSelectPageDropdown}
        tableCurentPage={tableCurentPage}
        rowsLimit={rowsLimit}
        sendSelectedRoleId={roleFilter}
        loadingMonitorList={loadingSafetyPlanList}
        pageActionButtonClick={handleActionButtonClick}
      />

      <CommonModal
        ref={modalRefAddUser}
        headerTitleText={"Add User"}
        maxWidth="sm"
      >
        <AddUserMain
          roleListData={roleListData}
          submitForm={(data) => {
            setFormFields(data);
            setIsConfirmAddUser(true);
          }}
        />
      </CommonModal>

      <CommonModal
        ref={modalRefEditUser}
        headerTitleText={"Edit User"}
        maxWidth="sm"
      >
        <AddUserMain
          roleListData={roleListData}
          editPrefilledData={
            /* istanbul ignore next */
            prefilledData?.getCustomUserById
          }
          submitForm={(data) => {
            setFormFields(data);
            setIsConfirmEditUser(true);
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

      {isConfirmEditUser && (
        <ConfirmationModal
          label="Are you sure you want to edit this user?"
          onCancel={clearIsConfirmCancel}
          onConfirm={() => {
            /* istanbul ignore next */
            handleEditUser();
          }}
        />
      )}
    </Layout>
  );
}
