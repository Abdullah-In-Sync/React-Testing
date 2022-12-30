import * as React from "react";
import ContentHeader from "../../../components/common/ContentHeader";
import MonitoringListAccordion from "./MonitoringListAccordion";
import * as monitoringTypes from "./types";

const MonitoringComponent: React.FC<monitoringTypes.MonitoringProps> = ({
  monitoringList,
}) => {
  return (
    <>
      <ContentHeader title="Monitoring" />
      <MonitoringListAccordion monitoringList={monitoringList} />
    </>
  );
};

export default MonitoringComponent;
