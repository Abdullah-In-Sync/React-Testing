import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import { GET_PATIENT_MONITORING_LIST } from "../../../graphql/query/patient";
import { useLazyQuery } from "@apollo/client";
import Loader from "../../../components/common/Loader";
import MonitoringComponent from "../../../components/patient/monitoring";

const Monitoring: NextPage = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [monitoringList, setMonitoringList] = useState<object[]>([]);

  //grphql apis
  const [getPatientMonitorList] = useLazyQuery(GET_PATIENT_MONITORING_LIST, {
    onCompleted: (data) => {
      if (data!.getPatientMonitorList) {
        setMonitoringList(data!.getPatientMonitorList);
      }
      setLoader(false);
    },
  });

  useEffect(() => {
    setLoader(true);
    getPatientMonitorList();
  }, []);

  return (
    <>
      <Layout boxStyle={{ height: "100vh" }}>
        <Loader visible={loader} />
        <MonitoringComponent monitoringList={monitoringList} />
      </Layout>
    </>
  );
};

export default Monitoring;
