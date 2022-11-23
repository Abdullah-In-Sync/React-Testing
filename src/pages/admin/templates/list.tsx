import { NextPage } from "next";
import * as React from "react";
import Layout from "../../../components/layout";
import TemplateTable from "../../../components/templateTable";
import withAuthentication from "../../../hoc/auth";

const TemplateList: NextPage = () => {
  return (
    <>
      <Layout>
        <TemplateTable mode="edit" />
      </Layout>
    </>
  );
};

export default withAuthentication(TemplateList, ["admin"]);
