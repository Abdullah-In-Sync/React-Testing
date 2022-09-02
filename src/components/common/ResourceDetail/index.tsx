import { Grid } from "@mui/material";

const ResourceDetail = (props) => {
  return (
    <>
      <Grid
        sx={{
          color: "primary.main",
        }}
        pl={2}
        xs={12}
        md={12}
      >
        {props.title}
      </Grid>
      <Grid
        ml={2}
        mr={2}
        border={1}
        xs={12}
        p={1}
        sx={{
          borderRadius: "6px",
          borderColor: "black",
        }}
        md={12}
      >
        {props.description}
      </Grid>
    </>
  );
};

ResourceDetail.defaultProps = {
  title: "",
  description: ""
};

export default ResourceDetail;
