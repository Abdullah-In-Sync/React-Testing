import { Box, Fab } from "@mui/material";
import * as React from "react";
import * as safetyPlanInterface from "../../../graphql/SafetyPlan/types";

interface ViewProps {
  data: safetyPlanInterface.DataEntity;
  buttonClick: (value) => void;
  view?: string;
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
];

const userRoleIconButtonsData = [
  {
    id: "view",
    icon: require("@mui/icons-material/Visibility").default,
  },
  {
    id: "edit",
    icon: require("@mui/icons-material/Edit").default,
  },
  {
    id: "block",
    icon: require("@mui/icons-material/Block").default,
  },
];

const ActionsButtons: React.FC<ViewProps> = ({ data, buttonClick, view }) => {
  const iconBtn =
    view == "userRole" ? userRoleIconButtonsData : iconButtonsData;
  const iconButtons = () => {
    return iconBtn.map((item) => {
      const { id, icon: Icon } = item;
      return (
        <Fab
          key={`iconButton_${id}_${data._id}`}
          aria-label={`iconButton_${id}_${data._id}`}
          data-testid={`iconButton_${id}_${data._id}`}
          style={
            data?.status == 0 && id == "block" && view == "userRole"
              ? { color: "red" }
              : {}
          }
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
