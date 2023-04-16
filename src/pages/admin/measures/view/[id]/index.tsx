import { useLazyQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ViewMeasureComponent from "../../../../../components/admin/measures/view/ViewMeasure";
import Loader from "../../../../../components/common/Loader";
import Layout from "../../../../../components/layout";
import { AdMIN_VIEW_MEASURE } from "../../../../../graphql/Measure/graphql";
import { ViewMeasureData } from "../../../../../graphql/Measure/types";

const ViewMeasures: NextPage = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const measureId = id as string;
  const [loader, setLoader] = useState<boolean>(true);

  const [
    getAdminMeasure,
    {
      loading: loadingMeasureData,
      data: { adminViewMeasureById: measureData = null } = {},
    },
  ] = useLazyQuery<ViewMeasureData>(AdMIN_VIEW_MEASURE, {
    fetchPolicy: "cache-and-network",
    onCompleted: () => {
      setLoader(false);
    },
  });

  useEffect(() => {
    getAdminMeasure({
      variables: {
        measureId,
      },
    });
  }, []);

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        {!loadingMeasureData && (
          <ViewMeasureComponent measureData={measureData} />
        )}
      </Layout>
    </>
  );
};

export default ViewMeasures;
