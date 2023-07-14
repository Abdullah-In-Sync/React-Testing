import React from "react";
interface Props {
  url: string;
}

const CustomImage: React.FC<Props> = ({ url }) => {
  return (
    <>
      <img alt="no image" src={url} />
    </>
  );
};

export default CustomImage;
