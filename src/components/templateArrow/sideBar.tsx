import { Box } from "@mui/system";

const SideBar = ({ iconItems }) => {
  console.log(iconItems, "icons");
  return (
    <Box
      style={{
        height: "500px",
        width: "30px",
        alignItems: "center",
        background: "#dadada52",
        border: "1px solid #cecece",
        textAlign: "center",
      }}
    >
      {iconItems}
    </Box>
  );
};
export default SideBar;
