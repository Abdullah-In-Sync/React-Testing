import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
import moment from "moment";

// MUI COMPONENTS
import { Box, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Loader from "../../components/common/Loader";
import ContentHeader from "../../components/common/ContentHeader";
const TableGenerator = dynamic(
    import("../../components/common/TableGenerator"),
    { ssr: false }
);

// GRAPHQL
import { useQuery } from "@apollo/client";
import {
    GET_PATIENT_RESOURCE_DATA
} from "../../graphql/query/resource";


const InfoSheet = () => {

    // TABLE PROPS
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [page, setPage] = useState<number>(0);
    const [loader, setLoader] = useState<boolean>(false);

    // GRAPHQL
    const { data: resData, loading } = useQuery(GET_PATIENT_RESOURCE_DATA);

    //**  TABLE DATA COLUMNS **//
    /* istanbul ignore next */
    const fields = [
        {
            key: "created_date",
            columnName: "Shared On",
            visible: true,
            render: (val) => moment(val).format("DD MMM YYYY hh:mm:ss A") ?? "---",
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
                <IconButton
                    size="small"
                    data-testid={"viewIcon_" + value._id}
                // onClick={() => handleView(value._id)}
                >
                    <VisibilityIcon />
                </IconButton>


            ),
        },
    ];

    return (
        <>
            <ContentHeader subtitle="Session Resource" />
            <Box>
                <TableGenerator
                    fields={fields}
                    data={resData?.getPatientResourceList}
                    currentPage={page}
                    onPageChange={(page) => {
                        /* istanbul ignore next */
                        setPage(page);
                        /* istanbul ignore next */
                    }}
                    backendPagination={true}
                    onRowPerPageChange={(rows) => {
                        setRowsPerPage(rows);
                    }}
                    loader={loading}
                    dataCount={10}
                    selectedRecords={[]}
                    rowOnePage={10}
                    showPagination={false}
                />
            </Box>
        </>
    )
}

export default InfoSheet;