import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
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
import AttachmentIcon from "@mui/icons-material/Attachment";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import NextLink from "next/link";

import { buildPatientTokenValidationQuery } from "../../../../lib/helpers/auth";
import {
  GET_PATIENT_RESOURCE_DATA,
  GET_PATIENT_RESOURCE_DETAIL,
} from "../../../../graphql/query/resource";
import FileUpload from "../../../../components/common/Dialog";

const ResourceDetailById: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [loader, setLoader] = useState<boolean>(false);
  const [ptId, setPtId] = useState<string>("");
  const [patientId, setpatientId] = useState<string>("");

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true);
  const [fileUpload, setFileUpload] = useState<boolean | null>(null);

  const [gettokenData, tokenLoading] = buildPatientTokenValidationQuery(
    (tokenData) => {
      setpatientId(tokenData.patient_data._id);
    }
  );

  const [
    getPatientResourceData,
    { loading: resourceLoading, data: patientResourceData },
  ] = useLazyQuery(GET_PATIENT_RESOURCE_DETAIL, {
    onCompleted: (data) => {
      /* istanbul ignore else */
      if (data!.getResourceDetailById) {
        setPtId(data!.getResourceDetailById[0]._id);
      } else if (data!.getResourceDetailById == null) {
        setLoader(false);
      }
    },
  });

  const openFileUploadDialog = () => {
    setFileUpload(true);
  };

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
    gettokenData({ variables: {} });
  }, []);

  useEffect(() => {
    if (patientId) {
      setLoader(true);
      getPatientResourceData({
        variables: { ptsharresId: id },
      });
    }
  }, [patientId]);

  useEffect(() => {
    /* istanbul ignore else */
    if (
      !tokenLoading &&
      !resourceLoading &&
      gettokenData &&
      patientResourceData
    ) {
      setLoader(false);
    }
  }, [ptId]);
  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Resource Detail" />
        <Box>
          {patientResourceData?.getResourceDetailById != null ? (
            <Grid container rowSpacing={2} data-testid="patResourceDetail">
              <Grid item xs={6} data-testid="backButton">
                <NextLink
                  passHref
                  href={{
                    pathname: "/patient/resource",
                    query: {
                      tabName: router.query.tabName,
                    },
                  }}
                >
                  <Button
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
                      patientResourceData.getResourceDetailById[0]
                        .disorder_detail.disorder_name
                    }
                  </Typography>
                  ,
                  <Typography color="primary.main">
                    {
                      patientResourceData.getResourceDetailById[0].model_detail
                        .model_name
                    }
                  </Typography>
                  ,
                  <Typography key="3" color="text.primary">
                    {
                      patientResourceData.getResourceDetailById[0]
                        .resource_data[0].resource_name
                    }
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
                {
                  patientResourceData.getResourceDetailById[0].resource_data[0]
                    .resource_name
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
                  {patientResourceData.getResourceDetailById[0].resource_data[0]
                    .resource_type == 2 && (
                    <IconButton
                      size="small"
                      onClick={openFileUploadDialog}
                      data-testid="fileUpload"
                    >
                      <FileUpload
                        closeFileUploadDialog={closeFileUploadDialog}
                        open={fileUpload}
                        ptshareId={
                          resData?.getPatientResourceList?.find(
                            (val) => val?.resource_data[0]?.resource_type === 2
                          )._id
                        }
                      />
                      <FileUploadIcon />
                    </IconButton>
                  )}
                  <IconButton
                    size="medium"
                    data-testid="shareViewUrl"
                    href={
                      patientResourceData.getResourceDetailById[0]
                        .patient_share_filename != null
                        ? patientResourceData.getResourceDetailById[0]
                            .patient_share_filename
                        : "#"
                    }
                    sx={{
                      color:
                        patientResourceData.getResourceDetailById[0]
                          ?.patient_share_filename != null
                          ? "primary.main"
                          : "",
                    }}
                  >
                    <AttachmentIcon />
                  </IconButton>

                  <IconButton
                    size="medium"
                    data-testid="viewUrl"
                    target="_blank"
                    href={
                      patientResourceData.getResourceDetailById[0]
                        .resource_data[0].resource_url != null
                        ? patientResourceData.getResourceDetailById[0]
                            .resource_data[0].resource_url
                        : "#"
                    }
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    size="medium"
                    data-testid="downloadUrl"
                    href={
                      patientResourceData.getResourceDetailById[0]
                        .resource_data[0].download_resource_url != null
                        ? patientResourceData.getResourceDetailById[0]
                            .resource_data[0].download_resource_url
                        : "#"
                    }
                  >
                    <FileDownloadIcon />
                  </IconButton>
                </Grid>
                <ResourceDetail
                  title="Description"
                  description={
                    patientResourceData.getResourceDetailById[0]
                      .resource_data[0].resource_desc
                  }
                />
                <ResourceDetail
                  title="Instructions"
                  description={
                    patientResourceData.getResourceDetailById[0]
                      .resource_data[0].resource_instruction
                  }
                />
                <ResourceDetail
                  title="References"
                  description={
                    patientResourceData.getResourceDetailById[0]
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
          )}
        </Box>
      </Layout>
    </>
  );
};
export default ResourceDetailById;
