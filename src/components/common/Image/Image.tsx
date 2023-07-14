import React from "react";
interface Props {
  url: string;
}

const CustomImage: React.FC<Props> = ({ url }) => {
  return (
    <>
      <img
        alt="no image"
        src={url}
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
    </>
  );
};

export default CustomImage;
