import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from 'next/router'
import Layout from "../../../../components/layout";
import Loader from "../../../../components/common/Loader";
import ContentHeader from "../../../../components/common/ContentHeader";
import {
  Button, 
  Grid,
  Box,
  IconButton,
  Avatar,
  Breadcrumbs,
  Typography
} from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AttachmentIcon from '@mui/icons-material/Attachment';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useLazyQuery } from "@apollo/client";
import { buildPatientTokenValidationQuery } from "../../../../lib/helpers/auth";
import { GET_PATIENT_RESOURCE_DETAIL } from "../../../../graphql/query/resource";


const FeedbackDetail: NextPage = () => {
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

  const breadcrumbs = [
    <Typography>
      Test model
    </Typography>,
    <Typography>
      Test order
    </Typography>,
    <Typography key="3" color="text.primary">
      Breadcrumb
    </Typography>,
  ];
    return (
      <>
        <Layout>
          <Loader visible={loader} />
          <ContentHeader title="Resource Detail" />
          <Box>
          
          {patientResourceData?.getResourceDetailById && patientResourceData?.getResourceDetailById != null ?  
          <Grid container rowSpacing={2}>
              <Grid item xs={6}>
                <Button
                  mat-button
                  className={`text-white bg-themeblue`}
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  data-testid={"back"}
                >
                  <KeyboardBackspaceIcon />
                  Back
                </Button>
              </Grid>
              <Grid item 
              xs={6}
              display="flex"
              flex-direction="row-reverse"
              sx={{
                color: "primary.main"
              }} 
              style={{justifyContent:"right"}}
              >
                <Breadcrumbs separator="--›" aria-label="breadcrumb">
                {breadcrumbs}
                </Breadcrumbs>
              </Grid>
              
              <Grid 
              item xs={12}
              spacing={1}
              >
              &nbsp;
              </Grid>
              <Grid
                pb={2}
                border={1}
                item 
                xs={12}
                // alignItems="center"
                sx={{
                  backgroundColor: "secondary.main",
                  color: "primary.contrastText",
                  borderRadius: "12px",
                  textAlign: "center"
                }} 
                md={12}>
                  {patientResourceData?.getResourceDetailById[0].resource_data[0].resource_name}
              </Grid> 
              <Grid
                style={{height: '100%'}}
                spacing={3} 
                item xs={12}
                md={12}
                border={1}
                borderTop={0}
                borderColor="secondary.main"
              >
              <Grid 
                pl={2}
                item xs={12}
                md={12}>
              </Grid> 
              <Grid 
                sx={{
                  textAlign: "right"
                }}
                pl={2}
                mr={2}
                item xs={12}
                md={12}>
                <IconButton size="small" >
                  <Avatar>
                    <FileUploadIcon />
                  </Avatar>
                </IconButton>
                <IconButton size="small" >
                  <Avatar>
                    <AttachmentIcon />
                  </Avatar>
                </IconButton>
                <IconButton size="small" >
                  <Avatar>
                    <VisibilityIcon />
                  </Avatar>
                </IconButton>
                <IconButton size="small"  >
                  <Avatar>
                    <FileDownloadIcon />
                  </Avatar>
                </IconButton>
              </Grid>
              <Grid 
                sx={{
                  color: "primary.main"
                }}
                pl={2}
                item xs={12}
                md={12}>
                  Description
              </Grid>
              <Grid 
                ml={2}
                mr={2}
                border={1}
                item xs={12}
                p={1}
                sx={{
                  borderRadius: "6px",
                  borderColor: "black"
                }}
                md={12}>
                  {patientResourceData?.getResourceDetailById[0].resource_data[0].resource_desc}
              </Grid>
              <Grid 
                sx={{
                  color: "primary.main"
                }}
                pl={2}
                item xs={12}
                md={12}>
                  Instructions
              </Grid>
              <Grid 
                ml={2}
                mr={2}
                p={1}
                border={1}
                item xs={12}
                sx={{
                  borderRadius: "6px",
                  borderColor: "black"
                }}
                md={12}>
                  {patientResourceData?.getResourceDetailById[0].resource_data[0].resource_instruction}
              </Grid>
              <Grid 
                sx={{
                  color: "primary.main"
                }}
                pl={2}
                item xs={12}
                md={12}>
                  References
              </Grid>
              <Grid 
                ml={2}
                mr={2}
                border={1}
                item xs={12}
                sx={{
                  borderRadius: "6px",
                  borderColor: "black"
                }}
                md={12}
                p={1}
                >
                  {patientResourceData?.getResourceDetailById[0].resource_data[0].resource_references}
              </Grid>
            </Grid> 
            </Grid>
           : <Typography
          gutterBottom
          component="div"
          data-testid="no-data-found-patient-resource-detail"
        >
          {patientResourceData?.getResourceDetailById && patientResourceData?.getResourceDetailById == null && "No Data Found" }
        </Typography>
        }
          </Box>
        </Layout>
      </>
    );
};
export default FeedbackDetail;