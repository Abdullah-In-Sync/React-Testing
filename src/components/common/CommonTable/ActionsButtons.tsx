import { Box, Fab } from "@mui/material";
import * as React from "react";

interface ViewProps {
  data: any;
  buttonClick: (value) => void;
  buttons?: any;
}

const iconButtonsData = [
  {
    id: "view",
    icon: require("@mui/icons-material/Visibility").default,
  },
  {
    id: "edit",
    icon: require("@mui/icons-material/Edit").default,
  },
  {
    id: "delete",
    icon: require("@mui/icons-material/DeleteSharp").default,
  },
  {
    id: "share",
    icon: require("@mui/icons-material/Share").default,
  },
];

const ActionsButtons: React.FC<ViewProps> = ({
  data,
  buttonClick,
  buttons = iconButtonsData,
}) => {
  const iconButtons = () => {
    return buttons.map((item) => {
      const { id, icon: Icon } = item;
      return (
        <Fab
          key={`iconButton_${id}_${data._id}`}
          aria-label={`iconButton_${id}_${data._id}`}
          data-testid={`iconButton_${id}_${data._id}`}
          onClick={() => buttonClick({ ...data, ...{ pressedIconButton: id } })}
          style={item?.styles ? item.styles : {}}
        >
          <Icon />
        </Fab>
      );
    });
  };

  return <Box className="actionsWrapper">{iconButtons()}</Box>;
};

export default ActionsButtons;
