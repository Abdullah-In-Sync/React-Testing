/* istanbul ignore file */
import { Box } from "@mui/system";
import React from "react";

interface IconProp {
  componentName: string;
  icon: any;
}

interface SidebarProps {
  iconItems: IconProp[];
}

const SideBar: React.FC<SidebarProps> = ({ iconItems }) => {
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
