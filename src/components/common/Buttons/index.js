import React from "react";
import { Button } from "@mui/material";
import {
  Publish,
  Edit,
  Delete,
  CloudUpload,
  Add,
  Pause,
  PlayArrow,
  RotateLeft,
  ExpandMore,
  Sync,
  CancelOutlined,
  PlayCircleOutline,
  BarChart,
  CloudDownload
} from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const deleteButton = {
  borderColor: 'danger.main',
  color: 'danger.main',
  "&:hover": {},
}
const buttonStyle={
  minWidth: 100,
  backgrounColor:'primary.dark',
  color:'custom.light'

}
export const AddButton = ({ className, size, ...props }) => {
  return (
    <Button
      size={size || "medium"}
      sx={buttonStyle}
      variant="contained"
      {...props}
    >
      {props.label || "Button"}
    </Button>
  );
};

// export const ResetButton = ({ className, size, ...props }) => {
//   return (
//     <Button
//       style={{
//         minWidth: 100,
//         justifyContent: "space-around",
//       }}
//       className={className}
//       size={size || "small"}
//       color="primary"
//       variant="contained"
//       {...props}
//     >
//       <RotateLeft className="mr-2" fontSize="small" /> {props.label || "Button"}
//     </Button>
//   );
// };

// export const PlayButton = ({ className, size, ...props }) => {
//   return (
//     <Button
//       style={{ minWidth: 100, justifyContent: "space-between" }}
//       className={className}
//       size={size || "small"}
//       color="primary"
//       variant="contained"
//       {...props}
//     >
//       <PlayArrow className="mr-2" fontSize="small" /> {props.label || "Button"}
//     </Button>
//   );
// };

// export const PauseButton = ({ className, size, ...props }) => {
//   return (
//     <Button
//       style={{ minWidth: 100, justifyContent: "space-between" }}
//       className={className}
//       size={size || "small"}
//       color="primary"
//       variant="contained"
//       {...props}
//     >
//       <Pause className="mr-2" fontSize="small" /> {props.label || "Button"}
//     </Button>
//   );
// };

// export const LoadButton = ({ className, size, ...props }) => {
//   return (
//     <Button
//       style={{ minWidth: 100, justifyContent: "space-between" }}
//       className={className}
//       size={size || "small"}
//       color="primary"
//       variant="contained"
//       {...props}
//     >
//       <ExpandMore className="mr-2" fontSize="small" /> {props.label || "Button"}
//     </Button>
//   );
// };

// export const Upgrade = ({
//   className,
//   size,
//   variant = "contained",
//   ...props
// }) => {
//   return (
//     <Button
//       style={{ minWidth: 100, whiteSpace: "nowrap" }}
//       className={className}
//       size={size || "small"}
//       color="primary"
//       variant={variant}
//       {...props}
//     >
//       <Publish className="mr-2" fontSize="small" /> {props.label || "Button"}
//     </Button>
//   );
// };

// export const UpgradeAll = ({ className, size, ...props }) => {
//   return (
//     <Button
//       style={{ minWidth: 150, whiteSpace: "nowrap" }}
//       className={className}
//       size={size || "small"}
//       color="primary"
//       variant="contained"
//       {...props}
//     >
//       <Publish className="mr-2" fontSize="small" /> {props.label || "Button"}
//     </Button>
//   );
// };

// export const DeployButton = ({ className, size, ...props }) => {
//   return (
//     <Button
//       style={{ minWidth: 100, whiteSpace: "nowrap" }}
//       className={className}
//       size={size || "small"}
//       color="primary"
//       variant="outlined"
//       {...props}
//     >
//       <Sync className="mr-2" fontSize="small" /> {props.label || "Button"}
//     </Button>
//   );
// };
// export const ActiveButton = ({ className, size, ...props }) => {
//   return (
//     <Button
//       style={{ minWidth: 100, whiteSpace: "nowrap" }}
//       className={className}
//       size={size || "small"}
//       color="primary"
//       variant="outlined"
//       {...props}
//     >
//       <PlayCircleOutline className="mr-2" fontSize="small" />{" "}
//       {props.label || "Button"}
//     </Button>
//   );
// };
// export const DeactiveButton = ({ className, size, ...props }) => {
//   return (
//     <Button
//       style={{ minWidth: 100, whiteSpace: "nowrap" }}
//       className={className}
//       size={size || "small"}
//       color="primary"
//       variant="outlined"
//       {...props}
//     >
//       <CancelOutlined className="mr-2" fontSize="small" />{" "}
//       {props.label || "Button"}
//     </Button>
//   );
// };

// export const GraphButton = ({ className, size, ...props }) => {
//   return (
//     <Button
//       style={{ minWidth: 100, whiteSpace: "nowrap" }}
//       className={className}
//       size={size || "small"}
//       color="primary"
//       variant="outlined"
//       {...props}
//     >
//       <BarChart className="mr-2" fontSize="small" /> {props.label || "Button"}
//     </Button>
//   );
// };

// export const EditButton = ({ className, size, ...props }) => {
//   return (
//     <Button
//       style={{ minWidth: 100 }}
//       className={className}
//       size={size || "small"}
//       color="primary"
//       variant="outlined"
//       {...props}
//     >
//       <Edit className="mr-1" fontSize="small" /> {props.label || "Button"}
//     </Button>
//   );
// };

// export const DeleteButton = ({ className, size, ...props }) => {
//   const classes = styles();
//   return (
//     <Button
//       style={{ minWidth: 100 }}
//       className={className}
//       // sx={deleteButton}
//       size={size || "small"}
//       variant="outlined"
//       {...props}
//     >
//       <Delete className="mr-1" fontSize="small" /> {props.label || "Button"}
//     </Button>
//   );
// };

// export const ExportButton = ({ className, size, ...props }) => {
//   return (
//     <Button
//       style={{ minWidth: 100 }}
//       className={className}
//       size={size || "small"}
//       color="primary"
//       variant="contained"
//       {...props}
//     >
//       <CloudDownload className="mr-1" fontSize="small" /> {props.label || "Button"}
//     </Button>
//   );
// };

// export const FileUploadButton = ({
//   className,
//   size,
//   style = {},
//   uploaded = false,
//   disabled = false,
//   ...props
// }) => {
//   const id = "_" + Math.random().toString(36).substr(2, 9);
//   return (
//     <>
//       <Button
//         disabled={disabled}
//         style={{
//           minWidth: 100,
//           whiteSpace: "nowrap",
//           width: "100%",
//           maxWidth: 240,
//           ...style,
//         }}
//         className={className}
//         onClick={() => {
//           document.getElementById(id).click();
//         }}
//         size={size || "small"}
//         color="primary"
//         variant="outlined"
//       >
//         {uploaded ? (
//           <CheckCircleOutlineIcon className="mr-2" fontSize="small" />
//         ) : (
//           <CloudUpload className="mr-2" fontSize="small" />
//         )}{" "}
//         {props.label || "Button"}
//       </Button>
//       <input
//         type="file"
//         onChange={(e) => {
//           props.onChange(e.target.files);
//         }}
//         onClick={(e) => (e.target.value = "")}
//         id={id}
//         style={{ position: "absolute", top: "-1000px" }}
//       />
//     </>
//   );
// };
