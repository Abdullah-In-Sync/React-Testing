import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Loader from "../../../../../components/common/Loader";
import Layout from "../../../../../components/layout";
import { MeasureScoreList } from "../../../../../components/patient/measures/measureScoreList";
import { VIEW_MEASURE_SCORE_BY_PATIENT } from "../../../../../graphql/Measure/graphql";
import {
  ViewMeasureScoreByPatientRes,
  ViewMeasureScoreByPatientVars,
} from "../../../../../graphql/Measure/types";
import withAuthentication from "../../../../../hoc/auth";

const MeasureScorePage: NextPage = () => {
  const router = useRouter();
  const { data, loading } = useQuery<
    ViewMeasureScoreByPatientRes,
    ViewMeasureScoreByPatientVars
  >(VIEW_MEASURE_SCORE_BY_PATIENT, {
    variables: {
      measureCatId: router?.query?.id as string,
    },
  });

  return (
    <>
      <Layout>
        <ContentHeader title="Measures Score" />
        <Loader visible={loading} />
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
