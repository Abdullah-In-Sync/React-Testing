import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { AddButton } from "../../../../components/common/Buttons";
import Layout from "../../../../components/layout";
import TableGenerator from "../../../../components/common/TableGenerator";
import { useLazyQuery } from "@apollo/client";
import { GET_TEMPLATE_LIST } from "../../../../graphql/query/resource";
import ContentHeader from "../../../../components/common/ContentHeader";

import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateIcon from "@mui/icons-material/Create";

const crudButtons = {
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  marginBottom: 1,
  flexDirection: "row",
};

const TemplateList = () => {
  const [page, setPage] = useState<number>(0);
  const [loader, setLoader] = useState<boolean>(false);

  const [getTemplateData, { data: resData }] = useLazyQuery(GET_TEMPLATE_LIST, {
    onCompleted: () => {
      setLoader(false);
    },
  });

  const fields = [
    {
      key: "index",
      columnName: "Serial No",
      visible: true,
      render: (val) => val,
    },
    {
      key: "name",
      columnName: "Template Name",
      visible: true,
      render: (val) => val ?? "---",
    },

    {
      key: "category",
      columnName: "Category",
      visible: true,
      render: (val) => val ?? "---",
    },

    {
      key: "actions",
      columnName: "Actions",
      visible: true,
      render: (_, value) => (
        <>
          <IconButton size="small" data-testid={"viewIcon_" + value._id}>
            <VisibilityIcon />
          </IconButton>

          <IconButton size="small" data-testid="edit-icon-button">
            <CreateIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const dataSource = useMemo(() => {
    const data = resData?.listTemplates.map((ele, index) => {
      return { ...ele, index: index + 1 };
    });
    return data || [];
  }, [resData]);

  useEffect(() => {
    setLoader(true);
    getTemplateData();
  }, []);
  return (
    <>
      <Layout>
        <ContentHeader title="Templates" data-testid="templates" />
        <Grid item xs={9}>
          <Box sx={crudButtons}>
            <Button
              className={`text-white`}
              variant="contained"
              sx={{ textTransform: "none", bottom: "4px", height: "35px" }}
              data-testid="addResource"
              href="/v2/admin/resource/add"
            >
              Add Resource
            </Button>
            <AddButton
              href="/superadmin/resource/add?create=1"
              className="mr-3"
              label="Create Resource"
              data-testid="createResource"
            />
          </Box>
        </Grid>
        {resData?.listTemplates ? (
          <Box>
            <TableGenerator
              fields={fields}
              data={dataSource}
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
        ) : (
          <Typography
            gutterBottom
            component="div"
            data-testid="no-data-found-patient-resource-detail"
          >
            No Data Found
          </Typography>
        )}
      </Layout>
    </>
  );
};
export default TemplateList;
