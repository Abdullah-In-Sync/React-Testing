import { useLazyQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Loader from "../../../../../components/common/Loader";
import ViewMonitor from "../../../../../components/admin/monitor/view/ViewMonitor";
import Layout from "../../../../../components/layout";
import { ADMIN_VIEW_MONITOR } from "../../../../../graphql/Monitor/graphql";
import { AdminMonitorView } from "../../../../../graphql/Monitor/types";

const ViewMonitorPage: NextPage = () => {
  const router = useRouter();
  const { query: { id: monitorId } = {} } = router;
  const [loader, setLoader] = useState<boolean>(true);

  const [
    getMonitorData,
    { data: { adminViewMonitorById: monitorViewData = null } = {} },
  ] = useLazyQuery<AdminMonitorView>(ADMIN_VIEW_MONITOR, {
    fetchPolicy: "cache-and-network",
    onCompleted: () => {
      setLoader(false);
    },
  });

  useEffect(() => {
    getMonitorData({
      variables: { monitorId },
    });
  }, []);

  const handleBackClick = () => {
    router.back();
  };

  return (
    <>
      <Layout boxStyle={{ height: "100vh" }}>
        <Loader visible={loader} />
        <ContentHeader title="View Monitor" />
        <ViewMonitor data={monitorViewData} handleBackClick={handleBackClick} />
      </Layout>
    </>
  );
};

export default ViewMonitorPage;
