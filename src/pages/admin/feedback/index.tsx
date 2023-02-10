import moment from "moment";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Loader from "../../../components/common/Loader";
import { useRouter } from "next/router";

// GRAPHQL
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_FEEDBACK,
  DELETE_FEEDBACK,
  UPDATE_FEEDBACK,
} from "../../../graphql/mutation";
import { GET_ADMIN_FEEDBACK_LIST, GET_ORG_DATA } from "../../../graphql/query";

// MUI COMPONENTS
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, IconButton, Tooltip } from "@mui/material";
import DynamicForm from "../../../components/admin/feedback/DynamicForm";
import { useStyles } from "../../../components/admin/feedback/feedbackStyles";
import { AddButton } from "../../../components/common/Buttons";
import ContentHeader from "../../../components/common/ContentHeader";
import CrudDialog from "../../../components/common/CrudDialog";
import Layout from "../../../components/layout";
import withAuthentication from "../../../hoc/auth";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { SuccessModal } from "../../../components/common/SuccessModal";
const TableGenerator = dynamic(
  import("../../../components/common/TableGenerator"),
  { ssr: false }
);

// COMPONENT STYLES
const crudButtons = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 1,
  flexDirection: "row-reverse",
};

const Feedback: NextPage = () => {
  const styles = useStyles();
  const router = useRouter();
  // COMPONENT STATE
  const [addModal, setAddModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [viewModal, setViewModal] = useState<boolean>(false);
  const [isMutating, setIsMutation] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<any>([]);
  const [sessionList, setSessionList] = useState<any>([]);
  const [dataList, setDataList] = useState<any>([]);
  const [selectedId, setSelectedId] = useState<any>("");
  const [selectedUserData, setSelectedUserData] = useState<any>([]);
  const [successModal, setSuccessModal] = useState<any>();
  const [isConfirm, setIsConfirm] = useState<any>({
    status: false,
    storedFunction: null,
    setSubmitting: null,
    cancelStatus: false,
    confirmObject: {
      description: "",
    },
  });

  // TABLE PROPS
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [loader, setLoader] = useState<boolean>(false);
  const [nextPage] = useState<string>(null);
  const [previousPage] = useState<any>(null);
  const [firstPage] = useState<any>(null);
  const [lastPage] = useState<any>(null);

  // GRAPHQL
  const [addFeedback] = useMutation(ADD_FEEDBACK);
  const { data: orgData } = useQuery(GET_ORG_DATA);
  const {
    error: dataListError,
    data: dataListData,
    refetch,
  } = useQuery(GET_ADMIN_FEEDBACK_LIST, {
    variables: { pageNo: page + 1, limit: rowsPerPage },
  });

  // const [
  //   viewFeedback,
  //   { loading: feedbackLoader, error: feedbackError, data: feedbackDat(GET_FEEDBACK_BY_ID);

  const [deleteFeedback] = useMutation(DELETE_FEEDBACK);
  const [updateFeedback] = useMutation(UPDATE_FEEDBACK);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // do some checking here to ensure data exist
    setLoader(true);
    /* istanbul ignore next */
    if (dataListData || dataListError) {
      /* istanbul ignore next */
      setDataList(dataListData?.getFeedbackListByAdmin?.feedbackdata);
      setLoader(false);
    }
  }, [dataListData, dataListError]);

  useEffect(() => {
    const session = [];
    for (let i = 1; i <= 50; i++) {
      session.push({ label: `Session-${i}`, value: i });
    }
    setSessionList(session);
  }, []);

  //**  TABLE DATA COLUMNS **//
  /* istanbul ignore next */
  const fields = [
    {
      key: "session_no",
      columnName: "Session Name",
      visible: true,
      render: (val) => val ?? "---",
    },
    {
      key: "organization_name",
      columnName: "Organization",
      visible: true,
      render: (val) =>
        val > 50 ? (
          <Tooltip title={val} arrow>
            <p>{val.substring(0, 50) + "..."}</p>
          </Tooltip>
        ) : (
          val ?? "---"
        ),
    },
    {
      key: "feedback_type",
      columnName: "Feedback Name",
      visible: true,
      render: (val) =>
        val.length > 50 ? (
          <Tooltip title={val} arrow>
            <p>{val.substring(0, 50) + "..."}</p>
          </Tooltip>
        ) : (
          val ?? "---"
        ),
    },
    {
      key: "user_type",
      columnName: "User Type",
      visible: true,
      render: (val) =>
        val.length > 50 ? (
          <Tooltip title={val} arrow>
            <p>{val.substring(0, 50) + "..."}</p>
          </Tooltip>
        ) : (
          val ?? "---"
        ),
    },
    {
      key: "created_date",
      columnName: "Created on",
      visible: true,
      render: (val) => moment(val).format("DD MMM YYYY") ?? "---",
    },
    {
      key: "actions",
      columnName: "Actions",
      visible: true,
      render: (_, value) => (
        <>
          <IconButton
            size="small"
            data-testid={"viewIcon_" + value._id}
            onClick={() => handleView(value._id)}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            size="small"
            data-testid={"editIcon_" + value._id}
            onClick={() => {
              handleViewEdit(value._id);
              setSelectedId(value._id);
            }}
          >
            <CreateIcon />
          </IconButton>
          <IconButton
            data-testid={"deleteIcon_" + value._id}
            size="small"
            // onClick={() => handleDelete(value._id)}
            onClick={() => onPressDeletePlan(value._id)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton size="small" onClick={() => null}>
            <ReplyIcon data-testid={"resplyIcon_" + value._id} />
          </IconButton>
        </>
      ),
    },
  ];
  //ReplyIcon
  // ADD DIALOG FIELDS
  const dialogFields = [
    [
      {
        key: "org_id",
        label: "Organization Name",
        visible: true,
        freeSolo: false,
        show: true,
        required: true,
        disabled: viewModal ? true : false,
        type: "autocomplete",
        options:
          orgData?.getOrganizationData?.length > 0
            ? [
                ...orgData.getOrganizationData.map((val) => ({
                  label: val.name,
                  value: val._id,
                })),
              ]
            : [],
      },
      {
        key: "session_no",
        label: "Session Name",
        visible: true,
        show: true,
        required: true,
        disabled: viewModal ? true : false,
        type: addModal ? "select" : "autocomplete",
        multiple: true,
        options: sessionList.length > 0 ? sessionList : [],
      },
      {
        key: "feedback_type",
        label: "Feedback Type",
        visible: true,
        freeSolo: false,
        show: true,
        disabled: viewModal || editModal ? true : false,
        required: true,
        type: "autocomplete",
        options: [
          { label: "Quality", value: "quality" },
          { label: "Session", value: "session" },
        ],
      },
    ],
  ];
  // if (loading) return 'Submitting...';
  // if (error) return `Submission error! ${error.message}`;

  /* istanbul ignore next */
  const handleAdd = (val) => {
    let valid = false;
    /* istanbul ignore else */
    if (formValues.length === 0) {
      enqueueSnackbar("Please fill the all fields", { variant: "error" });
      return null;
    } else {
      formValues.map((x) => {
        if (!x.question || !x.answer_type) {
          enqueueSnackbar("Please fill the all fields", { variant: "error" });
          return (valid = false);
        } else if (x.answer_type == "list" && x.answer_options.length < 2) {
          enqueueSnackbar("Please enter a minimum of 2 values for the list", {
            variant: "error",
          });
          return (valid = false);
        } else {
          return (valid = true);
        }
      });
    }
    /* istanbul ignore next */
    if (valid) {
      setLoader(true);
      setIsMutation(true);
      /* istanbul ignore next */
      const data = formValues.map((x) => ({
        ...x,
        ...val,
      }));

      const dataJson = JSON.stringify(data);
      /* istanbul ignore else */
      addFeedback({
        variables: { feedQuesData: dataJson },
        onCompleted: () => {
          refetch();
          setLoader(false);
          setAddModal(false);
          setIsMutation(false);
          enqueueSnackbar("Feedback added successfully", {
            variant: "success",
          });
        },
      });
    }
  };

  const handleFormValues = (val) => {
    setFormValues(val);
  };

  /* istanbul ignore next */
  const handleEdit = async (val) => {
    /* istanbul ignore else */
    setIsMutation(true);
    const data = formValues.map((x) => ({
      question: x.question,
      answer_type: x.answer_type,
      answer_options: JSON.stringify(x.answer_options),
      ...val,
    }));

    try {
      await updateFeedback({
        variables: {
          feedbackId: selectedId,
          update: data[0],
        },
        onCompleted: () => {
          refetch();
          setEditModal(false);
          setIsMutation(false);
          enqueueSnackbar("Updated data successfully!", { variant: "success" });
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  /* istanbul ignore next */
  const handleViewEdit = (id) => {
    /* istanbul ignore else */
    const val = dataList.filter((x) => x._id === id);
    setSelectedUserData(val);
    setEditModal(true);
  };

  /* istanbul ignore next */
  const handleDelete = async (id, callback) => {
    /* istanbul ignore else */
    // setIsMutation(true);
    setLoader(true);
    deleteFeedback({
      variables: {
        feedbackId: id,
      },
      onCompleted: () => {
        callback();
        setLoader(false);
        refetch();
        setSuccessModal({
          description: "Feedback has been deleted sucessfully.",
        });
        enqueueSnackbar("Feedback deleted successfully!", { variant: "info" });
      },
    });
  };
  /* istanbul ignore next */
  const handleView = (id) => {
    router?.push(`/admin/feedback/view/${id}`);
  };
  const changePage = (url: any) => {
    /* istanbul ignore next */
    console.log("CHANGE PAGE", url);
  };

  const onPressDeletePlan = (v) => {
    setIsConfirm({
      status: true,
      confirmObject: {
        description: "You want to delete feedback",
      },
      storedFunction: (callback) => handleDelete(v, callback),
    });
  };

  const onConfirmSubmit = () => {
    isConfirm.storedFunction(() => {
      setLoader(true);
      if (isConfirm.setSubmitting instanceof Function)
        isConfirm.setSubmitting(false);

      setIsConfirm({
        status: false,
        storedFunction: null,
        setSubmitting: null,
      });
    });
  };

  const clearIsConfirm = () => {
    /* istanbul ignore next */
    if (isConfirm.setSubmitting instanceof Function)
      isConfirm.setSubmitting(false);
    /* istanbul ignore next */
    setIsConfirm({
      status: false,
      storedFunction: null,
      setSubmitting: null,
      cancelStatus: false,
    });
  };

  const handleOk = () => {
    setSuccessModal(undefined);
  };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Feedback" />
        <Box sx={crudButtons}>
          <AddButton
            className="mr-3"
            label="Create Questionnaire"
            onClick={() => setAddModal(true)}
          />
        </Box>
        <Box className={styles.adminFeedbackTable}>
          <TableGenerator
            fields={fields}
            data={dataListData?.getFeedbackListByAdmin?.feedbackdata}
            currentPage={page}
            onPageChange={(page, direction) => {
              /* istanbul ignore next */
              setPage(page);
              /* istanbul ignore next */
              if (direction === "next") {
                changePage(nextPage);
              } else if (direction === "back") {
                changePage(previousPage);
              } else if (direction === "first") {
                changePage(firstPage);
              } else if (direction === "last") {
                changePage(lastPage);
              }
            }}
            backendPagination={true}
            onRowPerPageChange={(rows) => {
              setRowsPerPage(rows);
            }}
            dataCount={dataListData?.getFeedbackListByAdmin?.totalcount}
            selectedRecords={[]}
            rowOnePage={rowsPerPage}
          />
          <CrudDialog
            title="Create Questionnaire"
            okText="Save"
            fields={dialogFields}
            submitButtonDisabled={isMutating}
            description="Please fill in the details below."
            onsubmit={(values) => {
              handleAdd(values);
            }}
            dynamicForm={
              <DynamicForm
                buttonText="Add Question"
                callBackFormValues={handleFormValues}
              />
            }
            open={addModal}
            onClose={() => {
              setAddModal(false);
              setFormValues([]);
            }}
          />

          <CrudDialog
            title="Edit Question"
            okText="Update"
            fields={dialogFields}
            values={selectedUserData[0]}
            submitButtonDisabled={isMutating}
            // onFieldChange={(_, images) => {
            //     debugger
            //     //   handlUploadImages(images);
            // }}
            onsubmit={(values) => {
              handleEdit(values);
            }}
            dynamicForm={
              <DynamicForm
                callBackFormValues={handleFormValues}
                values={selectedUserData[0]}
              />
            }
            open={editModal}
            onClose={() => setEditModal(false)}
          />

          <CrudDialog
            title="View Question"
            viewData={true}
            fields={dialogFields}
            values={selectedUserData[0]}
            dynamicForm={
              <DynamicForm type="view" values={selectedUserData[0]} />
            }
            open={viewModal}
            onClose={() => setViewModal(false)}
          />
        </Box>
        {isConfirm.status && (
          <ConfirmationModal
            label="Are you sure?"
            description={isConfirm.confirmObject.description}
            onCancel={clearIsConfirm}
            onConfirm={onConfirmSubmit}
          />
        )}
        {successModal && (
          <SuccessModal
            isOpen={Boolean(successModal)}
            title="Successfull"
            description={successModal.description}
            onOk={handleOk}
          />
        )}
      </Layout>
    </>
  );
};

export default withAuthentication(Feedback, ["admin"]);
