import { Box, Fab } from "@mui/material";
import * as React from "react";
import { GetPatResourceListEntity } from "./types";

interface ViewProps {
  data: GetPatResourceListEntity;
  buttonClick: (value) => void;
}

const iconButtonsData = [
  {
    id: "view",
    icon: require("@mui/icons-material/Visibility").default,
  },
  {
    id: "share",
    icon: require("@mui/icons-material/ShareSharp").default,
  },
  {
    id: "delete",
    icon: require("@mui/icons-material/DeleteSharp").default,
  },
  {
    id: "attachment",
    icon: require("@mui/icons-material/AttachFileOutlined").default,
  },
];

const isValidImageURL = (url) => {
  return /\.(jpg|jpeg|png|PNG)$/.test(url);
};

const ActionsButtons: React.FC<ViewProps> = ({ data, buttonClick }) => {
  const { resource_data = [], ptsharres_status } = data;
  const { resource_filename } = resource_data[0] || {};

  const iconButtons = () => {
    return iconButtonsData.map((item) => {
      const { id, icon: Icon } = item;
      return (
        <Fab
          className={
            (isValidImageURL(resource_filename) && id === "attachment") ||
            (ptsharres_status === "1" && id === "share")
              ? `active`
              : ""
          }
          key={`iconButton_${id}_${data._id}`}
          aria-label={`iconButton_${id}_${data._id}`}
          data-testid={`iconButton_${id}_${data._id}`}
          onClick={() => buttonClick({ ...data, ...{ pressedIconButton: id } })}
        >
          <Icon />
        </Fab>
      );
    });
  };

  return <Box className="actionsWrapper">{iconButtons()}</Box>;
};

export default ActionsButtons;
