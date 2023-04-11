import { Box } from "@mui/material";
import { useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";

const handleStyle = { left: 10 };

function TextUpdaterNode({ id, data, isConnectable }) {
  const [label, setLabel] = useState<string>(data?.label);
  const reactFlowInstance = useReactFlow();
  const nodes = reactFlowInstance.getNodes();
  const onChange = (event) => {
    nodes.forEach((ele) => {
      if (ele.id == id) {
        ele.data.label = event.target.value;
      }
    });

    setLabel(event.target.value);
    reactFlowInstance.setNodes([...nodes]);
  };

  return (
    <Box
      style={{
        height: "50px",
        border: "1px solid #eee",
        padding: "5px",
        borderRadius: "5px",
        background: "white",
      }}
    >
      <Handle
        type="target"
        id="c"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
      <Box>
        <input
          id="text"
          name="text"
          value={label}
          onChange={(e) => onChange(e)}
          style={{ fontSize: "8px", border: "none", outline: "none" }}
          onFocus={(e) => {
            if (e.target.matches(":focus-visible")) {
              e.target.style.border = "none";
              e.target.style.outline = "none";
            }
          }}
        />
      </Box>
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </Box>
  );
}

export default TextUpdaterNode;
