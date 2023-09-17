import { Box, IconButton, Stack, Typography } from "@mui/material";
import * as React from "react";

import CommonButton from "../../common/Buttons/CommonButton";
import { useStyles } from "./monitorListItemStyles";
import DeleteIcon from "@mui/icons-material/Delete";

interface ViewProps {
  monitors?: {
    name: string;
    _id: string;
  }[];
  viewResponseButtonClick?: (V) => void;
  completeButtonClick?: (V) => void;
  onClickDelete?: (V) => void;
  userType?: string;
}

const MonitorsList: React.FC<ViewProps> = ({
  monitors = [],
  viewResponseButtonClick = null,
  completeButtonClick,
  onClickDelete,
  userType,
}) => {
  const styles = useStyles();

  const monitorsRecords = () => {
    return monitors.map((item, index) => {
      const { name, _id } = item;
      return (
        <Stack key={`monitoring_list_item_${index}`} className="monitorWrapper">
          <Box className={"monitor"}>
            <Box className="cl1">
              <Typography>{name}</Typography>
            </Box>
            <Box className="cl2">
              <CommonButton
                data-testid={`viewResponseButton_${index}`}
                variant="contained"
                onClick={() => viewResponseButtonClick(item)}
              >
                View Response
              </CommonButton>
              <CommonButton
                data-testid={`completeButton_${index}`}
                variant="contained"
                onClick={() => completeButtonClick(item)}
              >
                Complete
              </CommonButton>
              {
                /* istanbul ignore next */
                userType == "therapist" && (
                  <IconButton
                    size="small"
                    data-testid={`button-delete-icon_${_id}`}
                    style={{
                      backgroundColor: "#fff",
                      width: "32px",
                      height: "32px",
                      marginRight: "10px",
                      marginLeft: "10px",
                    }}
                    onClick={() => {
                      /* istanbul ignore next */
                      onClickDelete(_id);
                    }}
                  >
                    <DeleteIcon style={{ fontSize: "18px", color: "black" }} />
                  </IconButton>
                )
              }
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
