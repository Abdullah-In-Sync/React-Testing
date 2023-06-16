import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ContentHeader from "../../../components/common/ContentHeader";
import Loader from "../../../components/common/Loader";
import Layout from "../../../components/layout";
import { GET_ORGANIZATION_LIST } from "../../../graphql/query/organization";
import AssessmentComponent from "../../../components/admin/assessement";
import {
  ADMIN_CREATE_ASSESSMENT,
  ADMIN_DELETE_AND_UPDATE_ASSESSMENT,
  GET_ADMIN_ASSESSMENT_DATA_BY_ID,
  GET_ADMIN_ASSESSMENT_LIST,
} from "../../../graphql/assessment/graphql";
import {
  CommonModal,
  ModalElement,
} from "../../../components/common/CustomModal/CommonModal";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import CreateAssessmentForm from "../../../components/admin/assessement/createAssessment/CreateAssessmentForm";
import { useSnackbar } from "notistack";
import InfoModal, {
  ConfirmInfoElement,
} from "../../../components/common/CustomModal/InfoModal";
import InfoMessageView from "../../../components/common/InfoMessageView";
import { useRouter } from "next/router";
import EditAssessmentForm from "../../../components/admin/assessement/editAssessment/EditAssessmentForm";

const AssessmentListPage: NextPage = () => {
  const router = useRouter();
  const modalRefAddPlan = useRef<ModalElement>(null);
  const modalRefEditAssessment = useRef<ModalElement>(null);
  const { enqueueSnackbar } = useSnackbar();

  const [tableCurentPage, setTableCurrentPage] = useState(0);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const [loader, setLoader] = useState<boolean>(true);
  const [isConfirmShareTask, setIsConfirmShareTask] = useState(false);
  const [isConfirmEditAssessment, setIsConfirmEditAssessment] = useState(false);
  const [isConfirmDeleteAssessment, setIsConfirmDeleteAssessment] =
    useState(false);
  const [orgIds, setOrgIds] = useState();
  const infoModalRef = useRef<ConfirmInfoElement>(null);
  const [name, setName] = useState("");
  const [editName, setEditName] = useState("");
  const [page, setPage] = useState(1);
  const [editDeleteAssessmentId, setEditDeleteAssessmentId] = useState("");
  const [editDeleteName, setEditDeleteName] = useState("");
  const [editDeleteOrgId, setEditDeleteOrgId] = useState("");

  // Mutation
  const [createAssessment] = useMutation(ADMIN_CREATE_ASSESSMENT);
  const [deleteAndEditAssessment] = useMutation(
    ADMIN_DELETE_AND_UPDATE_ASSESSMENT
  );

  useEffect(() => {
    getOrgList();

    if (editDeleteAssessmentId.length) {
      getAssessmentDataById({
        variables: {
          assessment_id: editDeleteAssessmentId,
        },
      });
    }

    getAdminAssessmentList({
      variables: {
        limit: rowsLimit,
        pageNo: page,
        searchText: searchInputValue,
        ...selectFilterOptions,
      },
    });
  }, [
    rowsLimit,
    selectFilterOptions,
    tableCurentPage,
    searchInputValue,
    page,
    editDeleteAssessmentId,
  ]);

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
    getAdminAssessmentList,
    {
      loading: loadingMonitorList,
      data: { adminAssessmentList: listData = {} } = {},
      refetch,
    },
  ] = useLazyQuery(GET_ADMIN_ASSESSMENT_LIST, {
    fetchPolicy: "cache-and-network",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  const [
    getAssessmentDataById,
    { data: { adminViewAssessment: assessmentData = {} } = {} },
  ] = useLazyQuery(GET_ADMIN_ASSESSMENT_DATA_BY_ID, {
    fetchPolicy: "cache-and-network",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  /* istanbul ignore next */
  const onPageChange = (event?: any, newPage?: number) => {
    setPage(newPage + 1);
    /* istanbul ignore next */
    setTableCurrentPage(newPage);
  };

  /* istanbul ignore next */
  const onSelectPageDropdown = (event: React.ChangeEvent<HTMLInputElement>) => {
    /* istanbul ignore next */
    setRowsLimit(+event.target.value);
    /* istanbul ignore next */
    setTableCurrentPage(0);
  };

  /* istanbul ignore next */
  const onChangeFilterDropdown = async (e) => {
    const temp = selectFilterOptions;
    temp[e.target.name] = e.target.value !== "all" ? e.target.value : "";
    setSelectFilterOptions({ ...temp });
    setTableCurrentPage(0);
    setPage(1);
  };

  /* istanbul ignore next */
  const onChangeSearchInput = (e) => {
    setSearchInputValue(e.target.value);
    setTableCurrentPage(0);
    setPage(1);
  };

  /* istanbul ignore next */
  const handleOpenCreateAssessmentModal = useCallback(
    () => modalRefAddPlan.current?.open(),
    []
  );
  const handleCloseCreateAssessmentModal = useCallback(() => {
    /* istanbul ignore next */
    modalRefAddPlan.current?.close();
  }, []);

  /* istanbul ignore next */
  const handleOpenEditAssessmentModal = useCallback(
    () => modalRefEditAssessment.current?.open(),
    []
  );
  const handleCloseEditAssessmentModal = useCallback(() => {
    /* istanbul ignore next */
    modalRefEditAssessment.current?.close();
  }, []);

  /* istanbul ignore next */
  const receivePlanIds = (value) => {
    const formattedValue = value.join(",");
    setOrgIds(formattedValue);
  };

  const onChangeName = (value) => {
    /* istanbul ignore next */
    setName(value);
  };

  const onChangeEditName = (value) => {
    /* istanbul ignore next */
    setEditName(value);
  };

  /* istanbul ignore next */
  const handleCreateAssessment = async () => {
    try {
      await createAssessment({
        variables: {
          name: name,
          org_id: orgIds,
        },
        onCompleted: (data) => {
          if (data) {
            const {
              adminCreateAssessment: { duplicateNames },
            } = data;

            if (duplicateNames) {
              setIsConfirmShareTask(false);

              infoModalRef.current.openConfirm({
                data: {
                  duplicateNames,
                  message:
                    "This assessment already exists in the following organisation!",
                },
              });
            } else {
              handleCloseCreateAssessmentModal();
              setIsConfirmShareTask(false);
              refetch();
              setName(undefined);
              setOrgIds(undefined);

              enqueueSnackbar("Assessment created successfully!", {
                variant: "success",
              });
            }
            //   doneCallback();
          }
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  const handleDeleteAssessment = async () => {
    try {
      await deleteAndEditAssessment({
        variables: {
          assessment_id: editDeleteAssessmentId,
          update: {
            name: editDeleteName,
            org_id: editDeleteOrgId,
            status: 0,
          },
        },
        onCompleted: () => {
          setIsConfirmDeleteAssessment(false);
          enqueueSnackbar("Assessment deleted sucessfully!", {
            variant: "success",
          });
          refetch();
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  const handleEditAssessment = async () => {
    try {
      await deleteAndEditAssessment({
        variables: {
          assessment_id: editDeleteAssessmentId,
          update: {
            name: editName,
            org_id: editDeleteOrgId,
            status: 1,
          },
        },
        onCompleted: () => {
          setIsConfirmEditAssessment(false);
          handleCloseEditAssessmentModal();
          enqueueSnackbar("Assessment updates successfully!", {
            variant: "success",
          });
          refetch();
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  /* istanbul ignore next */
  const clearIsConfirmCancel = () => {
    setIsConfirmShareTask(false);
    setIsConfirmDeleteAssessment(false);
    setIsConfirmEditAssessment(false);
  };

  /* istanbul ignore next */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  const handleActionButtonClick = (value) => {
    const { _id, org_id, name, pressedIconButton } = value;

    if (pressedIconButton === "edit") {
      handleOpenEditAssessmentModal();
      setEditDeleteAssessmentId(_id);
      setEditDeleteOrgId(org_id);
    }
    if (pressedIconButton === "delete") {
      setIsConfirmDeleteAssessment(true);
      setEditDeleteAssessmentId(_id);
      setEditDeleteName(name);
      setEditDeleteOrgId(org_id);
    }
    if (pressedIconButton === "view") {
      router.push(`/admin/assessment/view/${_id}`);
    }
  };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Assessement" />
        <AssessmentComponent
          monitorList={listData}
          onPageChange={onPageChange}
          onSelectPageDropdown={onSelectPageDropdown}
          tableCurentPage={tableCurentPage}
          rowsLimit={rowsLimit}
          searchInputValue={searchInputValue}
          onChangeSearchInput={onChangeSearchInput}
          organizationList={organizationList}
          selectFilterOptions={selectFilterOptions}
          onChangeFilterDropdown={onChangeFilterDropdown}
          loadingMonitorList={loadingMonitorList}
          pageActionButtonClick={handleActionButtonClick}
          onPressSideButton={handleOpenCreateAssessmentModal}
        />

        <CommonModal
          ref={modalRefAddPlan}
          headerTitleText="Create assessment"
          maxWidth="sm"
        >
          <CreateAssessmentForm
            onPressSubmit={() => setIsConfirmShareTask(true)}
            organizationList={organizationList}
            receivePlanId={receivePlanIds}
            receiveName={onChangeName}
          />
        </CommonModal>

        <CommonModal
          ref={modalRefEditAssessment}
          headerTitleText="Edit assessment"
          maxWidth="sm"
        >
          <EditAssessmentForm
            onPressSubmit={() =>
              /* istanbul ignore next */
              setIsConfirmEditAssessment(true)
            }
            prefilledAssessmentName={assessmentData?.name}
            receiveName={onChangeEditName}
          />
        </CommonModal>

        {isConfirmShareTask && (
          <ConfirmationModal
            label="Are you sure you want to create the assessment?"
            onCancel={clearIsConfirmCancel}
            onConfirm={handleCreateAssessment}
          />
        )}

        {isConfirmEditAssessment && (
          <ConfirmationModal
            label="Are you sure you want to update the assessment?"
            onCancel={clearIsConfirmCancel}
            onConfirm={handleEditAssessment}
          />
        )}

        {isConfirmDeleteAssessment && (
          <ConfirmationModal
            label="Are you sure you want to delete the assessment?"
            onCancel={clearIsConfirmCancel}
            onConfirm={handleDeleteAssessment}
          />
        )}

        <InfoModal ref={infoModalRef}>
          <InfoMessageView />
        </InfoModal>
      </Layout>
    </>
  );
};
export default AssessmentListPage;
