import { Box } from "@mui/material";
import * as React from "react";
import { checkPrivilageAccess } from "../../../../utility/helper";

interface ViewProps {
  data: any;
  buttonClick: (value) => void;
}

const iconButtonsData = [
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

const ActionsButtons: React.FC<ViewProps> = ({ data, buttonClick }) => {
  const { _id, added_by } = data;
  const isEdit = checkPrivilageAccess("Measures", "Edit");
  const isDelete = checkPrivilageAccess("Measures", "Delete");
  const isShare = checkPrivilageAccess("Measures", "Share");
  const iconButtons = () => {
    return iconButtonsData.map((item, i) => {
      const { id, icon: Icon } = item;
      /* istanbul ignore next */
      if (
        (id === "edit" && added_by !== "therapist") ||
        (id === "edit" && !isEdit) ||
        (id === "delete" && !isDelete) ||
        (id === "share" && !isShare)
      )
        return null;

      return (
        <Box
          key={`iconButton_${_id}_${i}`}
          aria-label={`iconButton_${_id}_${i}`}
          data-testid={`iconButton_${_id}_${i}`}
          style={
            /* istanbul ignore next */
            id == "share" && data?.share_status == 1
              ? { backgroundColor: "#6EC9DB" }
              : null
          }
          onClick={
            /* istanbul ignore next */
            id == "share" && data?.share_status == 1
              ? null
              : () => {
                  /* istanbul ignore next */
                  buttonClick({ ...data, ...{ pressedIconButton: id } });
                }
          }
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
