import { NextPage } from "next";
import * as React from "react";
import Layout from "../../../components/layout";
import ContentHeader from "../../../components/common/ContentHeader";

const AdminDashboard: NextPage = () => {
  return (
    <>
      <Layout
        boxStyle={{ height: "100vh" }}
        cardWrapper={{ minHeight: "85vh" }}
      >
        <ContentHeader title="Welcome to MyHelp Admin" />
      </Layout>
    </>
  );
};

export default AdminDashboard;
