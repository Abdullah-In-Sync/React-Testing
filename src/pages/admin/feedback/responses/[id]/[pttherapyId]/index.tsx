import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminFeedbackView from "../../../../../../components/admin/feedback/responses/Response";
import Loader from "../../../../../../components/common/Loader";
import Layout from "../../../../../../components/layout";
import { useAppContext } from "../../../../../../contexts/AuthContext";
import { VIEW_ADMIN_FEEDBACK_BY_ID } from "../../../../../../graphql/query";

// $feedbackId: String!, $pttherapyId: String, $userId: String

const AdminFeedbackResponse = () => {
  const { user: { _id: userId } = {} } = useAppContext();
  const router = useRouter();
  const { id, pttherapyId } = router.query || {};

  const [loader, setLoader] = useState<boolean>(true);

  const [
    viewAdminFeedback,
    {
      loading: loadingView,
      data: { adminViewResponseDetailById: viewData = null } = {},
    },
  ] = useLazyQuery(VIEW_ADMIN_FEEDBACK_BY_ID, {
    onCompleted: () => {
      setLoader(false);
    },
  });

  useEffect(() => {
    /* istanbul ignore next */
    viewAdminFeedback({
      variables: {
        feedbackId: id,
        pttherapyId: pttherapyId,
        userId: userId,
      },
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
        <AdminFeedbackView
          data={viewData}
          handleGoBack={handleGoBack}
          loadingView={loadingView}
        />
      </Layout>
    </>
  );
};

export default AdminFeedbackResponse;
