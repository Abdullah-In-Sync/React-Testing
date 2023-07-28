import { Box } from "@mui/material";
import CustomImage from "../Image/Image";

export const CustomImageComponent = ({ url }) => {
  return (
    <Box
      style={{
        display: "flex",
        minHeight: "65vh",
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px",
        border: "1px solid #7EBCA7",
      }}
    >
      <CustomImage url={url} />
    </Box>
  );
};
export default CustomImageComponent;
