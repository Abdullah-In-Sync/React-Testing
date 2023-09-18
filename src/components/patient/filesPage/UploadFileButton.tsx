import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Box, IconButton } from "@mui/material";

const UploadIconButton = ({ onClick }) => {
  return (
    <Box className="uploadButtonWrapper">
      <IconButton
        size="small"
        key={`uploadIconButton`}
        aria-label={`uploadIconButton`}
        data-testid={`uploadIconButton`}
        onClick={onClick}
      >
        <FileUploadOutlinedIcon />
      </IconButton>
    </Box>
  );
};

export default UploadIconButton;
