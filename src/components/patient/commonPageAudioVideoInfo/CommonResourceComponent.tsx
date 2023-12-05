import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import { Box, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useLazyQuery } from "@apollo/client";
import { GET_PATIENT_RESOURCE_DATA } from "../../../graphql/query/resource";
import Loader from "../../common/Loader";
import ContentHeader from "../../common/ContentHeader";
import dynamic from "next/dynamic";
import { checkPrivilageAccess } from "../../../utility/helper";

const TableGenerator = dynamic(import("../../common/TableGenerator"), {
  ssr: false,
});

const CommonResourceComponent = ({ resourceType, tabName }) => {
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

  const isViewResource = checkPrivilageAccess("Resource", "View");

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
      render: (_, value) => {
        /* istanbul ignore next */
        if (isViewResource === true || isViewResource === undefined) {
          return (
            <Link
              href={{
                pathname: `/patient/resource/${value._id}`,
                query: {
                  tabName: tabName,
                },
              }}
              passHref
            >
              <IconButton size="small" data-testid={`viewIcon_${value._id}`}>
                <VisibilityIcon />
              </IconButton>
            </Link>
          );
        } else {
          return null;
        }
      },
    },
  ];

  return (
    <>
      <Loader visible={loader} />
      <ContentHeader />
      <Box>
        <TableGenerator
          fields={fields}
          data={
            /* istanbul ignore next */
            resData?.getPatientResourceList?.data?.filter(
              (val) => val?.resource_data[0]?.resource_type === resourceType
            )
          }
          currentPage={page}
          onPageChange={(page) => setPage(page)}
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

export default CommonResourceComponent;
