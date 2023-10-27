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
  const { enqueueSnackbar } = useSnackbar();
  const [rowsLimit, setRowsLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState<boolean>(true);
  const [selectRoleForFilter, setSelectRoleForFilter] = useState("");
  const [tableCurentPage, setTableCurrentPage] = useState(0);
  const [isConfirmAddUser, setIsConfirmAddUser] = useState(false);

  const [searchInputValue, setSearchInputValue] = useState();
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

  /* istanbul ignore next */
  const clearIsConfirmCancel = () => {
    setIsConfirmAddUser(false);
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
        onCompleted: () => {
          /* istanbul ignore next */
          enqueueSnackbar("User added Successfully!", { variant: "success" });
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

  const roleFilter = (data) => {
    setSelectRoleForFilter(data);
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
        // pageActionButtonClick={handleActionButtonClick}
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

      {isConfirmAddUser && (
        <ConfirmationModal
          label="Are you sure you want to add this formulation?"
          onCancel={clearIsConfirmCancel}
          onConfirm={() => {
            /* istanbul ignore next */
            handleAddUser();
          }}
        />
      )}
    </Layout>
  );
}
