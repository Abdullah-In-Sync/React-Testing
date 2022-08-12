import { NextPage } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import Layout from "../../components/layout";
const TableGenerator = dynamic(
  import("../../components/common/TableGenerator"),
  { ssr: false }
);

const Dashboard: NextPage = () => {
  const fields = [
    {
      key: "session_no",
      columnName: "Session No.",
      visible: true,
      render: (val) => val ?? "---",
    },
    {
      key: "organization_name",
      columnName: "Organization",
      visible: true,
      render: (val) => val ?? "---",
    },
  ];
  return (
    <>
      <Layout>{<h1 aria-label="Dashboard">Dashboard</h1>}</Layout>
      <TableGenerator
        fields={fields}
        data={[
          {
            session_no: 1,
            organization_name: "myHelp",
          },
          {
            session_no: 2,
            organization_name: "restEasy",
          },
        ]}
        currentPage={1}
        backendPagination={true}
        dataCount={2}
        selectedRecords={[]}
        rowOnePage={10}
      />
    </>
  );
};

export default Dashboard;
