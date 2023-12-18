import { Box, Fab } from "@mui/material";
import * as React from "react";
import { GetPatResourceListEntity } from "./types";
import { checkPrivilageAccess } from "../../../utility/helper";

interface ViewProps {
  data: GetPatResourceListEntity;
  buttonClick: (value) => void;
}

const isTrueView = checkPrivilageAccess("Resource", "View");
const isTrueShare = checkPrivilageAccess("Resource", "Share");
const isTrueDelete = checkPrivilageAccess("Resource", "Delete");

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
      /* istanbul ignore next */
      if (id === "view" && isTrueView === false) {
        return null;
      }
      /* istanbul ignore next */
      if (id === "share" && isTrueShare === false) {
        return null;
      }
      /* istanbul ignore next */
      if (id === "delete" && isTrueDelete === false) {
        return null;
      }

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
