import React from "react";
interface Props {
  url: string;
}

const CustomImage: React.FC<Props> = ({ url }) => {
  return (
    <>
      <img
        alt="layout Responsive"
        src={url}
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    </>
  );
};

export default CustomImage;
