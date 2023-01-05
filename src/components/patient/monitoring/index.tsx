import { Stack } from "@mui/material";
import * as React from "react";
import ContentHeader from "../../../components/common/ContentHeader";
import MonitoringComplete from "./MonitoringComplete";
import MonitoringListAccordion from "./MonitoringListAccordion";
import { useStyles } from "./monitoringStyles";
import * as monitoringTypes from "./types";

const MonitoringComponent: React.FC<monitoringTypes.MonitoringProps> = ({
  monitoringList,
  completeData = [],
  viewResponseButtonClick,
  completeButtonClick,
  onSubmit,
  backPress,
  nextPress,
}) => {
  const styles = useStyles();
  const completeDataLength = completeData.length;

  const checkAccordionDisplay = (dataLength) => {
    if (dataLength <= 0) return false;
    else return true;
  };

  return (
    <Stack className={styles.monitoringMain}>
      <ContentHeader title="Monitoring" />
      {!checkAccordionDisplay(completeDataLength) && (
        <MonitoringListAccordion
          monitoringList={monitoringList}
          viewResponseButtonClick={viewResponseButtonClick}
          completeButtonClick={completeButtonClick}
        />
      )}
      {checkAccordionDisplay(completeDataLength) && (
        <MonitoringComplete
          completeData={completeData}
          onSubmit={onSubmit}
          backPress={backPress}
          nextPress={nextPress}
        />
      )}
    </Stack>
  );
};

export default MonitoringComponent;
