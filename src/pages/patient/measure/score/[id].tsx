import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import ContentHeader from "../../../../components/common/ContentHeader";
import Loader from "../../../../components/common/Loader";
import Layout from "../../../../components/layout";
import { MeasureScoreList } from "../../../../components/patient/measure/measureScoreList";
import MeasureTest from "../../../../components/patient/measure/measureTest";
import {
  GET_MEASURE_DETAIL_BY_PATIENT,
  VIEW_MEASURE_SCORE_BY_PATIENT,
} from "../../../../graphql/Measure/graphql";
import {
  GetMeasureDetailByPatientRes,
  GetMeasureDetailByPatientVars,
  ViewMeasureScoreByPatientRes,
  ViewMeasureScoreByPatientVars,
} from "../../../../graphql/Measure/types";
import withAuthentication from "../../../../hoc/auth";

const MeasureScorePage: NextPage = () => {
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  const { data, loading } = useQuery<
    ViewMeasureScoreByPatientRes,
    ViewMeasureScoreByPatientVars
  >(VIEW_MEASURE_SCORE_BY_PATIENT, {
    variables: {
      measureCatId: router?.query?.id as string,
    },
  });

  console.log(data, "data");

  return (
    <>
      <Layout>
        <ContentHeader title="Measures Score" />
        <Loader visible={loading || loader} />
        {data?.viewMeasureScoreByPatient && (
          <MeasureScoreList
            measureScoreDetail={data?.viewMeasureScoreByPatient}
          />
        )}
      </Layout>
    </>
  );
};

export default withAuthentication(MeasureScorePage, ["patient"]);
