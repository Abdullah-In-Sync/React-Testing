import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import ContentHeader from "../../../../components/common/ContentHeader";
import Loader from "../../../../components/common/Loader";
import Layout from "../../../../components/layout";
import MeasureTest from "../../../../components/patient/measure/test";
import { GET_MEASURE_DETAIL_BY_PATIENT } from "../../../../graphql/Measure/graphql";
import {
  GetMeasureDetailByPatientRes,
  GetMeasureDetailByPatientVars,
} from "../../../../graphql/Measure/types";
import withAuthentication from "../../../../hoc/auth";

const MeasureTestPage: NextPage = () => {
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  const { data, loading } = useQuery<
    GetMeasureDetailByPatientRes,
    GetMeasureDetailByPatientVars
  >(GET_MEASURE_DETAIL_BY_PATIENT, {
    variables: {
      measureCatId: router?.query?.id as string,
    },
  });

  console.log(data, "data");

  return (
    <>
      <Layout>
        <ContentHeader title="Measures" />
        <Loader visible={loading || loader} />
        {data?.getMeasureDetailByPatient && (
          <MeasureTest
            measureDetail={data.getMeasureDetailByPatient}
            setLoader={setLoader}
          />
        )}
      </Layout>
    </>
  );
};

export default withAuthentication(MeasureTestPage, ["patient"]);
