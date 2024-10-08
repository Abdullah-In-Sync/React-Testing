import { Box } from "@mui/material";
import * as React from "react";
import { checkPrivilageAccess } from "../../../../../utility/helper";

interface ViewProps {
  data: any;
  buttonClick: (value) => void;
}

const iconButtonsData = [
  {
    id: "share",
    icon: require("@mui/icons-material/Share").default,
  },
];

const ActionsButtons: React.FC<ViewProps> = ({ data, buttonClick = null }) => {
  const isShare = checkPrivilageAccess("Assessment", "Share");
  const { _id, share_status } = data;
  const iconButtons = () => {
    return iconButtonsData
      .filter(() => isShare)
      .map((item, i) => {
        const { id, icon: Icon } = item;
        return (
          <Box
            key={`iconButton_${_id}_${i}`}
            aria-label={`iconButton_${_id}_${i}`}
            data-testid={`iconButton_${_id}_${i}`}
            onClick={() => {
              buttonClick({ ...data, ...{ pressedIconButton: id } });
            }}
            className={`actionButton ${id}_${share_status}`}
          >
            <Icon />
          </Box>
        );
      });
  };

  return <>{iconButtons()}</>;
};

export default ActionsButtons;
