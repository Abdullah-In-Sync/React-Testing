import { useLazyQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Loader from "../../../../../components/common/Loader";
import Layout from "../../../../../components/layout";
import { MeasureScoreList } from "../../../../../components/patient/measures/measureScoreList";
import { VIEW_MEASURE_SCORE_BY_PATIENT } from "../../../../../graphql/Measure/graphql";
import withAuthentication from "../../../../../hoc/auth";
import { useEffect } from "react";

const MeasureScorePage: NextPage = () => {
  const router = useRouter();

  const [
    getViewScoreData,
    { loading: dataLoading, data: patientViewScoreData },
  ] = useLazyQuery(VIEW_MEASURE_SCORE_BY_PATIENT, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      console.log("Koca: data ", data);
    },
  });

  useEffect(() => {
    getViewScoreData({
      variables: {
        measure_id: router?.query?.id as string,
      },
    });
  }, []);

  return (
    <>
      <Layout>
        <ContentHeader title="Measures Score" />
        <Loader visible={dataLoading} />
        {patientViewScoreData?.patientViewScoreList && (
          <MeasureScoreList
            measureScoreDetail={patientViewScoreData?.patientViewScoreList}
          />
        )}
      </Layout>
    </>
  );
};

export default withAuthentication(MeasureScorePage, ["patient"]);
