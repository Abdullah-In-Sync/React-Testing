/* istanbul ignore file */
import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from "react";
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
import { Button, Grid, Switch, Typography } from "@mui/material";
import Image from "next/image";
import { checkPrivilageAccess } from "../../utility/helper";

let id = 0;
const getId = () => `dndnode_${id++}`;

interface TemplateArrowProps {
  onSubmit?: (updatedData: string) => void;
  onCancel?: () => void;
  nodesData?: Node[] | [];
  edgesData?: Edge[] | [];
  mode?: string;
  userType?: any;
  defaultIsPreview?: boolean;
  handleViewBoxClick?: (value) => void;
}

const TemplateArrow: React.FC<TemplateArrowProps> = ({
  onSubmit,
  onCancel,
  nodesData = [],
  edgesData = [],
  mode,
  userType,
  defaultIsPreview = false,
  handleViewBoxClick,
}) => {
  const [user, setUser] = useState(userType);
  const [mod, setmod] = useState(mode);
  const nodeType = useMemo(
    () => ({
      selectorNode: (props) => (
        <TextUpdaterNode
          userType={user}
          mode={mod}
          {...props}
          handleViewBoxClick={handleViewBoxClick}
        />
      ),
    }),
    [user, mod]
  );

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([...nodesData]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([...edgesData]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const edgeUpdateSuccessful = useRef(true);
  const [toggled, setToggled] = useState<boolean>(false);
  const [isPreview, setIsPreview] = useState<boolean>(defaultIsPreview);
  const [isEnableBtn, setIsEnableBtn] = useState(false);

  const onConnect = useCallback((params) => {
    /* istanbul ignore next */
    params.type = "smoothstep";
    params.markerStart = {
      type: MarkerType.Arrow,
    };
    setEdges((eds) => {
      return addEdge(params, eds);
    });
  }, []);
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);
  /* istanbul ignore next */
  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  useEffect(() => {
    /* istanbul ignore next */
    if (nodes.length > 0 && !nodes.every((n) => n?.data.label !== "")) {
      /* istanbul ignore next */
      setIsEnableBtn(true);
    } else {
      /* istanbul ignore next */
      setIsEnableBtn(false);
    }
  }, [nodes]);

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
        width: 298,
        height: 248,
        style: {
          width: 298,
          height: 248,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onChangePreviewToggle = (event) => {
    console.log(event, "onChangePreviewToggle");
    setToggled(event.target.checked);
    if (event.target.checked) {
      setmod("patientView");
      setIsPreview(true);
    }
    if (!event.target.checked) {
      setUser(userType);
      setmod(mode);
      setIsPreview(true);
    }
  };

  const icons = [
    {
      componentName: "cropSquareIcon",
      icon: (
        <Image alt="My Help" src="/images/Vector.png" height="21" width="27" />
      ),
    },
  ];
  const editStyle: any = {
    display: "flex",
    flexDirection: "row",
    borderRadius: "8px",
    marginBottom: "40px",
    border:
      mod == "patientView" && userType !== "fullAccess"
        ? "1px solid #7EBCA7"
        : "1px solid #25282B",
    position: "relative",
  };

  if (
    (mod == "edit" || mod == "patientView" || userType == "patient") &&
    userType !== "fullAccess"
  ) {
    editStyle.borderRadius = "0px 0px 8px 8px";
    editStyle.borderTop = "unset";
  }
  if (mod == "mobile") {
    delete editStyle.border;
    delete editStyle.padding;
  }

  const isEditResource = checkPrivilageAccess("Resource", "Edit");

  const isEditFormulation = checkPrivilageAccess(
    "Formulation",
    "Update response"
  );

  return (
    <>
      <Box style={editStyle}>
        <ReactFlowProvider>
          {(mod !== "edit" && mod !== "patientView" && mod !== "mobile") ||
          (userType == "fullAccess" && !isPreview) ? (
            <SideBar iconItems={icons} />
          ) : (
            <></>
          )}

          <Box
            style={{
              height: mod == "mobile" ? window.innerHeight - 129 : "660px",
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
                user == "patient" || mod == "patientView"
                  ? undefined
                  : onEdgeUpdateStart
              }
              onEdgeUpdateStart={
                user == "patient" || mod == "patientView"
                  ? undefined
                  : onEdgeUpdate
              }
              onEdgeUpdateEnd={
                user == "patient" || mod == "patientView"
                  ? undefined
                  : onEdgeUpdateEnd
              }
              fitView
            >
              {mod !== "edit" && mod !== "patientView" ? <Controls /> : <></>}
            </ReactFlow>
          </Box>
          {userType == "fullAccess" && (
            <Box
              sx={{
                display: "flex",
                border: "1px solid #6EC9DB",
                height: "39px",
                width: "115px",
                margin: "12px 16px 0px 0px",
                borderRadius: "4px",
                position: "absolute",
                right: "11px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "500",
                  textAlign: "center",
                  fontSize: "14px",
                  margin: "8px 0px 0px 3px",
                }}
              >
                Preview
              </Typography>
              <Switch
                data-testid="arrow-preview-toggle"
                checked={toggled}
                onChange={(e) => onChangePreviewToggle(e)}
              />
            </Box>
          )}
        </ReactFlowProvider>
      </Box>
      {
        /* istanbul ignore next */
        mod !== "mobile" &&
        (isEditResource ||
          isEditFormulation ||
          isEditResource === undefined ||
          isEditFormulation === undefined) ? (
          <Grid container justifyContent="center">
            <Grid item padding="63px 0px 94px 0px">
              <Button
                data-testid="tableTemplateSubmit"
                variant="contained"
                type="submit"
                style={{
                  paddingLeft: "40px",
                  paddingRight: "40px",
                  marginRight: "10px",
                }}
                disabled={isEnableBtn}
                onClick={() => onSubmitHandle(nodes, edges)}
              >
                Submit
              </Button>
              <Button
                data-testid="tableTemplateCancel"
                color="secondary"
                variant="contained"
                style={{
                  paddingLeft: "40px",
                  paddingRight: "40px",
                  backgroundColor: "#6BA08E",
                }}
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        ) : null
      }

      {mod == "mobile" && !handleViewBoxClick && (
        <Grid container justifyContent={"center"}>
          <Button
            data-testid="ArrowMobileTemplateSave"
            variant="contained"
            type="submit"
            style={{
              padding: "15px",
              fontSize: "14px",
              background: "#6EC9DB",
              borderRadius: "30px",
              minWidth: "162px",
              marginRight: "16px",
              lineHeight: "14px",
              textAlign: "center",
              letterSpacing: "0.0037em",
            }}
            onClick={() => onSubmitHandle(nodes, edges)}
          >
            Save
          </Button>
          <Button
            data-testid="ArrowMobileTemplateCancel"
            style={{
              padding: "15px",
              fontSize: "16px",
              boxSizing: "border-box",
              border: "2px solid #6DA290",
              borderRadius: "30px",
              color: "#6DA290",
              minWidth: "162px",
              marginLeft: "16px",
              lineHeight: "14px",
            }}
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
        </Grid>
      )}
    </>
  );
};
export default TemplateArrow;
