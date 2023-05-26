import { Stack } from "@mui/material";
import * as React from "react";
import { useStyles } from "./monitorsStyles";

import { PatientMonitorList } from "../../../graphql/Monitor/types";
import MonitorsList from "../../common/MonitorListItem";
interface ViewProps {
  monitoringList: PatientMonitorList[];
  viewResponseButtonClick?: (V) => void;
  completeButtonClick?: (V) => void;
}

const MonitorsComponent: React.FC<ViewProps> = ({
  monitoringList,
  viewResponseButtonClick,
  completeButtonClick,
}) => {
  const styles = useStyles();
  return (
    <Stack className={styles.monitorsListMain}>
      <Stack>
        <MonitorsList
          monitors={monitoringList}
          viewResponseButtonClick={viewResponseButtonClick}
          completeButtonClick={completeButtonClick}
        />
      </Stack>
    </Stack>
  );
};

export default MonitorsComponent;
