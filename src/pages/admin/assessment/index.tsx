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

const AssessmentListPage: NextPage = () => {
  const modalRefAddPlan = useRef<ModalElement>(null);
  const { enqueueSnackbar } = useSnackbar();

  //   const router = useRouter();
  const [tableCurentPage, setTableCurrentPage] = useState(0);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const [loader, setLoader] = useState<boolean>(true);
  const [isConfirmShareTask, setIsConfirmShareTask] = useState(false);
  const [orgIds, setOrgIds] = useState();
  const infoModalRef = useRef<ConfirmInfoElement>(null);
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);

  // Mutation
  const [createAssessment] = useMutation(ADMIN_CREATE_ASSESSMENT);

  useEffect(() => {
    getOrgList();
  }, []);

  useEffect(() => {
    getAdminAssessmentList({
      variables: {
        limit: rowsLimit,
        pageNo: page,
        searchText: searchInputValue,
        ...selectFilterOptions,
      },
    });
  }, [rowsLimit, selectFilterOptions, tableCurentPage, searchInputValue, page]);

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
  const receivePlanIds = (value) => {
    const formattedValue = value.join(",");
    setOrgIds(formattedValue);
  };

  const onChangeName = (value) => {
    /* istanbul ignore next */
    setName(value);
  };

  /* istanbul ignore next */
  const handleDeleteHomeworkTask = async () => {
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

  /* istanbul ignore next */
  const clearIsConfirmCancel = () => {
    setIsConfirmShareTask(false);
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
          // pageActionButtonClick={"handleActionButtonClick"}
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

        {isConfirmShareTask && (
          <ConfirmationModal
            label="Are you sure you want to create the assessment?"
            onCancel={clearIsConfirmCancel}
            onConfirm={handleDeleteHomeworkTask}
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
