
import React, { useState } from "react";
import dynamic from "next/dynamic";
import moment from "moment";

// MUI COMPONENTS
import { Box, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ContentHeader from "../../components/common/ContentHeader";
import Loader from "../../components/common/Loader";
const TableGenerator = dynamic(
  import("../../components/common/TableGenerator"),
  { ssr: false }
);

// GRAPHQL
import { useQuery } from "@apollo/client";
import { GET_PATIENT_RESOURCE_DATA } from "../../graphql/query/resource";

const WorkSheet = () => {
  // TABLE PROPS
  const [page, setPage] = useState<number>(0);

  // GRAPHQL
  const { data: resData, loading } = useQuery(GET_PATIENT_RESOURCE_DATA);

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

          <IconButton
            size="small"
            data-testid={"viewIcon_" + value._id}
          // onClick={() => handleView(value._id)}
          >
            <CloudUploadIcon />
          </IconButton>
          <IconButton
            size="small"
            data-testid={"viewIcon_" + value._id}
          // onClick={() => handleView(value._id)}
          >
            <AttachFileIcon />
          </IconButton>
          <IconButton
            size="small"
            data-testid={"viewIcon_" + value._id}
          // onClick={() => handleView(value._id)}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            size="small"
            data-testid={"viewIcon_" + value._id}
          // onClick={() => handleView(value._id)}
          >
            <CloudDownloadIcon />
          </IconButton>



        </>
      ),
    },
  ];

  return (
    <>
      <Loader visible={loading} />
      <ContentHeader subtitle="Session Resource" />
      <Box>
        <TableGenerator
          fields={fields}
          data={resData?.getPatientResourceList?.filter(val => val?.resource_data[0]?.resource_type === "2")}

          currentPage={page}
          onPageChange={(page) => {
            /* istanbul ignore next */
            setPage(page);
            /* istanbul ignore next */
          }}
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

