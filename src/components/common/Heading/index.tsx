import { Typography } from "@material-ui/core";
import { FC } from "react";

type MyHelpHeadingProps = {
  children: any;
};

const MYHelpHeading: FC<MyHelpHeadingProps> = ({ children }) => {
  return <Typography component={"h3"}>{children}</Typography>;
};

export default MYHelpHeading;
