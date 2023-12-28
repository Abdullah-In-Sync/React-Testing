import { Stack } from "@mui/material";
import * as React from "react";
import CommonButton from "../../../../common/Buttons/CommonButton";
import InfoModal from "../../../../common/CustomModal/InfoModal";
import { useStyles } from "../patientMonitorStyles";
import TherapistAddMonitor, {
  TherapistAddMonitorViewProps,
} from "./AddMonitor";
import { checkPrivilageAccess } from "../../../../../utility/helper";

type ViewProps = React.PropsWithChildren<{
  onClickMonitor?: () => void;
  modalRefAddMonitor?: any;
  orgList?: any;
}>;

const MonitorListWrapper: React.FC<
  ViewProps & TherapistAddMonitorViewProps
> = ({
  children,
  onClickMonitor,
  onPressAddMonitor,
  modalRefAddMonitor,
  orgList,
}) => {
  const styles = useStyles();
  const addMonitor = checkPrivilageAccess("Monitors", "Add");
  return (
    <Stack className={styles.monitorsListMain}>
      <Stack className="addMonitorWrapper">
        {(addMonitor === true || addMonitor === undefined) && (
          <CommonButton
            className=""
            data-testid="addMonitorBtn"
            variant="contained"
            onClick={onClickMonitor}
          >
            Add Monitor
          </CommonButton>
        )}
      </Stack>
      <Stack>{children}</Stack>
      <InfoModal
        ref={modalRefAddMonitor}
        className=""
        headerTitleText="Add Monitor"
        maxWidth="sm"
      >
        <TherapistAddMonitor
          list={orgList}
          modalRef={modalRefAddMonitor}
          onPressAddMonitor={onPressAddMonitor}
        />
      </InfoModal>
    </Stack>
  );
};

export default MonitorListWrapper;
