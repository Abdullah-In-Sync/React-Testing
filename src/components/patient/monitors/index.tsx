import { Stack } from "@mui/material";
import * as React from "react";
import { useStyles } from "./monitorsStyles";

import { PatientMonitorList } from "../../../graphql/Monitor/types";
import MonitorsList from "../../common/MonitorListItem";
interface ViewProps {
  monitoringList: PatientMonitorList[];
  viewResponseButtonClick?: (V) => void;
  completeButtonClick?: (V) => void;
  onClickDelete?: (v) => void;
  userType?: string;
}

const MonitorsComponent: React.FC<ViewProps> = ({
  monitoringList,
  viewResponseButtonClick,
  completeButtonClick,
  onClickDelete,
  userType,
}) => {
  const styles = useStyles();
  return (
    <Stack className={styles.monitorsListMain}>
      <Stack>
        <MonitorsList
          monitors={monitoringList}
          viewResponseButtonClick={viewResponseButtonClick}
          completeButtonClick={completeButtonClick}
          onClickDelete={onClickDelete}
          userType={userType}
        />
      </Stack>
    </Stack>
  );
};

export default MonitorsComponent;
