import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../../../components/layout";
import Loader from "../../../../components/common/Loader";
import ContentHeader from "../../../../components/common/ContentHeader";
import ResourceDetail from "../../../../components/common/ResourceDetail";
import { makeStyles } from "@mui/styles";

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
import { GET_RESOURCE_DETAIL } from "../../../../graphql/query/resource";
import withAuthentication from "../../../../hoc/auth";

const ResourceById: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [loader, setLoader] = useState<boolean>(false);
  const [resId, setResId] = useState<string>("");
  const classes = useStyles();

  const [getResourceData, { loading: resourceLoading, data: resourceData }] =
    useLazyQuery(GET_RESOURCE_DETAIL, {
      onCompleted: (data) => {
        /* istanbul ignore next */
        if (data!.getResourceById?.data) {
          setResId(data!.getResourceById["data"][0]._id);
        } else if (data!.getResourceById?.data == null) {
          setLoader(false);
        }
      },
    });

  useEffect(() => {
    setLoader(true);
    getResourceData({
      variables: { resourceId: id },
    });
  }, []);

  useEffect(() => {
    /* istanbul ignore else */
    if (!resourceLoading && resourceData) {
      setLoader(false);
    }
  }, [resId]);

  const onViewTemplate = () => {
    sessionStorage.setItem(
      /* istanbul ignore next */
      resourceData?.getResourceById["data"][0]?._id,
      /* istanbul ignore next */
      JSON.stringify({
        data: JSON.parse(
          resourceData?.getResourceById["data"][0]?.template_data
        ),
        name: resourceData?.getResourceById["data"][0].resource_name,
      })
    );
    /* istanbul ignore next */
    router.push(
      `/template/preview/${resourceData?.getResourceById["data"][0]?._id}`
    );
  };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Resource Detail" />
        <Box>
          {resourceData?.getResourceById?.data != null ? (
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
                      resourceData.getResourceById["data"][0].disorder_detail
                        .disorder_name
                    }
                  </Typography>
                  ,
                  <Typography color="primary.main">
                    {
                      resourceData.getResourceById["data"][0].model_detail
                        .model_name
                    }
                  </Typography>
                  ,
                  <Typography key="3" color="text.primary">
                    {resourceData.getResourceById["data"][0].resource_name}
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
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                md={12}
              >
                {" "}
                <Box flex={1}>
                  <Typography>
                    {resourceData.getResourceById["data"][0].resource_name}
                  </Typography>
                </Box>
                {resourceData.getResourceById["data"][0]
                  ?.resource_issmartdraw ==
                  /* istanbul ignore next */
                  "1" && (
                  <Box marginLeft={"auto"} className={classes.ellipseDiv}>
                    <IconButton
                      size="medium"
                      data-testid="viewTemplate"
                      onClick={onViewTemplate}
                      className={classes.viewIcon}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Box>
                )}
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
                {resourceData.getResourceById["data"][0]
                  ?.resource_issmartdraw != "1" && (
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
                        resourceData.getResourceById["data"][0].resource_url !=
                        null
                          ? resourceData.getResourceById["data"][0].resource_url
                          : "#"
                      }
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      size="medium"
                      data-testid="downloadUrl"
                      href={
                        resourceData.getResourceById["data"][0]
                          .download_resource_url != null
                          ? resourceData.getResourceById["data"][0]
                              .download_resource_url
                          : "#"
                      }
                    >
                      <FileDownloadIcon />
                    </IconButton>
                  </Grid>
                )}
                <ResourceDetail
                  title="Description"
                  description={
                    resourceData.getResourceById["data"][0].resource_desc
                  }
                />
                <ResourceDetail
                  title="Instructions"
                  description={
                    resourceData.getResourceById["data"][0].resource_instruction
                  }
                />
                <ResourceDetail
                  title="References"
                  description={
                    resourceData.getResourceById["data"][0].resource_references
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
              {loader === false ? "No Data Found" : ""}
            </Typography>
          )}
        </Box>
      </Layout>
    </>
  );
};
export default withAuthentication(ResourceById, ["admin"]);

export const useStyles = makeStyles({
  viewIcon: {
    "& svg": {
      width: "16px",
      height: "16px",
      color: "#000",
    },
  },
  ellipseDiv: {
    background: "#FFFFFF",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "50%",
    marginRight: "12px",
  },
});
