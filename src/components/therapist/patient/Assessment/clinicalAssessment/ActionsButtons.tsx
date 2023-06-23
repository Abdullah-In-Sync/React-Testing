import { Box } from "@mui/material";
import * as React from "react";

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
  const { _id } = data;
  const iconButtons = () => {
    return iconButtonsData.map((item, i) => {
      const { id, icon: Icon } = item;
      return (
        <Box
          key={`iconButton_${_id}_${i}`}
          aria-label={`iconButton_${_id}_${i}`}
          data-testid={`iconButton_${_id}_${i}`}
          onClick={() => {
            buttonClick({ ...data, ...{ pressedIconButton: id } });
          }}
          className="actionButton"
        >
          <Icon />
        </Box>
      );
    });
  };

  return <>{iconButtons()}</>;
};

export default ActionsButtons;
