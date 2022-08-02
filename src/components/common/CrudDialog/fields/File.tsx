import React, { useState } from "react";

const File = ({ field, onChange }) => {
  const [fileName, setFileName] = useState("");
  /* @typescript-eslint/no-unused-vars */
  const handleChange = async (e) => {
    setFileName(e[0].name);
    onChange(field, e[0]);
  };

  return (
    <div
      style={{ width: "100%" }}
      className={field.align ? "mb-3" : "mb-3 d-flex justify-content-end"}
    >
      <div style={{ width: "100%" }}>
        {}
        <label style={{ fontSize: 13, display: "block", color: "#858585" }}>
          {field.hint}
        </label>
        <div
          style={{
            fontSize: 11,
            maxWidth: 200,
            overflowWrap: "break-word",
            marginTop: 5,
          }}
        >
          {fileName}
        </div>
      </div>
    </div>
  );
};

export default File;
