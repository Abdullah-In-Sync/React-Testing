import { useLazyQuery } from "@apollo/client";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import ContentHeader from "../../../components/common/ContentHeader";
import Loader from "../../../components/common/Loader";
import Layout from "../../../components/layout";
import { GET_ORGANIZATION_LIST } from "../../../graphql/query/organization";
import AssessmentComponent from "../../../components/admin/assessement";
import { GET_ADMIN_ASSESSMENT_LIST } from "../../../graphql/assessment/graphql";

const AssessmentListPage: NextPage = () => {
  //   const router = useRouter();
  const [tableCurentPage, setTableCurrentPage] = useState(0);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const [loader, setLoader] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  //   const { enqueueSnackbar } = useSnackbar();
  //   const [isConfirm, setIsConfirm] = useState<any>({
  //     status: false,
  //     storedFunction: null,
  //     setSubmitting: null,
  //     cancelStatus: false,
  //     confirmObject: {
  //       description: "",
  //     },
  //   });
  //   const [successModal, setSuccessModal] = useState<any>();

  //   const [updateMonitor] = useMutation(ADMIN_UPDATE_MONITOR);

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

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  //   const onPressSideButton = () => {
  //     router.push("/admin/monitor/create");
  //   };

  //   const handleDeleteMeasure = async (id: string, doneCallback) => {
  //     setLoader(true);
  //     try {
  //       await updateMonitor({
  //         variables: {
  //           monitorId: id,
  //           update: {
  //             status: 0,
  //           },
  //         },
  //         fetchPolicy: "network-only",
  //         onCompleted: () => {
  //           setSuccessModal({
  //             description: "Your monitor has been deleted successfully.",
  //           });
  //           getAdminAssessmentList({
  //             variables: { limit: rowsLimit, pageNo: page },
  //           });
  //         },
  //       });
  //     } catch (e) {
  //       setLoader(false);
  //       enqueueSnackbar("Something is wrong", { variant: "error" });
  //     } finally {
  //       doneCallback();
  //       setLoader(false);
  //     }
  //   };

  //   const onPressDeleteMeasure = (id) => {
  //     setIsConfirm({
  //       status: true,
  //       confirmObject: {
  //         description: "Are you sure you want to delete the monitor?",
  //       },
  //       storedFunction: (callback) => handleDeleteMeasure(id, callback),
  //     });
  //   };

  /* istanbul ignore next */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  //   const handleActionButtonClick = (value) => {
  //     const { _id, pressedIconButton } = value;
  //     switch (pressedIconButton) {
  //       case "edit":
  //         return router.push(`/admin/monitor/edit/${_id}`);
  //       case "view":
  //         return router.push(`/admin/monitor/view/${_id}`);
  //       case "delete":
  //         return onPressDeleteMeasure(_id);
  //     }
  //   };

  //   const clearIsConfirm = () => {
  //     setIsConfirm({
  //       status: false,
  //       storedFunction: null,
  //       setSubmitting: null,
  //       cancelStatus: false,
  //     });
  //   };

  //   const onConfirmSubmit = () => {
  //     isConfirm.storedFunction(() => {
  //       setIsConfirm({
  //         status: false,
  //         storedFunction: null,
  //         setSubmitting: null,
  //       });
  //     });
  //   };

  //   const handleOk = () => {
  //     setSuccessModal(undefined);
  //   };

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
          //   onPressSideButton={onPressSideButton}
        />
        {/* {isConfirm.status && (
          <ConfirmationModal
            label={isConfirm.confirmObject.description}
            onCancel={clearIsConfirm}
            onConfirm={onConfirmSubmit}
          />
        )}
        {successModal && (
          <SuccessModal
            isOpen={Boolean(successModal)}
            title="Successful"
            description={successModal.description}
            onOk={handleOk}
          />
        )} */}
      </Layout>
    </>
  );
};
export default AssessmentListPage;
