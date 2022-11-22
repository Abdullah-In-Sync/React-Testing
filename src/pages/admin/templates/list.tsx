import { NextPage } from "next";
import * as React from "react";
import Layout from "../../../components/layout";
import withAuthentication from "../../../hoc/auth";

const TemplateList: NextPage = () => {
  return (
    <>
      <Layout>{<h1 aria-label="Dashboard">Dashboard</h1>}</Layout>
    </>
  );
};

export default withAuthentication(TemplateList, ["admin"]);
