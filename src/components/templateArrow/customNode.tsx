import { Box } from "@mui/material";
import { useCallback } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }) {
  const onChange = useCallback((e) => {
    console.log(e.target.value);
  }, []);

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
          onChange={onChange}
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
