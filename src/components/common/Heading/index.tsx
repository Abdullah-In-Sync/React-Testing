import { Typography } from "@material-ui/core";
import { FC } from "react";

type MyHelpHeadingProps = {
  title: string;
};

const MYHelpHeading: FC<MyHelpHeadingProps> = ({ title = "" }) => {
  return <Typography component={"h3"}>{title}</Typography>;
};

export default MYHelpHeading;
