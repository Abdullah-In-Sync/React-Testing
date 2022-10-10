import React from "react";
import type { NextPage } from "next";

// MUI COMPONENTS
import TabsGenerator from "../../../components/common/TabsGenerator";
import InfoSheet from "../../../components/patient/infoSheet";
import WorkSheet from "../../../components/patient/workSheet";
import AudioClips from "../../../components/patient/audioClips";
import VideoClips from "../../../components/patient/videoClips";
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
  {
    label: "Audio Clips",
    value: "audio-clips",
    component: <AudioClips />,
  },
  {
    label: "Video Clips",
    value: "video-clips",
    component: <VideoClips />,
  },
];

const Resource: NextPage = () => {
  return (
    <>
      <Layout>
        <ContentHeader title="Resources" />
        <TabsGenerator tabsList={tabs} activeTabs="info-sheet" />
      </Layout>
    </>
  );
};

export default Resource;
