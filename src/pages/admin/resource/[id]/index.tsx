import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../../../components/layout";
import Loader from "../../../../components/common/Loader";
import ContentHeader from "../../../../components/common/ContentHeader";
import ResourceDetail from "../../../../components/common/ResourceDetail";
import {
  Button,
  Grid,
  Box,
  IconButton,
  Breadcrumbs,
  Typography,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import NextLink from "next/link";

import { useLazyQuery } from "@apollo/client";
import { buildAdminTokenValidationQuery } from "../../../../lib/helpers/auth";
import { GET_RESOURCE_DETAIL } from "../../../../graphql/query/resource";

const ResourceById: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [loader, setLoader] = useState<boolean>(false);
  const [resId, setResId] = useState<string>("");
  const [AdminId, setadminId] = useState<string>("");

  const [gettokenData, tokenLoading] = buildAdminTokenValidationQuery(
    (tokenData) => {
      setadminId(tokenData._id);
    }
  );

  const [getResourceData, { loading: resourceLoading, data: resourceData }] =
    useLazyQuery(GET_RESOURCE_DETAIL, {
      onCompleted: (data) => {
        /* istanbul ignore else */
        if (data!.getResourceById) {
          setResId(data!.getResourceById[0]._id);
        } else if (data!.getResourceById == null) {
          setLoader(false);
        }
      },
    });

  useEffect(() => {
    setLoader(true);
    gettokenData({ variables: {} });
  }, []);

  useEffect(() => {
    if (AdminId) {
      setLoader(true);
      getResourceData({
        variables: { resourceId: id },
      });
    }
  }, [AdminId]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!tokenLoading && !resourceLoading && gettokenData && resourceData) {
      setLoader(false);
    }
  }, [resId]);

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Resource Detail" />
        <Box>
          {resourceData?.getResourceById != null ? (
            <Grid container rowSpacing={2} data-testid="adminResourceDetail">
              <Grid item xs={6}>
                <NextLink href={"/admin/resource"} passHref>
                  <Button
                    data-testid="backButton"
                    mat-button
                    className={`text-white bg-themeblue`}
                    variant="contained"
                    sx={{ textTransform: "none" }}
                  >
                    <KeyboardBackspaceIcon />
                    Back
                  </Button>
                </NextLink>
              </Grid>
              <Grid
                xs={6}
                display="flex"
                flex-direction="row-reverse"
                sx={{
                  color: "primary.main",
                }}
                style={{ justifyContent: "right" }}
              >
                <Breadcrumbs
                  separator="--›"
                  aria-label="breadcrumb"
                  data-testid="breadCrumb"
                >
                  <Typography color="primary.main">
                    {
                      resourceData.getResourceById[0].disorder_detail
                        .disorder_name
                    }
                  </Typography>
                  ,
                  <Typography color="primary.main">
                    {resourceData.getResourceById[0].model_detail.model_name}
                  </Typography>
                  ,
                  <Typography key="3" color="text.primary">
                    {resourceData.getResourceById[0].resource_name}
                  </Typography>
                </Breadcrumbs>
              </Grid>

              <Grid xs={12} spacing={1}>
                &nbsp;
              </Grid>
              <Grid
                data-testid="resourceName"
                pt={1}
                pb={1}
                border={1}
                xs={12}
                sx={{
                  backgroundColor: "secondary.main",
                  color: "primary.contrastText",
                  borderRadius: "12px",
                  textAlign: "center",
                }}
                md={12}
              >
                {resourceData.getResourceById[0].resource_name}
              </Grid>
              <Grid
                p={1}
                spacing={3}
                xs={12}
                md={12}
                border={1}
                borderTop={0}
                borderColor="secondary.main"
              >
                <Grid pl={2} xs={12} md={12}></Grid>
                <Grid
                  data-testid="iconsTarget"
                  sx={{
                    textAlign: "right",
                  }}
                  pl={2}
                  mr={2}
                  xs={12}
                  md={12}
                >
                  <IconButton
                    size="medium"
                    data-testid="viewUrl"
                    target="_blank"
                    href={
                      resourceData.getResourceById[0].resource_url != null
                        ? resourceData.getResourceById[0].resource_url
                        : "#"
                    }
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    size="medium"
                    data-testid="downloadUrl"
                    href={
                      resourceData.getResourceById[0].download_resource_url !=
                      null
                        ? resourceData.getResourceById[0].download_resource_url
                        : "#"
                    }
                  >
                    <FileDownloadIcon />
                  </IconButton>
                </Grid>
                <ResourceDetail
                  title="Description"
                  description={resourceData.getResourceById[0].resource_desc}
                />
                <ResourceDetail
                  title="Instructions"
                  description={
                    resourceData.getResourceById[0].resource_instruction
                  }
                />
                <ResourceDetail
                  title="References"
                  description={
                    resourceData.getResourceById[0].resource_references
                  }
                />

                <Grid xs={12} spacing={1}>
                  &nbsp;
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Typography
              gutterBottom
              component="div"
              data-testid="no-data-found-patient-resource-detail"
            >
              {loader === true ? "" : "No Data Found"}
            </Typography>
          )}
        </Box>
      </Layout>
    </>
  );
};
export default ResourceById;
