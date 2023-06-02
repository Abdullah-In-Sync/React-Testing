/* istanbul ignore file */
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { Handle, Position, useReactFlow, Node, NodeResizer } from "reactflow";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useStyles } from "./arrowTemplateStyles";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { Tooltip } from "@material-ui/core";

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
  selected: boolean;
}

const TextUpdaterNode: React.FC<TextUpdaterNodeProps> = ({
  id,
  data,
  isConnectable,
  userType,
  mode,
  selected,
}) => {
  const styles = useStyles();
  const handleId = id.split("_")[1];
  const [label, setLabel] = useState<string>(data?.label);
  const [description, setDescription] = useState<string>(data?.description);
  const [patientResponse, setPatientResponse] = useState<string>(
    data?.patientResponse
  );
  const reactFlowInstance = useReactFlow();
  const nodes = reactFlowInstance.getNodes();
  const onChange = (event: any) => {
    const getNodeIndex = nodes.findIndex((ele: Node<any>) => ele.id == id);
    if (event.target.id == "title") {
      nodes[getNodeIndex].data.label = event.target.value;
      setLabel(event.target.value);
    } else if (event.target.id == "description") {
      nodes[getNodeIndex].data.description = event.target.value;
      setDescription(event.target.value);
    } else if (event.target.id == "patientResponse") {
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
      data-testid="arrow-template-test-1"
      className={`${styles.nodeStyle} ${
        userType == "patient" || mode == "patientView" ? " nodrag" : null
      }`}
    >
      {userType !== "patient" && mode !== "patientView" && (
        <NodeResizer
          color="#6EC9DB"
          isVisible={selected}
          minWidth={200}
          minHeight={30}
          keepAspectRatio={true}
        />
      )}
      {userType !== "patient" && mode !== "patientView" && (
        <Box onClick={() => OnDeleteNode(id)}>
          <DeleteForeverIcon className={styles.deleteIconStyle} />
        </Box>
      )}
      <Box>
        <Handle
          type="source"
          id={`source_top${handleId}`}
          position={Position.Top}
          isConnectable={
            userType == "patient" || mode == "patientView"
              ? false
              : isConnectable
          }
          style={{ opacity: opacity }}
        />
        <Handle
          type="target"
          id={`target_top${handleId}`}
          position={Position.Top}
          isConnectable={
            userType == "patient" || mode == "patientView"
              ? false
              : isConnectable
          }
          style={{ opacity: opacity }}
        />
      </Box>
      <Box>
        <Handle
          type="source"
          id={`source_right${handleId}`}
          position={Position.Right}
          isConnectable={
            userType == "patient" || mode == "patientView"
              ? false
              : isConnectable
          }
          style={{ opacity: opacity }}
        />
        <Handle
          type="target"
          id={`target_right${handleId}`}
          position={Position.Right}
          isConnectable={
            userType == "patient" || mode == "patientView"
              ? false
              : isConnectable
          }
          style={{ opacity: opacity }}
        />
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"8px"}
        style={{ height: "100%", width: "100%" }}
      >
        {userType == "patient" || mode == "patientView" ? (
          <>
            <Box className={`${styles.textWrapper} ${styles.flexShink}`}>
              <Tooltip title={label} placement="top">
                <Typography
                  id="title"
                  placeholder="Enter Title"
                  className={styles.typographyTitleStyle}
                >
                  {label}
                </Typography>
              </Tooltip>
            </Box>
            {!description ? (
              <></>
            ) : (
              <Box className={styles.textWrapper}>
                <Tooltip title={description} placement="top">
                  <Typography
                    id="description"
                    className={styles.typographyDescriptionStyle}
                  >
                    {description}
                  </Typography>
                </Tooltip>
              </Box>
            )}

            <TextareaAutosize
              id="patientResponse"
              data-testid={`arrow-template-response-input-${id}`}
              name="patientResponse"
              value={patientResponse}
              onChange={(e) => onChange(e)}
              placeholder="Response"
              disabled={responseDisable}
              className={styles.responseStyle}
            />
          </>
        ) : (
          <>
            <TextareaAutosize
              id="title"
              name="title"
              value={label}
              onChange={(e) => onChange(e)}
              placeholder="Enter Title"
              className={styles.textAreaTitleStyle}
              disabled={
                userType == "patient" || mode == "patientView" ? true : false
              }
            />
            <TextareaAutosize
              id="description"
              name="description"
              value={description}
              onChange={(e) => onChange(e)}
              placeholder="Enter Description"
              className={styles.textAreaDescriptionStyle}
              disabled={
                userType == "patient" || mode == "patientView" ? true : false
              }
            />

            <TextareaAutosize
              id="patientResponse"
              data-testid={`arrow-template-response-input-${id}`}
              name="patientResponse"
              value={patientResponse}
              onChange={(e) => onChange(e)}
              placeholder="Response"
              disabled={responseDisable}
              className={styles.responseStyle}
            />
          </>
        )}
      </Box>
      <Box>
        <Handle
          type="source"
          position={Position.Left}
          id={`source_left${handleId}`}
          isConnectable={
            userType == "patient" || mode == "patientView"
              ? false
              : isConnectable
          }
          style={{ opacity: opacity }}
        />
        <Handle
          type="target"
          position={Position.Left}
          id={`target_left${handleId}`}
          isConnectable={
            userType == "patient" || mode == "patientView"
              ? false
              : isConnectable
          }
          style={{ opacity: opacity }}
        />
      </Box>
      <Box>
        <Handle
          type="source"
          position={Position.Bottom}
          id={`source_bottom${handleId}`}
          isConnectable={
            userType == "patient" || mode == "patientView"
              ? false
              : isConnectable
          }
          style={{ opacity: opacity }}
        />
        <Handle
          type="target"
          position={Position.Bottom}
          id={`target_bottom${handleId}`}
          isConnectable={
            userType == "patient" || mode == "patientView"
              ? false
              : isConnectable
          }
          style={{ opacity: opacity }}
        />
      </Box>
    </Box>
  );
};

export default TextUpdaterNode;
