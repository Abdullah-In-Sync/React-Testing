/* istanbul ignore file */
import { Box } from "@mui/material";
import { useState } from "react";
import { Handle, Position, useReactFlow, Node } from "reactflow";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface Data {
  label: string;
}
interface TextUpdaterNodeProps {
  id: string;
  data: Data;
  isConnectable: boolean;
}

const TextUpdaterNode: React.FC<TextUpdaterNodeProps> = ({
  id,
  data,
  isConnectable,
}) => {
  const [label, setLabel] = useState<string>(data?.label);
  const reactFlowInstance = useReactFlow();
  const nodes = reactFlowInstance.getNodes();
  const onChange = (event: any) => {
    nodes.forEach((ele: Node<any>) => {
      if (ele.id == id) {
        ele.data.label = event.target.value;
      }
    });

    setLabel(event.target.value);
    reactFlowInstance.setNodes([...nodes]);
  };
  const OnDeleteNode = (id) => {
    const filtered = nodes.filter((ele) => ele.id !== id);
    reactFlowInstance.setNodes([...filtered]);
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
      data-testid="arrow-template-test-1"
    >
      <Box onClick={() => OnDeleteNode(id)}>
        <DeleteForeverIcon
          style={{
            position: "absolute",
            left: "112px",
            top: "-13px",
            padding: "5px",
            cursor: "pointer",
            zIndex: 1000,
          }}
        />
      </Box>
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
};

export default TextUpdaterNode;
