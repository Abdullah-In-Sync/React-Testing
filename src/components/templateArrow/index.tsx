/* istanbul ignore file */
import React, { useState, useRef, useCallback, useMemo } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Node,
  Edge,
  MarkerType,
  updateEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { Box } from "@mui/system";
import SideBar from "./sideBar";
import TextUpdaterNode from "./customNode";
import { Button, Grid } from "@mui/material";
import CropSquareIcon from "@mui/icons-material/CropSquare";

let id = 0;
const getId = () => `dndnode_${id++}`;

interface TemplateArrowProps {
  onSubmit?: (updatedData: string) => void;
  onCancel?: any;
  nodesData?: Node[] | [];
  edgesData?: Edge[] | [];
  mode?: string;
  userType?: any;
}

const TemplateArrow: React.FC<TemplateArrowProps> = ({
  onSubmit,
  onCancel,
  nodesData = [],
  edgesData = [],
  mode,
  userType,
}) => {
  const nodeType = useMemo(
    () => ({
      selectorNode: (props) => (
        <TextUpdaterNode userType={userType} mode={mode} {...props} />
      ),
    }),
    []
  );

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([...nodesData]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([...edgesData]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const edgeUpdateSuccessful = useRef(true);
  const onConnect = useCallback((params) => {
    params.type = "smoothstep";
    params.markerEnd = {
      type: MarkerType.Arrow,
    };
    setEdges((eds) => {
      return addEdge(params, eds);
    });
  }, []);
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);
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
  const editStyle: any = {
    display: "flex",
    flexDirection: "row",
    borderRadius: "7px",
    marginBottom: "40px",
    border: mode == "edit" ? "1px solid" : "1px solid #cecece",
  };

  if (mode == "edit" || mode == "patientView") {
    delete editStyle.borderRadius;
    editStyle.padding = "8px";
    editStyle.borderTop = "0px solid";
    editStyle.borderColor = "#6BA08E";
  }
  return (
    <>
      <Box style={editStyle}>
        <ReactFlowProvider>
          {mode !== "edit" && mode !== "patientView" ? (
            <SideBar iconItems={icons} />
          ) : (
            <></>
          )}

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
              onEdgeUpdate={
                userType == "patient" || mode == "patientView"
                  ? undefined
                  : onEdgeUpdateStart
              }
              onEdgeUpdateStart={
                userType == "patient" || mode == "patientView"
                  ? undefined
                  : onEdgeUpdate
              }
              onEdgeUpdateEnd={
                userType == "patient" || mode == "patientView"
                  ? undefined
                  : onEdgeUpdateEnd
              }
              fitView
            >
              {mode !== "edit" && mode !== "patientView" ? <Controls /> : <></>}
            </ReactFlow>
          </Box>
        </ReactFlowProvider>
      </Box>
      {mode !== "patientView" && (
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
      )}
    </>
  );
};
export default TemplateArrow;
