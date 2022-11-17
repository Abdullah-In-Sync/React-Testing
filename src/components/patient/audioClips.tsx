import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import moment from "moment";
import Link from "next/link";

// MUI COMPONENTS
import { Box, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ContentHeader from "../../components/common/ContentHeader";
import Loader from "../../components/common/Loader";
const TableGenerator = dynamic(
  import("../../components/common/TableGenerator"),
  { ssr: false }
);

// GRAPHQL
import { useLazyQuery } from "@apollo/client";
import { GET_PATIENT_RESOURCE_DATA } from "../../graphql/query/resource";

const AudioClips = () => {
  // TABLE PROPS
  const [page, setPage] = useState<number>(0);
  const [loader, setLoader] = useState<boolean>(false);

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
    getPatientResourceData();
  }, []);

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
        <Link
          href={{
            pathname: "/patient/resource/" + value._id,
            query: {
              tabName: "audio-clips",
            },
          }}
          passHref
        >
          <IconButton size="small" data-testid={"viewIcon_" + value._id}>
            <VisibilityIcon />
          </IconButton>
        </Link>
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
            (val) => val?.resource_data[0]?.resource_type === 3
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

export default AudioClips;
