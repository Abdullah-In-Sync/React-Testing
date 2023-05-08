/* istanbul ignore file */
import { Box } from "@mui/material";
import { useState } from "react";
import { Handle, Position, useReactFlow, Node } from "reactflow";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface Data {
  label: string;
  description: string;
  patientResponse: string;
}
interface TextUpdaterNodeProps {
  id: string;
  data: Data;
  isConnectable: boolean;
  userType?: any;
  mode?: string;
}

const TextUpdaterNode: React.FC<TextUpdaterNodeProps> = ({
  id,
  data,
  isConnectable,
  userType,
  mode,
}) => {
  const [label, setLabel] = useState<string>(data?.label);
  const [description, setDescription] = useState<string>(data?.description);
  const [patientResponse, setPatientResponse] = useState<string>(
    data?.patientResponse
  );
  const reactFlowInstance = useReactFlow();
  const nodes = reactFlowInstance.getNodes();
  const onChange = (event: any) => {
    const getNodeIndex = nodes.findIndex((ele: Node<any>) => ele.id == id);
    if (event.target.name == "title") {
      nodes[getNodeIndex].data.label = event.target.value;
      setLabel(event.target.value);
    } else if (event.target.name == "description") {
      nodes[getNodeIndex].data.description = event.target.value;
      setDescription(event.target.value);
    } else if (event.target.name == "patientResponse") {
      nodes[getNodeIndex].data.patientResponse = event.target.value;
      setPatientResponse(event.target.value);
    }

    reactFlowInstance.setNodes([...nodes]);
  };
  const OnDeleteNode = (id) => {
    const filtered = nodes.filter((ele) => ele.id !== id);
    reactFlowInstance.setNodes([...filtered]);
  };
  const opacity = userType == "patient" || mode == "patientView" ? 0 : 1;
  let responseDisable = true;
  if (userType == "patient") {
    responseDisable = false;
  }

  return (
    <Box
      style={{
        border: "1px solid #eee",
        padding: "5px",
        background: "white",
      }}
      data-testid="arrow-template-test-1"
      className={
        userType == "patient" || mode == "patientView" ? "nodrag" : null
      }
    >
      {userType !== "patient" && mode !== "patientView" && (
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
      )}
      <Handle
        type="target"
        id="c"
        position={Position.Top}
        isConnectable={
          userType == "patient" || mode == "patientView" ? false : isConnectable
        }
        style={{ opacity: opacity }}
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={
          userType == "patient" || mode == "patientView" ? false : isConnectable
        }
        style={{ opacity: opacity }}
      />
      <Box display={"flex"} flexDirection={"column"} gap={"5px"}>
        <input
          id="text"
          name="title"
          value={label}
          onChange={(e) => onChange(e)}
          placeholder="Enter title here"
          style={{ fontSize: "8px" }}
          disabled={
            userType == "patient" || mode == "patientView" ? true : false
          }
        />
        <input
          id="text"
          name="description"
          value={description}
          onChange={(e) => onChange(e)}
          placeholder="Enter description here"
          style={{ fontSize: "8px" }}
          disabled={
            userType == "patient" || mode == "patientView" ? true : false
          }
        />
        <input
          id="text"
          data-testid={`arrow-template-response-input-${id}`}
          name="patientResponse"
          value={patientResponse}
          onChange={(e) => onChange(e)}
          placeholder="Response"
          style={{ fontSize: "8px" }}
          disabled={responseDisable}
        />
      </Box>
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        isConnectable={
          userType == "patient" || mode == "patientView" ? false : isConnectable
        }
        style={{ opacity: opacity }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={
          userType == "patient" || mode == "patientView" ? false : isConnectable
        }
        style={{ opacity: opacity }}
      />
    </Box>
  );
};

export default TextUpdaterNode;
