import { Box } from "@mui/material";
import { useCallback } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable, onChange }) {
  //   const onChange = useCallback((evt) => {
  //     console.log(evt.target.value);
  //   }, []);

  const oneventChange = (event) => {
    onChange({
      ...data,
      label: event.target.value,
    });
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
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Box>
        <label
          style={{
            display: "block",
            color: "#777",
            fontSize: "12px",
          }}
          htmlFor="text"
        >
          Text:
        </label>
        <input
          id="text"
          name="text"
          onChange={oneventChange}
          className="nodrag"
        />
      </Box>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
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
