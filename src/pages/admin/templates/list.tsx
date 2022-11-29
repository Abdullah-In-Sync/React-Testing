import { NextPage } from "next";
import * as React from "react";
import Layout from "../../../components/layout";
import TemplateTable from "../../../components/templateTable";
import withAuthentication from "../../../hoc/auth";

const TemplateList: NextPage = () => {
  const staticTemplate: TemplateFormData = {
    rows: [
      {
        cells: [
          {
            type: "header",
            title: "Activities",
          },
          {
            type: "header",
            title: "Rating",
            description: "Add rating based on activities",
          },
        ],
      },
      {
        cells: [
          {
            type: "header",
            title: "Did you take break fast",
          },
          {
            type: "answer",
            answerType: "list",
            answerValues: ["banana", "mengo", "papita"],
          },
        ],
      },
      {
        cells: [
          {
            type: "",
          },
          {
            type: "",
          },
        ],
      },
    ],
  };

  return (
    <>
      <Layout>
        <TemplateTable mode="edit" initialData={staticTemplate} />
      </Layout>
    </>
  );
};

export default withAuthentication(TemplateList, ["admin"]);
