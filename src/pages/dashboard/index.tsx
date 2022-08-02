import * as React from "react";
import Layout from "../../components/layout";

const Dashboard: React.FunctionComponent<any> = (props) => {
  return (
    <>
      <Layout>{<h1 aria-label="Dashboard">Dashboard</h1>}</Layout>
    </>
  );
};

export default Dashboard;
