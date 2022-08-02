import React from "react";
import { CircularProgress } from "@mui/material";

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
        // background: "rgba(255,255,255,0.3)",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
      data-testid="activity-indicator"
    >
      <CircularProgress />
    </div>
  );
};

export default Loader;
