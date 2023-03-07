import { Typography } from "@mui/material";
import { FC } from "react";

type MyHelpHeadingProps = {
  children: any;
};

const MYHelpHeading: FC<MyHelpHeadingProps> = ({ children }) => {
  return (
    <Typography style={{ margin: "20px 0" }} variant={"subtitle1"}>
      {children}
    </Typography>
  );
};

export default MYHelpHeading;
