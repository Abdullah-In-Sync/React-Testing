import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useLazyQuery } from "@apollo/client";
import Layout from "../../../../../components/layout";
import ContentHeader from "../../../../../components/common/ContentHeader";
import { GET_PATIENT_ASSESSMENT_CATOGARY_LIST_BY_ASSESSMENT_ID } from "../../../../../graphql/query/patient";
import PatientClinicalAssessmentList from "../../../../../components/patient/assessment/clinicalAssessmentList";
import { useRouter } from "next/router";
import Loader from "../../../../../components/common/Loader";
import { Typography } from "@material-ui/core";

const PatientClinicalAssessment: NextPage = () => {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(true);
  const assessmentId = router?.query?.id as string;

  const [
    getPatientAssessmentCatagoryListData,
    { data: patientAssessmentCatagoryList },
  ] = useLazyQuery(GET_PATIENT_ASSESSMENT_CATOGARY_LIST_BY_ASSESSMENT_ID, {
    onCompleted: (data) => {
      console.log("Koca: data ", data);
      setLoader(false);
    },
  });

  const assessmentCatogeryData =
    patientAssessmentCatagoryList?.getAssessmentCategoryWithQues;

  /* istanbul ignore next */
  useEffect(() => {
    getPatientAssessmentCatagoryListData({
      variables: {
        assessment_id: assessmentId,
      },
    });
  }, []);

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Clinical Assessment" />

        {assessmentCatogeryData?.category?.length ? (
          <PatientClinicalAssessmentList
            patientClinicalAssessmentList={assessmentCatogeryData}
          />
        ) : (
          <Typography>No data found</Typography>
        )}
      </Layout>
    </>
  );
};
export default PatientClinicalAssessment;
