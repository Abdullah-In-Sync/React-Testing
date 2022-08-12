import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { NextPage } from "next";
import moment from "moment";
import Loader from "../../../components/common/Loader";

// GRAPHQL
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_FEEDBACK_DATA,
  GET_ORG_DATA,
  // GET_FEEDBACK_BY_ID,
} from "../../../graphql/query";
import {
  ADD_FEEDBACK,
  DELETE_FEEDBACK,
  UPDATE_FEEDBACK,
} from "../../../graphql/mutation";

// MUI COMPONENTS
import Layout from "../../../components/layout";
const TableGenerator = dynamic(
  import("../../../components/common/TableGenerator"),
  { ssr: false }
);
import ContentHeader from "../../../components/common/ContentHeader";
import DynamicForm from "../../../components/admin/feedback/DynamicForm";
import { IconButton, Tooltip, Box } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddButton } from "../../../components/common/Buttons";
import CrudDialog from "../../../components/common/CrudDialog";

// COMPONENT STYLES
const crudButtons = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 1,
  flexDirection: "row-reverse",
};

const Feedback: NextPage = () => {
  // const { enqueueSnackbar } = useSnackbar();

  // COMPONENT STATE
  const [addModal, setAddModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [viewModal, setViewModal] = useState<boolean>(false);
  const [deletConfirmationModal, setDeletConfirmationModal] =
    useState<boolean>(false);
  const [formValues, setFormValues] = useState<any>([]);
  const [sessionList, setSessionList] = useState<any>([]);
  const [dataList, setDataList] = useState<any>([]);
  const [selectedId, setSelectedId] = useState<any>("");
  const [selectedUserData, setSelectedUserData] = useState<any>([]);

  // TABLE PROPS
  // const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  // const [dataCount, setDataCount] = useState<number>(0);
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
  } = useQuery(GET_FEEDBACK_DATA, {
    variables: { status: "active", pageNo: 1 },
  });

  // const [
  //   viewFeedback,
  //   { loading: feedbackLoader, error: feedbackError, data: feedbackDat(GET_FEEDBACK_BY_ID);

  const [deleteFeedback] = useMutation(DELETE_FEEDBACK);
  const [updateFeedback] = useMutation(UPDATE_FEEDBACK);

  useEffect(() => {
    // do some checking here to ensure data exist
    setLoader(true);
    if (dataListData || dataListError) {
      // mutate data if you need to
      setDataList(dataListData?.getAdminFeedbackList);
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
      columnName: "Session No.",
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
      key: "question",
      columnName: "Questions",
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
      key: "feedback_type",
      columnName: "Type",
      visible: true,
      render: (val) => val ?? "---",
    },
    {
      key: "created_date",
      columnName: "Created on",
      visible: true,
      render: (val) => moment(val).format("DD MMM YYYY hh:mm:ss A") ?? "---",
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
            size="small"
            // onClick={() => handleDelete(value._id)}
            onClick={() => {
              setDeletConfirmationModal(true);
              setSelectedId(value._id);
            }}
          >
            <DeleteIcon data-testid={"deleteIcon_" + value._id} />
          </IconButton>
        </>
      ),
    },
  ];

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
      // enqueueSnackbar("Please fill the all fields");
      return null;
    } else {
      formValues.map((x) => {
        if (!x.question || !x.answer_type) {
          // enqueueSnackbar("Please fill the all fields");
          return (valid = false);
        } else {
          return (valid = true);
        }
      });
    }
    /* istanbul ignore next */
    if (valid) {
      setLoader(true);
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
        },
      });
      // enqueueSnackbar("Updated data successfully");
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
  const handleDelete = async (id) => {
    /* istanbul ignore else */
    deleteFeedback({
      variables: {
        feedbackId: id,
        update: { status: "deleted" },
      },
      onCompleted: () => {
        setDeletConfirmationModal(false);
        refetch();
      },
    });

    // try {
    //     const { data: da } = await updateFeedback({
    //         variables: {
    //             feedbackId: selectedId,
    //             update: data[0]
    //         },
    //         onCompleted: () => { refetch(); setEditModal(false); },
    //     });
    //     enqueueSnackbar("Updated data successfully");
    // }
    // catch (e) {
    //     console.log(e)
    // }
  };
  /* istanbul ignore next */
  const handleView = (id) => {
    /* istanbul ignore else */
    const val = dataList.filter((x) => x._id === id);
    setSelectedUserData(val);
    setViewModal(true);
  };
  const changePage = (url: any) => {
    console.log("CHANGE PAGE", url);
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
        <Box>
          <TableGenerator
            //   searchQuery={query}
            //   initialSort={"id"}
            //   searchColumnsFilter={true}
            fields={fields}
            data={dataListData?.getAdminFeedbackList}
            currentPage={page}
            //   handleSortChange={(ordering) => {
            //     setOrdering(ordering);
            //     getDeviceType(ordering);
            //   }}
            onPageChange={(page, direction) => {
              /* istanbul ignore next */
              setPage(page);
              /* istanbul ignore else */
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
            // onRowPerPageChange={(rows) => {
            //   // getDeviceType(null, rows);
            //   // setRowsPerPage(rows);
            // }}
            dataCount={dataListData?.getAdminFeedbackList.length}
            //   onChangePage={(page) => console.log(page)}
            selectedRecords={[]}
            rowOnePage={10}
            //   onChangeSelected={(modulesSelected) =>
            //     setModulesSelected(modulesSelected)
            //   }
          />

          <CrudDialog
            title="Create Questionnaire"
            okText="Save"
            fields={dialogFields}
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

          <CrudDialog
            title="Delete Question"
            description="Are you sure you want to delete this question? You will not be able to restore this again."
            okText="Delete"
            onsubmit={() => handleDelete(selectedId)}
            open={deletConfirmationModal}
            onClose={() => setDeletConfirmationModal(false)}
          />
        </Box>
      </Layout>
    </>
  );
};

export default Feedback;
