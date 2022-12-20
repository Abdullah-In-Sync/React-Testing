import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import moment from "moment";
import Link from "next/link";

// MUI COMPONENTS
import { Box, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CreateIcon from "@mui/icons-material/Create";
import ContentHeader from "../../components/common/ContentHeader";
import Loader from "../../components/common/Loader";
const TableGenerator = dynamic(
  import("../../components/common/TableGenerator"),
  { ssr: false }
);

// GRAPHQL
import { GET_PATIENT_RESOURCE_DATA } from "../../graphql/query/resource";
import FileUpload from "../common/Dialog/index";
import { useQuery } from "@apollo/client";

const WorkSheet = () => {
  // TABLE PROPS

  const [page, setPage] = useState<number>(0);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true);
  const [fileUpload, setFileUpload] = useState<boolean | null>(null);

  // GRAPHQL

  const closeFileUploadDialog = () => {
    setIsDialogOpen(false);
    setFileUpload(false);
  };

  useEffect(() => {
    // no condition in case of open
    /* istanbul ignore next */
    if (isDialogOpen === false) {
      setFileUpload(false);
      setIsDialogOpen(true);
    }
  }, [fileUpload === true, isDialogOpen === false]);

  const openFileUploadDialog = () => {
    setFileUpload(true);
  };

  const { data: resData, loading } = useQuery(GET_PATIENT_RESOURCE_DATA);

  const checkIsSmart = (item) => {
    // resource_issmartdraw
    const itemId = item?._id;
    const id = resData?.getPatientResourceList?.find(
      (val) => val?.resource_data[0]?.resource_issmartdraw == "1"
    )?._id;

    if (itemId == id) return true;
    else return false;
  };

  //**  TABLE DATA COLUMNS **//
  /* istanbul ignore next */
  const fields = [
    {
      key: "created_date",
      columnName: "Shared On",
      visible: true,
      render: (val) => moment(val).format("DD MMM YYYY") ?? "---",
    },
    {
      key: "ptsharres_session",
      columnName: "Session No.",
      visible: true,
      render: (val) => val ?? "---",
    },

    {
      key: "resource_data",
      columnName: "Resource Name",
      visible: true,
      render: (val) => val[0]?.resource_name ?? "---",
    },

    {
      key: "actions",
      columnName: "Actions",
      visible: true,
      render: (_, value) => (
        <>
          {!checkIsSmart(value) && (
            <IconButton size="small" onClick={openFileUploadDialog}>
              <FileUpload
                data-testid="fileUpload"
                key={value}
                closeFileUploadDialog={closeFileUploadDialog}
                open={fileUpload}
                ptshareId={
                  resData?.getPatientResourceList?.find(
                    (val) => val?.resource_data[0]?.resource_type === 2
                  )._id
                }
              />
              <CloudUploadIcon />
            </IconButton>
          )}
          {!checkIsSmart(value) && (
            <IconButton
              size="small"
              href={
                value?.patient_share_filename != null
                  ? value?.patient_share_filename
                  : "#"
              }
              sx={{
                color:
                  value?.patient_share_filename != null ? "primary.main" : "",
              }}
            >
              <AttachFileIcon />
            </IconButton>
          )}
          <Link
            href={{
              pathname: "/patient/resource/" + value._id,
              query: {
                tabName: "work-sheet",
              },
            }}
            passHref
          >
            <IconButton size="small" data-testid={"viewIcon_" + value._id}>
              <VisibilityIcon />
            </IconButton>
          </Link>
          {checkIsSmart(value) && (
            <Link
              href={{
                pathname: "/patient/resource/edit/" + value._id,
                query: {
                  tabName: "work-sheet",
                },
              }}
              passHref
            >
              <IconButton size="small" data-testid={`editIcon_` + value._id}>
                <CreateIcon />
              </IconButton>
            </Link>
          )}
          {!checkIsSmart(value) && (
            <IconButton
              size="small"
              data-testid="downloadUrl"
              href={
                value.resource_data[0]?.download_resource_url != null
                  ? value.resource_data[0]?.download_resource_url
                  : "#"
              }
            >
              <CloudDownloadIcon />
            </IconButton>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <Loader visible={loading} />
      <ContentHeader />
      <Box>
        <TableGenerator
          fields={fields}
          data={resData?.getPatientResourceList?.filter(
            (val) => val?.resource_data[0]?.resource_type === 2
          )}
          currentPage={page}
          onPageChange={(page) => {
            /* istanbul ignore next */
            setPage(page);
            /* istanbul ignore next */
          }}
          loader={Loader}
          backendPagination={true}
          dataCount={10}
          selectedRecords={[]}
          rowOnePage={10}
          showPagination={false}
        />
      </Box>
    </>
  );
};

export default WorkSheet;
