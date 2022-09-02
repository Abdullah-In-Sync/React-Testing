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
  Avatar,
  Breadcrumbs,
  Typography,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import AttachmentIcon from "@mui/icons-material/Attachment";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import NextLink from "next/link";

import { useLazyQuery } from "@apollo/client";
import { buildPatientTokenValidationQuery } from "../../../../lib/helpers/auth";
import { GET_PATIENT_RESOURCE_DETAIL } from "../../../../graphql/query/resource";

const ResourceDetailById: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [loader, setLoader] = useState<boolean>(false);
  const [ptId, setPtId] = useState<string>("");
  const [patientId, setpatientId] = useState<string>("");

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
              <Grid item xs={6}>
                <NextLink href={"/patient/resource"} passHref>
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
                  <Typography>
                    {
                      patientResourceData.getResourceDetailById[0]
                        .disorder_detail.disorder_name
                    }
                  </Typography>
                  ,
                  <Typography>
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
                  <IconButton size="small">
                    <Avatar>
                      <FileUploadIcon />
                    </Avatar>
                  </IconButton>
                  <IconButton size="small">
                    <Avatar>
                      <AttachmentIcon />
                    </Avatar>
                  </IconButton>
                  <IconButton size="small">
                    <Avatar>
                      <VisibilityIcon />
                    </Avatar>
                  </IconButton>
                  <IconButton size="small">
                    <Avatar>
                      <FileDownloadIcon />
                    </Avatar>
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
