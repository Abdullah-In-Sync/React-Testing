import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Layout from "../../../../../components/layout";
import Loader from "../../../../../components/common/Loader";
import AdminFeedbackView from "../../../../../components/admin/feedback/view/AdminFeedbackView";
import { VIEW_FEEDBACK_BY_ID } from "../../../../../graphql/Feedback/graphql";

const FeedbackView = () => {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const {
    query: { id },
  } = router;
  /* istanbul ignore next */
  const [
    getFeedbackViewData,
    {
      loading: loadingView,
      data: { viewFeedbackByAdmin: viewData = null } = {},
    },
  ] = useLazyQuery(VIEW_FEEDBACK_BY_ID, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  useEffect(() => {
    /* istanbul ignore next */
    setLoader(true);
    getFeedbackViewData({
      variables: { feedbackId: id },
    });
    setLoader(false);
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <Layout boxStyle={{ height: "100vh" }}>
        <Loader visible={loader} />
        <ContentHeader title="View Feedback" />
        {/* <ViewSafetyPlan viewData={viewData} /> */}
        <AdminFeedbackView
          data={viewData}
          handleGoBack={handleGoBack}
          loadingView={loadingView}
        />
      </Layout>
    </>
  );
};

export default FeedbackView;
