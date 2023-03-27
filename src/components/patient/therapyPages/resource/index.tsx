import type { NextPage } from "next";

// MUI COMPONENTS
import withAuthentication from "../../../../hoc/auth";
import ContentHeader from "../../../common/ContentHeader";
import TabsGenerator from "../../../common/TabsGenerator";
import AudioClips from "../../../patient/audioClips";
import InfoSheet from "../../../patient/infoSheet";
import VideoClips from "../../../patient/videoClips";
import WorkSheet from "../../../patient/workSheet";

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
      <ContentHeader title="Resources" />
      <TabsGenerator tabsList={tabs} activeTabs="info-sheet" />
    </>
  );
};

export default withAuthentication(Resource, ["patient"]);
