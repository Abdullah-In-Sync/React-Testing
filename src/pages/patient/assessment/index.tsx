import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useLazyQuery } from "@apollo/client";
import Layout from "../../../components/layout";
import PatientAssessmentList from "../../../components/patient/assessment/list";
import ContentHeader from "../../../components/common/ContentHeader";
import { GET_PATIENT_ASSESSMENT_LIST } from "../../../graphql/query/patient";
import Loader from "../../../components/common/Loader";
import { Typography } from "@mui/material";

const PatientAssessment: NextPage = () => {
  const [loader, setLoader] = useState<boolean>(true);

  const [getPatientAssessmentData, { data: patientAssessmentList }] =
    useLazyQuery(GET_PATIENT_ASSESSMENT_LIST, {
      onCompleted: (data) => {
        console.log("Koca: data ", data);
        setLoader(false);
      },
    });

  /* istanbul ignore next */
  useEffect(() => {
    getPatientAssessmentData();
  }, []);

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Assessment" />

        {patientAssessmentList?.patientAssessmentList?.data?.length ? (
          <PatientAssessmentList
            patientAssessmentList={patientAssessmentList}
          />
        ) : (
          <Typography>No data found</Typography>
        )}
      </Layout>
    </>
  );
};
export default PatientAssessment;
