import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Loader from "../../../../../components/common/Loader";
import Layout from "../../../../../components/layout";
import MeasureTest from "../../../../../components/patient/measures/measureTest";
import { VIEW_MEASURE_RESPONSE } from "../../../../../graphql/Measure/graphql";
import {
  MeasureDetail,
  ViewMeasureScoreResponse,
  ViewMeasureScoreResponseVar,
} from "../../../../../graphql/Measure/types";
import withAuthentication from "../../../../../hoc/auth";

const PatientResponsePage: NextPage = () => {
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  const { data, loading } = useQuery<
    ViewMeasureScoreResponse,
    ViewMeasureScoreResponseVar
  >(VIEW_MEASURE_RESPONSE, {
    variables: {
      patScoreId: router?.query?.response_id as string,
    },
  });

  const measureDetailTransform: MeasureDetail[] = useMemo(() => {
    if (!data?.viewMeasureResponse) return null;

    console.log(data);

    const measureDetail: MeasureDetail[] = data?.viewMeasureResponse?.map(
      (md) => ({
        _id: md?.measure_cat_id,
        measure_cat_id: md?.measure_cat_id,
        measure_cat_ques: md?.patientmeasurequestion?.patmques_ques,
        measure_cat_ques_type: 0,
        everyday: md?.patientmeasurequestion?.patmques_everyday,
        notatall: md?.patientmeasurequestion?.patmques_notatall,
        severaldays: md?.patientmeasurequestion?.patmques_severaldays,
        halfthedays: md?.patientmeasurequestion?.patmques_halfthedays,
      })
    );

    return measureDetail;
  }, [data]);
  return (
    <>
      <Layout>
        <ContentHeader title="Measures" />
        <Loader visible={loading || loader} />
        {measureDetailTransform && (
          <MeasureTest
            measureDetail={measureDetailTransform}
            setLoader={setLoader}
            disabled={true}
            patmScoreDifficultInit={parseInt(
              data?.viewMeasureResponse[0].patmscore_difficult
            )}
          />
        )}
      </Layout>
    </>
  );
};

export default withAuthentication(PatientResponsePage, ["patient"]);
