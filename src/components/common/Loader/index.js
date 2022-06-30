import React from "react";
import { CircularProgress } from '@mui/material';

const Loader = (props) => {
  if (!props.visible) {
    return null;
  }
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        zIndex: 9999,
        position: "absolute",
        background: "rgba(255,255,255,0.3)",
        height: "100%",
        width: "100%",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default Loader;
