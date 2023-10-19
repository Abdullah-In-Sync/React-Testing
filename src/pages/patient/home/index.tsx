import React, { useState } from "react";
import type { NextPage } from "next";
import Layout from "../../../components/layout";
import Loader from "../../../components/common/Loader";
import PatientHome from "../../../components/common/PatientHome/patientHome";

const HomePage: NextPage = () => {
  const [loader, setLoader] = useState<boolean>(false);

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <PatientHome setLoader={setLoader} />
      </Layout>
    </>
  );
};
export default HomePage;
