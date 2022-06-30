import React from "react";
// import classNames from "classnames";
import { Typography ,Box} from '@mui/material';
// import styles from "./styles";

const header= {
  padding: "10px 0",
}

const ContentHeader = (props) => {
  // const classes = styles();
  return (
    <Box sx={header}>
      <Typography variant="h4" sx={{fontWeight:'bold'}} color='secondary.main' >
        {props.title}
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
