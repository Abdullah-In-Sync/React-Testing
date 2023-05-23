import { Stack } from "@mui/material";
import * as React from "react";
import { useStyles } from "./monitorsStyles";

import { PatientMonitorList } from "../../../graphql/Monitor/types";
import ContentHeader from "../../common/ContentHeader";
import MonitorsList from "../../common/MonitorListItem";
interface ViewProps {
  monitoringList: PatientMonitorList[];
  viewResponseButtonClick?: (V) => void;
  completeButtonClick?: (V) => void;
}

const MonitorsComponent: React.FC<ViewProps> = ({ monitoringList }) => {
  const styles = useStyles();
  return (
    <Stack className={styles.monitorsListMain}>
      <ContentHeader title="Monitors" />
      <Stack>
        <MonitorsList monitors={monitoringList} />
      </Stack>
    </Stack>
  );
};

export default MonitorsComponent;
