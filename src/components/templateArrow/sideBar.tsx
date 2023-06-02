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
        height: "681px",
        width: "60px",
        alignItems: "center",
        background: "#6EC9DB",
        border: "1px solid #cecece",
        borderRadius: "8px 0px 0px 8px",
        textAlign: "center",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      {iconItems.map((compo) => {
        return (
          <Box
            style={{
              width: "60px",
              height: "88px",
              paddingTop: "33.33px",
              paddingBottom: "33.33px",
              paddingLeft: "16.67px",
              paddingRight: "16.67px",
              borderBottom: "1px solid #FFFFFF",
              cursor: "pointer",
            }}
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
