import React, { useState } from "react";
import type { NextPage } from "next";
import Layout from "../../../components/layout";
import ContentHeader from "../../../components/common/ContentHeader";
import Loader from "../../../components/common/Loader";
import RelapsePlan from "../../../components/common/Relapse";

const PatientRelapsePlanPage: NextPage = () => {
  const [loader, setLoader] = useState<boolean>(true);

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Relapse Plan" />
        <RelapsePlan setLoader={setLoader} />
      </Layout>
    </>
  );
};
export default PatientRelapsePlanPage;
