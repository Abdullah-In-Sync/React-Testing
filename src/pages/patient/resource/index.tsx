import React from "react";
import type { NextPage } from "next";

// MUI COMPONENTS
import TabsGenerator from "../../../components/common/TabsGenerator";
import InfoSheet from "../../../components/patient/infoSheet";
import WorkSheet from "../../../components/patient/workSheet";
import Layout from "../../../components/layout";
import ContentHeader from "../../../components/common/ContentHeader";

const tabs = [
  {
    label: "Info Sheet",
    value: "info-sheet",
    component: <InfoSheet />,
  },
  {
    label: "Work Sheet",
    value: "work-sheet",
    component: <WorkSheet />,
  },



];

const Resource: NextPage = () => {
  return (
    <>
      <Layout>
        <ContentHeader title="Library" />
        <TabsGenerator tabsList={tabs} activeTabs="info-sheet" />
      </Layout>
    </>
  );

};

export default Resource;
