import { Box } from "@mui/system";
import React from "react";

const SideBar = ({ iconItems }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <Box
      style={{
        height: "500px",
        width: "30px",
        alignItems: "center",
        background: "#dadada52",
        border: "1px solid #cecece",
        textAlign: "center",
      }}
    >
      {iconItems.map((compo) => {
        return (
          <Box
            onDragStart={(event) => onDragStart(event, compo.componentName)}
            draggable
          >
            {compo.icon}
          </Box>
        );
      })}
    </Box>
  );
};
export default SideBar;
