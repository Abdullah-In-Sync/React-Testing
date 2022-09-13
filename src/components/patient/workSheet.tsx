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
import ContentHeader from "../../components/common/ContentHeader";
import Loader from "../../components/common/Loader";
const TableGenerator = dynamic(
  import("../../components/common/TableGenerator"),
  { ssr: false }
);
import { buildPatientTokenValidationQuery } from "../../lib/helpers/auth";

// GRAPHQL
import { useLazyQuery } from "@apollo/client";
import { GET_PATIENT_RESOURCE_DATA } from "../../graphql/query/resource";

const WorkSheet = () => {
  // TABLE PROPS
  const [page, setPage] = useState<number>(0);
  const [loader, setLoader] = useState<boolean>(false);
  const [patientId, setpatientId] = useState<string>("");

  // GRAPHQL
  const [gettokenData] = buildPatientTokenValidationQuery((tokenData) => {
    setpatientId(tokenData.patient_data._id);
  });

  const [getPatientResourceData, { data: resData }] = useLazyQuery(
    GET_PATIENT_RESOURCE_DATA,
    {
      onCompleted: () => {
        setLoader(false);
      },
    }
  );

  useEffect(() => {
    setLoader(true);
    gettokenData({ variables: {} });
  }, []);

  useEffect(() => {
    if (patientId) {
      getPatientResourceData();
    }
  }, [patientId]);

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
          <IconButton size="small">
            <CloudUploadIcon />
          </IconButton>
          <IconButton
            size="small"
            href={
              value.patient_share_filename != null
                ? value.patient_share_filename
                : "#"
            }
            sx={{
              color: "primary.main",
            }}
          >
            <AttachFileIcon />
          </IconButton>
          <Link href={"/patient/resource/" + value._id} passHref>
            <IconButton size="small" data-testid={"viewIcon_" + value._id}>
              <VisibilityIcon />
            </IconButton>
          </Link>
          <IconButton
            size="small"
            data-testid="downloadUrl"
            href={
              value.download_resource_url != null
                ? value.download_resource_url
                : "#"
            }
          >
            <CloudDownloadIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <Loader visible={loader} />
      <ContentHeader subtitle="Session Resource" />
      <Box>
        <TableGenerator
          fields={fields}
          data={resData?.getPatientResourceList?.filter(
            (val) => val?.resource_data[0]?.resource_type === "2"
          )}
          currentPage={page}
          onPageChange={(page) => {
            /* istanbul ignore next */
            setPage(page);
            /* istanbul ignore next */
          }}
          loader={loader}
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
