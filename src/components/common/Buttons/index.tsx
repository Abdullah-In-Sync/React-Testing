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
export const AddButton = ({ size, ...props }) => {
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
