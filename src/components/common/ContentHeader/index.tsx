import { Typography, Box } from "@mui/material";

const header = {
  padding: "10px 0",
};

const ContentHeader = (props) => {
  return (
    <Box sx={header}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold" }}
        color="secondary.main"
      >
        {props.title}
      </Typography>
      <Typography
        variant="body2"
        style={{
          paddingTop: 0,
          paddingBottom: 0,
          marginTop:"-15px",
          marginBottom:"-15px",
          fontSize: "1em",
          fontWeight: "bold"
        }}
        color="primary.main"
      >
        {props.subtitle}
      </Typography>
      <Typography
        style={{
          marginTop: 5,
          marginBottom: 15,
          width: "80%",
          fontSize: "0.9em",
        }}
        variant="body2"
        color="textSecondary"
      >
        {props.description}
      </Typography>
    </Box>
  );
};

ContentHeader.defaultProps = {
  title: "",
  description: "",
  className: "",
};

export default ContentHeader;
