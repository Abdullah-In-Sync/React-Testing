import { useLazyQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Loader from "../../../common/Loader";

import { GET_PATIENT_MONITOR_LIST } from "../../../../graphql/Monitor/graphql";
import MonitorsComponent from "../../monitors";
import { PatientMonitorListData } from "../../../../graphql/Monitor/types";

const PatientMonitorsListPage: NextPage = () => {
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    setLoader(true);
    getPatientMonitorList();
  }, []);

  const [
    getPatientMonitorList,
    { data: { patientMonitorList = [] } = {}, loading: monitorsListLoading },
  ] = useLazyQuery<PatientMonitorListData>(GET_PATIENT_MONITOR_LIST, {
    onCompleted: () => {
      setLoader(false);
    },
    fetchPolicy: "cache-and-network",
  });

  return (
    <>
      <Loader visible={loader} />
      {!monitorsListLoading && (
        <MonitorsComponent monitoringList={patientMonitorList} />
      )}
    </>
  );
};

export default PatientMonitorsListPage;
