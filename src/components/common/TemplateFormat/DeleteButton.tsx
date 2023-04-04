import { DeleteSharp } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";

const DeleteButton = ({ i, onDelete }) => {
  return (
    <Box className="deleteButtonWrapper">
      <Fab
        key={`deleteIconButton_${i}`}
        aria-label={`deleteIconButton_${i}`}
        data-testid={`iconButtonQuestion_${i}`}
        onClick={onDelete}
      >
        <DeleteSharp />
      </Fab>
    </Box>
  );
};

export default DeleteButton;
