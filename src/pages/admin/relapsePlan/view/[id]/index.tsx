import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminRelapseView from "../../../../../components/admin/relapsePlan/view";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Loader from "../../../../../components/common/Loader";
import Layout from "../../../../../components/layout";
import { VIEW_RELAPSE_BY_PLAN_ID } from "../../../../../graphql/Relapse/graphql";

const RelapsePlanPage = () => {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(true);
  /* istanbul ignore next */
  const { query: { id = null } = {} } = router || {};

  const [
    getRelapsePlanViewData,
    {
      loading: loadingRelapsePlanView,
      data: { adminViewRelapseById: viewData = {} } = {},
    },
  ] = useLazyQuery(VIEW_RELAPSE_BY_PLAN_ID, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      setLoader(false);
    },
  });

  useEffect(() => {
    getRelapsePlanViewData({
      variables: { planId: id },
    });
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="View Plan" />
        {!loadingRelapsePlanView && (
          <AdminRelapseView data={viewData} handleGoBack={handleGoBack} />
        )}
      </Layout>
    </>
  );
};

export default RelapsePlanPage;
