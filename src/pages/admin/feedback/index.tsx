import moment from "moment";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Loader from "../../../components/common/Loader";
import { useRouter } from "next/router";
import NextLink from "next/link";

// GRAPHQL
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_FEEDBACK } from "../../../graphql/mutation";
import { GET_ADMIN_FEEDBACK_LIST } from "../../../graphql/query";

// MUI COMPONENTS
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useStyles } from "../../../components/admin/feedback/feedbackStyles";
import { AddButton } from "../../../components/common/Buttons";
import ContentHeader from "../../../components/common/ContentHeader";
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
  const router = useRouter();
  const styles = useStyles();
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

  const {
    error: dataListError,
    data: dataListData,
    refetch,
  } = useQuery(GET_ADMIN_FEEDBACK_LIST, {
    variables: { pageNo: page + 1, limit: rowsPerPage },
  });

  const [deleteFeedback] = useMutation(DELETE_FEEDBACK);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoader(true);
    if (dataListData || dataListError) {
      setLoader(false);
    }
  }, [dataListData, dataListError]);

  //**  TABLE DATA COLUMNS **//
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
              router.push("/admin/feedback/edit/" + value._id);
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

          <NextLink href={"/admin/feedback/responses/" + value._id} passHref>
            <IconButton size="small" data-testid={"viewIcon_" + value._id}>
              <ReplyIcon />
            </IconButton>
          </NextLink>
        </>
      ),
    },
  ];

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
    router.push(`/admin/feedback/view/${id}`);
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
            data-testid={"create-feedback"}
            label="Create Feedback"
            onClick={() => router.push("/admin/feedback/create")}
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
