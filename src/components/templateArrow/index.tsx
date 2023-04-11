import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  Node,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChatIcon from "@mui/icons-material/Chat";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import { Box } from "@mui/system";
import SideBar from "./sideBar";
import TextUpdaterNode from "./customNode";
import { Button, Grid } from "@mui/material";

const nodeType = {
  selectorNode: TextUpdaterNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

interface TemplateArrowProps {
  onSubmit?: (nodes: Node[], edges: Edge[]) => void;
  onCancel?: any;
}

const TemplateArrow: React.FC<TemplateArrowProps> = ({
  onSubmit,
  onCancel,
}) => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

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
          label: "node",
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const icons = [
    {
      componentName: "apartment",
      icon: <ApartmentIcon style={{ padding: "2px", cursor: "pointer" }} />,
    },
    {
      componentName: "appRegistration",
      icon: (
        <AppRegistrationIcon style={{ padding: "2px", cursor: "pointer" }} />
      ),
    },
    {
      componentName: "autoStoriesIcon",
      icon: <AutoStoriesIcon style={{ padding: "2px", cursor: "pointer" }} />,
    },
    {
      componentName: "calendarMonthIcon",
      icon: <CalendarMonthIcon style={{ padding: "2px", cursor: "pointer" }} />,
    },
    {
      componentName: "chatIcon",
      icon: <ChatIcon style={{ padding: "2px", cursor: "pointer" }} />,
    },
    {
      componentName: "connectWithoutContactIcon",
      icon: (
        <ConnectWithoutContactIcon
          style={{ padding: "2px", cursor: "pointer" }}
        />
      ),
    },
    {
      componentName: "contactPhoneIcon",
      icon: <ContactPhoneIcon style={{ padding: "2px", cursor: "pointer" }} />,
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
            //disabled={!formikHelper.isValid}
            onClick={() => onSubmit(nodes, edges)}
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
            //disabled={formikHelper?.isSubmitting}
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
