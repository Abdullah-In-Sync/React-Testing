import { Stack } from "@mui/material";
import * as React from "react";
import { useStyles } from "../patientMonitorStyles";
import CommonButton from "../../../../common/Buttons/CommonButton";

type ViewProps = React.PropsWithChildren<{
  onClickMonitor?: () => void;
}>;

const MonitorListWrapper: React.FC<ViewProps> = ({
  children,
  onClickMonitor,
}) => {
  const styles = useStyles();
  return (
    <Stack className={styles.monitorsListMain}>
      <Stack className="addMonitorWrapper">
        <CommonButton className="" variant="contained" onClick={onClickMonitor}>
          Add Monitor
        </CommonButton>
      </Stack>
      <Stack>{children}</Stack>
    </Stack>
  );
};

export default MonitorListWrapper;
