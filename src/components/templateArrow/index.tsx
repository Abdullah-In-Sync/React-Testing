/* istanbul ignore file */
import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Node,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import { Box } from "@mui/system";
import SideBar from "./sideBar";
import TextUpdaterNode from "./customNode";
import { Button, Grid } from "@mui/material";
import CropSquareIcon from "@mui/icons-material/CropSquare";

const nodeType = {
  selectorNode: TextUpdaterNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

interface TemplateArrowProps {
  onSubmit?: (updatedData: string) => void;
  onCancel?: any;
  nodesData?: Node[] | [];
  edgesData?: Edge[] | [];
}

const TemplateArrow: React.FC<TemplateArrowProps> = ({
  onSubmit,
  onCancel,
  nodesData = [],
  edgesData = [],
}) => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([...nodesData]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([...edgesData]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  const onSubmitHandle = (nodes: Node[], edges: Edge[]) => {
    const obj = {
      nodes,
      edges,
    };
    onSubmit(JSON.stringify(obj));
  };
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type: "selectorNode",
        position,
        data: {
          label: "",
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const icons = [
    {
      componentName: "cropSquareIcon",
      icon: (
        <CropSquareIcon
          style={{ padding: "2px", cursor: "pointer", fontSize: "30px" }}
        />
      ),
    },
  ];

  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          border: "1px solid #cecece",
          borderRadius: "7px",
          marginBottom: "40px",
        }}
      >
        <ReactFlowProvider>
          <SideBar iconItems={icons} />
          <Box
            style={{
              height: "500px",
              width: "100%",
              alignItems: "center",
              marginRight: "5px",
            }}
            ref={reactFlowWrapper}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeType}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
            >
              <Controls />
            </ReactFlow>
          </Box>
        </ReactFlowProvider>
      </Box>
      <Grid container justifyContent={"center"}>
        <Grid item padding={"63px 0px 94px 0px"}>
          <Button
            data-testid="tableTemplateSubmit"
            variant="contained"
            type="submit"
            style={{
              padding: "5px 79px 5px 79px",
              fontSize: "20px",
            }}
            onClick={() => onSubmitHandle(nodes, edges)}
          >
            Submit
          </Button>
          <Button
            data-testid="tableTemplateCancel"
            color="secondary"
            variant="contained"
            style={{
              margin: "0px 27px 0px 27px",
              padding: "5px 79px 5px 79px",
              fontSize: "20px",
            }}
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default TemplateArrow;
