import FileDownloadIcon from "@mui/icons-material/FileDownload";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import type { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentHeader from "../../../../components/common/ContentHeader";
import Loader from "../../../../components/common/Loader";
import ResourceDetail from "../../../../components/common/ResourceDetail";
import Layout from "../../../../components/layout";

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
      resourceData?.getResourceById[0]?._id,
      JSON.stringify({
        data: JSON.parse(resourceData?.getResourceById[0]?.template_data),
        name: resourceData?.getResourceById[0].resource_name,
      })
    );
    router.push(`/template/preview/${resourceData?.getResourceById[0]?._id}`);
  };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Resource Detail" />
        <Box>
          {resourceData?.getResourceById != null ? (
            <Grid
              container
              rowSpacing={2}
              data-testid="therapistResourceDetail"
            >
              <Grid item xs={6}>
                <NextLink href={"/therapist/resource"} passHref>
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
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                md={12}
              >
                <Box flex={1}>
                  <Typography>
                    {resourceData.getResourceById[0].resource_name}
                  </Typography>
                </Box>
                {resourceData.getResourceById[0]?.resource_issmartdraw ==
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
                {resourceData.getResourceById[0]?.resource_issmartdraw !=
                  "1" && (
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
                    {/* <NextLink href={`/therapist/resource/view/${id}`}> */}
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
                    {/* </NextLink> */}
                    <IconButton
                      size="medium"
                      data-testid="downloadUrl"
                      href={
                        resourceData.getResourceById[0].download_resource_url !=
                        null
                          ? resourceData.getResourceById[0]
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
              {loader === false ? "No Data Found" : ""}
            </Typography>
          )}
        </Box>
      </Layout>
    </>
  );
};
export default withAuthentication(ResourceById, ["therapist"]);

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
