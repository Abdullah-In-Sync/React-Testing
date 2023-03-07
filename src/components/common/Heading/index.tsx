import { Typography } from "@mui/material";
import { FC } from "react";

type MyHelpHeadingProps = {
  children: any;
};

const MYHelpHeading: FC<MyHelpHeadingProps> = ({ children }) => {
  return (
    <Typography
      style={{ margin: "20px 0", color: "#6EC9DB" }}
      variant={"subtitle2"}
    >
      {children}
    </Typography>
  );
};

export default MYHelpHeading;
