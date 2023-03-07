import { Button, ButtonProps } from "@mui/material";

export default (props: ButtonProps) => {
  const { size, ...rest } = props;
  return <Button size={size ?? "medium"} {...rest} />;
};
