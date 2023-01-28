import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Layout from "../../../../../components/layout";
import Loader from "../../../../../components/common/Loader";
import ViewSafetyPlan from "../../../../../components/admin/safetyPlan/viewSafetyPlan/viewSafetyPlan";
import { VIEW_SAFETY_BY_PATIENT_ID } from "../../../../../graphql/SafetyPlan/graphql";

const SafetyPlanIndex = () => {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  /* istanbul ignore next */
  const id = router?.query.id as string;

  const [
    getSafetyPlanViewData,
    { loading: loadingSafetyPlanView, data: viewData },
  ] = useLazyQuery(VIEW_SAFETY_BY_PATIENT_ID, {
    onCompleted: (data) => {
      console.log("Koca: data ", data);
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  useEffect(() => {
    /* istanbul ignore next */
    setLoader(true);
    getSafetyPlanViewData({
      variables: { planId: id },
    });
    setLoader(false);
  }, []);

  useEffect(() => {
    /* istanbul ignore next */
    if (!loadingSafetyPlanView && !viewData) {
      setLoader(false);
    }
  }, [viewData]);

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="View Plan" />
        <ViewSafetyPlan viewData={viewData} />
      </Layout>
    </>
  );
};

export default SafetyPlanIndex;
