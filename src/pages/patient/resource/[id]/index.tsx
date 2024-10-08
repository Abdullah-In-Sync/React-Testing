import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../../../components/layout";
import Loader from "../../../../components/common/Loader";
import ContentHeader from "../../../../components/common/ContentHeader";
import ResourceDetail from "../../../../components/common/ResourceDetail";
import { Button, Grid, Box, IconButton, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import AttachmentIcon from "@mui/icons-material/Attachment";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import NextLink from "next/link";

import {
  GET_PATIENT_RESOURCE_DATA,
  GET_PATIENT_RESOURCE_DETAIL,
} from "../../../../graphql/query/resource";
import FileUpload from "../../../../components/common/Dialog";
import withAuthentication from "../../../../hoc/auth";

const ResourceDetailById: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [loader, setLoader] = useState<boolean>(false);
  const [ptId, setPtId] = useState<string>("");

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true);
  const [fileUpload, setFileUpload] = useState<boolean | null>(null);

  const [
    getPatientResourceData,
    { loading: resourceLoading, data: patientResourceData },
  ] = useLazyQuery(GET_PATIENT_RESOURCE_DETAIL, {
    onCompleted: (data) => {
      /* istanbul ignore next */
      if (data!.getResourceDetailById) {
        setPtId(data!.getResourceDetailById.data[0]._id);
      } else if (data!.getResourceDetailById?.data[0] == null) {
        setLoader(false);
      }
    },
  });

  /* istanbul ignore next */
  const openFileUploadDialog = () => {
    setFileUpload(true);
  };

  /* istanbul ignore next */
  const closeFileUploadDialog = () => {
    setIsDialogOpen(false);
    setFileUpload(false);
  };

  const { data: resData } = useQuery(GET_PATIENT_RESOURCE_DATA);

  useEffect(() => {
    // no condition in case of open
    /* istanbul ignore next */
    if (isDialogOpen === false) {
      setFileUpload(false);
      setIsDialogOpen(true);
    }
  }, [fileUpload === true, isDialogOpen === false]);

  useEffect(() => {
    setLoader(true);
    getPatientResourceData({
      variables: { ptsharresId: id },
    });
  }, []);

  useEffect(() => {
    /* istanbul ignore next */
    if (!resourceLoading && patientResourceData) {
      setLoader(false);
    }
  }, [ptId]);
  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Resource Detail" />
        <Box>
          {
            /* istanbul ignore next */
            patientResourceData?.getResourceDetailById?.data[0] != null ? (
              <Grid container rowSpacing={2} data-testid="patResourceDetail">
                <Grid item xs={6} data-testid="backButton">
                  <Button
                    mat-button
                    className={`text-white bg-themeblue`}
                    variant="contained"
                    sx={{ textTransform: "none" }}
                    onClick={() =>
                      /* istanbul ignore next */
                      router.back()
                    }
                  >
                    <KeyboardBackspaceIcon />
                    Back
                  </Button>

                  {
                    /* istanbul ignore next */
                    patientResourceData.getResourceDetailById.data[0]
                      .resource_data[0].resource_issmartdraw == "1" && (
                      <NextLink
                        passHref
                        href={{
                          pathname: `/patient/resource/edit/${id}`,
                          query: {
                            tabName: router.query.tabName,
                          },
                        }}
                      >
                        <Button
                          mat-button
                          className={`text-white bg-themeblue`}
                          variant="contained"
                          sx={{ textTransform: "none", ml: 2 }}
                        >
                          Next
                          <ArrowRightAlt />
                        </Button>
                      </NextLink>
                    )
                  }
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
                  {
                    /* istanbul ignore next */
                    patientResourceData.getResourceDetailById.data[0]
                      .resource_data[0].resource_name
                  }
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
                    {
                      /* istanbul ignore next */
                      patientResourceData.getResourceDetailById.data[0]
                        .resource_data[0].resource_type == 2 &&
                        patientResourceData.getResourceDetailById.data[0]
                          .resource_data[0].resource_issmartdraw != "1" && (
                          <IconButton
                            size="small"
                            onClick={openFileUploadDialog}
                            data-testid="fileUpload"
                          >
                            <FileUpload
                              closeFileUploadDialog={closeFileUploadDialog}
                              open={fileUpload}
                              ptshareId={
                                /* istanbul ignore next */
                                resData?.getPatientResourceList?.data?.find(
                                  (val) =>
                                    val?.resource_data[0]?.resource_type === 2
                                )._id
                              }
                            />
                            <FileUploadIcon />
                          </IconButton>
                        )
                    }
                    {
                      /* istanbul ignore next */
                      patientResourceData.getResourceDetailById.data[0]
                        .resource_data[0].resource_issmartdraw != "1" && (
                        <IconButton
                          size="medium"
                          data-testid="shareViewUrl"
                          href={
                            patientResourceData.getResourceDetailById.data[0]
                              .patient_share_filename != null
                              ? patientResourceData.getResourceDetailById
                                  .data[0].patient_share_filename
                              : "#"
                          }
                          sx={{
                            color:
                              patientResourceData.getResourceDetailById.data[0]
                                ?.patient_share_filename != null
                                ? "primary.main"
                                : "",
                          }}
                        >
                          <AttachmentIcon />
                        </IconButton>
                      )
                    }

                    {
                      /* istanbul ignore next */
                      patientResourceData.getResourceDetailById.data[0]
                        .resource_data[0].resource_issmartdraw != "1" && (
                        <IconButton
                          size="medium"
                          data-testid="viewUrl"
                          target="_blank"
                          href={
                            patientResourceData.getResourceDetailById.data[0]
                              .resource_data[0].resource_url != null
                              ? patientResourceData.getResourceDetailById
                                  .data[0].resource_data[0].resource_url
                              : "#"
                          }
                        >
                          <VisibilityIcon />
                        </IconButton>
                      )
                    }
                    {
                      /* istanbul ignore next */
                      patientResourceData.getResourceDetailById.data[0]
                        .resource_data[0].resource_issmartdraw != "1" && (
                        <IconButton
                          size="medium"
                          data-testid="downloadUrl"
                          href={
                            patientResourceData.getResourceDetailById.data[0]
                              .resource_data[0].download_resource_url != null
                              ? patientResourceData.getResourceDetailById
                                  .data[0].resource_data[0]
                                  .download_resource_url
                              : "#"
                          }
                        >
                          <FileDownloadIcon />
                        </IconButton>
                      )
                    }
                  </Grid>
                  <ResourceDetail
                    title="Description"
                    description={
                      /* istanbul ignore next */
                      patientResourceData.getResourceDetailById.data[0]
                        .resource_data[0].resource_desc
                    }
                  />
                  <ResourceDetail
                    title="Instructions"
                    description={
                      /* istanbul ignore next */
                      patientResourceData.getResourceDetailById.data[0]
                        .resource_data[0].resource_instruction
                    }
                  />
                  <ResourceDetail
                    title="References"
                    description={
                      /* istanbul ignore next */
                      patientResourceData.getResourceDetailById.data[0]
                        .resource_data[0].resource_references
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
                No Data Found
              </Typography>
            )
          }
        </Box>
      </Layout>
    </>
  );
};
export default withAuthentication(ResourceDetailById, ["patient"]);
