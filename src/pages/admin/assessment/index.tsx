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
  ADMIN_SHARE_ASSESSMENT,
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
import EditAssessmentForm from "../../../components/admin/assessement/editAssessment/EditAssessmentForm";
import ShareAssessmentForm from "../../../components/admin/assessement/shareAssessment/ShareAssessmentForm";
import { useRouter } from "next/router";
import { addAdminAssessment } from "../../../utility/types/resource_types";
import { checkUserType } from "../../../utility/helper";
import { CUSTOM } from "../../../lib/constants";

const defaultFormValue = {
  name: "",
  org_id: "",
};

const AssessmentListPage: NextPage = () => {
  const router = useRouter();
  const modalRefAddPlan = useRef<ModalElement>(null);
  const modalRefEditAssessment = useRef<ModalElement>(null);
  const shareInfoModalRef = useRef<ModalElement>(null);
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
  const [shareOrgIds, setShareOrgIds] = useState();
  const infoModalRef = useRef<ConfirmInfoElement>(null);
  const [editName, setEditName] = useState("");
  const [page, setPage] = useState(1);
  const [editDeleteAssessmentId, setEditDeleteAssessmentId] = useState("");
  const [editDeleteName, setEditDeleteName] = useState("");
  const [editDeleteOrgId, setEditDeleteOrgId] = useState("");
  const [isConfirmShare, setIsConfirmShare] = useState(false);
  const [selectAssessment, setSelectAssessment] = useState("");
  const [selectAssessmentName, setSelectAssessmentName] = useState<string>(",");
  const [formFields, setFormFields] = useState<addAdminAssessment>({
    ...defaultFormValue,
  });

  const { userType } = checkUserType();
  const isAdminAssesmentCheck = userType === CUSTOM;
  // Mutation
  const [createAssessment] = useMutation(ADMIN_CREATE_ASSESSMENT);
  const [deleteAndEditAssessment] = useMutation(
    ADMIN_DELETE_AND_UPDATE_ASSESSMENT
  );
  const [shareAssessment] = useMutation(ADMIN_SHARE_ASSESSMENT);

  useEffect(() => {
    getAdminAssessmentList({
      variables: {
        limit: rowsLimit,
        pageNo: page,
        searchText: searchInputValue,
        ...selectFilterOptions,
      },
    });
  }, [rowsLimit, selectFilterOptions, searchInputValue, page]);

  useEffect(() => {
    if (editDeleteAssessmentId.length) {
      getAssessmentDataById({
        variables: {
          assessment_id: editDeleteAssessmentId,
        },
      });
    }
  }, [editDeleteAssessmentId]);

  useEffect(() => {
    if (!isAdminAssesmentCheck) getOrgList();
  }, []);

  const [
    getOrgList,
    { data: { getOrganizationData: organizationList = undefined } = {} },
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
  const receiveAllData = (value) => {
    setFormFields(value);
    if (value) {
      setIsConfirmShareTask(true);
    }
  };

  const receiveSharePlanIds = (value) => {
    const formattedValue = value.join(",");
    setShareOrgIds(formattedValue);
  };

  const onChangeEditName = (value) => {
    /* istanbul ignore next */
    setEditName(value);
  };

  /* istanbul ignore next */
  const handleCreateAssessment = async () => {
    const variables = isAdminAssesmentCheck
      ? { name: formFields.name }
      : { name: formFields.name, org_id: formFields.org_id };
    try {
      await createAssessment({
        variables,
        onCompleted: (data) => {
          const {
            adminCreateAssessment: { duplicateNames, result },
          } = data;
          if (duplicateNames) {
            /* istanbul ignore next */
            setIsConfirmShareTask(false);

            infoModalRef.current.openConfirm({
              /* istanbul ignore next */
              data: {
                duplicateNames,
                message:
                  "This assessment already exists in the following organisation!",
              },
            });
          } else if (result) {
            handleCloseCreateAssessmentModal();
            setIsConfirmShareTask(false);
            refetch();

            /* istanbul ignore next */
            enqueueSnackbar("Assessment created successfully!", {
              variant: "success",
            });
          }
          //   doneCallback();
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
          enqueueSnackbar("Assessment updated successfully!", {
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

  const handleShareAssessment = async () => {
    try {
      await shareAssessment({
        variables: {
          assessment_id: selectAssessment,
          org_id: shareOrgIds,
        },
        onCompleted: (data) => {
          const {
            adminShareAssessment: { duplicateNames },
          } = data;
          /* istanbul ignore next */
          if (duplicateNames) {
            /* istanbul ignore next */
            setIsConfirmShare(false);
            /* istanbul ignore next */
            shareInfoModalRef.current?.close();
          } else {
            shareInfoModalRef.current?.close();
            setIsConfirmShare(false);
            refetch();
            setSelectAssessment(undefined);
            setShareOrgIds(undefined);

            enqueueSnackbar("Assessment shared successfully!", {
              variant: "success",
            });
          }
        },
      });
    } catch (e) {
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
    if (pressedIconButton == "share") {
      return onPressShareAssignment(_id, name);
    }
  };
  const clearIsConfirmShareCancel = () => {
    /* istanbul ignore next */
    setIsConfirmShare(false);
  };

  const onPressShareAssignment = (assignmentId, name) => {
    setSelectAssessment(assignmentId);
    setSelectAssessmentName(name);
    /* istanbul ignore next */
    shareInfoModalRef.current?.open();
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
          headerTitleText={"Create assessment"}
          maxWidth="sm"
        >
          <CreateAssessmentForm
            // onPressSubmit={() => setIsConfirmShareTask(true)}
            organizationList={organizationList}
            receiveAllData={receiveAllData}
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
            prefilledAssessmentName={
              /* istanbul ignore next */
              assessmentData?.name
            }
            receiveName={onChangeEditName}
          />
        </CommonModal>
        <ShareAssessmentForm
          isOpen={shareInfoModalRef}
          onPressSubmit={() => setIsConfirmShare(true)}
          selectAssessmentName={selectAssessmentName}
          receivePlanId={receiveSharePlanIds}
          shareType={"Assessment"}
          headerTitleText={"Share assessment"}
        />
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
        {isConfirmShare && (
          <ConfirmationModal
            label="Are you sure you want to share the assessment?"
            onCancel={clearIsConfirmShareCancel}
            onConfirm={handleShareAssessment}
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
