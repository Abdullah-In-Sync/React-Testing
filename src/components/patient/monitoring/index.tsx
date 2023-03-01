import { Box, Stack } from "@mui/material";
import * as React from "react";
import ContentHeader from "../../../components/common/ContentHeader";
import MonitoringComplete from "./MonitoringComplete";
import MonitoringListAccordion from "./MonitoringListAccordion";
import { useStyles } from "./monitoringStyles";
import * as monitoringTypes from "./types";
import MonitoringViewResponse from "./MonitoringViewResponse";
import RangeDatePicker from "./RangeDatePicker";

const MonitoringComponent: React.FC<monitoringTypes.MonitoringProps> = ({
  monitoringList,
  completeData = [],
  viewResponseButtonClick,
  completeButtonClick,
  viewResponseData = {},
  onSubmit,
  backPress,
  nextPress,
  onGoButton,
  initialDate,
  view,
  currentMonitoring,
}) => {
  const styles = useStyles();
  return (
    <Stack className={styles.monitoringMain}>
      <Stack className="headerWrapper">
        <Box>
          <ContentHeader title="Monitoring" />
        </Box>
        {view === "viewResponse" && (
          <Box className="rangeDatePickerWrapper">
            <RangeDatePicker
              initialDate={initialDate}
              onGoButton={onGoButton}
            />
          </Box>
        )}
      </Stack>
      {(!view || view === "") && (
        <MonitoringListAccordion
          monitoringList={monitoringList}
          viewResponseButtonClick={viewResponseButtonClick}
          completeButtonClick={completeButtonClick}
        />
      )}
      {view === "complete" && (
        <MonitoringComplete
          currentMonitoring={currentMonitoring}
          completeData={completeData}
          onSubmit={onSubmit}
          backPress={backPress}
          nextPress={nextPress}
        />
      )}
      {view === "viewResponse" && (
        <MonitoringViewResponse
          viewResponseData={viewResponseData}
          onGoButton={onGoButton}
          initialDate={initialDate}
        />
      )}
    </Stack>
  );
};

export default MonitoringComponent;
