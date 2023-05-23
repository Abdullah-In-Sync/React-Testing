import { Box, Stack, Typography } from "@mui/material";
import * as React from "react";

import CommonButton from "../../common/Buttons/CommonButton";
import { useStyles } from "./monitorListItemStyles";

interface ViewProps {
  monitors?: {
    name: string;
  }[];
  viewResponseButtonClick?: (V) => void;
  completeButtonClick?: (V) => void;
}

const MonitorsList: React.FC<ViewProps> = ({
  monitors = [],
  viewResponseButtonClick = null,
  completeButtonClick,
}) => {
  const styles = useStyles();

  const monitorsRecords = () => {
    return monitors.map((item, index) => {
      const { name } = item;
      return (
        <Stack key={`monitoring_list_item_${index}`}>
          <Box className={"monitor"}>
            <Box className="cl1">
              <Typography>{name}</Typography>
            </Box>
            <Box className="cl2">
              <CommonButton
                variant="contained"
                onClick={viewResponseButtonClick}
              >
                View Response
              </CommonButton>
              <CommonButton variant="contained" onClick={completeButtonClick}>
                Complete
              </CommonButton>
            </Box>
          </Box>
        </Stack>
      );
    });
  };

  const infoBox = (message) => {
    return (
      <Box className="infoMessageBoxWrapper">
        <Typography>{message}</Typography>
      </Box>
    );
  };

  return (
    <Stack pb={2} className={styles.monitorsList}>
      {monitors.length > 0 ? monitorsRecords() : infoBox("No data found.")}
    </Stack>
  );
};

export default MonitorsList;
