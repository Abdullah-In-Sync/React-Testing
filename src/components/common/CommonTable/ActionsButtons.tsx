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
  const { _id = data.i } = data;
  const iconButtons = () => {
    return buttons.map((item) => {
      const { id, icon: Icon, isActive } = item;
      return (
        <Fab
          key={`iconButton_${id}_${_id}`}
          aria-label={`iconButton_${id}_${_id}`}
          data-testid={`iconButton_${id}_${_id}`}
          onClick={() => buttonClick({ ...data, ...{ pressedIconButton: id } })}
          style={item?.styles ? item.styles : {}}
          className={`isActive_${data[isActive]} ${
            data?.isAttachment && id == "attachment" ? "active" : ""
          }`}
        >
          <Icon />
        </Fab>
      );
    });
  };

  return <Box className="actionsWrapper">{iconButtons()}</Box>;
};

export default ActionsButtons;
